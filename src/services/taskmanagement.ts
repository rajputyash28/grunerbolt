// import axios from "axios";

// // Defines the expected structure for a single task object.
// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: "DRAFT" | "ASSIGNED";
//   assigneeUserType: string;
//   assigneeId: string;
//   assigneeName?: string;
//   stateId: string;
//   districtId: string;
//   mandalId: string;
//   dueDate: string | null;
//   assignedAt: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// // Defines the structure for an assignee object
// export interface Assignee {
//   id: string;
//   name: string;
//   memberId: string;
//   role: "FARM_MANAGER" | "KISANI_DIDI" | "OPERATOR";
//   stateId: string;
//   districtId: string;
//   mandalId: string;
// }

// // Defines the structure for creating a task
// export interface CreateTaskRequest {
//   title: string;
//   description: string;
//   status: "DRAFT" | "ASSIGNED";
//   userType: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator";
//   assigneeIds: string[];
//   stateId: string;
//   districtId: string;
//   mandalId: string;
//   dueDate?: string; // ISO 8601 format
// }

// // Defines the structure for updating a task
// export interface UpdateTaskRequest {
//   title?: string;
//   description?: string;
//   status?: "DRAFT" | "ASSIGNED";
//   stateId?: string;
//   districtId?: string;
//   mandalId?: string;
//   dueDate?: string; // ISO 8601 format
// }

// // Creates a pre-configured Axios instance for the task management API.
// const taskApi = axios.create({
//   baseURL: "http://172.50.5.102:3000/api/v1/tm",
//   headers: { "Content-Type": "application/json" },
// });

// export const taskService = {
//   /**
//    * Fetches a list of draft tasks from the API.
//    * @param token - The authentication token.
//    * @returns An object with success status and either the data or an error message.
//    */
//   fetchDraftTasks: async (token: string) => {
//     try {
//       const response = await taskApi.get<Task[]>("/tasks/drafts", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true, data: response.data };
//     } catch (error: any) {
//       console.error("Error fetching draft tasks:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to fetch draft tasks. Please try again.",
//       };
//     }
//   },

//   /**
//    * Fetches a list of assigned tasks from the API.
//    * @param token - The authentication token.
//    * @returns An object with success status and either the data or an error message.
//    */
//   fetchAssignedTasks: async (token: string) => {
//     try {
//       const response = await taskApi.get<Task[]>("/tasks/assigned", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true, data: response.data };
//     } catch (error: any) {
//       console.error("Error fetching assigned tasks:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to fetch assigned tasks. Please try again.",
//       };
//     }
//   },

//   /**
//    * Creates one or more tasks.
//    * @param taskData - The task creation data.
//    * @param token - The authentication token.
//    * @returns An object with success status and either the created tasks or an error message.
//    */
//   createTask: async (taskData: CreateTaskRequest, token: string) => {
//     try {
//       const response = await taskApi.post<Task[]>("/tasks", taskData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true, data: response.data };
//     } catch (error: any) {
//       console.error("Error creating task:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to create task. Please try again.",
//       };
//     }
//   },

//   /**
//    * Fetches details of a specific task.
//    * @param taskId - The ID of the task to fetch.
//    * @param token - The authentication token.
//    * @returns An object with success status and either the task details or an error message.
//    */
//   getTaskDetails: async (taskId: string, token: string) => {
//     try {
//       const response = await taskApi.get<Task>(`/tasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true, data: response.data };
//     } catch (error: any) {
//       console.error("Error fetching task details:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to fetch task details. Please try again.",
//       };
//     }
//   },

//   /**
//    * Assigns a draft task to its designated assignee.
//    * @param taskId - The ID of the task to assign.
//    * @param token - The authentication token.
//    * @returns An object with success status and either the updated task or an error message.
//    */
//   assignTask: async (taskId: string, token: string) => {
//     try {
//       const response = await taskApi.post<Task>(`/tasks/${taskId}/assign`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true, data: response.data };
//     } catch (error: any) {
//       console.error("Error assigning task:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to assign task. Please try again.",
//       };
//     }
//   },

//   /**
//    * Updates a task's details.
//    * @param taskId - The ID of the task to update.
//    * @param taskData - The updated task data.
//    * @param token - The authentication token.
//    * @returns An object with success status and either the updated task or an error message.
//    */
//   updateTask: async (taskId: string, taskData: UpdateTaskRequest, token: string) => {
//     try {
//       const response = await taskApi.put<Task>(`/tasks/${taskId}`, taskData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true, data: response.data };
//     } catch (error: any) {
//       console.error("Error updating task:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to update task. Please try again.",
//       };
//     }
//   },

//   /**
//    * Deletes a draft task.
//    * @param taskId - The ID of the task to delete.
//    * @param token - The authentication token.
//    * @returns An object with success status and an optional error message.
//    */
//   deleteTask: async (taskId: string, token: string) => {
//     try {
//       await taskApi.delete(`/tasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true };
//     } catch (error: any) {
//       console.error("Error deleting task:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to delete task. Please try again.",
//       };
//     }
//   },

//   /**
//    * Searches for staff members by name, memberId, or filters.
//    * @param searchTerm - The search query string.
//    * @param userType - Filter by user type.
//    * @param stateId - Filter by state ID.
//    * @param districtId - Filter by district ID.
//    * @param mandalId - Filter by mandal ID.
//    * @param token - The authentication token.
//    * @returns An object with success status and either the search results or an error message.
//    */
//   searchAssignees: async (
//     searchTerm: string,
//     userType: string,
//     stateId: string,
//     districtId: string,
//     mandalId: string,
//     token: string
//   ) => {
//     try {
//       const response = await taskApi.get<Assignee[]>("/assignees/search", {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           q: searchTerm,
//           userType: userType,
//           stateId: stateId,
//           districtId: districtId,
//           mandalId: mandalId,
//         },
//       });
//       return { success: true, data: response.data };
//     } catch (error: any) {
//       console.error("Error searching assignees:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to search assignees. Please try again.",
//       };
//     }
//   },
// };

import axios from "axios";

// Defines the expected structure for a single task object.
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "DRAFT" | "ASSIGNED";
  assigneeUserType: string;
  assigneeId: string;
  assigneeName?: string;
  stateId: string;
  districtId: string;
  mandalId: string;
  dueDate: string | null;
  assignedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Defines the structure for an assignee object (for search assignees endpoint).
export interface Assignee {
  id: string;
  name: string;
  memberId: string;
  role: "FARM_MANAGER" | "KISANI_DIDI" | "OPERATOR";
  stateId: string;
  districtId: string;
  mandalId: string;
}

// Defines the structure of the data part of the task list API response.
export interface TaskListResponse {
  data: Task[];
}

// Defines the structure of the data part of the assignee search API response.
export interface AssigneeListResponse {
  data: Assignee[];
}

// Defines the structure of the create task request body.
export interface CreateTaskRequest {
  title: string;
  description: string;
  status: "DRAFT" | "ASSIGNED";
  userType: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator";
  assigneeIds?: string[];
  stateId: string;
  districtId: string;
  mandalId: string;
  dueDate?: string;
}

// Defines the structure of the update task request body.
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "DRAFT" | "ASSIGNED";
  stateId?: string;
  districtId?: string;
  mandalId?: string;
  dueDate?: string;
}

// Creates a pre-configured Axios instance for the task management API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/tm", // Adjust baseURL as needed
  headers: { "Content-Type": "application/json" },
});

export const taskManagementService = {
  /**
   * Fetches a list of draft tasks from the API.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchDraftTasks: async (token: string) => {
    try {
      const response = await api.get<TaskListResponse>("/tasks/drafts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching draft tasks:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch draft tasks. Please try again.",
      };
    }
  },

  /**
   * Fetches a list of assigned tasks from the API.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchAssignedTasks: async (token: string) => {
    try {
      const response = await api.get<TaskListResponse>("/tasks/assigned", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching assigned tasks:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch assigned tasks. Please try again.",
      };
    }
  },

  /**
   * Creates one or more tasks (draft or assigned).
   * @param taskData - The task creation data.
   * @param token - The authentication token.
   * @returns An object with success status and either the created tasks or an error message.
   */
  createTask: async (taskData: CreateTaskRequest, token: string) => {
    try {
      const response = await api.post<TaskListResponse>("/tasks", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error creating task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create task.",
      };
    }
  },

  /**
   * Fetches details of a specific task by ID.
   * @param taskId - The ID of the task to fetch.
   * @param token - The authentication token.
   * @returns An object with success status and either the task data or an error message.
   */
  fetchTaskDetails: async (taskId: string, token: string) => {
    try {
      const response = await api.get<Task>(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching task details:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch task details.",
      };
    }
  },

  /**
   * Assigns a draft task to its designated assignee.
   * @param taskId - The ID of the task to assign.
   * @param token - The authentication token.
   * @returns An object with success status and either the updated task or an error message.
   */
  assignTask: async (taskId: string, token: string) => {
    try {
      const response = await api.post<Task>(`/tasks/${taskId}/assign`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error assigning task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to assign task.",
      };
    }
  },

  /**
   * Updates a task's details.
   * @param taskId - The ID of the task to update.
   * @param taskData - The task update data.
   * @param token - The authentication token.
   * @returns An object with success status and either the updated task or an error message.
   */
  updateTask: async (taskId: string, taskData: UpdateTaskRequest, token: string) => {
    try {
      const response = await api.put<Task>(`/tasks/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error updating task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update task.",
      };
    }
  },

  /**
   * Deletes a draft task by ID.
   * @param taskId - The ID of the task to delete.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  deleteTask: async (taskId: string, token: string) => {
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete task.",
      };
    }
  },

  /**
   * Searches for assignees by name, memberId, or filters.
   * @param searchTerm - The search query string.
   * @param userType - Filter by user type (optional).
   * @param stateId - Filter by state ID (optional).
   * @param districtId - Filter by district ID (optional).
   * @param mandalId - Filter by mandal ID (optional).
   * @param token - The authentication token.
   * @returns An object with success status and either the assignee data or an error message.
   */
  searchAssignees: async (
    searchTerm: string,
    userType: string | undefined,
    stateId: string | undefined,
    districtId: string | undefined,
    mandalId: string | undefined,
    token: string
  ) => {
    try {
      const response = await api.get<AssigneeListResponse>("/assignees/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          q: searchTerm,
          userType,
          stateId,
          districtId,
          mandalId,
        },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error searching assignees:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to search assignees.",
      };
    }
  },
};