import React, { ChangeEvent, useState, useEffect } from 'react';

interface EditTaskFormProps {
  taskDetails: any;
  loadingEditData: boolean;
  onSaveToDraft: (formData: any) => Promise<void>;
  onAssignTask: (formData: any) => Promise<void>;
  loadingOperations: boolean;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  taskDetails,
  loadingEditData,
  onSaveToDraft,
  onAssignTask,
  loadingOperations,
}) => {
  // Simple form state - only for editable fields
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Initialize form when taskDetails change
  useEffect(() => {
    if (taskDetails) {
      console.log('EditTaskForm: taskDetails received:', taskDetails);
      console.log('EditTaskForm: Location data:', {
        stateName: taskDetails.stateName,
        districtName: taskDetails.districtName,
        mandalName: taskDetails.mandalName
      });
      console.log('EditTaskForm: Full taskDetails object:', JSON.stringify(taskDetails, null, 2));
      setTaskTitle(taskDetails.title || "");
      setTaskDescription(taskDetails.description || "");
      // Fix date formatting
      if (taskDetails.dueDate) {
        const date = new Date(taskDetails.dueDate);
        const formattedDate = date.toISOString().split('T')[0];
        setDueDate(formattedDate);
        console.log('EditTaskForm: Date formatted:', taskDetails.dueDate, '->', formattedDate);
      } else {
        setDueDate("");
      }
    }
  }, [taskDetails]);

  const handleSaveToDraft = () => {
    const formData = {
      taskTitle,
      taskDescription,
      dueDate,
    };
    onSaveToDraft(formData);
  };

  const handleAssignTask = () => {
    const formData = {
      taskTitle,
      taskDescription,
      dueDate,
    };
    onAssignTask(formData);
  };

  if (loadingEditData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading task details...</div>
        </div>
      </div>
    );
  }

  if (!taskDetails) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Failed to load task details</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: "Poppins" }}>
        Edit Task
      </h2>

      <div className="space-y-6">
        {/* User Type - Read Only - Display directly from taskDetails */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
            User Type
          </label>
          <div className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm flex items-center">
            <span style={{ fontFamily: "Poppins", fontSize: "13px" }}>
              {taskDetails.assigneeUserType === "fm" ? "All Farm Manager" :
               taskDetails.assigneeUserType === "kd" ? "All Kisani Didi" :
               taskDetails.assigneeUserType === "operator" ? "All Operator" :
               taskDetails.assigneeUserType === "ifm" ? "Individual Farm Manager" :
               taskDetails.assigneeUserType === "ikd" ? "Individual Kisani Didi" :
               taskDetails.assigneeUserType === "ioperator" ? "Individual Operator" :
               taskDetails.assigneeUserType || "N/A"}
            </span>
          </div>
        </div>

        {/* Location Fields - Read Only - Display directly from taskDetails */}
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
              State
            </label>
            <div className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm flex items-center">
              <span style={{ fontFamily: "Poppins", fontSize: "13px" }}>
                {taskDetails.stateName || "N/A"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
              District
            </label>
            <div className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm flex items-center">
              <span style={{ fontFamily: "Poppins", fontSize: "13px" }}>
                {taskDetails.districtName || "N/A"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
              Mandal
            </label>
            <div className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm flex items-center">
              <span style={{ fontFamily: "Poppins", fontSize: "13px" }}>
                {taskDetails.mandalName || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Assignee - Read Only - Display directly from taskDetails */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
            Assignee
          </label>
          <div className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm flex items-center">
            <span style={{ fontFamily: "Poppins", fontSize: "13px" }}>
              {taskDetails.assigneeName || "N/A"}
            </span>
          </div>
        </div>

        {/* Task Title - Editable */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
            Task Title
          </label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
            placeholder="Enter task title"
          />
        </div>

        {/* Task Description - Editable */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
            Task Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTaskDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
            placeholder="Enter task description"
          />
        </div>

        {/* Due Date - Editable */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
            className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSaveToDraft}
            disabled={loadingOperations || !taskTitle}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          >
            {loadingOperations ? "Saving..." : "Save to Draft"}
          </button>
          <button
            onClick={handleAssignTask}
            disabled={loadingOperations || !taskTitle}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          >
            {loadingOperations ? "Assigning..." : "Assign Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskForm;