import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressInfoForm from './components/AddressInfoForm';
import BankDetailsForm from './components/BankDetailsForm';
import { mockFarmOperatorProfile } from './data/mockData';

const EditFarmOperator = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    education: '',
    experience: '',
    address: '',
    village: '',
    mandal: '',
    district: '',
    state: '',
    pinCode: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load existing data
  useEffect(() => {
    const profile = mockFarmOperatorProfile;
    setFormData({
      name: profile.basicDetails.fullName,
      mobile: profile.basicDetails.mobileNumber,
      email: profile.basicDetails.emailAddress,
      dateOfBirth: profile.basicDetails.dateOfBirth,
      gender: profile.basicDetails.gender,
      education: profile.basicDetails.education,
      experience: '5',
      address: profile.addressInfo.completeAddress,
      village: profile.addressInfo.village,
      mandal: profile.addressInfo.mandal,
      district: profile.addressInfo.district,
      state: profile.addressInfo.state,
      pinCode: profile.addressInfo.pinCode,
      bankName: 'State Bank of India',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0000123',
      panNumber: 'ABCDE1234F',
      aadharNumber: profile.kycDocuments.aadharCard
    });
  }, [id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (formData.mobile && !/^\+91\s\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be in format +91 XXXXXXXXXX';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('Updating Farm Operator:', formData);
    navigate('/farm-operators');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCancel = () => {
    navigate('/farm-operators');
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>Edit Farm Operator</h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter' }}>Update Farm Operator information</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <PersonalInfoForm 
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />

        {/* Address Information */}
        <AddressInfoForm 
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />

        {/* Bank Details */}
        <BankDetailsForm 
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
          >
            <Save size={18} />
            Update Farm Operator
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFarmOperator;