import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, pendingCount }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2 w-[275px] h-[46px] border border-gray-200">
      <button
        onClick={() => setActiveTab('all')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-[80px] h-[38px] ${
          activeTab === 'all'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}
      >
        All FMs
      </button>

      <button
        onClick={() => setActiveTab('pending')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-[170px] h-[38px] ${
          activeTab === 'pending'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}
      >
        Pending Approvals ({pendingCount})
      </button>
    </div>
  );
};

export default TabNavigation;
