import React from 'react';
import { Phone, MapPin, Calendar } from 'lucide-react';
import { FarmOperatorProfile } from '../types/farmOperatorTypes';

interface ProfileHeaderProps {
  farmOperator: FarmOperatorProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ farmOperator }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={farmOperator.profileImage}
          alt={farmOperator.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.name}</h2>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Phone size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{farmOperator.mobile}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}># {farmOperator.memberId}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{farmOperator.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Joined {farmOperator.joinedDate}</span>
            </div>
          </div>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
          {farmOperator.status}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;