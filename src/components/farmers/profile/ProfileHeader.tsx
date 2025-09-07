import React from 'react';
import { ArrowLeft, Edit, Phone, MapPin, Calendar } from 'lucide-react';
import { Farmer } from '../farmerprofile';

interface ProfileHeaderProps {
  farmer: Farmer;
  navigate: (path: string) => void;
  isEditMode: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  onToggleStatus?: (newStatus: 'Active' | 'Inactive') => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  farmer, 
  navigate, 
  isEditMode, 
  handleEdit, 
  handleCancel, 
  handleSubmit,
  onToggleStatus
}) => {
  const handleToggleStatus = () => {
    if (onToggleStatus && farmer.status !== 'Pending') {
      const newStatus = farmer.status === 'Active' ? 'Inactive' : 'Active';
      onToggleStatus(newStatus);
    }
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header with Back Button and Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/farmers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
              Farmer Profile
            </h1>
          </div>
        </div>
        
        {!isEditMode && (
          <button
            onClick={handleEdit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
          >
            <Edit size={18} />
            Edit Profile
          </button>
        )}
        
        {isEditMode && (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <img
            src={farmer.profileImage}
            alt={farmer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                {farmer.name}
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium text-white ${
                    farmer.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                >
                  {farmer.status === 'Active' ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={handleToggleStatus}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    farmer.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      farmer.status === 'Active' ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                  {farmer.basicDetails.mobileNumber}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                  # {farmer.memberId}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                  {farmer.addressInfo.district}, {farmer.addressInfo.state}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                  Joined 2024-01-10
                </span>
              </div>
            </div>
            
            {/* Assigned Kisani Didi */}
            <div className="mt-3">
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                Assigned Kisani Didi
              </span>
              <div className="mt-1">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md font-medium">
                  {farmer.kd}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;