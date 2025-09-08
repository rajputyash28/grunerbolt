import React from 'react';
import { TabType } from './types';

interface TaskTabsProps {
  activeTab: TabType;
  showCreateForm: boolean;
  editingTask: any;
  onTabChange: (tab: TabType) => void;
  onCreateTask: () => void;
}

const TaskTabs: React.FC<TaskTabsProps> = ({
  activeTab,
  showCreateForm,
  editingTask,
  onTabChange,
  onCreateTask
}) => {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
      <button
        onClick={() => onTabChange("draft")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeTab === "draft" 
            ? "bg-white text-gray-900 shadow-sm" 
            : "text-gray-600 hover:text-gray-900"
        }`}
        style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
      >
        Draft Tasks
      </button>
      <button
        onClick={() => onTabChange("assigned")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeTab === "assigned" 
            ? "bg-white text-gray-900 shadow-sm" 
            : "text-gray-600 hover:text-gray-900"
        }`}
        style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
      >
        Assigned Tasks
      </button>
      <button
        onClick={onCreateTask}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          showCreateForm 
            ? "bg-white text-gray-900 shadow-sm" 
            : "text-gray-600 hover:text-gray-900"
        }`}
        style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
      >
        {editingTask ? "Edit Task" : "Create Task"}
      </button>
    </div>
  );
};

export default TaskTabs;
