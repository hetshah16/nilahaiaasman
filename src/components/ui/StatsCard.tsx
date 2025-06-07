
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: LucideIcon;
  gradient?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon, gradient = 'earth-gradient' }) => {
  return (
    <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                change.trend === 'up' ? 'text-green-600' : 
                change.trend === 'down' ? 'text-red-600' : 
                'text-muted-foreground'
              }`}>
                {change.value}
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
