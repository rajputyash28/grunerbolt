import React from 'react';
import { CheckCircle, Calendar } from 'lucide-react';

interface FarmOperator {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rejected';
  assignedTasks: string;
  joinedDate: string;
  profileImage: string;
  tasks?: Task[];
  attendanceStats?: AttendanceStats;
}

interface Task {
  id: number;
  title: string;
  location: string;
  assignedDate: string;
  dueDate: string;
  status: string;
  priority: string;
  description: string;
  notes: string;
}

interface AttendanceStats {
  present: number;
  absent: number;
  total: number;
}

interface StatsCardsProps {
  farmOperator: FarmOperator;
  activeTab: string;
  isPendingApproval?: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ farmOperator, activeTab, isPendingApproval = false }) => {
  if (!farmOperator.tasks && !isPendingApproval) return null;

  return (
    <div className="relative min-h-[128px]">
      <div className="flex gap-6 min-w-full">
        <div className="flex gap-6 flex-grow">
          <div className="bg-white border border-gray-200 rounded-xl p-4 w-72 h-44 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-1">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {isPendingApproval ? '0' : farmOperator.assignedTasks}
                </p>
                <p className="text-xs text-gray-500 leading-tight">Task completion status</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 w-72 h-44 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-1">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {isPendingApproval ? '0' : (
                    farmOperator.tasks
                      ? Math.round(
                          (farmOperator.tasks.filter((t) => t.status === 'Completed').length /
                            farmOperator.tasks.length) *
                            100
                        ) || 0
                      : 0
                  )}
                  %
                </p>
                <p className="text-xs text-gray-500 leading-tight">
                  {isPendingApproval ? '0' : (farmOperator.tasks?.filter((t) => t.status === 'Overdue').length || 0)} overdue tasks
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 w-72 h-44 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-1">Working Days</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {isPendingApproval ? '0' : (farmOperator.attendanceStats?.total || 0)}
                </p>
                <p className="text-xs text-gray-500 leading-tight">Total days since joining</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
