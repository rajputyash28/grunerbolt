import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';

// Define interfaces for tasks
interface DraftTask {
  id: number;
  title: string;
  createdDate: string;
  status: 'Draft';
}

interface AssignedTask {
  id: number;
  title: string;
  assignedTo: string;
  state: string;
  district: string;
  mandal: string;
  assignedDate: string;
  status: 'Assigned';
}

// Union type for tasks
type Task = DraftTask | AssignedTask;

// Interface for user options
interface User {
  id: number;
  name: string;
  memberId: string;
  userType: string;
}

// Interface for form data
interface FormData {
  userType: string;
  state: string;
  district: string;
  mandal: string;
  selectedUsers: number[];
  taskDescription: string;
  dueDate: string;
}

const TaskManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'draft' | 'assigned' | 'create'>('draft');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [formData, setFormData] = useState<FormData>({
    userType: '',
    state: '',
    district: '',
    mandal: '',
    selectedUsers: [],
    taskDescription: '',
    dueDate: '',
  });

  // Sample data
  const [draftTasks, setDraftTasks] = useState<DraftTask[]>([
    {
      id: 1,
      title: 'Soil Testing Campaign',
      createdDate: '2024-03-15',
      status: 'Draft',
    },
    {
      id: 2,
      title: 'Farmer Training Session',
      createdDate: '2024-03-14',
      status: 'Draft',
    },
  ]);

  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([
    {
      id: 1,
      title: 'Crop Disease Survey',
      assignedTo: 'Kisani Didi',
      state: 'Uttar Pradesh',
      district: 'Noida',
      mandal: 'Sector1',
      assignedDate: '2024-03-10',
      status: 'Assigned',
    },
  ]);

  const userOptions: User[] = [
    { id: 1, name: 'Rajesh Kumar', memberId: 'MEM-FM-2024-001', userType: 'farm-manager' },
    { id: 2, name: 'Suresh Kumar', memberId: 'MEM-FM-2024-002', userType: 'farm-manager' },
    { id: 3, name: 'Priya Sharma', memberId: 'MEM-KD-2024-001', userType: 'kisani-didi' },
    { id: 4, name: 'Anita Singh', memberId: 'MEM-KD-2024-002', userType: 'kisani-didi' },
    { id: 5, name: 'Mukesh Patel', memberId: 'MEM-OP-2024-001', userType: 'operator' },
    { id: 6, name: 'Ramesh Gupta', memberId: 'MEM-OP-2024-002', userType: 'operator' },
    { id: 7, name: 'Sunita Devi', memberId: 'MEM-FM-2024-003', userType: 'individual-farm-manager' },
  ];

  const getCurrentData = (): Task[] => {
    const data = activeTab === 'assigned' ? assignedTasks : draftTasks;
    if (!searchTerm) return data;

    return data.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredUsers = (): User[] => {
    let filtered = userOptions;

    // Filter by user type if selected
    if (formData.userType) {
      filtered = filtered.filter((user) => user.userType === formData.userType);
    }

    // Filter by search term
    if (userSearchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
          user.memberId.toLowerCase().includes(userSearchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const handleTabChange = (tab: 'draft' | 'assigned' | 'create') => {
    setActiveTab(tab);
    setShowCreateForm(false);
    setSearchTerm('');
  };

  const handleCreateTask = () => {
    setShowCreateForm(true);
    setActiveTab('create');
  };

  const handleUserSelection = (userId: number) => {
    const isSelected = formData.selectedUsers.includes(userId);
    if (isSelected) {
      setFormData({
        ...formData,
        selectedUsers: formData.selectedUsers.filter((id) => id !== userId),
      });
    } else {
      setFormData({
        ...formData,
        selectedUsers: [...formData.selectedUsers, userId],
      });
    }
  };

  const handleSelectAll = () => {
    const filteredUsers = getFilteredUsers();
    const allUserIds = filteredUsers.map((user) => user.id);
    setFormData({
      ...formData,
      selectedUsers: allUserIds,
    });
  };

  const handleDeselectAll = () => {
    setFormData({
      ...formData,
      selectedUsers: [],
    });
  };

  const handleSaveToDraft = () => {
    if (formData.taskDescription) {
      const newTask: DraftTask = {
        id: draftTasks.length + 1,
        title: formData.taskDescription.split(' ').slice(0, 3).join(' '),
        createdDate: new Date().toISOString().split('T')[0],
        status: 'Draft',
      };
      setDraftTasks([...draftTasks, newTask]);

      // Reset form
      setFormData({
        userType: '',
        state: '',
        district: '',
        mandal: '',
        selectedUsers: [],
        taskDescription: '',
        dueDate: '',
      });
      setUserSearchTerm('');
      setShowCreateForm(false);
      setActiveTab('draft');
    }
  };

  const handleAssignTask = () => {
    if (formData.taskDescription && formData.selectedUsers.length > 0) {
      const selectedUser = userOptions.find((user) => user.id === formData.selectedUsers[0]);
      if (!selectedUser) return; // Early return if no user found

      const newTask: AssignedTask = {
        id: assignedTasks.length + 1,
        title: formData.taskDescription.split(' ').slice(0, 3).join(' '),
        assignedTo: selectedUser.name,
        state: formData.state || 'Uttar Pradesh',
        district: formData.district || 'Noida',
        mandal: formData.mandal || 'Sector1',
        assignedDate: new Date().toISOString().split('T')[0],
        status: 'Assigned',
      };
      setAssignedTasks([...assignedTasks, newTask]);

      // Reset form
      setFormData({
        userType: '',
        state: '',
        district: '',
        mandal: '',
        selectedUsers: [],
        taskDescription: '',
        dueDate: '',
      });
      setUserSearchTerm('');
      setShowCreateForm(false);
      setActiveTab('assigned');
    }
  };

  const handleCancel = () => {
    setFormData({
      userType: '',
      state: '',
      district: '',
      mandal: '',
      selectedUsers: [],
      taskDescription: '',
      dueDate: '',
    });
    setUserSearchTerm('');
    setShowCreateForm(false);
    setActiveTab('draft');
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
            Task Management
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => handleTabChange('draft')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'draft' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Draft Tasks
        </button>
        <button
          onClick={() => handleTabChange('assigned')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'assigned' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Assigned Tasks
        </button>
        <button
          onClick={handleCreateTask}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            showCreateForm ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Create Task
        </button>
      </div>

      {/* Search - Only show for Draft Tasks */}
      {!showCreateForm && activeTab === 'draft' && (
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Draft Tasks"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Inter', fontSize: '14px' }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      {showCreateForm ? (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="space-y-5">
            {/* Select User Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                Select User Type
              </label>
              <div className="relative">
                <select
                  value={formData.userType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFormData({ ...formData, userType: e.target.value, selectedUsers: [] })
                  }
                  className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
                  style={{ fontFamily: 'Inter', fontSize: '13px' }}
                >
                  <option value="">Select User Type</option>
                  <option value="farm-manager">Farm Manager</option>
                  <option value="individual-farm-manager">Individual Farm Manager</option>
                  <option value="kisani-didi">Kisani Didi</option>
                  <option value="individual-kisani-didi">Individual Kisani Didi</option>
                  <option value="operator">Operator</option>
                  <option value="individual-operator">Individual Operator</option>
                </select>
                <ChevronDown
                  className="absolute left-64 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div className="flex gap-3">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
      State
    </label>
    <div className="relative">
      <select
        value={formData.state}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setFormData({ ...formData, state: e.target.value })
        }
        className="w-[136px] pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
        style={{ fontFamily: 'Inter', fontSize: '13px' }}
      >
        <option value="">Select State</option>
        <option value="uttar-pradesh">Uttar Pradesh</option>
        <option value="gujarat">Gujarat</option>
        <option value="rajasthan">Rajasthan</option>
      </select>
      <ChevronDown
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        size={16}
      />
    </div>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
      District
    </label>
    <div className="relative">
      <select
        value={formData.district}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setFormData({ ...formData, district: e.target.value })
        }
        className="w-[136px] pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
        style={{ fontFamily: 'Inter', fontSize: '13px' }}
      >
        <option value="">Select District</option>
        <option value="noida">Noida</option>
        <option value="lucknow">Lucknow</option>
        <option value="ahmedabad">Ahmedabad</option>
      </select>
      <ChevronDown
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        size={16}
      />
    </div>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
      Mandal
    </label>
    <div className="relative">
      <select
        value={formData.mandal}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setFormData({ ...formData, mandal: e.target.value })
        }
        className="w-[136px] pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
        style={{ fontFamily: 'Inter', fontSize: '13px' }}
      >
        <option value="">Select Mandal</option>
        <option value="sector1">Sector1</option>
        <option value="sector2">Sector2</option>
      </select>
      <ChevronDown
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        size={16}
      />
    </div>
  </div>
</div>

            {/* Search Users */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                Search
              </label>
              <div className="relative mb-1">
                <input
                  type="text"
                  placeholder="Search by name or member ID"
                  value={userSearchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUserSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-t-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  style={{ fontFamily: 'Inter', fontSize: '13px' }}
                />
              </div>

              {/* User Selection Dropdown */}
              <div className="border border-gray-200 rounded-b-md border-t-0 max-h-32 overflow-y-auto bg-white">
                <div
                  className="px-3 py-2 text-xs text-gray-500 border-b bg-gray-50 flex justify-between items-center"
                  style={{ fontFamily: 'Inter' }}
                >
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
                {getFilteredUsers().map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 w-3 h-3 text-blue-600"
                      checked={formData.selectedUsers.includes(user.id)}
                      onChange={() => handleUserSelection(user.id)}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter', fontSize: '13px' }}>
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter', fontSize: '11px' }}>
                        {user.memberId}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                Enter task description
              </label>
              <textarea
                rows={3}
                value={formData.taskDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, taskDescription: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                placeholder="Enter task description"
                style={{ fontFamily: 'Inter', fontSize: '13px' }}
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-[535px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                style={{ fontFamily: 'Inter', fontSize: '13px' }}
                placeholder="dd/mm/yyyy"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                style={{ fontFamily: 'Inter', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveToDraft}
                disabled={!formData.taskDescription}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                style={{ fontFamily: 'Inter', fontSize: '13px' }}
              >
                Save to Draft
              </button>
              <button
                type="button"
                onClick={handleAssignTask}
                disabled={!formData.taskDescription || formData.selectedUsers.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                style={{ fontFamily: 'Inter', fontSize: '13px' }}
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  Task Title
                </th>
                {activeTab === 'assigned' && (
                  <>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      Assigned To
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      State
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      District
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      Mandal
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      Assigned Date
                    </th>
                  </>
                )}
                {activeTab === 'draft' && (
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    Created Date
                  </th>
                )}
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  Status
                </th>
                {activeTab === 'draft' && (
                  <th
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentData().map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {task.title}
                  </td>
                  {activeTab === 'assigned' && (
                    <>
                      <td
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontWeight: 400,
                        }}
                      >
                        {'assignedTo' in task ? task.assignedTo : '-'}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontWeight: 400,
                        }}
                      >
                        {'state' in task ? task.state : '-'}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontWeight: 400,
                        }}
                      >
                        {'district' in task ? task.district : '-'}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontWeight: 400,
                        }}
                      >
                        {'mandal' in task ? task.mandal : '-'}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontWeight: 400,
                        }}
                      >
                        {'assignedDate' in task ? task.assignedDate : '-'}
                      </td>
                    </>
                  )}
                  {activeTab === 'draft' && (
                    <td
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                    >
                      {'createdDate' in task ? task.createdDate : '-'}
                    </td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'Assigned' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}
                      style={{ fontFamily: 'Inter' }}
                    >
                      {task.status}
                    </span>
                  </td>
                  {activeTab === 'draft' && (
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600 text-lg">⋯</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {getCurrentData().length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500" style={{ fontFamily: 'Inter' }}>
                No {activeTab === 'draft' ? 'draft' : 'assigned'} tasks found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskManagement;