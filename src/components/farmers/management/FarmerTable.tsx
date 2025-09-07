import React from 'react';
import { MoreHorizontal, Edit, Ban, Trash } from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  memberId: string;
  isActive: boolean;
  createdAt: string;
  totalLands: number;
  totalLandAreaAcres: number;
}

interface FarmerTableProps {
  farmersList: Farmer[];
  handleViewProfile: (farmer: Farmer) => void;
  handleEditFarmer: (farmer: Farmer) => void;
  showActionMenu: string | null;
  actionMenuRef: React.RefObject<HTMLDivElement>;
  toggleActionMenu: (farmerId: string, e: React.MouseEvent) => void;
  setSelectedAction: (action: { action: 'delete' | 'block'; farmer: Farmer } | null) => void;
  setShowConfirmation: (show: boolean) => void;
  setShowActionMenu: (id: string | null) => void;
}

const FarmerTable: React.FC<FarmerTableProps> = ({
  farmersList,
  handleViewProfile,
  handleEditFarmer,
  showActionMenu,
  actionMenuRef,
  toggleActionMenu,
  setSelectedAction,
  setShowConfirmation,
  setShowActionMenu
}) => {
  return (
    <div className="px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Name</th>
            <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Mobile</th>
            <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Member ID</th>
            <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Status</th>
            <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Registered Date</th>
            <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Total Land Size</th>
            <th className="text-right py-4 text-sm font-semibold text-gray-700 w-1/7">Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmersList.length > 0 ? (
            farmersList.map((farmer: Farmer, index: number) => (
              <tr key={farmer.id} className={index < farmersList.length - 1 ? 'border-b border-gray-100' : ''}>
                <td className="py-4 pr-8">
                  <button
                    onClick={() => handleViewProfile(farmer)}
                    className="text-sm font-medium text-[#000000] hover:text-blue-800 underline"
                  >
                    {farmer.name}
                  </button>
                </td>
                <td className="py-4 pr-8 text-sm text-gray-600">{farmer.phoneNumber}</td>
                <td className="py-4 pr-8 text-sm text-gray-600">{farmer.memberId}</td>
                <td className="py-4 pr-8">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      farmer.isActive ? 'bg-gray-100 text-[#000000]' : 'bg-gray-100 text-[#000000]'
                    }`}
                  >
                    {farmer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-4 pr-8 text-sm text-gray-600">{farmer.createdAt}</td>
                <td className="py-4 pr-8 text-sm text-gray-600">{farmer.totalLandAreaAcres} acres</td>
                <td className="py-4 text-right relative">
                  <button
                    onClick={(e) => toggleActionMenu(farmer.id, e)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="More Actions"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {showActionMenu === farmer.id && (
                    <div
                      ref={actionMenuRef}
                      className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleEditFarmer(farmer);
                            setShowActionMenu(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                        >
                          <Edit size={16} />
                          Edit Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAction({ action: 'block', farmer });
                            setShowConfirmation(true);
                            setShowActionMenu(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                        >
                          <Ban size={16} />
                          {farmer.isActive ? 'Block' : 'Unblock'}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAction({ action: 'delete', farmer });
                            setShowConfirmation(true);
                            setShowActionMenu(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#000000] hover:bg-gray-100 transition-colors"
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
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500">
                No farmers found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerTable;
