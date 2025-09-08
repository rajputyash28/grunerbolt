import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { Search, ChevronDown, MoreHorizontal, Edit2, UserPlus, Trash2, X } from "lucide-react";
import { taskManagementService, Task as APITask } from "../../services/taskmanagementsimulation";
import { locationServiceMock } from "../../services/locationservicesimulation";

// Define interfaces for tasks
interface DraftTask {
  id: number;
  title: string;
  createdDate: string;
  status: "Draft";
  userType?: string;
  state?: string;  // Display name
  district?: string;  // Display name
  mandal?: string;  // Display name
  stateId?: string;  // ID for form operations
  districtId?: string;  // ID for form operations
  mandalId?: string;  // ID for form operations
  selectedUsers?: number[];
  taskDescription?: string;
  dueDate?: string;
}

interface AssignedTask {
  id: number;
  title: string;
  assignedTo: string;
  state: string;  // Display name
  district: string;  // Display name
  mandal: string;  // Display name
  stateId?: string;  // ID for form operations
  districtId?: string;  // ID for form operations
  mandalId?: string;  // ID for form operations
  assignedDate: string;
  status: "Assigned";
  taskDescription?: string;
  dueDate?: string;
}

type Task = DraftTask | AssignedTask;

interface User {
  id: number;
  name: string;
  memberId: string;
  userType: string;
}

interface FormData {
  userType: string;
  state: string;
  district: string;
  mandal: string;
  selectedUsers: number[];
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
}

interface Location {
  id: string;
  name: string;
  type: 'state' | 'district' | 'city';
  parentId: string | null;
}

const TaskManagement: React.FC = () => {
  // Helper function to get token
  const getToken = () => localStorage.getItem("token") || "mock-token";
  
  // Helper function to map API userType to form userType
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
  
  // Helper function to map form userType to API userType
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
  
  const [activeTab, setActiveTab] = useState<"draft" | "assigned" | "create">("draft");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [editingTask, setEditingTask] = useState<DraftTask | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [loadingTaskDetails, setLoadingTaskDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'assign' | null>(null);
  const [confirmationTask, setConfirmationTask] = useState<DraftTask | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // API Integration States
  const [loadingDraftTasks, setLoadingDraftTasks] = useState(false);
  const [loadingAssignedTasks, setLoadingAssignedTasks] = useState(false);
  const [loadingOperations, setLoadingOperations] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Location States
  const [states, setStates] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [mandals, setMandals] = useState<Location[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  
  // User Search States
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    userType: "",
    state: "",
    district: "",
    mandal: "",
    selectedUsers: [],
    taskTitle: "",
    taskDescription: "",
    dueDate: "",
  });

  const [draftTasks, setDraftTasks] = useState<DraftTask[]>([]);

  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);

  const getCurrentData = (): Task[] => {
    const data = activeTab === "assigned" ? assignedTasks : draftTasks;
    if (!searchTerm) return data;
    return data.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredUsers = (): User[] => {
    // Use API search results instead of hardcoded userOptions
    return searchResults;
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

  const getSelectedUsersDisplay = (): string => {
    if (!formData.userType) {
      return "";
    }

    const isIndividual = formData.userType.startsWith("individual-");
    const baseType = isIndividual ? formData.userType.replace("individual-", "") : formData.userType;
    
    // Filter users by the correct userType
    const relevantUsers = searchResults.filter((user) => user.userType === baseType);
    const totalCount = relevantUsers.length;
    const selectedCount = formData.selectedUsers.length;

    if (isIndividual) {
      if (showUserDropdown) {
        return userSearchTerm;
      } else {
        if (selectedCount === 0) {
          return "";
        } else {
          // Show selected user names for individual types
          const selectedUserNames = formData.selectedUsers.map(userId => {
            const user = searchResults.find(u => u.id === userId);
            return user ? user.name : `User ${userId}`;
          });
          return `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount}): ${selectedUserNames.join(", ")}`;
        }
      }
    } else {
      // For collective types, show all user names that will be assigned
      if (totalCount > 0) {
        const allUserNames = relevantUsers.map(user => user.name);
        return `All ${getUserTypeDisplayName(formData.userType)} Selected (${totalCount}): ${allUserNames.join(", ")}`;
      } else {
        return `All ${getUserTypeDisplayName(formData.userType)} Auto-Selected`;
      }
    }
  };

  const formatLocation = (str: string): string => {
    if (!str) return '';
    return str.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // API Integration Functions
  
  // Convert API task to component task format
  const convertAPITaskToDraftTask = (apiTask: APITask): DraftTask => {
    const convertedTask = {
      id: parseInt(apiTask.id.replace('task-', '')),
      title: apiTask.title,
      createdDate: apiTask.createdAt,
      status: "Draft" as const,
      userType: apiTask.assigneeUserType ? mapAPIUserTypeToForm(apiTask.assigneeUserType) : undefined,
      state: apiTask.stateName || undefined,  // Display name
      district: apiTask.districtName || undefined,  // Display name
      mandal: apiTask.mandalName || undefined,  // Display name
      stateId: apiTask.stateId || undefined,  // ID for form operations
      districtId: apiTask.districtId || undefined,  // ID for form operations
      mandalId: apiTask.mandalId || undefined,  // ID for form operations
      selectedUsers: apiTask.assigneeId ? [parseInt(apiTask.assigneeId)] : [],
      taskDescription: apiTask.description || undefined,
      dueDate: apiTask.dueDate || undefined,
    };
    return convertedTask;
  };

  const convertAPITaskToAssignedTask = (apiTask: APITask): AssignedTask => {
    return {
      id: parseInt(apiTask.id.replace('task-', '')),
      title: apiTask.title,
      assignedTo: apiTask.assigneeName || 'Unknown',
      state: apiTask.stateName || 'Unknown',  // Display name
      district: apiTask.districtName || 'Unknown',  // Display name
      mandal: apiTask.mandalName || 'Unknown',  // Display name
      stateId: apiTask.stateId || undefined,  // ID for form operations
      districtId: apiTask.districtId || undefined,  // ID for form operations
      mandalId: apiTask.mandalId || undefined,  // ID for form operations
      assignedDate: apiTask.createdAt,
      status: "Assigned" as const,
      taskDescription: apiTask.description || undefined,
      dueDate: apiTask.dueDate || undefined,
    };
  };

  // Fetch draft tasks from API
  const fetchDraftTasks = async () => {
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
  };

  // Fetch assigned tasks from API
  const fetchAssignedTasks = async () => {
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
  };

  // Location API Functions
  const fetchStates = async () => {
    setLoadingLocations(true);
    try {
      const result = await locationServiceMock.fetchLocations('state');
      if (result.success && result.data) {
        setStates(result.data.locations);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const fetchDistricts = async (stateId: string) => {
    setLoadingLocations(true);
    try {
      const result = await locationServiceMock.fetchStateDistricts(stateId);
      if (result.success && result.data) {
        setDistricts(result.data.locations);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const fetchMandals = async (districtId: string) => {
    setLoadingLocations(true);
    try {
      const result = await locationServiceMock.fetchDistrictCities(districtId);
      if (result.success && result.data) {
        setMandals(result.data.locations);
      }
    } catch (error) {
      console.error('Error fetching mandals:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  // Fetch detailed task information from API
  const fetchTaskDetails = async (taskId: string) => {
    setLoadingTaskDetails(true);
    try {
      const result = await taskManagementService.fetchTaskDetails(taskId, getToken());
      
      if (result.success && result.data) {
        setTaskDetails(result.data);
      } else {
        console.error('Fetch task details failed:', result.message);
        setTaskDetails(null);
      }
    } catch (error) {
      console.error('Error fetching task details:', error);
      setTaskDetails(null);
    } finally {
      setLoadingTaskDetails(false);
    }
  };

  // Delete task using API
  const deleteTask = async (taskId: string) => {
    setLoadingOperations(true);
    try {
      const result = await taskManagementService.deleteTask(taskId, getToken());
      
      if (result.success) {
        // Refresh both draft and assigned tasks
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
  };

  // Search assignees from API
  const searchAssignees = async (searchTerm: string, userType: string, stateId?: string, districtId?: string, mandalId?: string) => {
    setLoadingUsers(true);
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
        // Convert API assignees to User format
        const convertedUsers: User[] = result.data.map((assignee: any) => ({
          id: parseInt(assignee.id.replace('user-', '')),
          name: assignee.name,
          memberId: assignee.memberId,
          userType: assignee.role.toLowerCase().replace('_', '-'),
        }));
        setSearchResults(convertedUsers);
      } else {
        console.error('Search assignees failed:', result.message);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching assignees:', error);
      setSearchResults([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleTabChange = (tab: "draft" | "assigned" | "create") => {
    setActiveTab(tab);
    setShowCreateForm(false);
    setSearchTerm("");
    setEditingTask(null);
    setActionMenuOpen(null);
  };

  const handleCreateTask = () => {
    setShowCreateForm(true);
    setActiveTab("create");
    setEditingTask(null);
    setActionMenuOpen(null);
    setFormData({
      userType: "",
      state: "",
      district: "",
      mandal: "",
      selectedUsers: [],
      taskTitle: "",
      taskDescription: "",
      dueDate: "",
    });
    setUserSearchTerm("");
  };

  const handleEditTask = async (task: DraftTask) => {
    setEditingTask(task);
    setShowCreateForm(true);
    setActiveTab("create");
    setActionMenuOpen(null);
    setFormData({
      userType: task.userType || "",
      state: task.stateId || "",  // Use ID for form operations
      district: task.districtId || "",  // Use ID for form operations
      mandal: task.mandalId || "",  // Use ID for form operations
      selectedUsers: task.selectedUsers || [],
      taskTitle: task.title || "",
      taskDescription: task.taskDescription || "",
      dueDate: task.dueDate || "",
    });
    setUserSearchTerm("");
    
    // Load related locations for editing using IDs
    if (task.stateId) {
      await fetchDistricts(task.stateId);
      if (task.districtId) {
        await fetchMandals(task.districtId);
      }
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId.toString());
    setActionMenuOpen(null);
  };

  const handleAssignFromMenu = async (task: DraftTask) => {
    if (!task.selectedUsers || task.selectedUsers.length === 0) return;
    
    setLoadingOperations(true);
    setErrorMessage(null);
    
    try {
      // Use the API to assign the task
      const result = await taskManagementService.assignTask(task.id.toString(), getToken());
      
      if (result.success) {
        // Refresh both draft and assigned tasks
        await fetchDraftTasks();
        await fetchAssignedTasks();
      } else {
        setErrorMessage(result.message || "Failed to assign task");
      }
    } catch (error: any) {
      console.error("Error assigning task:", error);
      setErrorMessage("Failed to assign task. Please try again.");
    } finally {
      setLoadingOperations(false);
    }
  };

  const handleUserSelection = (userId: number) => {
    setFormData((prev) => {
      const isSelected = prev.selectedUsers.includes(userId);
      return {
      ...prev,
        selectedUsers: isSelected
        ? prev.selectedUsers.filter((id) => id !== userId)
        : [...prev.selectedUsers, userId],
      };
    });
  };

  const handleSelectAll = () => {
    const filteredUsers = getFilteredUsers();
    const allUserIds = filteredUsers.map((user) => user.id);
    setFormData((prev) => ({
      ...prev,
      selectedUsers: allUserIds,
    }));
  };

  const handleDeselectAll = () => {
    setFormData((prev) => ({
      ...prev,
      selectedUsers: [],
    }));
  };

  const handleUserTypeChange = async (userType: string) => {
    setFormData((prev) => ({
      ...prev,
      userType,
      selectedUsers: [],
    }));
    setUserSearchTerm("");
    
    // Search for users when userType changes
    if (userType) {
      const apiUserType = mapFormUserTypeToAPI(userType);
      await searchAssignees("", apiUserType, formData.state, formData.district, formData.mandal);
    } else {
      setSearchResults([]);
    }
  };

  const handleSaveToDraft = async () => {
    if (!formData.taskTitle) return;

    setLoadingOperations(true);
    setErrorMessage(null);
    
    try {
    if (editingTask) {
        // Update existing task
        const updateData = {
        title: formData.taskTitle,
          description: formData.taskDescription || undefined,
          stateId: formData.state || undefined,
          districtId: formData.district || undefined,
          mandalId: formData.mandal || undefined,
          dueDate: formData.dueDate || undefined,
        };

        const result = await taskManagementService.updateTask(editingTask.id.toString(), updateData, getToken());
        
        if (result.success) {
          // Refresh draft tasks
          await fetchDraftTasks();
    } else {
          setErrorMessage(result.message || "Failed to update task");
          return;
        }
      } else {
        // Create new task
        const createData = {
        title: formData.taskTitle,
          description: formData.taskDescription || null,
          status: "DRAFT" as const,
          userType: mapFormUserTypeToAPI(formData.userType) as "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator",
          assigneeIds: formData.userType.startsWith("individual-") 
            ? (formData.selectedUsers.length > 0 ? formData.selectedUsers.map(id => id.toString()) : null)
            : null, // Don't pass assigneeIds for collective user types
          stateId: formData.state || null,
          districtId: formData.district || null,
          mandalId: formData.mandal || null,
          dueDate: formData.dueDate || null,
        };

        const result = await taskManagementService.createTask(createData, getToken());
        
        if (result.success) {
          // Refresh draft tasks
          await fetchDraftTasks();
        } else {
          setErrorMessage(result.message || "Failed to create task");
          return;
        }
      }
      
      // Reset form and close
    setFormData({
      userType: "",
      state: "",
      district: "",
      mandal: "",
      selectedUsers: [],
      taskTitle: "",
      taskDescription: "",
      dueDate: "",
    });
    setUserSearchTerm("");
    setShowCreateForm(false);
    setEditingTask(null);
    setActiveTab("draft");
    } catch (error: any) {
      console.error("Error saving task:", error);
      setErrorMessage("Failed to save task. Please try again.");
    } finally {
      setLoadingOperations(false);
    }
  };

  const handleAssignTask = async () => {
    // For individual user types, check if users are selected
    // For collective user types, users are auto-selected, so no need to check
    const hasValidSelection = formData.userType.startsWith("individual-") 
      ? formData.selectedUsers.length > 0 
      : formData.userType && !formData.userType.startsWith("individual-");
      
    if (!formData.taskTitle || !hasValidSelection) return;

    setLoadingOperations(true);
    setErrorMessage(null);
    
    try {
      // Create and assign task in one step
      const createData = {
        title: formData.taskTitle,
        description: formData.taskDescription || null,
        status: "ASSIGNED" as const,
        userType: mapFormUserTypeToAPI(formData.userType) as "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator",
        assigneeIds: formData.userType.startsWith("individual-") 
          ? formData.selectedUsers.map(id => id.toString())
          : null, // Don't pass assigneeIds for collective user types
        stateId: formData.state || null,
        districtId: formData.district || null,
        mandalId: formData.mandal || null,
        dueDate: formData.dueDate || null,
      };

      const result = await taskManagementService.createTask(createData, getToken());
      
      if (result.success && result.data) {
        // If we were editing a draft task, we need to delete it since it's now assigned
    if (editingTask) {
          // The task has been converted from draft to assigned
          await fetchDraftTasks(); // Refresh draft tasks (should remove the edited one)
        }
        
        // Refresh assigned tasks to show the new assignment
        await fetchAssignedTasks();
      } else {
        setErrorMessage(result.message || "Failed to assign task");
        return;
      }
      
      // Reset form and close
    setFormData({
      userType: "",
      state: "",
      district: "",
      mandal: "",
      selectedUsers: [],
      taskTitle: "",
      taskDescription: "",
      dueDate: "",
    });
    setUserSearchTerm("");
    setShowCreateForm(false);
    setEditingTask(null);
    setActiveTab("assigned");
    } catch (error: any) {
      console.error("Error assigning task:", error);
      setErrorMessage("Failed to assign task. Please try again.");
    } finally {
      setLoadingOperations(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      userType: "",
      state: "",
      district: "",
      mandal: "",
      selectedUsers: [],
      taskTitle: "",
      taskDescription: "",
      dueDate: "",
    });
    setUserSearchTerm("");
    setShowCreateForm(false);
    setEditingTask(null);
    setActiveTab("draft");
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowUserDropdown(false);
    }
    if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
      setActionMenuOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick as EventListener);
    return () => document.removeEventListener("mousedown", handleOutsideClick as EventListener);
  }, []);

  // Auto-select all users for "all" user types when search results change
  useEffect(() => {
    if (formData.userType && !formData.userType.startsWith("individual-") && searchResults.length > 0) {
      const allUserIds = searchResults.map((user) => user.id);
      setFormData((prev) => ({
        ...prev,
        selectedUsers: allUserIds,
      }));
    }
  }, [searchResults, formData.userType]);

  // Initialize data on component mount
  useEffect(() => {
    fetchStates();
    fetchDraftTasks();
    fetchAssignedTasks();
  }, []);

  return (
    <div className="space-y-6" style={{ fontFamily: "Poppins" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
            Task Management
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
          onClick={() => handleTabChange("draft")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "draft" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
            style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
          >
          Draft Tasks
          </button>
        <button
          onClick={() => handleTabChange("assigned")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "assigned" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
        >
          Assigned Tasks
        </button>
        <button
          onClick={handleCreateTask}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${showCreateForm ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
        >
          {editingTask ? "Edit Task" : "Create Task"}
        </button>
      </div>

      {/* Search - Only show for Draft and Assigned Tasks */}
      {!showCreateForm && (activeTab === "draft" || activeTab === "assigned") && (
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ fontFamily: "Poppins", fontSize: "14px" }}
          />
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800" style={{ fontFamily: "Poppins" }}>
                {errorMessage}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setErrorMessage(null)}
                className="text-red-400 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {showCreateForm ? (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
            {/* Form Title */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>
                {editingTask ? `Edit Task - ID: ${editingTask.id}` : "Create New Task"}
              </h2>
              {editingTask && (
                <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "Poppins" }}>
                  Modify the task details below
                </p>
              )}
            </div>
          <div className="space-y-5">
            {/* Select User Type */}
            <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: "Poppins" }}
        >
          Select User Type
        </label>
              <div className="relative">
                <select
            value={formData.userType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleUserTypeChange(e.target.value)
            }
                  className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                >
                  <option value="">Select User Type</option>
            <option value="farm-manager">All Farm Manager</option>
            <option value="individual-farm-manager">Individual Farm Manager</option>
            <option value="kisani-didi">All Kisani Didi</option>
            <option value="individual-kisani-didi">Individual Kisani Didi</option>
            <option value="operator">All Operator</option>
            <option value="individual-operator">Individual Operator</option>
                </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
              </div>
            </div>

            <div className="flex gap-3">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "Poppins" }}
          >
            State
          </label>
                  <div className="relative">
                    <select
              value={formData.state}
              onChange={async (e: ChangeEvent<HTMLSelectElement>) => {
                const stateId = e.target.value;
                setFormData({ ...formData, state: stateId, district: "", mandal: "" });
                setDistricts([]);
                setMandals([]);
                if (stateId) {
                  await fetchDistricts(stateId);
                }
                
                // Re-search users when location changes
                if (formData.userType) {
                  const apiUserType = mapFormUserTypeToAPI(formData.userType);
                  await searchAssignees(userSearchTerm || "", apiUserType, stateId, "", "");
                }
              }}
              disabled={!formData.userType || loadingLocations}
              className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${
                !formData.userType || loadingLocations ? "opacity-50 cursor-not-allowed" : ""
              }`}
                      style={{ fontFamily: "Poppins", fontSize: "13px" }}
                    >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                        </option>
                      ))}
                    </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
                  </div>
                </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "Poppins" }}
          >
            District
          </label>
          <div className="relative">
            <select
              value={formData.district}
              onChange={async (e: ChangeEvent<HTMLSelectElement>) => {
                const districtId = e.target.value;
                setFormData({ ...formData, district: districtId, mandal: "" });
                setMandals([]);
                if (districtId) {
                  await fetchMandals(districtId);
                }
                
                // Re-search users when location changes
                if (formData.userType) {
                  const apiUserType = mapFormUserTypeToAPI(formData.userType);
                  await searchAssignees(userSearchTerm || "", apiUserType, formData.state, districtId, "");
                }
              }}
              disabled={!formData.state || loadingLocations}
              className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${
                !formData.state || loadingLocations ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ fontFamily: "Poppins", fontSize: "13px" }}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
            </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "Poppins" }}
          >
            Mandal
          </label>
          <div className="relative">
            <select
              value={formData.mandal}
              onChange={async (e: ChangeEvent<HTMLSelectElement>) => {
                const mandalId = e.target.value;
                setFormData({ ...formData, mandal: mandalId });
                
                // Re-search users when location changes
                if (formData.userType) {
                  const apiUserType = mapFormUserTypeToAPI(formData.userType);
                  await searchAssignees(userSearchTerm || "", apiUserType, formData.state, formData.district, mandalId);
                }
              }}
              disabled={!formData.district || loadingLocations}
              className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${
                !formData.district || loadingLocations ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ fontFamily: "Poppins", fontSize: "13px" }}
            >
              <option value="">Select Mandal</option>
              {mandals.map((mandal) => (
                <option key={mandal.id} value={mandal.id}>
                  {mandal.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
            </div>

            {/* User Selection - Search for Individual or Auto-select for All */}
            <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: "Poppins" }}
        >
          {formData.userType.startsWith("individual-") ? "Search Assignees" : "Selected Users"}
        </label>
              <div className="relative mb-1">
                <input
                  type="text"
                  placeholder={formData.userType.startsWith("individual-") 
                    ? "Search by name or member ID" 
                    : "All users auto-selected - see names above"}
            value={getSelectedUsersDisplay()}
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    if (formData.userType.startsWith("individual-")) {
                      const searchTerm = e.target.value;
                      setUserSearchTerm(searchTerm);
                      setShowUserDropdown(true);
                      
                      // Search for users with the search term
                      if (formData.userType) {
                        const apiUserType = mapFormUserTypeToAPI(formData.userType);
                        await searchAssignees(searchTerm, apiUserType, formData.state, formData.district, formData.mandal);
                      }
                    }
                  }}
                  onClick={async () => {
                    if (formData.userType.startsWith("individual-")) {
                      setShowUserDropdown(true);
                      setUserSearchTerm("");
                      
                      // Search for users when dropdown opens
                      if (formData.userType) {
                        const apiUserType = mapFormUserTypeToAPI(formData.userType);
                        await searchAssignees("", apiUserType, formData.state, formData.district, formData.mandal);
                      }
                    }
                  }}
            disabled={!formData.userType || !formData.userType.startsWith("individual-")}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm truncate ${
              !formData.userType || !formData.userType.startsWith("individual-")
                ? "bg-gray-50 cursor-not-allowed opacity-50"
                : "cursor-text"
                  }`}
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
                {formData.userType.startsWith("individual-") && (
                  <ChevronDown
                    size={16}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform ${
                showUserDropdown ? "rotate-180" : ""
              }`}
                  />
                )}
              </div>

              {showUserDropdown && formData.userType.startsWith("individual-") && (
          <div
            ref={dropdownRef}
            className="border border-gray-200 rounded-md max-h-48 overflow-y-auto bg-white shadow-lg z-50"
          >
                  <div className="px-3 py-2 text-xs text-gray-500 border-b bg-gray-50 flex justify-between items-center">
              <button
                onClick={handleSelectAll}
                className="text-blue-600 hover:underline text-xs"
                type="button"
              >
                      Select All ({getFilteredUsers().length})
                    </button>
              <button
                onClick={handleDeselectAll}
                className="text-blue-600 hover:underline text-xs"
                type="button"
              >
                      Deselect All
                    </button>
                  </div>
                  {loadingUsers ? (
                    <div className="px-3 py-2 text-sm text-gray-500 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        Searching users...
                      </div>
                    </div>
                  ) : getFilteredUsers().length === 0 ? (
                    <div className="px-3 py-2 text-sm text-gray-500">No users found</div>
                  ) : (
                    getFilteredUsers().map((user) => (
                <div
                  key={user.id}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                        <input
                          type="checkbox"
                          className="mr-2 w-4 h-4 text-blue-600"
                          checked={formData.selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.memberId}</p>
                        </div>
                      </div>
                    ))
                  )}
            {/* Done Button */}
                  <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex justify-start">
                    <button
                      onClick={() => setShowUserDropdown(false)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
                      style={{ fontFamily: "Poppins", fontSize: "13px" }}
                      type="button"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Task Title */}
            <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: "Poppins" }}
        >
          Task Title
        </label>
              <input
                type="text"
                value={formData.taskTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, taskTitle: e.target.value })
          }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Enter task title"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>

            {/* Task Description */}
            <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: "Poppins" }}
        >
          Description
        </label>
              <textarea
                rows={3}
                value={formData.taskDescription}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({ ...formData, taskDescription: e.target.value })
          }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                placeholder="Enter task description"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>

            {/* Due Date */}
            <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: "Poppins" }}
        >
          Due Date
        </label>
              <input
                type="date"
                value={formData.dueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
                className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveToDraft}
          disabled={!formData.taskTitle || loadingOperations}
          className={`px-4 py-2 rounded-md text-white transition-colors text-sm flex items-center gap-2 ${
            loadingOperations 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-gray-500 hover:bg-gray-600"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              >
          {loadingOperations && (
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
          )}
          {loadingOperations ? "Saving..." : "Save to Draft"}
              </button>
              <button
                type="button"
                onClick={handleAssignTask}
          disabled={!formData.taskTitle || 
            (formData.userType.startsWith("individual-") && formData.selectedUsers.length === 0) ||
            (!formData.userType || formData.userType === "") ||
            loadingOperations}
          className={`px-4 py-2 rounded-md text-white transition-colors text-sm flex items-center gap-2 ${
            loadingOperations 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              >
          {loadingOperations && (
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
          )}
          {loadingOperations ? "Assigning..." : "Assign Task"}
              </button>
            </div>
          </div>
        </div>
      ) : (
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
              {(loadingDraftTasks && activeTab === "draft") || (loadingAssignedTasks && activeTab === "assigned") ? (
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
              ) : (
                getCurrentData().map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td
                    onClick={async () => {
                      setSelectedTask(task);
                      await fetchTaskDetails(task.id.toString());
                    }}
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
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${task.status === "Assigned" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
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
                          setActionMenuOpen(actionMenuOpen === task.id ? null : task.id);
                        }}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {actionMenuOpen === task.id && (
                        <div
                          ref={actionMenuRef}
                          className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[1000] py-1 min-w-[150px]"
                          style={{ position: "absolute" }}
                        >
                          {activeTab === "draft" && (
                            <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditTask(task as DraftTask);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Edit2 size={14} />
                            Edit Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                                  setConfirmationType('assign');
                              setConfirmationTask(task as DraftTask);
                              setShowConfirmation(true);
                              setActionMenuOpen(null);
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
                              setConfirmationType('delete');
                              setConfirmationTask(task as DraftTask);
                              setShowConfirmation(true);
                              setActionMenuOpen(null);
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
              ))
              )}
            </tbody>
          </table>
          {getCurrentData().length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500" style={{ fontFamily: "Poppins" }}>
                No {activeTab === "draft" ? "draft" : "assigned"} tasks found
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal for Task Details */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 border border-gray-200 relative max-w-lg w-full">
            <button
              onClick={() => setSelectedTask(null)}
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
                    value={getUserTypeDisplayName((selectedTask as DraftTask).userType || "")}
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
                    value={(selectedTask as AssignedTask).assignedTo}
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
                  value={"taskDescription" in selectedTask ? selectedTask.taskDescription || "" : selectedTask.title}
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
                  value={"dueDate" in selectedTask ? selectedTask.dueDate || "" : ""}
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
                    value={(selectedTask as AssignedTask).assignedDate || ""}
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
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-2 right-2 text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-center mb-4">
              {confirmationType === 'delete' ? 'Delete Task' : 'Assign Task'}
            </h2>
            <p className="text-center mb-6">
              Are you sure you want to {confirmationType === 'delete' ? 'delete' : 'assign'} this Task?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-2 border border-blue-500 text-black rounded-md"
              >
                No
              </button>
              <button
                onClick={() => {
                  if (confirmationType === 'delete') {
                    handleDeleteTask(confirmationTask!.id);
                  } else {
                    handleAssignFromMenu(confirmationTask!);
                  }
                  setShowConfirmation(false);
                  setConfirmationType(null);
                  setConfirmationTask(null);
                }}
                className="px-6 py-2 bg-black text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;

