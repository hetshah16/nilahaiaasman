import React, { useState } from "react";

const teachersData: Record<string, string[]> = {
  "Prof. Sharma": ["Data Structures", "Algorithms"],
  "Dr. Mehta": ["Operating Systems", "Computer Networks"],
  "Ms. Verma": ["Web Development", "Database Systems"],
};

interface FeedbackEntry {
  name: string;
  teacher: string;
  course: string;
  text: string;
  stars: number;
}

const Feedback: React.FC = () => {
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);
  const [search, setSearch] = useState("");

  const [entries, setEntries] = useState<FeedbackEntry[]>([
    {
      name: "Aditi",
      teacher: "Prof. Sharma",
      course: "Data Structures",
      text: "Clear explanations and good pace.",
      stars: 5,
    },
    {
      name: "Raj",
      teacher: "Dr. Mehta",
      course: "Operating Systems",
      text: "Detailed coverage but a bit fast.",
      stars: 4,
    },
    {
      name: "Sneha",
      teacher: "Ms. Verma",
      course: "Web Development",
      text: "Loved the interactive projects!",
      stars: 5,
    },
    {
      name: "Kunal",
      teacher: "Dr. Mehta",
      course: "Computer Networks",
      text: "Slides were very helpful.",
      stars: 4,
    },
    {
      name: "Ravi",
      teacher: "Prof. Sharma",
      course: "Algorithms",
      text: "Could explain recursion better.",
      stars: 3,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && teacher && course && feedback && stars > 0) {
      const newEntry: FeedbackEntry = { name, teacher, course, text: feedback, stars };
      setEntries((prev) => [...prev, newEntry]);
      setName("");
      setFeedback("");
      setTeacher("");
      setCourse("");
      setStars(0);
    }
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.teacher.toLowerCase().includes(search.toLowerCase()) ||
      entry.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow space-y-8"
      style={{
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <h2 className="text-2xl font-bold">Give Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
          style={{
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
          }}
        />

        <div>
          <label className="block font-semibold mb-1">Select Teacher</label>
          <select
            className="w-full border p-2 rounded"
            value={teacher}
            onChange={(e) => {
              setTeacher(e.target.value);
              setCourse("");
            }}
            required
            style={{
              backgroundColor: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
            }}
          >
            <option value="">-- Choose a Teacher --</option>
            {Object.keys(teachersData).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {teacher && (
          <div>
            <label className="block font-semibold mb-1">Select Course</label>
            <select
              className="w-full border p-2 rounded"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
              }}
            >
              <option value="">-- Choose a Course --</option>
              {teachersData[teacher].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block font-semibold mb-1">Rate (1 to 5 stars)</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setStars(n)}
                className={`text-2xl ${
                  stars >= n ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          style={{
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
          }}
        />

        <button
          type="submit"
          className="bg-[hsl(var(--earth-brown))] text-white px-4 py-2 rounded hover:opacity-90"
        >
          Submit Feedback
        </button>
      </form>

      <div>
        <h3 className="text-xl font-bold mb-2">Discussion & Feedback</h3>

        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          placeholder="Search by teacher or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
          }}
        />

        <div
          className="h-80 overflow-y-auto border p-4 rounded-lg space-y-4"
          style={{
            backgroundColor: "hsl(var(--warm-beige))",
            scrollbarColor: "hsl(var(--foreground)) transparent",
            scrollbarWidth: "thin",
          }}
        >
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <div
                key={index}
                className="p-3 rounded-xl space-y-1"
                style={{
                  backgroundColor: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>{entry.name}</span>
                  <span>
                    {Array.from({ length: entry.stars }, (_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    {Array.from({ length: 5 - entry.stars }, (_, i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {entry.teacher} — <em>{entry.course}</em>
                </p>
                <p className="text-sm">{entry.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No feedback found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;




// import React, { useState } from "react";

// const teachersData = {
//   "Prof. Sharma": ["Data Structures", "Algorithms"],
//   "Dr. Mehta": ["Operating Systems", "Computer Networks"],
//   "Ms. Verma": ["Web Development", "Database Systems"],
// };

// interface FeedbackEntry {
//   teacher: string;
//   course: string;
//   text: string;
// }

// const Feedback: React.FC = () => {
//   const [teacher, setTeacher] = useState("");
//   const [course, setCourse] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [search, setSearch] = useState("");

//   const [entries, setEntries] = useState<FeedbackEntry[]>([
//     { teacher: "Prof. Sharma", course: "Data Structures", text: "Very clear explanations!" },
//     { teacher: "Prof. Sharma", course: "Data Structures", text: "Gives good real-life examples." },
//     { teacher: "Prof. Sharma", course: "Algorithms", text: "Loved the way sorting algorithms were taught." },
//     { teacher: "Prof. Sharma", course: "Algorithms", text: "Needs to slow down during lectures." },
//     { teacher: "Prof. Sharma", course: "Data Structures", text: "Doubts are solved patiently." },
//     { teacher: "Dr. Mehta", course: "Operating Systems", text: "Great chalk-and-board teaching!" },
//     { teacher: "Dr. Mehta", course: "Operating Systems", text: "Could give more practical examples." },
//     { teacher: "Dr. Mehta", course: "Computer Networks", text: "Very organized and structured." },
//     { teacher: "Dr. Mehta", course: "Computer Networks", text: "Slides are very helpful for revision." },
//     { teacher: "Dr. Mehta", course: "Operating Systems", text: "Takes time to explain tough topics clearly." },
//     { teacher: "Ms. Verma", course: "Web Development", text: "Fun and interactive sessions!" },
//     { teacher: "Ms. Verma", course: "Web Development", text: "Assignments are challenging and helpful." },
//     { teacher: "Ms. Verma", course: "Database Systems", text: "Explains SQL concepts well." },
//     { teacher: "Ms. Verma", course: "Database Systems", text: "Can use more visuals while explaining joins." },
//     { teacher: "Ms. Verma", course: "Web Development", text: "Lots of hands-on projects — amazing!" },
//     { teacher: "Dr. Mehta", course: "Computer Networks", text: "Explains protocols in a very simple way." },
//     { teacher: "Prof. Sharma", course: "Algorithms", text: "In-depth explanation of time complexity." },
//     { teacher: "Ms. Verma", course: "Database Systems", text: "Very responsive to queries on email." },
//     { teacher: "Dr. Mehta", course: "Operating Systems", text: "Explains deadlocks in a very intuitive way." },
//     { teacher: "Ms. Verma", course: "Web Development", text: "Loved the JavaScript part!" },
//   ]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (teacher && course && feedback) {
//       const newEntry = { teacher, course, text: feedback };
//       setEntries((prev) => [...prev, newEntry]);
//       setFeedback("");
//     }
//   };

//   const filteredEntries = entries.filter(
//     (entry) =>
//       entry.teacher.toLowerCase().includes(search.toLowerCase()) ||
//       entry.course.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div
//       className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow"
//       style={{
//         backgroundColor: "hsl(var(--background))",
//         color: "hsl(var(--foreground))",
//       }}
//     >
//       <h2 className="text-2xl font-bold mb-6">Give Feedback</h2>

//       <form onSubmit={handleSubmit} className="space-y-4 mb-10">
//         <div>
//           <label className="block font-semibold mb-1">Select Teacher</label>
//           <select
//             className="w-full border p-2 rounded"
//             value={teacher}
//             onChange={(e) => {
//               setTeacher(e.target.value);
//               setCourse("");
//             }}
//             required
//             style={{
//               backgroundColor: "hsl(var(--card))",
//               color: "hsl(var(--card-foreground))",
//             }}
//           >
//             <option value="">-- Choose a Teacher --</option>
//             {Object.keys(teachersData).map((t) => (
//               <option key={t} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//         </div>

//         {teacher && (
//           <div>
//             <label className="block font-semibold mb-1">Select Course</label>
//             <select
//               className="w-full border p-2 rounded"
//               value={course}
//               onChange={(e) => setCourse(e.target.value)}
//               required
//               style={{
//                 backgroundColor: "hsl(var(--card))",
//                 color: "hsl(var(--card-foreground))",
//               }}
//             >
//               <option value="">-- Choose a Course --</option>
//               {teachersData[teacher].map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div>
//           <label className="block font-semibold mb-1">Your Feedback</label>
//           <textarea
//             className="w-full border rounded p-2"
//             rows={4}
//             placeholder="Write your feedback here..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             required
//             style={{
//               backgroundColor: "hsl(var(--card))",
//               color: "hsl(var(--card-foreground))",
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-[hsl(var(--earth-brown))] text-white px-4 py-2 rounded hover:opacity-90"
//         >
//           Submit Feedback
//         </button>
//       </form>

//       <div className="space-y-4">
//         <h3 className="text-xl font-bold">Discussion & Feedback</h3>
//         <input
//           type="text"
//           className="w-full border p-2 rounded"
//           placeholder="Search by teacher or course..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             backgroundColor: "hsl(var(--card))",
//             color: "hsl(var(--card-foreground))",
//           }}
//         />

//         <div
//           className="h-80 overflow-y-auto border p-4 rounded-lg space-y-4"
//           style={{
//             backgroundColor: "hsl(var(--warm-beige))",
//             scrollbarColor: "hsl(var(--foreground)) transparent",
//             scrollbarWidth: "thin",
//           }}
//         >
//           {filteredEntries.length > 0 ? (
//             filteredEntries.map((entry, index) => (
//               <div
//                 key={index}
//                 className="p-3 max-w-lg rounded-xl"
//                 style={{
//                   backgroundColor: "hsl(var(--card))",
//                   color: "hsl(var(--card-foreground))",
//                   boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
//                 }}
//               >
//                 <p className="text-sm font-semibold">
//                   {entry.teacher} — <span className="italic">{entry.course}</span>
//                 </p>
//                 <p className="mt-1 text-sm">{entry.text}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No feedback found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feedback;
