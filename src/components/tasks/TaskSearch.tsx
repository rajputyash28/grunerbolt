import React, { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { TabType } from './types';

interface TaskSearchProps {
  activeTab: TabType;
  showCreateForm: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({
  activeTab,
  showCreateForm,
  searchTerm,
  onSearchChange
}) => {
  if (showCreateForm || (activeTab !== "draft" && activeTab !== "assigned")) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder={`Search ${activeTab === "draft" ? "Draft" : "Assigned"} Tasks`}
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ fontFamily: "Poppins", fontSize: "14px" }}
        />
      </div>
    </div>
  );
};

export default TaskSearch;
