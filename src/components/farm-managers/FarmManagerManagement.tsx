import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Edit, Ban, Trash, X, ChevronDown, Eye } from 'lucide-react';

interface FarmManager {
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

const FarmManagerManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const allFarmManagers: FarmManager[] = [
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

  const handleViewProfile = (manager: FarmManager) => {
    navigate(`/farm-managers/${manager.id}`);
  };

  const handleEdit = (manager: FarmManager) => {
    navigate(`/farm-managers/edit/${manager.id}`);
  };

  const handleAddNew = () => {
    navigate('/farm-managers/add');
  };

  const handleApprove = (approval: PendingApproval) => {
    console.log('Approving:', approval);
  };

  const handleReject = (approval: PendingApproval) => {
    console.log('Rejecting:', approval);
  };

  const handleReview = (approval: PendingApproval) => {
    console.log('Reviewing:', approval);
  };

  const toggleActionMenu = (managerId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === managerId ? null : managerId);
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

  const filteredData = activeTab === 'all' 
    ? allFarmManagers.filter(manager =>
        manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.mobile.includes(searchTerm) ||
        manager.memberId.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>Farm Manager Management</h1>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
        >
          <Plus size={20} />
          Add New Farm Manager
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Total Farm Manager</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>156</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          All FMs
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'pending'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Pending Approvals (3)
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, mobile, or member ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          />
        </div>
      </div>

      {/* Table */}
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
            {activeTab === 'all' ? (
              (filteredData as FarmManager[]).map((manager) => (
                <tr key={manager.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewProfile(manager)}
                      className="text-sm font-semibold hover:text-blue-600 underline"
                      style={{ 
                        fontFamily: 'Inter', 
                        fontSize: '13.02px', 
                        fontWeight: 600,
                        color: '#101828',
                        textDecoration: 'underline'
                      }}
                    >
                      {manager.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {manager.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {manager.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {manager.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      manager.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {manager.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {manager.assignedTasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right relative">
                    <button
                      onClick={(e) => toggleActionMenu(manager.id, e)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="More Actions"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {showActionMenu === manager.id && (
                      <div ref={actionMenuRef} className="absolute right-0 top-8 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              handleViewProfile(manager);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              handleEdit(manager);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => setShowActionMenu(null)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Ban size={16} />
                            Block
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 600,
                    color: '#101828'
                  }}>
                    {approval.name}
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
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                      >
                        Review
                      </button>
                      <button 
                        onClick={() => handleApprove(approval)}
                        className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(approval)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
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
    </div>
  );
};

export default FarmManagerManagement;