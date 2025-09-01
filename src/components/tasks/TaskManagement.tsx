import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';

const TaskManagement = () => {
  const [activeTab, setActiveTab] = useState('draft');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    state: '',
    district: '',
    mandal: '',
    selectedUsers: [],
    taskDescription: '',
    dueDate: ''
  });

  const draftTasks = [
    {
      id: 1,
      title: 'Soil Testing Campaign',
      createdDate: '2024-03-15',
      status: 'Draft'
    },
    {
      id: 2,
      title: 'Farmer Training Session',
      createdDate: '2024-03-14',
      status: 'Draft'
    }
  ];

  const assignedTasks = [
    {
      id: 1,
      title: 'Crop Disease Survey',
      assignedTo: 'Kisani Didi',
      state: 'Uttar Pradesh',
      district: 'Noida',
      mandal: 'Sector1',
      assignedDate: '2024-03-10',
      status: 'Assigned'
    }
  ];

  const userOptions = [
    { id: 1, name: 'Rajesh Kumar', memberId: 'MEM-FM-2024-001' },
    { id: 2, name: 'Suresh Kumar', memberId: 'MEM-FM-2024-002' }
  ];
  const getCurrentData = () => {
    switch (activeTab) {
      case 'assigned':
        return assignedTasks;
      default:
        return draftTasks;
    }
  };

  const handleCreateTask = () => {
    setShowCreateForm(true);
  };
  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>Task Management</h1>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Inter' }}>Create, manage, and assign tasks to field workers</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('draft')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'draft'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Draft Tasks
        </button>
        <button
          onClick={() => setActiveTab('assigned')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'assigned'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Assigned Tasks
        </button>
        <button
          onClick={handleCreateTask}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            showCreateForm
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Create Task
        </button>
      </div>

      {/* Search */}
      {!showCreateForm && (
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'draft' ? 'Draft' : 'Assigned'} Tasks`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            Filter
          </button>
        </div>
      )}

      {/* Content */}
      {showCreateForm ? (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="space-y-6">
            {/* Select User Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Select User Type
              </label>
              <div className="relative">
                <select 
                  value={formData.userType}
                  onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                  style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
                >
                  <option value="">Select User Type</option>
                  <option value="farm-manager">Farm Manager</option>
                  <option value="individual-farm-manager">Individual Farm Manager</option>
                  <option value="kisani-didi">Kisani Didi</option>
                  <option value="individual-kisani-didi">Individual Kisani Didi</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Location Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>State</label>
                <div className="relative">
                  <select 
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                    style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
                  >
                    <option value="">Select State</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="rajasthan">Rajasthan</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>District</label>
                <div className="relative">
                  <select 
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                    style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
                  >
                    <option value="">Select District</option>
                    <option value="noida">Noida</option>
                    <option value="lucknow">Lucknow</option>
                    <option value="ahmedabad">Ahmedabad</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>Mandal</label>
                <div className="relative">
                  <select 
                    value={formData.mandal}
                    onChange={(e) => setFormData({...formData, mandal: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                    style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
                  >
                    <option value="">Select Mandal</option>
                    <option value="sector1">Sector1</option>
                    <option value="sector2">Sector2</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>

            {/* Search Users */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or member ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              {/* User Selection Dropdown */}
              <div className="mt-2 border border-gray-200 rounded-lg max-h-32 overflow-y-auto">
                <div className="p-2 text-xs text-gray-500 border-b" style={{ fontFamily: 'Inter' }}>
                  Select All(7) &nbsp;&nbsp;&nbsp;&nbsp; Deselect All
                </div>
                {userOptions.map((user) => (
                  <div key={user.id} className="flex items-center p-2 hover:bg-gray-50">
                    <input type="checkbox" className="mr-3" />
                    <div>
                      <p className="text-sm font-medium" style={{ fontFamily: 'Inter', fontSize: '13.02px' }}>{user.name}</p>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>{user.memberId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Enter task description
              </label>
              <textarea
                rows={4}
                value={formData.taskDescription}
                onChange={(e) => setFormData({...formData, taskDescription: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter task description"
                style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
                placeholder="dd/mm/yyyy"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
              >
                Save to Draft
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
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
                <th className="px-6 py-3 text-left" style={{ 
                  fontFamily: 'Inter', 
                  fontSize: '13.56px', 
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Task Title
                </th>
                {activeTab === 'assigned' && (
                  <>
                    <th className="px-6 py-3 text-left" style={{ 
                      fontFamily: 'Inter', 
                      fontSize: '13.56px', 
                      fontWeight: 600,
                      color: '#374151'
                    }}>
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left" style={{ 
                      fontFamily: 'Inter', 
                      fontSize: '13.56px', 
                      fontWeight: 600,
                      color: '#374151'
                    }}>
                      State
                    </th>
                    <th className="px-6 py-3 text-left" style={{ 
                      fontFamily: 'Inter', 
                      fontSize: '13.56px', 
                      fontWeight: 600,
                      color: '#374151'
                    }}>
                      District
                    </th>
                    <th className="px-6 py-3 text-left" style={{ 
                      fontFamily: 'Inter', 
                      fontSize: '13.56px', 
                      fontWeight: 600,
                      color: '#374151'
                    }}>
                      Mandal
                    </th>
                    <th className="px-6 py-3 text-left" style={{ 
                      fontFamily: 'Inter', 
                      fontSize: '13.56px', 
                      fontWeight: 600,
                      color: '#374151'
                    }}>
                      Assigned Date
                    </th>
                  </>
                )}
                {activeTab === 'draft' && (
                  <th className="px-6 py-3 text-left" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.56px', 
                    fontWeight: 600,
                    color: '#374151'
                  }}>
                    Created Date
                  </th>
                )}
                <th className="px-6 py-3 text-left" style={{ 
                  fontFamily: 'Inter', 
                  fontSize: '13.56px', 
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Status
                </th>
                <th className="px-6 py-3 text-left" style={{ 
                  fontFamily: 'Inter', 
                  fontSize: '13.56px', 
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentData().map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {task.title}
                  </td>
                  {activeTab === 'assigned' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                        fontFamily: 'Inter', 
                        fontSize: '13.02px', 
                        fontWeight: 400,
                        color: '#4A5565'
                      }}>
                        {(task as any).assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                        fontFamily: 'Inter', 
                        fontSize: '13.02px', 
                        fontWeight: 400,
                        color: '#4A5565'
                      }}>
                        {(task as any).state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                        fontFamily: 'Inter', 
                        fontSize: '13.02px', 
                        fontWeight: 400,
                        color: '#4A5565'
                      }}>
                        {(task as any).district}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                        fontFamily: 'Inter', 
                        fontSize: '13.02px', 
                        fontWeight: 400,
                        color: '#4A5565'
                      }}>
                        {(task as any).mandal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                        fontFamily: 'Inter', 
                        fontSize: '13.02px', 
                        fontWeight: 400,
                        color: '#4A5565'
                      }}>
                        {(task as any).assignedDate}
                      </td>
                    </>
                  )}
                  {activeTab === 'draft' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                      fontFamily: 'Inter', 
                      fontSize: '13.02px', 
                      fontWeight: 400,
                      color: '#4A5565'
                    }}>
                      {(task as any).createdDate}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      task.status === 'Assigned'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      ⋯
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;