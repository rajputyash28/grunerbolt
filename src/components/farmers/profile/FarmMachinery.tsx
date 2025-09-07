import React from 'react';
import { CreditCard } from 'lucide-react';
import { Farmer } from '../farmerprofile';

interface FarmMachineryProps {
  farmer: Farmer;
  isEditMode: boolean;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const FarmMachinery: React.FC<FarmMachineryProps> = ({ farmer, isEditMode, formData, handleChange }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <CreditCard size={20} />
        Farm Machinery Details
      </h4>
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="text-md font-medium text-gray-700 mb-3">Farm Machinery Details</h5>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-gray-600 block mb-1">Tractor</span>
              {isEditMode ? (
                <input
                  type="number"
                  name="tractor"
                  value={formData.tractor}
                  onChange={handleChange}
                  className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="border border-gray-300 rounded px-2 py-2 bg-white">
                  <span className="text-gray-800">{farmer.farmMachineryDetails.tractor}</span>
                </div>
              )}
            </div>
            <div>
              <span className="text-sm text-gray-600 block mb-1">Harvester</span>
              {isEditMode ? (
                <input
                  type="number"
                  name="harvester"
                  value={formData.harvester}
                  onChange={handleChange}
                  className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="border border-gray-300 rounded px-2 py-2 bg-white">
                  <span className="text-gray-800">{farmer.farmMachineryDetails.harvester}</span>
                </div>
              )}
            </div>
            <div>
              <span className="text-sm text-gray-600 block mb-1">Truck</span>
              {isEditMode ? (
                <input
                  type="number"
                  name="truck"
                  value={formData.truck}
                  onChange={handleChange}
                  className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="border border-gray-300 rounded px-2 py-2 bg-white">
                  <span className="text-gray-800">{farmer.farmMachineryDetails.truck}</span>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600 block mb-1">Plough</span>
              {isEditMode ? (
                <input
                  type="number"
                  name="plough"
                  value={formData.plough}
                  onChange={handleChange}
                  className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="border border-gray-300 rounded px-2 py-2 bg-white">
                  <span className="text-gray-800">{farmer.farmMachineryDetails.plough}</span>
                </div>
              )}
            </div>
            <div>
              <span className="text-sm text-gray-600 block mb-1">Sprayer</span>
              {isEditMode ? (
                <input
                  type="number"
                  name="sprayer"
                  value={formData.sprayer}
                  onChange={handleChange}
                  className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="border border-gray-300 rounded px-2 py-2 bg-white">
                  <span className="text-gray-800">{farmer.farmMachineryDetails.sprayer}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmMachinery;
