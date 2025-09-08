import React from 'react';

interface TaskManagementHeaderProps {
  title?: string;
}

const TaskManagementHeader: React.FC<TaskManagementHeaderProps> = ({ 
  title = "Task Management" 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TaskManagementHeader;
