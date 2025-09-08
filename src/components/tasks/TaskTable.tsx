import React from 'react';
import { MoreHorizontal, Edit2, UserPlus, Trash2 } from 'lucide-react';
import { Task, DraftTask, TabType } from './types';

interface TaskTableProps {
  activeTab: TabType;
  tasks: Task[];
  loadingDraftTasks: boolean;
  loadingAssignedTasks: boolean;
  actionMenuOpen: number | null;
  onTaskClick: (task: Task) => Promise<void>;
  onActionMenuToggle: (taskId: number) => void;
  onEditTask: (task: DraftTask) => void;
  onAssignFromMenu: (task: DraftTask) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  activeTab,
  tasks,
  loadingDraftTasks,
  loadingAssignedTasks,
  actionMenuOpen,
  onTaskClick,
  onActionMenuToggle,
  onEditTask,
  onAssignFromMenu,
  onDeleteTask,
}) => {
  const isLoading = (loadingDraftTasks && activeTab === "draft") || (loadingAssignedTasks && activeTab === "assigned");

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Title
              </th>
              {activeTab === "assigned" && (
                <>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mandal
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Date
                  </th>
                </>
              )}
              {activeTab === "draft" && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
              )}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {(activeTab === "draft" || activeTab === "assigned") && (
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan={activeTab === "draft" ? 4 : 4} className="px-4 py-8 text-center">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600" style={{ fontFamily: "Poppins" }}>
                    Loading {activeTab === "draft" ? "draft" : "assigned"} tasks...
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-12">
          <p className="text-gray-500" style={{ fontFamily: "Poppins" }}>
            No {activeTab === "draft" ? "draft" : "assigned"} tasks found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
            >
              Task Title
            </th>
            {activeTab === "assigned" && (
              <>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                >
                  Assigned To
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                >
                  State
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                >
                  District
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                >
                  Mandal
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                >
                  Assigned Date
                </th>
              </>
            )}
            {activeTab === "draft" && (
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
              >
                Created Date
              </th>
            )}
            <th
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
            >
              Status
            </th>
            {(activeTab === "draft" || activeTab === "assigned") && (
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td
                onClick={() => onTaskClick(task)}
                className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 underline cursor-pointer"
                style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 500 }}
              >
                {task.title}
              </td>
              {activeTab === "assigned" && (
                <>
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                    style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                  >
                    {"assignedTo" in task ? task.assignedTo : "-"}
                  </td>
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                    style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                  >
                    {"state" in task ? task.state : "-"}
                  </td>
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                    style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                  >
                    {"district" in task ? task.district : "-"}
                  </td>
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                    style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                  >
                    {"mandal" in task ? task.mandal : "-"}
                  </td>
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                    style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                  >
                    {"assignedDate" in task ? task.assignedDate : "-"}
                  </td>
                </>
              )}
              {activeTab === "draft" && (
                <td
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                  style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                >
                  {"createdDate" in task ? task.createdDate : "-"}
                </td>
              )}
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === "Assigned" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                  style={{ fontFamily: "Poppins" }}
                >
                  {task.status}
                </span>
              </td>
              {(activeTab === "draft" || activeTab === "assigned") && (
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium relative">
                  <button
                    className="text-gray-400 hover:text-gray-600 text-lg p-1 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onActionMenuToggle(task.id);
                    }}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {actionMenuOpen === task.id && (
                    <div
                      className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[1000] py-1 min-w-[150px]"
                      style={{ position: "absolute" }}
                    >
                      {activeTab === "draft" && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditTask(task as DraftTask);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Edit2 size={14} />
                            Edit Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAssignFromMenu(task as DraftTask);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            disabled={!(task as DraftTask).selectedUsers?.length}
                          >
                            <UserPlus size={14} />
                            Assign Task
                          </button>
                        </>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTask(task.id);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
