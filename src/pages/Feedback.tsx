import React, { useState } from "react";

const teachersData = {
  "Prof. Sharma": ["Data Structures", "Algorithms"],
  "Dr. Mehta": ["Operating Systems", "Computer Networks"],
  "Ms. Verma": ["Web Development", "Database Systems"],
};

interface FeedbackEntry {
  teacher: string;
  course: string;
  text: string;
}

const Feedback: React.FC = () => {
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [entries, setEntries] = useState<FeedbackEntry[]>([
  { teacher: "Prof. Sharma", course: "Data Structures", text: "Very clear explanations!" },
  { teacher: "Prof. Sharma", course: "Data Structures", text: "Gives good real-life examples." },
  { teacher: "Prof. Sharma", course: "Algorithms", text: "Loved the way sorting algorithms were taught." },
  { teacher: "Prof. Sharma", course: "Algorithms", text: "Needs to slow down during lectures." },
  { teacher: "Prof. Sharma", course: "Data Structures", text: "Doubts are solved patiently." },

  { teacher: "Dr. Mehta", course: "Operating Systems", text: "Great chalk-and-board teaching!" },
  { teacher: "Dr. Mehta", course: "Operating Systems", text: "Could give more practical examples." },
  { teacher: "Dr. Mehta", course: "Computer Networks", text: "Very organized and structured." },
  { teacher: "Dr. Mehta", course: "Computer Networks", text: "Slides are very helpful for revision." },
  { teacher: "Dr. Mehta", course: "Operating Systems", text: "Takes time to explain tough topics clearly." },

  { teacher: "Ms. Verma", course: "Web Development", text: "Fun and interactive sessions!" },
  { teacher: "Ms. Verma", course: "Web Development", text: "Assignments are challenging and helpful." },
  { teacher: "Ms. Verma", course: "Database Systems", text: "Explains SQL concepts well." },
  { teacher: "Ms. Verma", course: "Database Systems", text: "Can use more visuals while explaining joins." },
  { teacher: "Ms. Verma", course: "Web Development", text: "Lots of hands-on projects — amazing!" },

  { teacher: "Dr. Mehta", course: "Computer Networks", text: "Explains protocols in a very simple way." },
  { teacher: "Prof. Sharma", course: "Algorithms", text: "In-depth explanation of time complexity." },
  { teacher: "Ms. Verma", course: "Database Systems", text: "Very responsive to queries on email." },
  { teacher: "Dr. Mehta", course: "Operating Systems", text: "Explains deadlocks in a very intuitive way." },
  { teacher: "Ms. Verma", course: "Web Development", text: "Loved the JavaScript part!" },
]);
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacher && course && feedback) {
      const newEntry = { teacher, course, text: feedback };
      setEntries((prev) => [...prev, newEntry]);
      setFeedback("");
    }
  };

  const filteredEntries = entries.filter((entry) =>
    entry.teacher.toLowerCase().includes(search.toLowerCase()) ||
    entry.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="max-w-2xl mx-auto mt-10 p-6 rounded shadow space-y-6"
      style={{ backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
    >
      <h2 className="text-2xl font-bold mb-4">Give Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Select Teacher</label>
          <select
            className="w-full border p-2 rounded"
            style={{ backgroundColor: "hsl(var(--card))", color: "hsl(var(--card-foreground))" }}
            value={teacher}
            onChange={(e) => {
              setTeacher(e.target.value);
              setCourse("");
            }}
            required
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
              style={{ backgroundColor: "hsl(var(--card))", color: "hsl(var(--card-foreground))" }}
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
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
          <label className="block font-semibold mb-1">Your Feedback</label>
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            style={{ backgroundColor: "hsl(var(--card))", color: "hsl(var(--card-foreground))" }}
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          Submit Feedback
        </button>
      </form>

      <div>
        <h3 className="text-xl font-bold mt-8 mb-2">Search Feedback</h3>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          style={{ backgroundColor: "hsl(var(--card))", color: "hsl(var(--card-foreground))" }}
          placeholder="Search by teacher or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredEntries.length > 0 ? (
          <ul className="space-y-2">
            {filteredEntries.map((entry, index) => (
              <li
                key={index}
                className="border p-3 rounded"
                style={{ backgroundColor: "hsl(var(--warm-beige))" }}
              >
                <p className="text-sm">
                  <strong>{entry.teacher}</strong> – <em>{entry.course}</em>
                </p>
                <p className="mt-1">{entry.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No feedback found.</p>
        )}
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
//   const [entries, setEntries] = useState<FeedbackEntry[]>([]);
//   const [search, setSearch] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (teacher && course && feedback) {
//       const newEntry = { teacher, course, text: feedback };
//       setEntries((prev) => [...prev, newEntry]);
//       setFeedback("");
//     }
//   };

//   const filteredEntries = entries.filter((entry) =>
//     entry.teacher.toLowerCase().includes(search.toLowerCase()) ||
//     entry.course.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Give Feedback</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold mb-1">Select Teacher</label>
//           <select
//             className="w-full border p-2 rounded"
//             value={teacher}
//             onChange={(e) => {
//               setTeacher(e.target.value);
//               setCourse(""); // Reset course if teacher changes
//             }}
//             required
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
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit Feedback
//         </button>
//       </form>

//       <div>
//         <h3 className="text-xl font-bold mt-8 mb-2">Search Feedback</h3>
//         <input
//           type="text"
//           className="w-full border p-2 rounded mb-4"
//           placeholder="Search by teacher or course..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {filteredEntries.length > 0 ? (
//           <ul className="space-y-2">
//             {filteredEntries.map((entry, index) => (
//               <li key={index} className="border p-3 rounded bg-gray-50">
//                 <p className="text-sm text-gray-600">
//                   <strong>{entry.teacher}</strong> – <em>{entry.course}</em>
//                 </p>
//                 <p className="mt-1">{entry.text}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No feedback found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Feedback;
