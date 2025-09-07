import React from 'react';
import { X } from 'lucide-react';

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

interface TaskFilters {
  status: string;
}

interface TaskAssignmentProps {
  tasks: Task[];
  isPendingApproval: boolean;
  showTaskFilter: boolean;
  setShowTaskFilter: (show: boolean) => void;
  taskFilters: TaskFilters;
  appliedTaskFilters: TaskFilters;
  handleTaskFilterChange: (field: keyof TaskFilters, value: string) => void;
  resetTaskFilters: () => void;
  applyTaskFilters: () => void;
  openTaskModal: (task: Task) => void;
}

const TaskAssignment: React.FC<TaskAssignmentProps> = ({
  tasks,
  isPendingApproval,
  showTaskFilter,
  setShowTaskFilter,
  taskFilters,
  appliedTaskFilters,
  handleTaskFilterChange,
  resetTaskFilters,
  applyTaskFilters,
  openTaskModal
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (appliedTaskFilters.status && task.status !== appliedTaskFilters.status) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
          Task Assignment History
        </h3>
        {!isPendingApproval && (
          <div className="relative">
            <button
              onClick={() => setShowTaskFilter(!showTaskFilter)}
              className={`p-2 text-gray-400 hover:text-gray-600 ${
                Object.values(appliedTaskFilters).some(value => value !== '') ? 'relative' : ''
              }`}
            >
              <img
                src="/filter.svg"
                alt="Filter"
                className={Object.values(appliedTaskFilters).some(value => value !== '') ? 'relative' : ''}
              />
              {Object.values(appliedTaskFilters).some(value => value !== '') && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showTaskFilter && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Filter by</h3>
                    <button
                      onClick={() => setShowTaskFilter(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={19} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taskStatus"
                            value=""
                            checked={taskFilters.status === ''}
                            onChange={(e) => handleTaskFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">All</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taskStatus"
                            value="Completed"
                            checked={taskFilters.status === 'Completed'}
                            onChange={(e) => handleTaskFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">Completed</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taskStatus"
                            value="In Progress"
                            checked={taskFilters.status === 'In Progress'}
                            onChange={(e) => handleTaskFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">In Progress</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taskStatus"
                            value="Overdue"
                            checked={taskFilters.status === 'Overdue'}
                            onChange={(e) => handleTaskFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">Overdue</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      onClick={resetTaskFilters}
                      className="flex-1 px-3 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={applyTaskFilters}
                      className="flex-1 px-3 py-2 bg-gray-200 font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-300"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isPendingApproval ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter' }}>
            Manager is not approved yet
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Inter' }}>
            Complete list of all tasks assigned to this Farm Manager
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Title
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Location
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Assigned Date
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Due Date
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-100">
                    <td
                      className="py-3 text-sm font-medium text-blue-600 cursor-pointer hover:underline"
                      style={{ fontFamily: 'Inter' }}
                      onClick={() => openTaskModal(task)}
                    >
                      {task.title}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {task.location}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {task.assignedDate}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {task.dueDate}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          task.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : task.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskAssignment;
