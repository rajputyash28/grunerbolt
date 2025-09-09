import { useState, useCallback } from 'react';
import { taskManagementService, Task as APITask } from '../../../services/taskmanagementsimulation';
import { DraftTask, AssignedTask, User } from '../types';

export const useTaskManagement = () => {
  const [draftTasks, setDraftTasks] = useState<DraftTask[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [loadingDraftTasks, setLoadingDraftTasks] = useState(false);
  const [loadingAssignedTasks, setLoadingAssignedTasks] = useState(false);
  const [loadingOperations, setLoadingOperations] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("token") || "mock-token";

  const mapAPIUserTypeToForm = (apiUserType: string): string => {
    const mapping: { [key: string]: string } = {
      "fm": "farm-manager",
      "kd": "kisani-didi", 
      "operator": "operator",
      "ifm": "individual-farm-manager",
      "ikd": "individual-kisani-didi",
      "ioperator": "individual-operator"
    };
    return mapping[apiUserType] || apiUserType;
  };

  const mapFormUserTypeToAPI = (formUserType: string): string => {
    const mapping: { [key: string]: string } = {
      "farm-manager": "fm",
      "kisani-didi": "kd",
      "operator": "operator",
      "individual-farm-manager": "ifm",
      "individual-kisani-didi": "ikd",
      "individual-operator": "ioperator"
    };
    return mapping[formUserType] || formUserType;
  };

  const convertAPITaskToDraftTask = (apiTask: APITask): DraftTask => {
    return {
      id: parseInt(apiTask.id.replace('task-', '')),
      title: apiTask.title,
      createdDate: apiTask.createdAt,
      status: "Draft" as const,
      userType: apiTask.assigneeUserType ? mapAPIUserTypeToForm(apiTask.assigneeUserType) : undefined,
      state: apiTask.stateName || undefined,
      district: apiTask.districtName || undefined,
      mandal: apiTask.mandalName || undefined,
      stateId: apiTask.stateId || undefined,
      districtId: apiTask.districtId || undefined,
      mandalId: apiTask.mandalId || undefined,
      selectedUsers: apiTask.assigneeId ? [parseInt(apiTask.assigneeId)] : [],
      taskDescription: apiTask.description || undefined,
      dueDate: apiTask.dueDate || undefined,
    };
  };

  const convertAPITaskToAssignedTask = (apiTask: APITask): AssignedTask => {
    return {
      id: parseInt(apiTask.id.replace('task-', '')),
      title: apiTask.title,
      assignedTo: apiTask.assigneeName || 'Unknown',
      state: apiTask.stateName || 'Unknown',
      district: apiTask.districtName || 'Unknown',
      mandal: apiTask.mandalName || 'Unknown',
      stateId: apiTask.stateId || undefined,
      districtId: apiTask.districtId || undefined,
      mandalId: apiTask.mandalId || undefined,
      assignedDate: apiTask.createdAt,
      status: "Assigned" as const,
      taskDescription: apiTask.description || undefined,
      dueDate: apiTask.dueDate || undefined,
    };
  };

  const fetchDraftTasks = useCallback(async () => {
    setLoadingDraftTasks(true);
    setErrorMessage(null);
    try {
      const result = await taskManagementService.fetchDraftTasks(getToken());
      if (result.success && result.data) {
        const convertedTasks = result.data.map(convertAPITaskToDraftTask);
        setDraftTasks(convertedTasks);
      } else {
        setErrorMessage(result.message || "Failed to fetch draft tasks");
      }
    } catch (error: any) {
      console.error("Error fetching draft tasks:", error);
      setErrorMessage("Failed to fetch draft tasks. Please try again.");
    } finally {
      setLoadingDraftTasks(false);
    }
  }, []);

  const fetchAssignedTasks = useCallback(async () => {
    setLoadingAssignedTasks(true);
    setErrorMessage(null);
    try {
      const result = await taskManagementService.fetchAssignedTasks(getToken());
      if (result.success && result.data) {
        const convertedTasks = result.data.map(convertAPITaskToAssignedTask);
        setAssignedTasks(convertedTasks);
      } else {
        setErrorMessage(result.message || "Failed to fetch assigned tasks");
      }
    } catch (error: any) {
      console.error("Error fetching assigned tasks:", error);
      setErrorMessage("Failed to fetch assigned tasks. Please try again.");
    } finally {
      setLoadingAssignedTasks(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    setLoadingOperations(true);
    try {
      const result = await taskManagementService.deleteTask(taskId, getToken());
      
      if (result.success) {
        await fetchDraftTasks();
        await fetchAssignedTasks();
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message || "Failed to delete task");
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      setErrorMessage("Failed to delete task");
    } finally {
      setLoadingOperations(false);
    }
  }, [fetchDraftTasks, fetchAssignedTasks]);

  const searchAssignees = useCallback(async (
    searchTerm: string, 
    userType: string, 
    stateId?: string, 
    districtId?: string, 
    mandalId?: string
  ): Promise<User[]> => {
    try {
      const result = await taskManagementService.searchAssignees(
        searchTerm,
        userType,
        stateId,
        districtId,
        mandalId,
        getToken()
      );
      
      if (result.success && result.data) {
        return result.data.map((assignee: any) => ({
          id: parseInt(assignee.id.replace('user-', '')),
          name: assignee.name,
          memberId: assignee.memberId,
          userType: assignee.role.toLowerCase().replace('_', '-'),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error searching assignees:', error);
      return [];
    }
  }, []);

  return {
    draftTasks,
    assignedTasks,
    loadingDraftTasks,
    loadingAssignedTasks,
    loadingOperations,
    setLoadingOperations,
    errorMessage,
    setErrorMessage,
    fetchDraftTasks,
    fetchAssignedTasks,
    deleteTask,
    searchAssignees,
    mapFormUserTypeToAPI,
  };
};
