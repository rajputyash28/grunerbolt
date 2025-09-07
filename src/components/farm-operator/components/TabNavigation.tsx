import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  assignedTasksCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange, assignedTasksCount }) => {
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onTabChange('overview')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'overview'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
      >
        Overview
      </button>
      <button
        onClick={() => onTabChange('tasks')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'tasks'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
      >
        Assigned Tasks ({assignedTasksCount})
      </button>
      <button
        onClick={() => onTabChange('attendance')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'attendance'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
      >
        Attendance Records
      </button>
    </div>
  );
};

export default TabNavigation;