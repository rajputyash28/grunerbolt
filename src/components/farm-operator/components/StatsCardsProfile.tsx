import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { FarmOperatorProfile } from '../types/farmOperatorTypes';

interface StatsCardsProfileProps {
  farmOperator: FarmOperatorProfile;
  activeTab: string;
}

const StatsCardsProfile: React.FC<StatsCardsProfileProps> = ({ farmOperator, activeTab }) => {
  return (
    <div className={`grid grid-cols-1 gap-6 ${activeTab === 'attendance' ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.totalTasks}</p>
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>
              {farmOperator.completedTasks} completed, {farmOperator.pendingTasks} pending
            </p>
          </div>
          <div className="w-6 h-6 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Completion Rate</p>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.completionRate}%</p>
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>{farmOperator.overdueTasks} overdue tasks</p>
          </div>
          <div className="w-6 h-6 text-gray-400">
            <CheckCircle size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Working Days</p>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.workingDays}</p>
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>Total days since joining</p>
          </div>
          <div className="w-6 h-6 text-gray-400">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      {/* Attendance Record Card - Only show on attendance tab */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Attendance Record</p>
            </div>
            <div className="w-6 h-6 text-blue-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Present arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(farmOperator.attendanceStats.present / farmOperator.attendanceStats.total) * 219.8} 219.8`}
                  strokeLinecap="round"
                />
                {/* Absent arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="#8B5CF6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(farmOperator.attendanceStats.absent / farmOperator.attendanceStats.total) * 219.8} 219.8`}
                  strokeDashoffset={`-${(farmOperator.attendanceStats.present / farmOperator.attendanceStats.total) * 219.8}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                    {farmOperator.attendanceStats.present}
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter' }}>Total</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600" style={{ fontFamily: 'Inter' }}>Present</span>
              <span className="text-xs font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.attendanceStats.present}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-600" style={{ fontFamily: 'Inter' }}>Absent</span>
              <span className="text-xs font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.attendanceStats.absent}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCardsProfile;