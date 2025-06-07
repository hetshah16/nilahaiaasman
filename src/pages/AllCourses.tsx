import React, { useState } from "react";
import { dummyCourses } from "./Courses";
import { Dialog } from "@radix-ui/react-dialog";

export default function AllCourses() {
  const [enrollCourse, setEnrollCourse] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyCourses.map((course) => (
          <div key={course.id} className="rounded-lg border bg-card p-4 shadow">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
            <p className="text-muted-foreground mb-2">{course.description}</p>
            <div className="flex items-center gap-2 mb-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{course.instructor.name}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="bg-earth-brown text-white px-4 py-2 rounded hover:bg-earth-brown/90 transition"
              onClick={() => setEnrollCourse(course)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* Enroll Modal */}
      {enrollCourse && (
        <Dialog open={!!enrollCourse} onOpenChange={() => setEnrollCourse(null)}>
          <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-xl"
                onClick={() => setEnrollCourse(null)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">
                Enroll in {enrollCourse.title}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Enrollment submitted!");
                  setEnrollCourse(null);
                }}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="border rounded px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="border rounded px-3 py-2"
                />
                <button
                  type="submit"
                  className="bg-earth-brown text-white px-4 py-2 rounded hover:bg-earth-brown/90 transition"
                >
                  Submit Enrollment
                </button>
              </form>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}