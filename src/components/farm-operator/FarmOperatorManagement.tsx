import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Edit, Ban, Trash, X, ChevronDown, Eye, Users, Clock } from 'lucide-react';
import FilterMenu from './components/FilterMenu';
import StatsCards from './components/StatsCards';
import ActionMenu from './components/ActionMenu';
import ConfirmationDialog from './components/ConfirmationDialog';
import { FarmOperator, PendingApproval, FilterState } from './types/farmOperatorTypes';
import { mockFarmOperators, mockPendingApprovals } from './data/mockData';

const FarmOperatorManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState<number | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState<number | null>(null);
  const [showBlockDialog, setShowBlockDialog] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    state: '',
    district: '',
    mandal: '',
    landSizeFrom: '',
    landSizeTo: ''
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    state: '',
    district: '',
    mandal: '',
    landSizeFrom: '',
    landSizeTo: ''
  });

  const [allFarmOperators, setAllFarmOperators] = useState<FarmOperator[]>(mockFarmOperators);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>(mockPendingApprovals);

  const handleViewProfile = (operator: FarmOperator) => {
    navigate(`/farm-operators/${operator.id}`);
  };

  const handleViewPendingProfile = (approval: PendingApproval) => {
    navigate(`/farm-operators/${approval.id}?pending=true`);
  };

  const handleEdit = (operator: FarmOperator) => {
    navigate(`/farm-operators/edit/${operator.id}`);
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

  const handleBlock = (operatorId: number) => {
    setShowBlockDialog(operatorId);
  };

  const confirmDelete = () => {
    if (showDeleteDialog) {
      setAllFarmOperators(prev => prev.filter(op => op.id !== showDeleteDialog));
      console.log('Deleting operator:', showDeleteDialog);
      setShowDeleteDialog(null);
    }
  };

  const confirmApprove = () => {
    if (showApproveDialog) {
      const approval = pendingApprovals.find(p => p.id === showApproveDialog);
      if (approval) {
        // Move to approved list
        const newOperator: FarmOperator = {
          id: approval.id,
          name: approval.name,
          memberId: approval.memberId,
          mobile: approval.mobile,
          location: approval.location,
          status: 'Active',
          assignedTasks: '0/0',
          joinedDate: new Date().toISOString().split('T')[0],
          profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150'
        };
        setAllFarmOperators(prev => [...prev, newOperator]);
        setPendingApprovals(prev => prev.filter(p => p.id !== showApproveDialog));
      }
      console.log('Approving:', showApproveDialog);
      setShowApproveDialog(null);
    }
  };

  const confirmReject = () => {
    if (showRejectDialog) {
      setPendingApprovals(prev => prev.filter(p => p.id !== showRejectDialog));
      console.log('Rejecting:', showRejectDialog);
      setShowRejectDialog(null);
    }
  };

  const confirmBlock = () => {
    if (showBlockDialog) {
      setAllFarmOperators(prev => 
        prev.map(op => 
          op.id === showBlockDialog 
            ? { ...op, status: op.status === 'Active' ? 'Inactive' : 'Active' }
            : op
        )
      );
      console.log('Blocking/Unblocking operator:', showBlockDialog);
      setShowBlockDialog(null);
    }
  };

  const toggleActionMenu = (operatorId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === operatorId ? null : operatorId);
  };

  // Filter functions
  const handleFilterChange = (field: keyof FilterState, value: string) => {
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

  const removeFilter = (field: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [field]: '' }));
    setAppliedFilters(prev => ({ ...prev, [field]: '' }));
  };

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

  // Apply filters to data
  const applyFiltersToData = (data: FarmOperator[]) => {
    return data.filter(operator => {
      if (appliedFilters.state && !operator.location.toLowerCase().includes(appliedFilters.state.toLowerCase())) {
        return false;
      }
      if (appliedFilters.district && !operator.location.toLowerCase().includes(appliedFilters.district.toLowerCase())) {
        return false;
      }
      if (appliedFilters.mandal && !operator.location.toLowerCase().includes(appliedFilters.mandal.toLowerCase())) {
        return false;
      }
      return true;
    });
  };

  const filteredData = activeTab === 'all' 
    ? applyFiltersToData(allFarmOperators).filter(operator =>
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
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>Farm Operator Management</h1>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
        >
          <Plus size={20} />
          Add New Farm Operator
        </button>
      </div>

      {/* Stats Cards */}
      <StatsCards 
        totalOperators={allFarmOperators.length}
        pendingApprovals={pendingApprovals.length}
      />

      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2 w-[275px] h-[46px] border border-gray-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-[80px] h-[38px] ${
            activeTab === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}
        >
          All FOs
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-[170px] h-[38px] ${
            activeTab === 'pending'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}
        >
          Pending Approvals ({pendingApprovals.length})
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
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
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
            <FilterMenu
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onApplyFilters={handleApplyFilters}
              onClose={() => setShowFilterMenu(false)}
            />
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
                onClick={() => removeFilter('state')}
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
                onClick={() => removeFilter('district')}
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
                onClick={() => removeFilter('mandal')}
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
                  removeFilter('landSizeFrom');
                  removeFilter('landSizeTo');
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
                fontFamily: 'Inter', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Name
              </th>
              <th className="px-6 py-3 text-left" style={{ 
                fontFamily: 'Inter', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Member ID
              </th>
              <th className="px-6 py-3 text-left" style={{ 
                fontFamily: 'Inter', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Mobile
              </th>
              <th className="px-6 py-3 text-left" style={{ 
                fontFamily: 'Inter', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Location
              </th>
              {activeTab === 'all' && (
                <>
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
                    Assigned Tasks
                  </th>
                </>
              )}
              {activeTab === 'pending' && (
                <th className="px-6 py-3 text-left" style={{ 
                  fontFamily: 'Inter', 
                  fontSize: '13.56px', 
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Applied Date
                </th>
              )}
              <th className="px-6 py-3 text-left w-24" style={{ 
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
            {activeTab === 'all' ? (
              (filteredData as FarmOperator[]).map((operator) => (
                <tr key={operator.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewProfile(operator)}
                      className="text-sm font-semibold hover:text-blue-600 underline"
                      style={{ 
                        fontFamily: 'Inter', 
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
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {operator.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {operator.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
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
                    fontFamily: 'Inter', 
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
                      <ActionMenu
                        ref={actionMenuRef}
                        onViewProfile={() => {
                          handleViewProfile(operator);
                          setShowActionMenu(null);
                        }}
                        onEdit={() => {
                          handleEdit(operator);
                          setShowActionMenu(null);
                        }}
                        onBlock={() => {
                          handleBlock(operator.id);
                          setShowActionMenu(null);
                        }}
                        onDelete={() => {
                          handleDelete(operator.id);
                          setShowActionMenu(null);
                        }}
                        operatorStatus={operator.status}
                      />
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
                        fontFamily: 'Inter', 
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
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {approval.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {approval.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {approval.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
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

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={!!showDeleteDialog}
        title="Delete Farm Operator"
        message="Are you sure you want to delete this Farm Operator? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteDialog(null)}
        confirmText="Yes"
        cancelText="No"
      />

      <ConfirmationDialog
        isOpen={!!showApproveDialog}
        title="Approve User"
        message="Are you sure you want to Approve this User"
        onConfirm={confirmApprove}
        onCancel={() => setShowApproveDialog(null)}
        confirmText="Yes"
        cancelText="No"
      />

      <ConfirmationDialog
        isOpen={!!showRejectDialog}
        title="Reject User"
        message="Are you sure you want to Reject this User"
        onConfirm={confirmReject}
        onCancel={() => setShowRejectDialog(null)}
        confirmText="Yes"
        cancelText="No"
      />

      <ConfirmationDialog
        isOpen={!!showBlockDialog}
        title={allFarmOperators.find(op => op.id === showBlockDialog)?.status === 'Active' ? 'Block User' : 'Unblock User'}
        message={`Are you sure you want to ${allFarmOperators.find(op => op.id === showBlockDialog)?.status === 'Active' ? 'block' : 'unblock'} this User?`}
        onConfirm={confirmBlock}
        onCancel={() => setShowBlockDialog(null)}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default FarmOperatorManagement;