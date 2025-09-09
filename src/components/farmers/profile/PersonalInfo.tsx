import React from 'react';
import { Phone } from 'lucide-react';
import { Farmer } from '../farmerprofile';

interface PersonalInfoProps {
  farmer: Farmer;
  isEditMode: boolean;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ farmer, isEditMode, formData, handleChange }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Phone size={20} /> Personal Information & KYC Documents
      </h3>

      {/* Basic Details */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">Basic Details</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Full Name</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.basicDetails.fullName}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Date of Birth</label>
              {isEditMode ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.basicDetails.dateOfBirth}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Gender</label>
              {isEditMode ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.basicDetails.gender}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Mobile Number</label>
              {isEditMode ? (
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.basicDetails.mobileNumber}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Email Address</label>
              {isEditMode ? (
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.basicDetails.emailAddress}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Father's Name</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.basicDetails.fatherName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Education</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.basicDetails.education}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Alternate Mobile Number</label>
              {isEditMode ? (
                <input
                  type="tel"
                  name="alternateMobileNumber"
                  value={formData.alternateMobileNumber}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.basicDetails.alternateMobileNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KYC Documents */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">KYC Documents</h4>
        <div className="grid grid-cols-1 gap-4">
          <div className="w-1/3">
            <div className="border border-gray-300 rounded-md p-3">
              <label className="text-sm text-gray-600 block mb-1">Aadhar Card</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="aadharCard"
                  value={formData.aadharCard}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <span className="text-sm text-gray-800">{farmer.kycDocuments.aadharCard}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
