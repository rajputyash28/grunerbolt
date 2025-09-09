import React from 'react';
import { MapPin } from 'lucide-react';
import { Farmer } from '../farmerprofile';

interface AddressInfoProps {
  farmer: Farmer;
  isEditMode: boolean;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AddressInfo: React.FC<AddressInfoProps> = ({ farmer, isEditMode, formData, handleChange }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin size={20} />
        Address Information
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Complete Address</label>
            {isEditMode ? (
              <textarea
                name="completeAddress"
                value={formData.completeAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.addressInfo.completeAddress}</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Village</label>
            {isEditMode ? (
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.addressInfo.village}</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">District</label>
            {isEditMode ? (
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.addressInfo.district}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">State</label>
            {isEditMode ? (
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.addressInfo.state}</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Mandal</label>
            {isEditMode ? (
              <input
                type="text"
                name="mandal"
                value={formData.mandal}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.addressInfo.mandal}</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">PIN Code</label>
            {isEditMode ? (
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.addressInfo.pinCode}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
