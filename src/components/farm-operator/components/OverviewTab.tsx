import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { FarmOperatorProfile } from '../types/farmOperatorTypes';

interface OverviewTabProps {
  farmOperator: FarmOperatorProfile;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ farmOperator }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information & KYC Documents */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>Personal Information & KYC Documents</h3>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>Basic Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Full Name</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.basicDetails.fullName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Date of Birth</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.basicDetails.dateOfBirth}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Gender</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.basicDetails.gender}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Mobile Number</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.basicDetails.mobileNumber}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Email Address</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.basicDetails.emailAddress}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Father's Name</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.basicDetails.fatherName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Education</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.basicDetails.education}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3" style={{ fontFamily: 'Inter' }}>KYC Documents</h4>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Aadhar Card</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.kycDocuments.aadharCard}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>Address Information</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Complete Address</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.addressInfo.completeAddress}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Village</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.addressInfo.village}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>District</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.addressInfo.district}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>State</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.addressInfo.state}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Mandal</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.addressInfo.mandal}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>PIN Code</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmOperator.addressInfo.pinCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;