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
  const actionMenuRef = useRef<HTMLDivElement>(null);

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

  const handleViewProfile = (Operator: FarmOperator) => {
    navigate(`/farm-Operators/${Operator.id}`);
  };

  const handleEdit = (Operator: FarmOperator) => {
    navigate(`/farm-Operators/edit/${Operator.id}`);
  };

  const handleAddNew = () => {
    navigate('/farm-Operators/add');
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

  const toggleActionMenu = (OperatorId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === OperatorId ? null : OperatorId);
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
    ? allFarmOperators.filter(Operator =>
        Operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Operator.mobile.includes(searchTerm) ||
        Operator.memberId.toLowerCase().includes(searchTerm.toLowerCase())
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
 asas       </button>
      </div>

      {/* Stats Cards - Applied exact style specifications */}
      <div className="flex gap-4" style={{ marginTop: '10px', marginLeft: '' }}>
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
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Total Farm Operator</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>156</p>
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
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>8</p>
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
          style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}
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
          style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}
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
            className="w-[500px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg "
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className=' border-b'>
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
              (filteredData as FarmOperator[]).map((Operator) => (
                <tr key={Operator.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewProfile(Operator)}
                      className="text-sm font-semibold hover:text-blue-600 underline"
                      style={{ 
                        fontFamily: 'Inter', 
                        fontSize: '13.02px', 
                        fontWeight: 600,
                        color: '#101828',
                        textDecoration: 'underline'
                      }}
                    >
                      {Operator.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {Operator.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '##4A5565'
                  }}>
                    {Operator.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {Operator.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      Operator.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {Operator.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '13.02px', 
                    fontWeight: 400,
                    color: '#4A5565'
                  }}>
                    {Operator.assignedTasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right relative">
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => toggleActionMenu(Operator.id, e)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="More Actions"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    {showActionMenu === Operator.id && (
                      <div ref={actionMenuRef} className="absolute right-6 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              handleViewProfile(Operator);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              handleEdit(Operator);
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
    </div>
  );
};

export default FarmOperatorManagement;