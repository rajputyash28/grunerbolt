import React from 'react';
import { Ban } from 'lucide-react';

interface FarmOperator {
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

interface FarmOperatorTableProps {
  activeTab: string;
  filteredData: FarmOperator[] | PendingApproval[];
  handleViewProfile: (operator: FarmOperator) => void;
  handleViewPendingProfile: (approval: PendingApproval) => void;
  showActionMenu: number | null;
  actionMenuRef: React.RefObject<HTMLDivElement>;
  toggleActionMenu: (operatorId: number, e: React.MouseEvent) => void;
  handleEdit: (operator: FarmOperator) => void;
  handleDelete: (operatorId: number) => void;
  handleBlock: (operatorId: number) => void;
  handleReview: (approval: PendingApproval) => void;
  handleApprove: (approval: PendingApproval) => void;
  handleReject: (approval: PendingApproval) => void;
}

const FarmOperatorTable: React.FC<FarmOperatorTableProps> = ({
  activeTab,
  filteredData,
  handleViewProfile,
  handleViewPendingProfile,
  showActionMenu,
  actionMenuRef,
  toggleActionMenu,
  handleEdit,
  handleDelete,
  handleBlock,
  handleReview,
  handleApprove,
  handleReject
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  {showActionMenu === operator.id && (
                    <div ref={actionMenuRef} className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleEdit(operator);
                            // setShowActionMenu(null); // This will be handled by parent
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleBlock(operator.id);
                            // setShowActionMenu(null); // This will be handled by parent
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Ban size={16} />
                          {operator.status === 'Blocked' ? 'Unblock' : 'Block'}
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(operator.id);
                            // setShowActionMenu(null); // This will be handled by parent
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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
  );
};

export default FarmOperatorTable;
