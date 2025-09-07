import React from 'react';
import { Users, Calendar } from 'lucide-react';
import { AttendanceSummary as Summary } from './types';

interface AttendanceSummaryProps {
  summary: Summary;
  className?: string;
}

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ 
  summary, 
  className = "" 
}) => {
  const summaryCards = [
    {
      title: 'Today Present',
      value: '142',
      icon: Users,
      color: 'bg-gray-100',
      iconColor: 'text-gray-400'
    },
    {
      title: 'Today Absent',
      value: '14',
      icon: Users,
      color: 'bg-gray-100',
      iconColor: 'text-gray-400'
    },
    {
      title: 'Avg Work Hours',
      value: '7.5h',
      icon: Calendar,
      color: 'bg-gray-100',
      iconColor: 'text-gray-400'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'Inter' }}>
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                  {card.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceSummary;
