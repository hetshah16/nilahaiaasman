
import React from 'react';
import { Users, BookOpen, CheckCircle, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import StatsCard from '../ui/StatsCard';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Teachers',
      value: 45,
      change: { value: '+3', trend: 'up' as const },
      icon: Users,
      gradient: 'earth-gradient'
    },
    {
      title: 'Total Students',
      value: 1247,
      change: { value: '+87', trend: 'up' as const },
      icon: Users,
      gradient: 'sage-gradient'
    },
    {
      title: 'Active Courses',
      value: 134,
      change: { value: '+12', trend: 'up' as const },
      icon: BookOpen,
      gradient: 'warm-gradient'
    },
    {
      title: 'Pending Reviews',
      value: 23,
      change: { value: '-5', trend: 'down' as const },
      icon: AlertTriangle,
      gradient: 'earth-gradient'
    }
  ];

  const pendingContent = [
    { 
      title: 'Advanced Mathematics Course', 
      teacher: 'Dr. Sarah Johnson', 
      type: 'Video', 
      submitted: '2 hours ago',
      priority: 'High'
    },
    { 
      title: 'Physics Lab Experiment', 
      teacher: 'Prof. Michael Chen', 
      type: 'Text + Images', 
      submitted: '5 hours ago',
      priority: 'Medium'
    },
    { 
      title: 'Chemistry Audio Lecture', 
      teacher: 'Dr. Emily Davis', 
      type: 'Audio', 
      submitted: '1 day ago',
      priority: 'Low'
    },
    { 
      title: 'Biology Interactive Quiz', 
      teacher: 'Prof. James Wilson', 
      type: 'Assessment', 
      submitted: '2 days ago',
      priority: 'High'
    },
  ];

  const recentActivities = [
    { action: 'Approved', item: 'Data Structures Course', teacher: 'Dr. Smith', time: '30 min ago' },
    { action: 'Rejected', item: 'AI Fundamentals', teacher: 'Prof. Brown', time: '1 hour ago' },
    { action: 'Approved', item: 'Web Development Lab', teacher: 'Ms. Garcia', time: '2 hours ago' },
    { action: 'Under Review', item: 'Machine Learning Basics', teacher: 'Dr. Kumar', time: '3 hours ago' },
  ];

  const topTeachers = [
    { name: 'Dr. Sarah Johnson', courses: 12, rating: 4.9, students: 234 },
    { name: 'Prof. Michael Chen', courses: 8, rating: 4.8, students: 189 },
    { name: 'Dr. Emily Davis', courses: 15, rating: 4.7, students: 278 },
    { name: 'Prof. James Wilson', courses: 6, rating: 4.6, students: 156 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your organization's educational content</p>
        </div>
        <div className="flex items-center space-x-3 text-muted-foreground">
          <Calendar size={20} />
          <span>Greenwood University</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Pending Content Reviews */}
        <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Pending Content Reviews</h3>
            <AlertTriangle className="text-orange-500" size={24} />
          </div>
          
          <div className="space-y-4">
            {pendingContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{content.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">by {content.teacher}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs bg-warm-beige text-earth-brown px-2 py-1 rounded-full">
                      {content.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{content.submitted}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    content.priority === 'High' ? 'bg-red-100 text-red-800' :
                    content.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {content.priority}
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button className="px-3 py-1 bg-earth-brown text-white rounded text-xs hover:bg-deep-brown transition-colors">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recent Activities</h3>
            <CheckCircle className="text-green-500" size={24} />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-3 h-3 rounded-full ${
                  activity.action === 'Approved' ? 'bg-green-500' :
                  activity.action === 'Rejected' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className={`font-medium ${
                      activity.action === 'Approved' ? 'text-green-600' :
                      activity.action === 'Rejected' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {activity.action}
                    </span>
                    {' '}{activity.item}
                  </p>
                  <p className="text-xs text-muted-foreground">by {activity.teacher} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Teachers */}
      <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Top Performing Teachers</h3>
          <TrendingUp className="text-sage-green" size={24} />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topTeachers.map((teacher, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="w-16 h-16 bg-earth-brown rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">{teacher.name}</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{teacher.courses} courses</p>
                <p>⭐ {teacher.rating} rating</p>
                <p>{teacher.students} students</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
