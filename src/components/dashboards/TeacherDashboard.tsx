import React, { useEffect } from 'react';
import { BookOpen, Upload, CheckCircle, Clock, Users, BarChart3 } from 'lucide-react';
import StatsCard from '../ui/StatsCard';

declare global {
  interface Window {
    chatbase?: any;
  }
}

const TeacherDashboard: React.FC = () => {
  // Chatbase chatbot integration
  useEffect(() => {
    if (!window.chatbase || (window.chatbase as any)("getState") !== "initialized") {
      (window as any).chatbase = (...args: any[]) => {
        if (!(window as any).chatbase.q) {
          (window as any).chatbase.q = [];
        }
        (window as any).chatbase.q.push(args);
      };
      (window as any).chatbase = new Proxy((window as any).chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args: any[]) => target(prop, ...args);
        }
      });
    }
    const onLoad = function () {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "iq1Rrnr4JzWLGBWjJ7VrV";
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  const stats = [
    {
      title: 'Published Courses',
      value: 12,
      change: { value: '+2', trend: 'up' as const },
      icon: BookOpen,
      gradient: 'earth-gradient'
    },
    {
      title: 'Total Students',
      value: 324,
      change: { value: '+28', trend: 'up' as const },
      icon: Users,
      gradient: 'sage-gradient'
    },
    {
      title: 'Pending Reviews',
      value: 3,
      change: { value: '-1', trend: 'down' as const },
      icon: Clock,
      gradient: 'warm-gradient'
    },
    {
      title: 'Avg. Rating',
      value: '4.8',
      change: { value: '+0.2', trend: 'up' as const },
      icon: BarChart3,
      gradient: 'earth-gradient'
    }
  ];

  const recentUploads = [
    { 
      title: 'Advanced Data Structures', 
      type: 'Video Course', 
      status: 'Approved', 
      uploadDate: '2024-01-15',
      students: 45
    },
    { 
      title: 'Algorithm Design Patterns', 
      type: 'Text + Code', 
      status: 'Under Review', 
      uploadDate: '2024-01-14',
      students: 0
    },
    { 
      title: 'Computer Networks Fundamentals', 
      type: 'Audio Lecture', 
      status: 'Approved', 
      uploadDate: '2024-01-12',
      students: 67
    },
    { 
      title: 'Database Management Systems', 
      type: 'Interactive Content', 
      status: 'Needs Revision', 
      uploadDate: '2024-01-10',
      students: 0
    },
  ];

  const studentFeedback = [
    { 
      course: 'Advanced Data Structures', 
      student: 'Alice Johnson', 
      rating: 5, 
      comment: 'Excellent explanation of complex topics!',
      date: '2 hours ago'
    },
    { 
      course: 'Computer Networks', 
      student: 'Bob Smith', 
      rating: 4, 
      comment: 'Very helpful content, easy to follow.',
      date: '5 hours ago'
    },
    { 
      course: 'Advanced Data Structures', 
      student: 'Carol Wilson', 
      rating: 5, 
      comment: 'Best course I\'ve taken on this topic.',
      date: '1 day ago'
    },
  ];

  const quickActions = [
    { icon: Upload, label: 'Upload New Content', color: 'bg-earth-brown', action: '/upload' },
    { icon: BookOpen, label: 'View My Courses', color: 'bg-sage-green', action: '/my-content' },
    { icon: BarChart3, label: 'Analytics', color: 'bg-terracotta', action: '/analytics' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your courses and track student progress</p>
        </div>
        <div className="flex space-x-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`flex items-center space-x-2 px-4 py-2 ${action.color} text-white rounded-lg hover:opacity-90 transition-opacity nature-shadow`}
            >
              <action.icon size={18} />
              <span className="hidden sm:inline">{action.label}</span>
            </button>
          ))}
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
        {/* Recent Uploads */}
        <div className="lg:col-span-2 bg-card rounded-xl p-6 nature-shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recent Uploads</h3>
            <Upload className="text-earth-brown" size={24} />
          </div>
          
          <div className="space-y-4">
            {recentUploads.map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{upload.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{upload.type}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Uploaded: {upload.uploadDate}</span>
                    <span>{upload.students} students enrolled</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    upload.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    upload.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {upload.status}
                  </div>
                  <div className="mt-2">
                    <button className="text-xs text-earth-brown hover:text-deep-brown">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Feedback */}
        <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recent Feedback</h3>
            <CheckCircle className="text-sage-green" size={24} />
          </div>
          
          <div className="space-y-4">
            {studentFeedback.map((feedback, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{feedback.course}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">"{feedback.comment}"</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{feedback.student}</span>
                  <span>{feedback.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
        <h3 className="text-xl font-bold text-foreground mb-6">Course Performance Analytics</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-earth-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-earth-brown">85%</div>
            </div>
            <h4 className="font-semibold text-foreground mb-1">Completion Rate</h4>
            <p className="text-sm text-muted-foreground">Average across all courses</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-sage-green">4.7</div>
            </div>
            <h4 className="font-semibold text-foreground mb-1">Avg. Rating</h4>
            <p className="text-sm text-muted-foreground">Student satisfaction score</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-terracotta">312</div>
            </div>
            <h4 className="font-semibold text-foreground mb-1">Total Enrollments</h4>
            <p className="text-sm text-muted-foreground">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
