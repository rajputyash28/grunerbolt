import React, { ChangeEvent, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormData, User, Location } from './types';

interface TaskFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  states: Location[];
  districts: Location[];
  mandals: Location[];
  loadingLocations: boolean;
  searchResults: User[];
  loadingUsers: boolean;
  userSearchTerm: string;
  setUserSearchTerm: (term: string) => void;
  showUserDropdown: boolean;
  setShowUserDropdown: (show: boolean) => void;
  loadingOperations: boolean;
  onUserTypeChange: (userType: string) => Promise<void>;
  onLocationChange: (type: 'state' | 'district' | 'mandal', value: string) => Promise<void>;
  onUserSearch: (searchTerm: string) => Promise<void>;
  onSaveToDraft: () => Promise<void>;
  onAssignTask: () => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({
  formData,
  setFormData,
  states,
  districts,
  mandals,
  loadingLocations,
  searchResults,
  loadingUsers,
  userSearchTerm,
  setUserSearchTerm,
  showUserDropdown,
  setShowUserDropdown,
  loadingOperations,
  onUserTypeChange,
  onLocationChange,
  onUserSearch,
  onSaveToDraft,
  onAssignTask,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debug logging
  console.log('TaskForm Props:', {
    formData: {
      userType: formData.userType,
      taskTitle: formData.taskTitle,
      taskDescription: formData.taskDescription,
      dueDate: formData.dueDate
    },
    states: states.length,
    districts: districts.length,
    mandals: mandals.length,
  });

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
          const selectedUserNames = formData.selectedUsers.map(userId => {
            const user = searchResults.find(u => u.id === userId);
            return user ? user.name : `User ${userId}`;
          });
          return `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount}): ${selectedUserNames.join(", ")}`;
        }
      }
    } else {
      // For collective types, only show count, not names
      if (totalCount > 0) {
        return `All ${getUserTypeDisplayName(formData.userType)} Selected (${totalCount})`;
      } else {
        return `All ${getUserTypeDisplayName(formData.userType)} Auto-Selected`;
      }
    }
  };

  const handleUserSelect = (user: User) => {
    const isSelected = formData.selectedUsers.includes(user.id);
    if (isSelected) {
      setFormData({
        ...formData,
        selectedUsers: formData.selectedUsers.filter(id => id !== user.id)
      });
    } else {
      setFormData({
        ...formData,
        selectedUsers: [...formData.selectedUsers, user.id]
      });
    }
  };

  const handleSelectAll = () => {
    const isIndividual = formData.userType.startsWith("individual-");
    const baseType = isIndividual ? formData.userType.replace("individual-", "") : formData.userType;
    const relevantUsers = searchResults.filter((user) => user.userType === baseType);
    const allUserIds = relevantUsers.map(user => user.id);
    
    setFormData({
      ...formData,
      selectedUsers: allUserIds
    });
  };

  const handleDeselectAll = () => {
    setFormData({
      ...formData,
      selectedUsers: [],
    });
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick as EventListener);
    return () => document.removeEventListener("mousedown", handleOutsideClick as EventListener);
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {/* Form Title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>
          Create New Task
        </h2>
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
                onUserTypeChange(e.target.value)
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

        {/* Location Fields */}
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
                  await onLocationChange('state', e.target.value);
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
                  await onLocationChange('district', e.target.value);
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
                  await onLocationChange('mandal', e.target.value);
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

        {/* User Search */}
        {formData.userType && (
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "Poppins" }}
            >
              {formData.userType.startsWith("individual-") ? "Search Assignees" : "Selected Users"}
            </label>
            <div className="relative" ref={dropdownRef}>
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
                    await onUserSearch(searchTerm);
                  }
                }}
                onClick={async () => {
                  if (formData.userType.startsWith("individual-")) {
                    setShowUserDropdown(true);
                    setUserSearchTerm("");
                    await onUserSearch("");
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
              
              {showUserDropdown && formData.userType.startsWith("individual-") && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {loadingUsers ? (
                    <div className="p-3 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mx-auto"></div>
                      <span className="ml-2">Searching...</span>
                    </div>
                  ) : (
                    <>
                      <div className="p-2 border-b">
                        <button
                          onClick={handleSelectAll}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Select All
                        </button>
                        <button
                          onClick={handleDeselectAll}
                          className="text-red-600 hover:text-red-800 text-sm ml-4"
                        >
                          Deselect All
                        </button>
                      </div>
                      {searchResults.map((user) => (
                        <div
                          key={user.id}
                          className="p-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                          onClick={() => handleUserSelect(user)}
                        >
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.memberId}</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={formData.selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelect(user)}
                            className="ml-2"
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
            placeholder="Enter task title"
          />
        </div>

        {/* Task Description */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "Poppins" }}
          >
            Task Description
          </label>
          <textarea
            value={formData.taskDescription}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, taskDescription: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
            placeholder="Enter task description"
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
            className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onSaveToDraft}
            disabled={!formData.taskTitle || loadingOperations}
            className={`px-4 py-2 rounded-md text-white transition-colors text-sm flex items-center gap-2 ${
              loadingOperations 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gray-600 hover:bg-gray-700"
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
            onClick={onAssignTask}
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
  );
};

export default TaskForm;
