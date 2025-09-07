import React from 'react';
import { FarmOperatorProfile } from '../types/farmOperatorTypes';

interface AssignedTasksTabProps {
  farmOperator: FarmOperatorProfile;
}

const AssignedTasksTab: React.FC<AssignedTasksTabProps> = ({ farmOperator }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>Task Assignment History</h3>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Inter' }}>Complete list of all tasks assigned to this Farm Operator</p>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Task Title</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Location</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Assigned Date</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Due Date</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {farmOperator.assignedTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-100">
                <td className="py-3 text-sm font-medium text-gray-900 underline cursor-pointer hover:text-blue-600" style={{ fontFamily: 'Inter' }}>
                  {task.title}
                </td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.location}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.assignedDate}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.dueDate}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedTasksTab;