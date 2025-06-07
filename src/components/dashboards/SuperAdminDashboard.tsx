
import React from 'react';
import { Building, Users, BookOpen, BarChart3, TrendingUp, Calendar } from 'lucide-react';
import StatsCard from '../ui/StatsCard';
import ChartCard from '../ui/ChartCard';

const SuperAdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Organizations',
      value: 42,
      change: { value: '+5.2%', trend: 'up' as const },
      icon: Building,
      gradient: 'earth-gradient'
    },
    {
      title: 'Total Users',
      value: '12,847',
      change: { value: '+12.3%', trend: 'up' as const },
      icon: Users,
      gradient: 'sage-gradient'
    },
    {
      title: 'Active Courses',
      value: 3284,
      change: { value: '+8.1%', trend: 'up' as const },
      icon: BookOpen,
      gradient: 'warm-gradient'
    },
    {
      title: 'Monthly Revenue',
      value: '$124,950',
      change: { value: '+15.7%', trend: 'up' as const },
      icon: TrendingUp,
      gradient: 'earth-gradient'
    }
  ];

  const orgGrowthData = [
    { name: 'Jan', value: 8 },
    { name: 'Feb', value: 12 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 22 },
    { name: 'May', value: 18 },
    { name: 'Jun', value: 25 }
  ];

  const userDistributionData = [
    { name: 'Students', value: 8247, color: 'hsl(110, 25%, 45%)' },
    { name: 'Teachers', value: 2150, color: 'hsl(25, 50%, 35%)' },
    { name: 'Admins', value: 450, color: 'hsl(15, 60%, 60%)' }
  ];

  const recentOrganizations = [
    { name: 'Cambridge Institute', users: 543, courses: 87, joinDate: '2024-01-15', status: 'Active' },
    { name: 'Harvard Academy', users: 721, courses: 134, joinDate: '2024-01-12', status: 'Active' },
    { name: 'Princeton School', users: 289, courses: 45, joinDate: '2024-01-10', status: 'Pending' },
    { name: 'Yale University', users: 892, courses: 203, joinDate: '2024-01-08', status: 'Active' },
  ];

  const topPerformingOrgs = [
    { name: 'Greenwood University', engagement: 95, students: 1250, growth: '+23%' },
    { name: 'Stanford Academy', engagement: 92, students: 890, growth: '+18%' },
    { name: 'Oxford Institute', engagement: 89, students: 756, growth: '+12%' },
    { name: 'MIT School', engagement: 87, students: 634, growth: '+8%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage all organizations and users</p>
        </div>
        <div className="flex items-center space-x-3 text-muted-foreground">
          <Calendar size={20} />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ChartCard
          title="Organization Growth"
          type="line"
          data={orgGrowthData}
        />
        <ChartCard
          title="User Distribution"
          type="pie"
          data={userDistributionData}
        />
      </div>

      {/* Charts and Tables Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Organizations */}
        <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recent Organizations</h3>
            <BarChart3 className="text-earth-brown" size={24} />
          </div>
          
          <div className="space-y-4">
            {recentOrganizations.map((org, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div>
                  <h4 className="font-semibold text-foreground">{org.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {org.users} users • {org.courses} courses
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    org.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {org.status}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{org.joinDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Organizations */}
        <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Top Performing Organizations</h3>
            <TrendingUp className="text-sage-green" size={24} />
          </div>
          
          <div className="space-y-4">
            {topPerformingOrgs.map((org, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{org.name}</h4>
                    <p className="text-sm text-muted-foreground">{org.students} students</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600">{org.growth}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Engagement</span>
                    <span className="font-medium">{org.engagement}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-earth-brown h-2 rounded-full transition-all duration-300"
                      style={{ width: `${org.engagement}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
        <h3 className="text-xl font-bold text-foreground mb-6">System Health</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h4 className="font-semibold text-foreground mb-1">Server Status</h4>
            <p className="text-sm text-green-600">All systems operational</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <h4 className="font-semibold text-foreground mb-1">Database</h4>
            <p className="text-sm text-blue-600">99.9% uptime</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
            <h4 className="font-semibold text-foreground mb-1">API Response</h4>
            <p className="text-sm text-orange-600">Average 120ms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
