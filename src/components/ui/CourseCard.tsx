import React from "react";

export function CourseCardSkeleton() {
  return <div className="animate-pulse bg-muted rounded-xl p-4 h-64 w-full" />;
}

export function CourseCard({ course, view = "grid" }) {
  return (
    <div
      className={`bg-card rounded-xl p-4 border border-border shadow-lg transition hover:scale-[1.02] ${
        view === "list" ? "flex gap-4" : ""
      }`}
    >
      <img
        src={
          course.thumbnail ||
          "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80"
        }
        alt={course.title}
        className={`rounded-lg object-cover ${
          view === "list" ? "w-32 h-32" : "w-full h-32"
        } mb-4`}
        onError={(e) =>
          (e.currentTarget.src =
            "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80")
        }
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground">{course.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">
            {course.description}
          </p>
          <div className="flex items-center mb-2">
            <img
              src={
                course.instructor.avatar ||
                "https://randomuser.me/api/portraits/lego/1.jpg"
              }
              alt={course.instructor.name}
              className="w-7 h-7 rounded-full mr-2 border"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://randomuser.me/api/portraits/lego/1.jpg")
              }
            />
            <span className="text-xs text-muted-foreground">
              {course.instructor.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {course.tags.map((tag) => (
              <span key={tag} className="bg-muted px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div
              className="bg-earth-brown h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="px-3 py-1 bg-earth-brown text-white rounded hover:bg-deep-brown text-xs">
              Continue Learning
            </button>
            {course.certificate && (
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                🎓 Certificate
              </span>
            )}
          </div>
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <span>⭐ {course.rating}</span>
            <span className="ml-4">
              {course.modulesCompleted}/{course.totalModules} Modules
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
