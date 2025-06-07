
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  Upload, 
  CheckCircle, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Building,
  GraduationCap,
  FileText,
  Heart,
  Star,
  User
} from 'lucide-react';
import { useAuth, UserRole } from '../../contexts/AuthContext';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  { icon: Home, label: 'Dashboard', path: '/dashboard', roles: ['super-admin', 'admin', 'teacher', 'student'] },
  { icon: Building, label: 'Organizations', path: '/organizations', roles: ['super-admin'] },
  { icon: BarChart3, label: 'Analytics', path: '/analytics', roles: ['super-admin', 'admin'] },
  { icon: FileText, label: 'Assessments', path: '/assessments', roles: ['admin'] },
  { icon: CheckCircle, label: 'Verification', path: '/verification', roles: ['admin'] },
  { icon: Users, label: 'Teachers', path: '/teachers', roles: ['admin'] },
  { icon: GraduationCap, label: 'Students', path: '/students', roles: ['admin'] },
  { icon: Upload, label: 'Upload Content', path: '/upload', roles: ['teacher'] },
  { icon: BookOpen, label: 'My Content', path: '/my-content', roles: ['teacher'] },
  { icon: Star, label: 'Recommendations', path: '/recommendations', roles: ['student'] },
  { icon: BookOpen, label: 'Courses', path: '/courses', roles: ['student'] },
  { icon: Heart, label: 'Feedback', path: '/feedback', roles: ['student'] },
  { icon: User, label: 'Profile', path: '/profile', roles: ['super-admin', 'admin', 'teacher', 'student'] },
  { icon: Settings, label: 'Settings', path: '/settings', roles: ['super-admin', 'admin', 'teacher', 'student'] },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 h-full ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-earth-brown rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-bold text-lg text-earth-brown">Vruksha</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <div className="p-4">
        {!isCollapsed && user && (
          <div className="mb-6 p-3 bg-warm-beige rounded-lg">
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role.replace('-', ' ')}</p>
            {user.organizationName && (
              <p className="text-xs text-sage-green mt-1">{user.organizationName}</p>
            )}
          </div>
        )}

        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-earth-brown text-white nature-shadow transform scale-105' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground hover:transform hover:scale-102'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : ''} />
                {!isCollapsed && (
                  <>
                    <span className="font-medium transition-colors">{item.label}</span>
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
