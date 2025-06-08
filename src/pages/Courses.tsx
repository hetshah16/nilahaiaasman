import React, { useState, useEffect } from "react";
import { CourseCardSkeleton } from "../components/ui/CourseCard";
import { useAuth } from "../contexts/AuthContext";
import { dummyCourses } from "../data/dummyCourses";

export default function Courses() {
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([]);
  const { user, isLoading } = useAuth();

  const getUserId = () => user?.email?.trim().toLowerCase() || "";

  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    if (!getUserId()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/enroll/${getUserId()}`
      );
      const data = await res.json();
      setEnrolledCourseIds(data.courses || []);
    } catch (err) {
      setEnrolledCourseIds([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnrolledCourses();
    // eslint-disable-next-line
  }, [user]);

  // Disenroll handler
  const handleDisenroll = async (courseId: number) => {
    if (!getUserId()) return;
    setLoading(true);
    try {
      await fetch("http://localhost:4000/api/enroll", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: getUserId(),
          courseId,
        }),
      });
      // Remove from UI immediately
      setEnrolledCourseIds((prev) => prev.filter((id) => id !== courseId));
    } catch (err) {
      // Optionally show error
    }
    setLoading(false);
  };

  const filteredCourses = dummyCourses.filter(
    (course) =>
      enrolledCourseIds.includes(course.id) &&
      (
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(search.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground">
            {isLoading ? "Loading..." : `Welcome, ${user?.name || "Student"}`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded ${
              view === "grid" ? "bg-earth-brown text-white" : "bg-muted"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded ${
              view === "list" ? "bg-earth-brown text-white" : "bg-muted"
            }`}
          >
            List
          </button>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="🔍 Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-earth-brown transition"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
      </div>
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {loading
          ? Array(5)
              .fill(0)
              .map((_, i) => <CourseCardSkeleton key={i} />)
          : filteredCourses.map((course) => (
              <div key={course.id} className="bg-card rounded-lg border shadow p-4 flex flex-col h-full">
                <div className="flex-1">
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
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 py-2 bg-earth-brown text-white rounded-lg hover:bg-earth-brown/90 transition-colors text-sm"
                  >
                    Continue Learning
                  </button>
                  <button
                    onClick={() => handleDisenroll(course.id)}
                    className="flex-1 py-2 bg-earth-brown text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    disabled={loading}
                    title="Disenroll"
                  >
                    Disenroll
                  </button>
                </div>
              </div>
            ))}
        {!loading && filteredCourses.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}