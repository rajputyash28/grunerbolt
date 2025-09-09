import React, { useState, useEffect, useRef } from 'react';
import { taskManagementService } from '../../services/taskmanagementsimulation';
import { useTaskManagement } from './hooks/useTaskManagement';
import { useLocationManagement } from './hooks/useLocationManagement';
import { TabType, ConfirmationType, DraftTask, Task, FormData, User } from './types';

// Components
import TaskManagementHeader from './TaskManagementHeader';
import TaskTabs from './TaskTabs';
import TaskSearch from './TaskSearch';
import ErrorMessage from './ErrorMessage';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';
import TaskTable from './TaskTable';
import TaskDetailsModal from './TaskDetailsModal';
import ConfirmationDialog from './ConfirmationDialog';

const TaskManagement: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState<TabType>("draft");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [editingTask, setEditingTask] = useState<DraftTask | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<ConfirmationType>(null);
  const [confirmationTask, setConfirmationTask] = useState<DraftTask | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingEditData, setLoadingEditData] = useState(false);

  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const {
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
  } = useTaskManagement();

  const {
    states,
    districts,
    mandals,
    loadingLocations,
    setDistricts,
    setMandals,
    fetchStates,
    fetchDistricts,
    fetchMandals,
  } = useLocationManagement();

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

  // Helper functions
  const getCurrentData = (): Task[] => {
    const data = activeTab === "assigned" ? assignedTasks : draftTasks;
    if (!searchTerm) return data;
    return data.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getToken = () => localStorage.getItem("token") || "mock-token";

  // Event handlers
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setShowCreateForm(false);
    setSearchTerm("");
    setEditingTask(null);
    setActionMenuOpen(null);
    
    // Reset edit mode and fetch states when exiting edit mode
    if (isEditMode) {
      setIsEditMode(false);
      fetchStates();
    }
  };

  const handleCreateTask = () => {
    setShowCreateForm(true);
    setActiveTab("create");
    setEditingTask(null);
    setActionMenuOpen(null);
    
    // Reset edit mode and fetch states when creating new task
    setIsEditMode(false);
    fetchStates();
    
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
    console.log('handleEditTask called with task:', task);
    
    setShowCreateForm(true);
    setActiveTab("create");
    setActionMenuOpen(null);
    
    // Set edit mode to prevent any interference
    console.log('Setting edit mode to prevent any interference');
    setIsEditMode(true);
    
    // Set loading state
    setLoadingEditData(true);
    setEditingTask(null);
    
    try {
      // Fetch complete task details - convert numeric ID back to API format
      const apiTaskId = `task-${task.id}`;
      console.log('Fetching task details for ID:', apiTaskId);
      
      const result = await taskManagementService.fetchTaskDetails(apiTaskId, getToken());
      
      if (result.success && result.data) {
        const taskDetails = result.data;
        console.log('TaskManagementRefactored: Task details fetched successfully:', taskDetails);
        console.log('TaskManagementRefactored: Location data in taskDetails:', {
          stateName: taskDetails.stateName,
          districtName: taskDetails.districtName,
          mandalName: taskDetails.mandalName
        });
        
        // Fetch location hierarchies for edit mode
        console.log('Fetching location hierarchies for edit mode');
        
        // Fetch states first
        await fetchStates();
        
        // If task has state, fetch districts
        if (taskDetails.stateId) {
          console.log('Fetching districts for stateId:', taskDetails.stateId);
          await fetchDistricts(taskDetails.stateId);
        }
        
        // If task has district, fetch mandals
        if (taskDetails.districtId) {
          console.log('Fetching mandals for districtId:', taskDetails.districtId);
          await fetchMandals(taskDetails.districtId);
        }
        
        // Store task details for direct display
        console.log('TaskManagementRefactored: Setting taskDetails:', taskDetails);
        setTaskDetails(taskDetails);
        
        // Set editing task
        setEditingTask(task);
        
      } else {
        console.error('Failed to fetch task details:', result.message);
        throw new Error('Failed to fetch task details');
      }
    } catch (error) {
      console.error('Error fetching task details for edit:', error);
      
      // Create fallback task details from task list data
      const fallbackTaskDetails = {
        id: task.id,
        title: task.title || "",
        description: task.taskDescription || "",
        assigneeUserType: task.userType || "",
        assigneeId: task.selectedUsers?.[0]?.toString() || "",
        assigneeName: "Unknown",
        stateId: task.stateId || "",
        districtId: task.districtId || "",
        mandalId: task.mandalId || "",
        stateName: task.state || "",
        districtName: task.district || "",
        mandalName: task.mandal || "",
        dueDate: task.dueDate || "",
        status: "DRAFT",
        createdAt: "",
        updatedAt: "",
        assignedAt: null
      };
      
      console.log('Using fallback task details:', fallbackTaskDetails);
      setTaskDetails(fallbackTaskDetails);
      setEditingTask(task);
    } finally {
      setLoadingEditData(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId.toString());
    setActionMenuOpen(null);
  };

  const handleAssignFromMenu = async (task: DraftTask) => {
    if (!task.selectedUsers || task.selectedUsers.length === 0) return;
    
    setLoadingOperations(true);
    try {
      const result = await taskManagementService.assignTask(task.id.toString(), getToken());
      
      if (result.success) {
        await fetchDraftTasks();
        await fetchAssignedTasks();
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message || "Failed to assign task");
      }
    } catch (error) {
      console.error('Error assigning task:', error);
      setErrorMessage("Failed to assign task");
    } finally {
      setLoadingOperations(false);
    }
  };

  const handleUserTypeChange = async (userType: string) => {
    // Don't handle user type changes when editing a task - use API data directly
    if (editingTask) {
      console.log('User type change blocked - editing task, using API data directly');
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      userType,
      selectedUsers: [],
    }));
    setUserSearchTerm("");
    
    if (userType) {
      const apiUserType = mapFormUserTypeToAPI(userType);
      const results = await searchAssignees("", apiUserType, formData.state, formData.district, formData.mandal);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleLocationChange = async (type: 'state' | 'district' | 'mandal', value: string) => {
    // Don't handle location changes when editing a task - use API data directly
    if (editingTask) {
      console.log('Location change blocked - editing task, using API data directly');
      return;
    }
    
    if (type === 'state') {
      setFormData({ ...formData, state: value, district: "", mandal: "" });
      setDistricts([]);
      setMandals([]);
      if (value) {
        await fetchDistricts(value);
      }
    } else if (type === 'district') {
      setFormData({ ...formData, district: value, mandal: "" });
      setMandals([]);
      if (value) {
        await fetchMandals(value);
      }
    } else if (type === 'mandal') {
      setFormData({ ...formData, mandal: value });
    }
    
    if (formData.userType) {
      const apiUserType = mapFormUserTypeToAPI(formData.userType);
      const stateId = type === 'state' ? value : formData.state;
      const districtId = type === 'district' ? value : formData.district;
      const mandalId = type === 'mandal' ? value : formData.mandal;
      const results = await searchAssignees(userSearchTerm || "", apiUserType, stateId, districtId, mandalId);
      setSearchResults(results);
    }
  };

  const handleUserSearch = async (searchTerm: string) => {
    setLoadingUsers(true);
    try {
      if (formData.userType) {
        const apiUserType = mapFormUserTypeToAPI(formData.userType);
        const results = await searchAssignees(searchTerm, apiUserType, formData.state, formData.district, formData.mandal);
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSaveToDraft = async (editFormData?: any) => {
    // Use edit form data if provided (from EditTaskForm), otherwise use main form data
    const dataToUse = editFormData || formData;
    
    if (!dataToUse.taskTitle) return;

    setLoadingOperations(true);
    try {
      if (editingTask) {
        const updateData = {
          title: dataToUse.taskTitle,
          description: dataToUse.taskDescription || undefined,
          stateId: taskDetails?.stateId || null,
          districtId: taskDetails?.districtId || null,
          mandalId: taskDetails?.mandalId || null,
          dueDate: dataToUse.dueDate || null,
        };

        const result = await taskManagementService.updateTask(editingTask.id.toString(), updateData, getToken());
        
        if (result.success) {
          await fetchDraftTasks();
          setShowCreateForm(false);
          setEditingTask(null);
          setTaskDetails(null);
          setIsEditMode(false);
          setErrorMessage(null);
        } else {
          setErrorMessage(result.message || "Failed to update task");
        }
      } else {
        const createData = {
          title: dataToUse.taskTitle,
          description: dataToUse.taskDescription || null,
          status: "DRAFT" as const,
          userType: mapFormUserTypeToAPI(formData.userType) as "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator",
          assigneeIds: formData.userType.startsWith("individual-") 
            ? (formData.selectedUsers.length > 0 ? formData.selectedUsers.map(id => id.toString()) : null)
            : null,
          stateId: formData.state || null,
          districtId: formData.district || null,
          mandalId: formData.mandal || null,
          dueDate: dataToUse.dueDate || null,
        };

        const result = await taskManagementService.createTask(createData, getToken());
        
        if (result.success) {
          await fetchDraftTasks();
          setShowCreateForm(false);
          setErrorMessage(null);
        } else {
          setErrorMessage(result.message || "Failed to create task");
        }
      }
    } catch (error) {
      console.error('Error saving task:', error);
      setErrorMessage("Failed to save task");
    } finally {
      setLoadingOperations(false);
    }
  };

  const handleAssignTask = async (editFormData?: any) => {
    // Use edit form data if provided (from EditTaskForm), otherwise use main form data
    const dataToUse = editFormData || formData;
    
    if (!dataToUse.taskTitle) return;

    setLoadingOperations(true);
    try {
      const createData = {
        title: dataToUse.taskTitle,
        description: dataToUse.taskDescription || null,
        status: "ASSIGNED" as const,
        userType: editingTask ? taskDetails?.assigneeUserType : mapFormUserTypeToAPI(formData.userType) as "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator",
        assigneeIds: editingTask ? [taskDetails?.assigneeId].filter(Boolean) : (formData.userType.startsWith("individual-") 
          ? formData.selectedUsers.map(id => id.toString())
          : null),
        stateId: editingTask ? taskDetails?.stateId : formData.state || null,
        districtId: editingTask ? taskDetails?.districtId : formData.district || null,
        mandalId: editingTask ? taskDetails?.mandalId : formData.mandal || null,
        dueDate: dataToUse.dueDate || null,
      };

      const result = await taskManagementService.createTask(createData, getToken());
      
      if (result.success && result.data) {
        if (editingTask) {
          await deleteTask(editingTask.id.toString());
        }
        await fetchDraftTasks();
        await fetchAssignedTasks();
        setShowCreateForm(false);
        setEditingTask(null);
        setTaskDetails(null);
        setIsEditMode(false);
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message || "Failed to assign task");
      }
    } catch (error) {
      console.error('Error assigning task:', error);
      setErrorMessage("Failed to assign task");
    } finally {
      setLoadingOperations(false);
    }
  };

  const handleTaskClick = async (task: Task) => {
    setSelectedTask(task);
    // Don't fetch task details here - let the modal handle it if needed
  };

  const handleActionMenuToggle = (taskId: number) => {
    setActionMenuOpen(actionMenuOpen === taskId ? null : taskId);
  };

  const handleConfirmationConfirm = async () => {
    if (confirmationType === 'delete' && confirmationTask) {
      await handleDeleteTask(confirmationTask.id);
    } else if (confirmationType === 'assign' && confirmationTask) {
      await handleAssignFromMenu(confirmationTask);
    }
    setShowConfirmation(false);
    setConfirmationType(null);
    setConfirmationTask(null);
  };

  // Effects
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
        setActionMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick as EventListener);
    return () => document.removeEventListener("mousedown", handleOutsideClick as EventListener);
  }, []);

  useEffect(() => {
    // Don't auto-select users when editing a task
    if (editingTask) return;
    
    if (formData.userType && !formData.userType.startsWith("individual-") && searchResults.length > 0) {
      const allUserIds = searchResults.map((user) => user.id);
      setFormData((prev) => ({
        ...prev,
        selectedUsers: allUserIds,
      }));
    }
  }, [searchResults, formData.userType, editingTask]);

  useEffect(() => {
    // Only fetch states if not in edit mode
    if (!isEditMode) {
      console.log('Fetching states because not in edit mode');
      fetchStates();
    } else {
      console.log('Skipping states fetch because in edit mode');
    }
    fetchDraftTasks();
    fetchAssignedTasks();
  }, [isEditMode]);

  return (
    <div className="space-y-6" style={{ fontFamily: "Poppins" }}>
      <TaskManagementHeader />
      
      <TaskTabs
        activeTab={activeTab}
        showCreateForm={showCreateForm}
        editingTask={editingTask}
        onTabChange={handleTabChange}
        onCreateTask={handleCreateTask}
      />

      <TaskSearch
        activeTab={activeTab}
        showCreateForm={showCreateForm}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <ErrorMessage
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />

      {showCreateForm ? (
        editingTask ? (
          <EditTaskForm
            key={taskDetails?.id || 'loading'}
            taskDetails={taskDetails}
            loadingEditData={loadingEditData}
            onSaveToDraft={handleSaveToDraft}
            onAssignTask={handleAssignTask}
            loadingOperations={loadingOperations}
          />
        ) : (
          <TaskForm
            formData={formData}
            setFormData={setFormData}
            states={states}
            districts={districts}
            mandals={mandals}
            loadingLocations={loadingLocations}
            searchResults={searchResults}
            loadingUsers={loadingUsers}
            userSearchTerm={userSearchTerm}
            setUserSearchTerm={setUserSearchTerm}
            showUserDropdown={showUserDropdown}
            setShowUserDropdown={setShowUserDropdown}
            loadingOperations={loadingOperations}
            onUserTypeChange={handleUserTypeChange}
            onLocationChange={handleLocationChange}
            onUserSearch={handleUserSearch}
            onSaveToDraft={handleSaveToDraft}
            onAssignTask={handleAssignTask}
          />
        )
      ) : (
        <TaskTable
          activeTab={activeTab}
          tasks={getCurrentData()}
          loadingDraftTasks={loadingDraftTasks}
          loadingAssignedTasks={loadingAssignedTasks}
          actionMenuOpen={actionMenuOpen}
          onTaskClick={handleTaskClick}
          onActionMenuToggle={handleActionMenuToggle}
          onEditTask={handleEditTask}
          onAssignFromMenu={(task: DraftTask) => {
            setConfirmationType('assign');
            setConfirmationTask(task);
            setShowConfirmation(true);
            setActionMenuOpen(null);
          }}
          onDeleteTask={(taskId: number) => {
            setConfirmationType('delete');
            setConfirmationTask(draftTasks.find(t => t.id === taskId) || null);
            setShowConfirmation(true);
            setActionMenuOpen(null);
          }}
        />
      )}

      <TaskDetailsModal
        selectedTask={selectedTask}
        taskDetails={taskDetails}
        loadingTaskDetails={false}
        onClose={() => setSelectedTask(null)}
      />

      <ConfirmationDialog
        show={showConfirmation}
        type={confirmationType}
        onClose={() => {
          setShowConfirmation(false);
          setConfirmationType(null);
          setConfirmationTask(null);
        }}
        onConfirm={handleConfirmationConfirm}
      />
    </div>
  );
};

export default TaskManagement;
