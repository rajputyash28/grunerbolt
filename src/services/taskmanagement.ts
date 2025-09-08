import axios from "axios";

// Defines the expected structure for a single task object.
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "DRAFT" | "ASSIGNED";
  assigneeUserType: string | null;
  assigneeId: string | null;
  assigneeName: string | null;
  stateId: string | null;
  districtId: string | null;
  mandalId: string | null;
  stateName: string | null;
  districtName: string | null;
  mandalName: string | null;
  dueDate: string | null;
  assignedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Defines the structure for an assignee object.
export interface Assignee {
  id: string;
  name: string;
  memberId: string;
  role: "FARM_MANAGER" | "KISANI_DIDI" | "OPERATOR";
  stateId: string;
  districtId: string;
  mandalId: string;
}

// Defines the structure of the task list API response.
export type TaskListResponse = Task[];

// Defines the structure of the assignee search API response.
export type AssigneeListResponse = Assignee[];

// Defines the structure of the create task request body.
export interface CreateTaskRequest {
  title: string;
  description: string | null;
  status: "DRAFT" | "ASSIGNED";
  userType: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator";
  assigneeIds: string[] | null;
  stateId: string | null;
  districtId: string | null;
  mandalId: string | null;
  dueDate: string | null;
}

// Defines the structure of the update task request body.
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "DRAFT" | "ASSIGNED" | null;
  stateId?: string | null;
  districtId?: string | null;
  mandalId?: string | null;
  dueDate?: string | null;
}

// Defines response types for delete and search assignees methods.
interface DeleteTaskResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface SearchAssigneesResponse {
  success: boolean;
  data?: Assignee[];
  message?: string;
  error?: string;
}

// Creates a pre-configured Axios instance for the task management API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/tm",
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
      return { success: true, data: response.data };
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
      return { success: true, data: response.data };
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
      return { success: true, data: response.data };
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
  deleteTask: async (taskId: string, token: string): Promise<DeleteTaskResponse> => {
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const statusCode = error.response?.status;
      const message = error.response?.data?.message || "Failed to delete task.";
      const errorMsg = error.response?.data?.error;
      if (statusCode === 401) {
        return { success: false, message: "Unauthorized: Invalid or missing token.", error: errorMsg || "Unauthorized" };
      } else if (statusCode === 400) {
        return { success: false, message: "Invalid task ID format.", error: errorMsg || "Bad Request" };
      }
      return { success: false, message, error: errorMsg };
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
  ): Promise<SearchAssigneesResponse> => {
    try {
      const response = await api.get<AssigneeListResponse>("/assignees/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: searchTerm, userType, stateId, districtId, mandalId },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error searching assignees:", error);
      const statusCode = error.response?.status;
      const message = error.response?.data?.message || "Failed to search assignees.";
      const errorMsg = error.response?.data?.error;
      if (statusCode === 401) {
        return { success: false, message: "Unauthorized: Invalid or missing token.", error: errorMsg || "Unauthorized" };
      } else if (statusCode === 400) {
        return { success: false, message: "Invalid search parameters.", error: errorMsg || "Bad Request" };
      }
      return { success: false, message, error: errorMsg };
    }
  },
};