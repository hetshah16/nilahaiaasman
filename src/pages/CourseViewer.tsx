
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Headphones, CheckCircle } from 'lucide-react';
import { Progress } from '../components/ui/progress';

const CourseViewer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProgress, setCurrentProgress] = useState(65);

  // Mock course data
  const course = {
    id: id,
    title: 'Introduction to React Development',
    description: 'Learn the fundamentals of React development with hands-on examples and projects.',
    instructor: 'Dr. Sarah Johnson',
    duration: '4 hours',
    lessons: [
      { id: 1, title: 'Getting Started with React', type: 'video', duration: '15 min', completed: true },
      { id: 2, title: 'Components and Props', type: 'text', duration: '20 min', completed: true },
      { id: 3, title: 'State Management', type: 'video', duration: '25 min', completed: true },
      { id: 4, title: 'Audio Lecture: Hooks Deep Dive', type: 'audio', duration: '30 min', completed: false },
      { id: 5, title: 'Building Your First App', type: 'video', duration: '45 min', completed: false },
    ]
  };

  const [currentLesson, setCurrentLesson] = useState(course.lessons[0]);

  const renderContent = () => {
    switch (currentLesson.type) {
      case 'video':
        return (
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <Play size={64} className="mx-auto mb-4 opacity-70" />
              <p className="text-lg">Video: {currentLesson.title}</p>
              <p className="text-sm opacity-70">Duration: {currentLesson.duration}</p>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="bg-sage-green/10 rounded-lg p-8 text-center">
            <Headphones size={64} className="mx-auto mb-4 text-sage-green" />
            <p className="text-lg font-semibold text-foreground">{currentLesson.title}</p>
            <p className="text-sm text-muted-foreground mb-4">Duration: {currentLesson.duration}</p>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <button className="w-12 h-12 bg-sage-green rounded-full flex items-center justify-center text-white hover:bg-sage-green/80 transition-colors">
                <Play size={20} />
              </button>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText size={24} className="text-earth-brown" />
              <h3 className="text-xl font-semibold text-foreground">{currentLesson.title}</h3>
            </div>
            <div className="prose max-w-none text-foreground">
              <p>This is a comprehensive text-based lesson about {currentLesson.title.toLowerCase()}. In this section, you'll learn about the fundamental concepts and best practices.</p>
              <h4>Key Concepts:</h4>
              <ul>
                <li>Understanding component architecture</li>
                <li>Props vs state management</li>
                <li>Event handling in React</li>
                <li>Best practices for component design</li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/courses')}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
          <p className="text-muted-foreground">by {course.instructor}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border nature-shadow-lg">
            {renderContent()}
          </div>

          {/* Progress Section */}
          <div className="bg-card rounded-xl p-6 border border-border nature-shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Course Progress</h3>
              <span className="text-sm text-muted-foreground">{currentProgress}% Complete</span>
            </div>
            <Progress value={currentProgress} className="mb-4" />
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentProgress(Math.min(100, currentProgress + 10))}
                className="px-4 py-2 bg-earth-brown text-white rounded-lg hover:bg-deep-brown transition-colors"
              >
                Mark as Complete
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                Take Notes
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border nature-shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Course Content</h3>
            <div className="space-y-2">
              {course.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentLesson.id === lesson.id 
                      ? 'bg-earth-brown text-white' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {lesson.completed && <CheckCircle size={16} className="text-green-500" />}
                      {lesson.type === 'video' && <Play size={16} />}
                      {lesson.type === 'audio' && <Headphones size={16} />}
                      {lesson.type === 'text' && <FileText size={16} />}
                      <span className="text-sm font-medium">{lesson.title}</span>
                    </div>
                  </div>
                  <div className="text-xs opacity-70 mt-1 ml-7">{lesson.duration}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border nature-shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Course Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="text-foreground">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lessons:</span>
                <span className="text-foreground">{course.lessons.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed:</span>
                <span className="text-foreground">{course.lessons.filter(l => l.completed).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
