import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AttendanceStats {
  present: number;
  absent: number;
  total: number;
}

interface AttendanceChartProps {
  attendanceStats: AttendanceStats;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ attendanceStats }) => {
  return (
    <div className="absolute top-0 right-0 bg-white border border-gray-200 rounded-xl p-6 w-[520px] h-[300px] shadow-lg z-10 mr-17">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Attendance Record</h3>
        <button className="p-2 text-blue-600 hover:text-blue-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-start gap-6">
        <div className="relative w-36 h-36">
          <ResponsiveContainer width={144} height={144}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Present', value: attendanceStats.present, color: '#3B82F6' },
                  { name: 'Absent', value: attendanceStats.absent, color: '#8B5CF6' },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#8B5CF6" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{attendanceStats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Present</span>
            </div>
            <span className="text-base font-medium text-gray-900">
              {attendanceStats.present}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Absent</span>
            </div>
            <span className="text-base font-medium text-gray-900">
              {attendanceStats.absent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
