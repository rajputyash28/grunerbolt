import React from 'react';
import { AttendanceTab } from './types';

interface AttendanceTabsProps {
  activeTab: AttendanceTab;
  onTabChange: (tab: AttendanceTab) => void;
}

const AttendanceTabs: React.FC<AttendanceTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'all' as AttendanceTab, label: 'All Records' },
    { key: 'present' as AttendanceTab, label: 'Present' },
    { key: 'absent' as AttendanceTab, label: 'Absent' }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.key 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Poppins', fontSize: '13.02px' }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AttendanceTabs;
