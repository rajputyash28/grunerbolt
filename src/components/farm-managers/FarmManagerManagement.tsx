import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import StatsCards from './management/StatsCards';
import TabNavigation from './management/TabNavigation';
import FilterMenu from './management/FilterMenu';
import FarmManagerTable from './management/FarmManagerTable';
import ConfirmationDialog from './shared/ConfirmationDialog';

interface FarmManager {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rejected' | 'Blocked';
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
  status: 'Pending' | 'Rejected';
  appliedDate: string;
}

const FarmManagerManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null);
  const [showBlockDialog, setShowBlockDialog] = useState<number | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState<number | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [filters, setFilters] = useState({
    status: '',
    state: '',
    district: '',
    mandal: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({
    status: '',
    state: '',
    district: '',
    mandal: ''
  });

  const [allFarmManagers, setAllFarmManagers] = useState<FarmManager[]>([
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
  ]);

  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([
    {
      id: 101,
      name: 'Kavita Singh',
      memberId: 'MEM-KD-2024-101',
      mobile: '+91 9876543220',
      location: 'Bihar, Patna, Boring Road',
      status: 'Pending',
      appliedDate: '2024-03-15'
    },
    {
      id: 102,
      name: 'Ritu Kumari',
      memberId: 'MEM-KD-2024-102',
      mobile: '+91 9876543221',
      location: 'Jharkhand, Ranchi, Hinoo',
      status: 'Pending',
      appliedDate: '2024-03-18'
    },
    {
      id: 103,
      name: 'Neha Sharma',
      memberId: 'MEM-KD-2024-103',
      mobile: '+91 9876543222',
      location: 'Assam, Guwahati, Dispur',
      status: 'Pending',
      appliedDate: '2024-03-20'
    }
  ]);

  const handleViewProfile = (manager: FarmManager) => {
    // TODO: Integrate API call for viewing farm manager profile
    // API Endpoint: GET /api/farm-managers/{id}
    // Example: await getFarmManagerProfile(manager.id);
    navigate(`/farm-managers/${manager.id}`);
  };

  const handleViewPendingProfile = (approval: PendingApproval) => {
    // TODO: Integrate API call for viewing pending farm manager profile
    // API Endpoint: GET /api/farm-managers/{id}/pending
    // Example: await getPendingFarmManagerProfile(approval.id);
    navigate(`/farm-managers/${approval.id}?pending=true`);
  };

  const handleEdit = (manager: FarmManager) => {
    // TODO: Integrate API call for editing farm manager
    // API Endpoint: PUT /api/farm-managers/{id}
    // Example: await updateFarmManager(manager.id, formData);
    navigate(`/farm-managers/${manager.id}?edit=true`);
  };

  const handleAddNew = () => {
    // TODO: Integrate API call for adding new farm manager
    // API Endpoint: POST /api/farm-managers
    // Example: await createFarmManager(formData);
    navigate('/farm-managers/add');
  };

  const handleApprove = (approval: PendingApproval) => {
    // TODO: Integrate API call for approving farm manager
    // API Endpoint: PUT /api/farm-managers/{id}/approve
    // Example: await approveFarmManager(approval.id);
    setShowApproveDialog(approval.id);
  };

  const handleReject = (approval: PendingApproval) => {
    // TODO: Integrate API call for rejecting farm manager
    // API Endpoint: PUT /api/farm-managers/{id}/reject
    // Example: await rejectFarmManager(approval.id);
    setShowRejectDialog(approval.id);
  };

  const handleReview = (approval: PendingApproval) => {
    // TODO: Integrate API call for reviewing farm manager
    // API Endpoint: GET /api/farm-managers/{id}/review
    // Example: await reviewFarmManager(approval.id);
    handleViewPendingProfile(approval);
  };

  const handleDelete = (managerId: number) => {
    setShowDeleteDialog(managerId);
  };

  const handleBlock = (managerId: number) => {
    setShowBlockDialog(managerId);
  };

  // Approval and rejection confirmation handlers
  const confirmApprove = (approvalId: number) => {
    // TODO: Integrate API call for confirming approval
    // API Endpoint: PUT /api/farm-managers/{id}/approve
    // Example: await confirmApproval(approvalId);
    
    const approval = pendingApprovals.find(p => p.id === approvalId);
    if (approval) {
      // Convert PendingApproval to FarmManager and add to allFarmManagers
      const newFarmManager: FarmManager = {
        id: approval.id,
        name: approval.name,
        memberId: approval.memberId,
        mobile: approval.mobile,
        location: approval.location,
        status: 'Active',
        assignedTasks: '0/0',
        joinedDate: approval.appliedDate,
        profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150'
      };
      
      // Add to all farm managers
      setAllFarmManagers(prev => [...prev, newFarmManager]);
      
      // Remove from pending approvals
      setPendingApprovals(prev => prev.filter(p => p.id !== approvalId));
    }
    
    setShowApproveDialog(null);
  };

  const confirmReject = (approvalId: number) => {
    // TODO: Integrate API call for confirming rejection
    // API Endpoint: PUT /api/farm-managers/{id}/reject
    // Example: await confirmRejection(approvalId);
    
    // Simply remove from pending approvals (rejected users don't appear anywhere)
    setPendingApprovals(prev => prev.filter(p => p.id !== approvalId));
    setShowRejectDialog(null);
  };

  const confirmDelete = () => {
    console.log('Deleting manager:', showDeleteDialog);
    // TODO: Integrate API call for deleting farm manager
    // API Endpoint: DELETE /api/farm-managers/{id}
    // Example: await deleteFarmManager(showDeleteDialog);
    setShowDeleteDialog(null);
  };

  const confirmBlock = () => {
    console.log('Blocking manager:', showBlockDialog);
    // TODO: Integrate API call for blocking farm manager
    // API Endpoint: PUT /api/farm-managers/{id}/block
    // Example: await blockFarmManager(showBlockDialog);
    
    // Update local state - toggle between 'Blocked' and 'Active'
    if (showBlockDialog) {
      setAllFarmManagers(prev => 
        prev.map(manager => 
          manager.id === showBlockDialog 
            ? { ...manager, status: manager.status === 'Blocked' ? 'Active' : 'Blocked' as any }
            : manager
        )
      );
    }
    
    setShowBlockDialog(null);
  };

  const toggleActionMenu = (managerId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === managerId ? null : managerId);
  };

  // Filter functions
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [field]: value };
      
      // Reset dependent fields when parent field changes
      if (field === 'state') {
        newFilters.district = '';
        newFilters.mandal = '';
      } else if (field === 'district') {
        newFilters.mandal = '';
      }
      
      return newFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      state: '',
      district: '',
      mandal: ''
    });
    setAppliedFilters({
      status: '',
      state: '',
      district: '',
      mandal: ''
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setShowFilterMenu(false);
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

  // Check for approval/rejection changes from profile page
  useEffect(() => {
    const checkForApprovalChanges = () => {
      // Check for approval
      const approvalData = localStorage.getItem('farmManagerApproval');
      if (approvalData) {
        const { id, action } = JSON.parse(approvalData);
        if (action === 'approve') {
          const approval = pendingApprovals.find(p => p.id === id);
          if (approval) {
            // Convert PendingApproval to FarmManager and add to allFarmManagers
            const newFarmManager: FarmManager = {
              id: approval.id,
              name: approval.name,
              memberId: approval.memberId,
              mobile: approval.mobile,
              location: approval.location,
              status: 'Active',
              assignedTasks: '0/0',
              joinedDate: approval.appliedDate,
              profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150'
            };
            
            // Add to all farm managers
            setAllFarmManagers(prev => [...prev, newFarmManager]);
            
            // Remove from pending approvals
            setPendingApprovals(prev => prev.filter(p => p.id !== id));
          }
        }
        localStorage.removeItem('farmManagerApproval');
      }

      // Check for rejection
      const rejectionData = localStorage.getItem('farmManagerRejection');
      if (rejectionData) {
        const { id, action } = JSON.parse(rejectionData);
        if (action === 'reject') {
          // Remove from pending approvals
          setPendingApprovals(prev => prev.filter(p => p.id !== id));
        }
        localStorage.removeItem('farmManagerRejection');
      }
    };

    checkForApprovalChanges();
  }, [pendingApprovals]);

  const filteredData = activeTab === 'all' 
    ? allFarmManagers
        .filter(manager => manager.status !== 'Rejected') // Exclude rejected managers
        .filter(manager =>
          manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          manager.mobile.includes(searchTerm) ||
          manager.memberId.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(manager => {
          if (appliedFilters.status && manager.status !== appliedFilters.status) return false;
          if (appliedFilters.state && !manager.location.includes(appliedFilters.state)) return false;
          if (appliedFilters.district && !manager.location.includes(appliedFilters.district)) return false;
          if (appliedFilters.mandal && !manager.location.includes(appliedFilters.mandal)) return false;
          return true;
        })
    : pendingApprovals
        .filter(approval => approval.status === 'Pending') // Only show pending approvals
        .filter(approval =>
          approval.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          approval.mobile.includes(searchTerm) ||
          approval.memberId.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="space-y-6" style={{ fontFamily: 'Poppins' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>Farm Manager Management</h1>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'Poppins', fontSize: '13.02px', fontWeight: 600 }}
        >
          <Plus size={20} />
          Add New Farm Manager
        </button>
      </div>

      {/* Stats Cards */}
      <StatsCards 
        totalFarmManagers={allFarmManagers.length} 
        pendingApprovals={pendingApprovals.length} 
      />

      {/* Tabs */}
      <TabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingCount={pendingApprovals.length} 
      />

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
        
        <FilterMenu
          showFilterMenu={showFilterMenu}
          setShowFilterMenu={setShowFilterMenu}
          filters={filters}
          appliedFilters={appliedFilters}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          handleApplyFilters={handleApplyFilters}
        />
      </div>

      {/* Table */}
      <FarmManagerTable
        activeTab={activeTab}
        filteredData={filteredData}
        handleViewProfile={handleViewProfile}
        handleViewPendingProfile={handleViewPendingProfile}
        showActionMenu={showActionMenu}
        actionMenuRef={actionMenuRef}
        toggleActionMenu={toggleActionMenu}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleBlock={handleBlock}
        handleReview={handleReview}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={!!showDeleteDialog}
        onClose={() => setShowDeleteDialog(null)}
        onConfirm={confirmDelete}
        title="Delete Farm Manager"
        message="Are you sure you want to delete this Farm Manager? This action cannot be undone."
      />

      <ConfirmationDialog
        isOpen={!!showBlockDialog}
        onClose={() => setShowBlockDialog(null)}
        onConfirm={confirmBlock}
        title={showBlockDialog ? (allFarmManagers.find(op => op.id === showBlockDialog)?.status === 'Blocked' ? 'Unblock Farm Manager' : 'Block Farm Manager') : 'Block Farm Manager'}
        message={showBlockDialog ? (allFarmManagers.find(op => op.id === showBlockDialog)?.status === 'Blocked' ? 'Are you sure you want to unblock this Farm Manager? They will be able to access the system again.' : 'Are you sure you want to block this Farm Manager? They will not be able to access the system.') : 'Are you sure you want to block this Farm Manager? They will not be able to access the system.'}
      />

      <ConfirmationDialog
        isOpen={!!showApproveDialog}
        onClose={() => setShowApproveDialog(null)}
        onConfirm={() => confirmApprove(showApproveDialog!)}
        title="Approve User"
        message="Are you sure you want to Approve this User"
      />

      <ConfirmationDialog
        isOpen={!!showRejectDialog}
        onClose={() => setShowRejectDialog(null)}
        onConfirm={() => confirmReject(showRejectDialog!)}
        title="Reject User"
        message="Are you sure you want to Reject this User"
      />
    </div>
  );
};

export default FarmManagerManagement;