from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from better_profanity import profanity
from typing import Optional
import os
import shutil
import tempfile

# Text extraction
import docx
import PyPDF2

# Google Cloud Vision
from google.cloud import vision
import io

# Video frame extraction
import cv2

from pathlib import Path

# Initialize Google Vision client
vision_client = vision.ImageAnnotatorClient()

app = FastAPI()

# Allow CORS (for frontend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directory for serving files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load profanity words
profanity.load_censor_words()

UPLOAD_DIR = Path("static/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def extract_text_from_docx(path):
    doc = docx.Document(path)
    return "\n".join([para.text for para in doc.paragraphs])


def extract_text_from_pdf(path):
    text = ""
    with open(path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text


def extract_text_from_txt(path):
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()


def extract_text_from_file(path, filename):
    ext = filename.split('.')[-1].lower()
    if ext == "txt":
        return extract_text_from_txt(path)
    elif ext == "pdf":
        return extract_text_from_pdf(path)
    elif ext == "docx":
        return extract_text_from_docx(path)
    return ""


def detect_unsafe_text(text):
    return profanity.contains_profanity(text)


def detect_unsafe_image(path):
    try:
        with io.open(path, 'rb') as image_file:
            content = image_file.read()
        image = vision.Image(content=content)
        response = vision_client.safe_search_detection(image=image)

        if response.error.message:
            print(f"Vision API error: {response.error.message}")
            return False

        safe_search = response.safe_search_annotation

        adult = safe_search.adult
        violence = safe_search.violence
        racy = safe_search.racy

        # Google Vision likelihood enum values
        # VERY_UNLIKELY = 1, UNLIKELY = 2, POSSIBLE = 3, LIKELY = 4, VERY_LIKELY = 5

        LIKELIHOOD_POSSIBLE = 3
        LIKELIHOOD_LIKELY = 4

        count_possible_or_higher = sum([
            adult >= LIKELIHOOD_POSSIBLE,
            violence >= LIKELIHOOD_POSSIBLE,
            racy >= LIKELIHOOD_POSSIBLE
        ])

        if count_possible_or_higher >= 2 or any([
            adult >= LIKELIHOOD_LIKELY,
            violence >= LIKELIHOOD_LIKELY,
            racy >= LIKELIHOOD_LIKELY
        ]):
            return True

        return False

    except Exception as e:
        print(f"Exception in detect_unsafe_image: {e}")
        return False


def extract_frames_from_video(path, max_frames=5):
    frames = []
    cap = cv2.VideoCapture(path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_indices = [int(i * total_frames / max_frames) for i in range(max_frames)]
    for idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if ret:
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
            cv2.imwrite(temp_file.name, frame)
            frames.append(temp_file.name)
    cap.release()
    return frames


@app.post("/assess")
async def assess(
    text_file: Optional[UploadFile] = File(None),
    image: Optional[UploadFile] = File(None),
    video: Optional[UploadFile] = File(None),
):
    results = {}

    with tempfile.TemporaryDirectory() as tempdir:

        # Text file
        if text_file:
            filename = Path(text_file.filename).name or "uploaded_text_file"
            file_path = os.path.join(tempdir, filename)
            with open(file_path, "wb") as f:
                shutil.copyfileobj(text_file.file, f)

            text = extract_text_from_file(file_path, filename)
            if not text.strip():
                results["text_file"] = "No readable text found."
            else:
                unsafe = detect_unsafe_text(text)
                results["text_file"] = "unsafe" if unsafe else "safe"
                if not unsafe:
                    # Save file if safe
                    save_path = UPLOAD_DIR / filename
                    with open(save_path, "wb") as out_f, open(file_path, "rb") as in_f:
                        shutil.copyfileobj(in_f, out_f)

        # Image file
        if image:
            filename = Path(image.filename).name or "uploaded_image_file"
            file_path = os.path.join(tempdir, filename)
            with open(file_path, "wb") as f:
                shutil.copyfileobj(image.file, f)

            unsafe = detect_unsafe_image(file_path)
            results["image"] = "unsafe" if unsafe else "safe"
            if not unsafe:
                save_path = UPLOAD_DIR / filename
                with open(save_path, "wb") as out_f, open(file_path, "rb") as in_f:
                    shutil.copyfileobj(in_f, out_f)

        # Video file
        if video:
            filename = Path(video.filename).name or "uploaded_video_file"
            file_path = os.path.join(tempdir, filename)
            with open(file_path, "wb") as f:
                shutil.copyfileobj(video.file, f)

            frames = extract_frames_from_video(file_path)
            video_unsafe = False
            for frame_path in frames:
                try:
                    if detect_unsafe_image(frame_path):
                        video_unsafe = True
                        break
                except Exception as e:
                    print(f"Error processing frame {frame_path}: {e}")
                finally:
                    os.remove(frame_path)

            results["video"] = "unsafe" if video_unsafe else "safe"
            if not video_unsafe:
                save_path = UPLOAD_DIR / filename
                with open(save_path, "wb") as out_f, open(file_path, "rb") as in_f:
                    shutil.copyfileobj(in_f, out_f)

    return {"assessment": results}


@app.get("/list-uploads")
def list_uploaded_files():
    if not UPLOAD_DIR.exists():
        return JSONResponse(content=[])
    files = [f.name for f in UPLOAD_DIR.iterdir() if f.is_file()]
    return JSONResponse(content=files)