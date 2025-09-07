import React from 'react';
import { Phone, MapPin, CreditCard } from 'lucide-react';

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
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  fathersName: string;
  education: string;
  alternativeMobile: string;
  // KYC Documents
  aadharCard: string;
  // Address Information
  completeAddress: string;
  village: string;
  district: string;
  state: string;
  mandal: string;
  pinCode: string;
  // Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface EditableFieldKeys {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending';
  assignedTasks: string;
  joinedDate: string;
  profileImage: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  fathersName: string;
  education: string;
  alternativeMobile: string;
  aadharCard: string;
  completeAddress: string;
  village: string;
  district: string;
  state: string;
  mandal: string;
  pinCode: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface ProfileOverviewProps {
  farmManager: FarmManager;
  isEditMode: boolean;
  editData: Partial<FarmManager>;
  handleInputChange: (field: keyof EditableFieldKeys, value: string | number) => void;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  farmManager,
  isEditMode,
  editData,
  handleInputChange
}) => {
  const renderEditableField = (
    label: string,
    value: string,
    field: keyof EditableFieldKeys,
    type: string = 'text'
  ) => {
    const currentValue = editData[field] !== undefined ? String(editData[field]) : value;

    return (
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter' }}>
          {label}
        </label>
        {isEditMode ? (
          <input
            type={type}
            value={currentValue}
            onChange={(e) => handleInputChange(field, type === 'number' ? Number(e.target.value) : e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            style={{ fontFamily: 'Inter' }}
          />
        ) : (
          <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
            {value}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column - Personal Information & KYC Documents */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
              Personal Information & KYC Documents
            </h3>
          </div>

          <div className="space-y-6">
            {/* Basic Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {renderEditableField('Full Name', farmManager.fullName || 'Rajesh Kumar', 'fullName')}
                {renderEditableField('Date of Birth', farmManager.dateOfBirth || '1985-06-15', 'dateOfBirth', 'date')}
                {renderEditableField('Gender', farmManager.gender || 'Male', 'gender')}
                {renderEditableField('Mobile Number', farmManager.mobile || '+91 9876543210', 'mobile', 'tel')}
                {renderEditableField('Email Address', farmManager.email || 'rajesh.kumar@email.com', 'email', 'email')}
                {renderEditableField('Fathers Name', farmManager.fathersName || 'Ramesh Kumar', 'fathersName')}
                {renderEditableField('Education', farmManager.education || '12th Pass', 'education')}
                {renderEditableField('Alternative Mobile Number', farmManager.alternativeMobile || '+91 9876543210', 'alternativeMobile', 'tel')}
              </div>
            </div>

            {/* KYC Documents */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
                KYC Documents
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {renderEditableField('Aadhar Card', farmManager.aadharCard || '**** **** **** 9012', 'aadharCard')}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Address Information & Bank Details */}
        <div className="space-y-6">
          
          {/* Address Information */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
                Address Information
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {renderEditableField('Complete Address', farmManager.completeAddress || 'House No 123, Main Street', 'completeAddress')}
                {renderEditableField('Village', farmManager.village || 'Rampur', 'village')}
                {renderEditableField('District', farmManager.district || 'Hyderabad', 'district')}
                {renderEditableField('State', farmManager.state || 'Telangana', 'state')}
                {renderEditableField('Mandal', farmManager.mandal || 'Secunderabad', 'mandal')}
                {renderEditableField('PIN Code', farmManager.pinCode || '500001', 'pinCode')}
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
                Bank Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {renderEditableField('Bank Name', farmManager.bankName || 'State Bank of India', 'bankName')}
                {renderEditableField('Account Number', farmManager.accountNumber || '**** **** 1220', 'accountNumber')}
                {renderEditableField('IFSC Code', farmManager.ifscCode || 'SBIN0000123', 'ifscCode')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
