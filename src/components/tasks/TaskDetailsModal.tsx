import React from 'react';
import { X } from 'lucide-react';
import { Task } from './types';

interface TaskDetailsModalProps {
  selectedTask: Task | null;
  taskDetails: any;
  loadingTaskDetails: boolean;
  onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  selectedTask,
  taskDetails,
  loadingTaskDetails,
  onClose
}) => {
  if (!selectedTask) return null;

  const formatLocation = (str: string): string => {
    if (!str) return '';
    return str.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getUserTypeDisplayName = (userType: string): string => {
    const displayNames: { [key: string]: string } = {
      "farm-manager": "Farm Manager",
      "individual-farm-manager": "Individual Farm Manager",
      "kisani-didi": "Kisani Didi",
      "individual-kisani-didi": "Individual Kisani Didi",
      "operator": "Operator",
      "individual-operator": "Individual Operator",
    };
    return displayNames[userType] || userType;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 border border-gray-200 relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold text-center mb-4" style={{ fontFamily: "Poppins" }}>
          Task Detail
        </h2>
        {loadingTaskDetails ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedTask.status === "Draft" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  Select User Type
                </label>
                <input
                  readOnly
                  value={getUserTypeDisplayName((selectedTask as any).userType || "")}
                  className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  Assigned To
                </label>
                <input
                  readOnly
                  value={(selectedTask as any).assignedTo}
                  className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
            )}
            <div className="flex gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  State
                </label>
                <input
                  readOnly
                  value={formatLocation(selectedTask.state || "")}
                  className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  District
                </label>
                <input
                  readOnly
                  value={formatLocation(selectedTask.district || "")}
                  className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  Mandal
                </label>
                <input
                  readOnly
                  value={formatLocation(selectedTask.mandal || "")}
                  className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                Task Title
              </label>
              <input
                readOnly
                value={selectedTask.title}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                Description
              </label>
              <textarea
                readOnly
                rows={3}
                value={"taskDescription" in selectedTask ? (selectedTask as any).taskDescription || "" : selectedTask.title}
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                Due Date
              </label>
              <input
                readOnly
                value={"dueDate" in selectedTask ? (selectedTask as any).dueDate || "" : ""}
                className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>
            {selectedTask.status === "Assigned" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  Assigned Date
                </label>
                <input
                  readOnly
                  value={(selectedTask as any).assignedDate || ""}
                  className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
            )}
            
            {/* Enhanced details from API */}
            {taskDetails && (
              <>
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-md font-semibold mb-3" style={{ fontFamily: "Poppins" }}>
                    Additional Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Task ID:</span>
                      <span className="ml-2">{taskDetails.id}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Created:</span>
                      <span className="ml-2">{taskDetails.createdAt ? new Date(taskDetails.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Updated:</span>
                      <span className="ml-2">{taskDetails.updatedAt ? new Date(taskDetails.updatedAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    {taskDetails.assigneeId && (
                      <div>
                        <span className="font-medium text-gray-600">Assignee ID:</span>
                        <span className="ml-2">{taskDetails.assigneeId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModal;
