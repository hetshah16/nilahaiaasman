import React, { useEffect } from "react";

const GOOGLE_TRANSLATE_ID = "google_translate_element";

const LanguageSwitcher: React.FC = () => {
  useEffect(() => {
    // Add Google Translate script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      // Define the callback globally
      (window as any).googleTranslateElementInit = function () {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,mr",
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          GOOGLE_TRANSLATE_ID
        );
      };
    }
  }, []);

  // Helper to trigger translation
  const handleTranslate = (lang: string) => {
    const interval = setInterval(() => {
      const frame: any = document.querySelector("iframe.goog-te-menu-frame");
      if (frame) {
        const innerDoc = frame.contentDocument || frame.contentWindow?.document;
        if (!innerDoc) return;
        const langMap: Record<string, string> = {
          en: "English",
          hi: "Hindi",
          mr: "Marathi",
        };
        const langName = langMap[lang];
        const langSpans = innerDoc.querySelectorAll(
          ".goog-te-menu2-item span.text"
        );
        langSpans.forEach((span: any) => {
          if (span.innerText === langName) {
            (span as HTMLElement).click();
            clearInterval(interval);
          }
        });
      }
    }, 500);
    // Stop trying after 10 seconds
    setTimeout(() => clearInterval(interval), 10000);
  };

  return (
    <div>
      <select
        onChange={(e) => handleTranslate(e.target.value)}
        className="border px-3 py-1 rounded-md text-sm"
        defaultValue=""
      >
        <option value="">Select Language</option>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
      </select>
      {/* Google Translate element (hidden) */}
      <div id={GOOGLE_TRANSLATE_ID} style={{ display: "none" }}></div>
    </div>
  );
};

export default LanguageSwitcher;
