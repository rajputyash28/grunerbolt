import React from 'react';
import { Phone, MapPin, Calendar, QrCode, CheckCircle, X } from 'lucide-react';

interface FarmManager {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rejected';
  assignedTasks: string;
  joinedDate: string;
  profileImage: string;
}

interface ProfileHeaderProps {
  farmManager: FarmManager;
  isPendingApproval: boolean;
  onToggleStatus?: (newStatus: 'Active' | 'Inactive') => void;
  onApprove?: () => void;
  onReject?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ farmManager, isPendingApproval, onToggleStatus, onApprove, onReject }) => {
  const handleToggleStatus = () => {
    if (onToggleStatus && farmManager.status !== 'Pending') {
      const newStatus = farmManager.status === 'Active' ? 'Inactive' : 'Active';
      onToggleStatus(newStatus);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={farmManager.profileImage}
          alt={farmManager.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
              {farmManager.name}
            </h2>
            {!isPendingApproval && (
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium text-white ${
                    farmManager.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                >
                  {farmManager.status === 'Active' ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={handleToggleStatus}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    farmManager.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      farmManager.status === 'Active' ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
          
          {/* Approve and Reject buttons for pending approvals */}
          {isPendingApproval && (
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={onApprove}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
              >
                <CheckCircle size={18} />
                Approve
              </button>
              <button
                onClick={onReject}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
                style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
              >
                <X size={18} />
                Reject
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                {farmManager.mobile}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                # {farmManager.memberId}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                {farmManager.location}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                {isPendingApproval ? 'Applied' : 'Joined'} {farmManager.joinedDate}
              </span>
            </div>
          </div>
        </div>
        
        {/* Scanner icon on the right */}
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">
          <QrCode size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
