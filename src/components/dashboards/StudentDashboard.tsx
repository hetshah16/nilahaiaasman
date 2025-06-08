import React, { useEffect, useState } from 'react';
import { BookOpen, Star, Clock, Award, TrendingUp, Target, MessageCircle } from 'lucide-react';
import StatsCard from '../ui/StatsCard';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [enrolledCount, setEnrolledCount] = useState<number>(0);

  useEffect(() => {
    const getUserId = () => user?.email?.trim().toLowerCase() || "";
    const fetchEnrolled = async () => {
      if (!getUserId()) return;
      try {
        const res = await fetch(`http://localhost:4000/api/enroll/${getUserId()}`);
        const data = await res.json();
        setEnrolledCount(Array.isArray(data.courses) ? data.courses.length : 0);
      } catch {
        setEnrolledCount(0);
      }
    };
    fetchEnrolled();
  }, [user]);
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const stats = [
    {
      title: 'Enrolled Courses',
      value: enrolledCount,
      change: { value: '', trend: 'up' as const },
      icon: BookOpen,
      gradient: 'earth-gradient'
    },
    {
      title: 'Completed Courses',
      value: 12,
      change: { value: '+3', trend: 'up' as const },
      icon: Award,
      gradient: 'sage-gradient'
    },
    {
      title: 'Study Hours',
      value: '47h',
      change: { value: '+12h', trend: 'up' as const },
      icon: Clock,
      gradient: 'warm-gradient'
    },
    {
      title: 'Avg. Score',
      value: '87%',
      change: { value: '+5%', trend: 'up' as const },
      icon: Target,
      gradient: 'earth-gradient'
    }
  ];

  const recommendedCourses = [
    {
      title: 'Advanced Machine Learning',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.9,
      duration: '6 weeks',
      level: 'Advanced',
      image: '🤖',
      matchScore: 95
    },
    {
      title: 'Data Science Fundamentals',
      instructor: 'Prof. Michael Chen',
      rating: 4.8,
      duration: '8 weeks',
      level: 'Intermediate',
      image: '📊',
      matchScore: 88
    },
    {
      title: 'Neural Networks Deep Dive',
      instructor: 'Dr. Emily Davis',
      rating: 4.7,
      duration: '4 weeks',
      level: 'Advanced',
      image: '🧠',
      matchScore: 82
    },
  ];

  const currentCourses = [
    {
      title: 'Introduction to AI',
      instructor: 'Prof. James Wilson',
      progress: 75,
      nextDeadline: 'Assignment due in 3 days',
      lastAccessed: '2 hours ago'
    },
    {
      title: 'Python Programming',
      instructor: 'Dr. Alice Brown',
      progress: 45,
      nextDeadline: 'Quiz available',
      lastAccessed: '1 day ago'
    },
    {
      title: 'Statistics for Data Science',
      instructor: 'Prof. Robert Lee',
      progress: 90,
      nextDeadline: 'Final exam in 1 week',
      lastAccessed: '3 hours ago'
    },
  ];

  const recentAchievements = [
    { title: 'Course Completed', description: 'Finished "Web Development Basics"', date: '2 days ago', icon: '🏆' },
    { title: 'Perfect Score', description: 'Scored 100% on JavaScript Quiz', date: '5 days ago', icon: '⭐' },
    { title: 'Consistency Award', description: '7-day learning streak', date: '1 week ago', icon: '🔥' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
          <p className="text-muted-foreground mt-1">Continue your learning journey</p>
        </div>
        <div className="flex items-center space-x-3 px-4 py-2 bg-warm-beige rounded-lg">
          <span className="text-sm font-medium text-earth-brown">Learning Streak:</span>
          <span className="text-lg font-bold text-earth-brown">12 days 🔥</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recommended Courses */}
        <div className="lg:col-span-2 bg-card rounded-xl p-6 nature-shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recommended for You</h3>
            <Star className="text-yellow-500" size={24} />
          </div>

          <div className="grid gap-6">
            {recommendedCourses.map((course, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="text-4xl">{course.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{course.title}</h4>
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      <span>{course.matchScore}% match</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">by {course.instructor}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>⭐ {course.rating}</span>
                    <span>📅 {course.duration}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      course.level === 'Advanced' ? 'bg-red-100 text-red-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-earth-brown text-white rounded-lg hover:bg-deep-brown transition-colors text-sm">
                  Enroll
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recent Achievements</h3>
            <Award className="text-terracotta" size={24} />
          </div>

          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                  <span className="text-xs text-muted-foreground">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Continue Learning</h3>
          <TrendingUp className="text-sage-green" size={24} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {currentCourses.map((course, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <h4 className="font-semibold text-foreground mb-2">{course.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-earth-brown h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>{course.nextDeadline}</p>
                  <p>Last accessed: {course.lastAccessed}</p>
                </div>

                <button className="w-full py-2 bg-earth-brown text-white rounded-lg hover:bg-deep-brown transition-colors text-sm">
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-earth-brown text-white p-4 rounded-full shadow-lg hover:bg-deep-brown transition-all z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot Iframe */}
      {showChatbot && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 1000,
            width: '370px',
            height: '500px',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#fff'
          }}
        >
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/cGx3i2eK0u-08QzZzpkB-"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="Chatbot"
          />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;