import React, { useState } from "react";
import { CourseCard, CourseCardSkeleton } from "../components/ui/CourseCard";
import { useAuth } from "../contexts/AuthContext";

export const dummyCourses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React and build interactive UIs.",
    instructor: {
      name: "Dr. Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    tags: ["Beginner", "Tech"],
    progress: 60,
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    modulesCompleted: 6,
    totalModules: 10,
    certificate: false,
  },
  {
    id: 2,
    title: "Mindfulness & Wellness",
    description: "Explore meditation, mindfulness, and healthy habits.",
    instructor: {
      name: "Guru Anand",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    tags: ["Wellness", "Beginner"],
    progress: 100,
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    modulesCompleted: 8,
    totalModules: 8,
    certificate: true,
  },
  {
    id: 3,
    title: "UI/UX Design Essentials",
    description:
      "Master the fundamentals of user interface and experience design.",
    instructor: {
      name: "Emily Carter",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    tags: ["Design", "Intermediate"],
    progress: 35,
    thumbnail:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    modulesCompleted: 3,
    totalModules: 10,
    certificate: false,
  },
  {
    id: 4,
    title: "Python for Data Science",
    description: "Analyze data and build models using Python.",
    instructor: {
      name: "Prof. Alan Turing",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    tags: ["Tech", "Data Science"],
    progress: 80,
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    modulesCompleted: 8,
    totalModules: 10,
    certificate: false,
  },
  {
    id: 5,
    title: "Creative Writing Workshop",
    description: "Unlock your creativity and write compelling stories.",
    instructor: {
      name: "Jane Austen",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    tags: ["Writing", "Beginner"],
    progress: 20,
    thumbnail:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    modulesCompleted: 2,
    totalModules: 10,
    certificate: false,
  },
];

export default function Courses() {
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { user, isLoading } = useAuth();

  // Filter courses based on search
  const filteredCourses = dummyCourses.filter((course) => {
    const searchLower = search.toLowerCase();
    return (
      course.title.toLowerCase().includes(searchLower) ||
      course.instructor.name.toLowerCase().includes(searchLower) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

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
      {/* Filters/Search */}
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
        {/* Category dropdown, Progress radio/tags, Sort dropdown */}
      </div>
      {/* Courses Grid/List */}
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
              <CourseCard key={course.id} course={course} view={view} />
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
