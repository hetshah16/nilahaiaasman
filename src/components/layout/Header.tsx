
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-card border-b border-border px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-brown transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-border">
            <div className="w-8 h-8 bg-earth-brown rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role.replace('-', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
