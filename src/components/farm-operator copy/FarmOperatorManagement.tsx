import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Edit, Ban, Trash, X, ChevronDown, Eye, Users, Clock } from 'lucide-react';

interface FarmOperator {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive';
  assignedTasks: string;
  joinedDate: string;
  profileImage: string;
}

interface PendingApproval {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  appliedDate: string;
}

const FarmOperatorManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState<number | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    mandal: '',
    landSizeFrom: '',
    landSizeTo: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({
    state: '',
    district: '',
    mandal: '',
    landSizeFrom: '',
    landSizeTo: ''
  });

  const allFarmOperators: FarmOperator[] = [
    {
      id: 1,
      name: 'Ravi Sharma',
      memberId: 'MEM-KD-2024-001',
      mobile: '+91 9785432110',
      location: 'Rajasthan, Jaipur, Sangaria',
      status: 'Active',
      assignedTasks: '10/12',
      joinedDate: '2024-01-10',
      profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Ravi Sharma',
      memberId: 'MEM-KD-2024-002',
      mobile: '+91 9876543211',
      location: 'Uttar Pradesh, Lucknow, Gomti Nagar',
      status: 'Active',
      assignedTasks: '7/8',
      joinedDate: '2024-01-15',
      profileImage: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      name: 'Geeta Verma',
      memberId: 'MEM-KD-2024-003',
      mobile: '+91 9876543212',
      location: 'Madhya Pradesh, Bhopal, Indrapuri',
      status: 'Inactive',
      assignedTasks: '3/5',
      joinedDate: '2024-01-20',
      profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 4,
      name: 'Anjali Yadav',
      memberId: 'MEM-KD-2024-004',
      mobile: '+91 9876543213',
      location: 'Maharashtra, Mumbai, Andheri',
      status: 'Active',
      assignedTasks: '9/10',
      joinedDate: '2024-01-25',
      profileImage: 'https://images.pexels.com/photos/7403910/pexels-photo-7403910.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 5,
      name: 'Deepika Patel',
      memberId: 'MEM-KD-2024-005',
      mobile: '+91 9876543214',
      location: 'Gujarat, Ahmedabad, Naranpura',
      status: 'Active',
      assignedTasks: '12/15',
      joinedDate: '2024-02-01',
      profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const pendingApprovals: PendingApproval[] = [
    {
      id: 101,
      name: 'Kavita Singh',
      memberId: 'MEM-KD-2024-101',
      mobile: '+91 9876543220',
      location: 'Bihar, Patna, Boring Road',
      appliedDate: '2024-03-15'
    },
    {
      id: 102,
      name: 'Ritu Kumari',
      memberId: 'MEM-KD-2024-102',
      mobile: '+91 9876543221',
      location: 'Jharkhand, Ranchi, Hinoo',
      appliedDate: '2024-03-18'
    },
    {
      id: 103,
      name: 'Neha Sharma',
      memberId: 'MEM-KD-2024-103',
      mobile: '+91 9876543222',
      location: 'Assam, Guwahati, Dispur',
      appliedDate: '2024-03-20'
    }
  ];

  const handleViewProfile = (operator: FarmOperator) => {
    navigate(`/farm-operators/${operator.id}`);
  };

  const handleViewPendingProfile = (approval: PendingApproval) => {
    navigate(`/farm-operators/${approval.id}?pending=true`);
  };

  const handleEdit = (operator: FarmOperator) => {
    navigate(`/farm-operators/${operator.id}?edit=true`);
  };

  const handleAddNew = () => {
    navigate('/farm-operators/add');
  };

  const handleApprove = (approval: PendingApproval) => {
    setShowApproveDialog(approval.id);
  };

  const handleReject = (approval: PendingApproval) => {
    setShowRejectDialog(approval.id);
  };

  const handleReview = (approval: PendingApproval) => {
    handleViewPendingProfile(approval);
  };

  const handleDelete = (operatorId: number) => {
    setShowDeleteDialog(operatorId);
  };

  const confirmDelete = () => {
    console.log('Deleting operator:', showDeleteDialog);
    setShowDeleteDialog(null);
  };

  const confirmApprove = () => {
    console.log('Approving:', showApproveDialog);
    setShowApproveDialog(null);
  };

  const confirmReject = () => {
    console.log('Rejecting:', showRejectDialog);
    setShowRejectDialog(null);
  };

  const toggleActionMenu = (operatorId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === operatorId ? null : operatorId);
  };

  // Filter functions
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      state: '',
      district: '',
      mandal: '',
      landSizeFrom: '',
      landSizeTo: ''
    });
    setAppliedFilters({
      state: '',
      district: '',
      mandal: '',
      landSizeFrom: '',
      landSizeTo: ''
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setShowFilterMenu(false);
  };

  const hasActiveFilters = Object.values(appliedFilters).some(value => value !== '');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isActionButton = (event.target as HTMLElement).closest('button[title="More Actions"]');
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node) && !isActionButton) {
        setShowActionMenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredData = activeTab === 'all' 
    ? allFarmOperators.filter(operator =>
        operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        operator.mobile.includes(searchTerm) ||
        operator.memberId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : pendingApprovals.filter(approval =>
        approval.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        approval.mobile.includes(searchTerm) ||
        approval.memberId.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="space-y-6" style={{ fontFamily: 'Poppins' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>Farm Operator Management</h1>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'Poppins', fontSize: '13.02px', fontWeight: 600 }}
        >
          <Plus size={20} />
          Add New Farm Operator
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4" style={{ marginTop: '10px' }}>
        <div className="bg-white border border-gray-200 rounded-xl" style={{ 
          width: '279px', 
          height: '119px', 
          opacity: 1,
          borderRadius: '12px',
          borderWidth: '1px'
        }}>
          <div className="flex items-center gap-3 p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Poppins' }}>Total Farm Operator</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>156</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl" style={{ 
          width: '279px', 
          height: '119px', 
          opacity: 1,
          borderRadius: '12px',
          borderWidth: '1px'
        }}>
          <div className="flex items-center gap-3 p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Poppins' }}>Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2 w-[275px] h-[46px] border border-gray-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-[80px] h-[38px] ${
            activeTab === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
        >
          All FMs
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-[170px] h-[38px] ${
            activeTab === 'pending'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
        >
          Pending Approvals (3)
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, mobile, or member ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[500px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            style={{ fontFamily: 'Poppins', fontSize: '13.02px' }}
          />
        </div>
        
        {/* Filter Button */}
        <div className="relative">
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          </button>
          
          {showFilterMenu && (
            <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 space-y-4 h-[390px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Filter by</h3>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={19} className="text-[#000000]" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* State Filter */}
                  <div className="relative">
                    <select
                      value={filters.state}
                      onChange={(e) => handleFilterChange('state', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">States</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* District Filter */}
                  <div className="relative">
                    <select
                      value={filters.district}
                      onChange={(e) => handleFilterChange('district', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Districts</option>
                      <option value="Ludhiana">Ludhiana</option>
                      <option value="Karnal">Karnal</option>
                      <option value="Amritsar">Amritsar</option>
                      <option value="Panipat">Panipat</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Udaipur">Udaipur</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* Mandal Filter */}
                  <div className="relative">
                    <select
                      value={filters.mandal}
                      onChange={(e) => handleFilterChange('mandal', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Mandals</option>
                      <option value="Ludhiana-I">Ludhiana-I</option>
                      <option value="Karnal-II">Karnal-II</option>
                      <option value="Amritsar-I">Amritsar-I</option>
                      <option value="Panipat-I">Panipat-I</option>
                      <option value="Sanganer">Sanganer</option>
                      <option value="Girwa">Girwa</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* Land Size Filter */}
                  <div className="border rounded p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Land size</label>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">From</label>
                        <input
                          type="number"
                          placeholder=""
                          value={filters.landSizeFrom}
                          onChange={(e) => handleFilterChange('landSizeFrom', e.target.value)}
                          className="w-[35px] h-[15px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <label className="whitespace-nowrap">To</label>
                        <input
                          type="number"
                          placeholder=""
                          value={filters.landSizeTo}
                          onChange={(e) => handleFilterChange('landSizeTo', e.target.value)}
                          className="w-[35px] h-[15px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3">
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 px-3 py-2 font-bold text-black bg-white border border-gray-300 rounded-md transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Active filters:</span>
          {appliedFilters.state && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
              State: {appliedFilters.state}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, state: '' }));
                  setAppliedFilters(prev => ({ ...prev, state: '' }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {appliedFilters.district && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
              District: {appliedFilters.district}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, district: '' }));
                  setAppliedFilters(prev => ({ ...prev, district: '' }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {appliedFilters.mandal && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
              Mandal: {appliedFilters.mandal}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, mandal: '' }));
                  setAppliedFilters(prev => ({ ...prev, mandal: '' }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {(appliedFilters.landSizeFrom || appliedFilters.landSizeTo) && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
              Land Size: {appliedFilters.landSizeFrom || '0'} - {appliedFilters.landSizeTo || '∞'}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, landSizeFrom: '', landSizeTo: '' }));
                  setAppliedFilters(prev => ({ ...prev, landSizeFrom: '', landSizeTo: '' }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="px-6 py-3 text-left" style={{ 
                fontFamily: 'Poppins', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Name
              </th>
              <th className="px-6 py-3 text-left" style={{ 
                fontFamily: 'Poppins', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Member ID
              </th>
              <th className="px-6 py-3 text-left" style={{ 
                fontFamily: 'Poppins', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Mobile
              </th>
              <th className="px-6 py-3 text-left" style={{ 
                fontFamily: 'Poppins', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Location
              </th>
              {activeTab === 'all' && (
                <>
                  <th className="px-6 py-3 text-left" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.56px', 
                    fontWeight: 600,
                    color: '#374151'
                  }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.56px', 
                    fontWeight: 600,
                    color: '#374151'
                  }}>
                    Assigned Tasks
                  </th>
                </>
              )}
              {activeTab === 'pending' && (
                <th className="px-6 py-3 text-left" style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '13.56px', 
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Applied Date
                </th>
              )}
              <th className="px-6 py-3 text-left w-24" style={{ 
                fontFamily: 'Poppins', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activeTab === 'all' ? (
              (filteredData as FarmOperator[]).map((operator) => (
                <tr key={operator.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewProfile(operator)}
                      className="text-sm font-semibold hover:text-blue-600 underline"
                      style={{ 
                        fontFamily: 'Poppins', 
                        fontSize: '13.02px', 
                        fontWeight: 600,
                        color: '#101828',
                        textDecoration: 'underline'
                      }}
                    >
                      {operator.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {operator.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {operator.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {operator.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      operator.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {operator.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {operator.assignedTasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right relative">
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => toggleActionMenu(operator.id, e)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="More Actions"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    {showActionMenu === operator.id && (
                      <div ref={actionMenuRef} className="absolute right-6 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              handleEdit(operator);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Ban size={16} />
                            Block
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(operator.id);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              (filteredData as PendingApproval[]).map((approval) => (
                <tr key={approval.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewPendingProfile(approval)}
                      className="text-sm font-semibold hover:text-blue-600 underline"
                      style={{ 
                        fontFamily: 'Poppins', 
                        fontSize: '13.02px', 
                        fontWeight: 600,
                        color: '#101828',
                        textDecoration: 'underline'
                      }}
                    >
                      {approval.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {approval.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {approval.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {approval.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {approval.appliedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleReview(approval)}
                        className="px-3 py-1 text-xs border border-gray bg-white-100 text-black-800 rounded hover:bg-gray-200"
                      >
                        Review
                      </button>
                      <button 
                        onClick={() => handleApprove(approval)}
                        className="px-3 py-1 text-xs border border-gray bg-white-100 text-black-800 rounded hover:bg-gray-200"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(approval)}
                        className="px-3 py-1 text-xs border border-gray bg-white-100 text-black-800 rounded hover:bg-gray-200"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Delete Farm Operator</h2>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to delete this Farm Operator? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteDialog(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Confirmation Dialog */}
      {showApproveDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Approve User</h2>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to Approve this User</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowApproveDialog(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                No
              </button>
              <button
                onClick={confirmApprove}
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Reject User</h2>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to Reject this User</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowRejectDialog(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                No
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
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

export default FarmOperatorManagement;