import React from 'react';

interface AddressInfoFormProps {
  formData: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AddressInfoForm: React.FC<AddressInfoFormProps> = ({ formData, errors, onChange }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontFamily: 'Inter' }}>Address Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>Complete Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>Village</label>
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>Mandal</label>
          <input
            type="text"
            name="mandal"
            value={formData.mandal}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>PIN Code</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInfoForm;