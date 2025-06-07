
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SuperAdminDashboard from '../components/dashboards/SuperAdminDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import TeacherDashboard from '../components/dashboards/TeacherDashboard';
import StudentDashboard from '../components/dashboards/StudentDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'super-admin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="animate-fade-in">
      {getDashboardComponent()}
    </div>
  );
};

export default Dashboard;
