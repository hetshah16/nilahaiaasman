
import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface ChartCardProps {
  title: string;
  type: 'bar' | 'pie' | 'line';
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, type, data, height = 200 }) => {
  const getIcon = () => {
    switch (type) {
      case 'bar': return <BarChart3 size={20} />;
      case 'pie': return <PieChart size={20} />;
      case 'line': return <TrendingUp size={20} />;
    }
  };

  const renderBarChart = () => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
      <div className="flex items-end justify-between h-full space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-earth-brown rounded-t opacity-80 hover:opacity-100 transition-opacity"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || 'hsl(var(--earth-brown))',
              }}
            />
            <span className="text-xs text-muted-foreground mt-2 truncate">{item.name}</span>
            <span className="text-xs font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-muted" />
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            return (
              <div
                key={index}
                className="absolute inset-0 rounded-full border-8"
                style={{
                  borderColor: item.color || `hsl(${25 + index * 60}, 50%, 35%)`,
                  transform: `rotate(${index * (360 / data.length)}deg)`,
                }}
              />
            );
          })}
        </div>
        <div className="ml-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || `hsl(${25 + index * 60}, 50%, 35%)` }}
              />
              <span className="text-sm">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLineChart = () => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
      <div className="relative h-full">
        <svg className="w-full h-full">
          <polyline
            fill="none"
            stroke="hsl(var(--earth-brown))"
            strokeWidth="2"
            points={data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - (item.value / maxValue) * 80;
              return `${x},${y}`;
            }).join(' ')}
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / maxValue) * 80;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="3"
                fill="hsl(var(--earth-brown))"
              />
            );
          })}
        </svg>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar': return renderBarChart();
      case 'pie': return renderPieChart();
      case 'line': return renderLineChart();
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 nature-shadow-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {getIcon()}
      </div>
      <div style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartCard;
