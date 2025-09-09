import React from 'react';
import { Users } from 'lucide-react';
import { Farmer } from '../farmerprofile';

interface FamilyDetailsProps {
  farmer: Farmer;
  isEditMode: boolean;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({ farmer, isEditMode, formData, handleChange }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Users size={20} />
        Family Details
      </h4>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-1">Total Adults</span>
            {isEditMode ? (
              <input
                type="number"
                name="totalAdults"
                value={formData.totalAdults}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="border border-gray-300 rounded px-3 py-2">
                <span className="text-gray-800">{farmer.familyDetails.totalAdults}</span>
              </div>
            )}
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-1">Total Children</span>
            {isEditMode ? (
              <input
                type="number"
                name="totalChildren"
                value={formData.totalChildren}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="border border-gray-300 rounded px-3 py-2">
                <span className="text-gray-800">{farmer.familyDetails.totalChildren}</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-600 block mb-1">Working Members</span>
          {isEditMode ? (
            <input
              type="number"
              name="workingMembers"
              value={formData.workingMembers}
              onChange={handleChange}
              className="w-[150px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="border border-gray-300 rounded px-3 py-2 w-[150px]">
              <span className="text-gray-800">{farmer.familyDetails.workingMembers}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyDetails;
