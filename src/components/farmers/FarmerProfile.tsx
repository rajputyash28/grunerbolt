import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import initialFarmerData, { Farmer } from './farmerprofile';
import ProfileHeader from './profile/ProfileHeader';
import TabNavigation from './profile/TabNavigation';
import PersonalInfo from './profile/PersonalInfo';
import AddressInfo from './profile/AddressInfo';
import FamilyDetails from './profile/FamilyDetails';
import LivestockDetails from './profile/LivestockDetails';
import FarmMachinery from './profile/FarmMachinery';
import LandCrop from './profile/LandCrop';
import SuccessModal from './shared/SuccessModal';

const FarmerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [farmer, setFarmer] = useState<Farmer | undefined>(initialFarmerData.find((f) => f.id === parseInt(id || '')));

  // Form state for editing
  const [formData, setFormData] = useState({
    fullName: farmer?.basicDetails.fullName || '',
    mobileNumber: farmer?.basicDetails.mobileNumber || '',
    emailAddress: farmer?.basicDetails.emailAddress || '',
    dateOfBirth: farmer?.basicDetails.dateOfBirth || '',
    gender: farmer?.basicDetails.gender || '',
    fatherName: farmer?.basicDetails.fatherName || '',
    education: farmer?.basicDetails.education || '',
    alternateMobileNumber: farmer?.basicDetails.alternateMobileNumber || '',
    aadharCard: farmer?.kycDocuments.aadharCard || '',
    completeAddress: farmer?.addressInfo.completeAddress || '',
    village: farmer?.addressInfo.village || '',
    mandal: farmer?.addressInfo.mandal || '',
    district: farmer?.addressInfo.district || '',
    state: farmer?.addressInfo.state || '',
    pinCode: farmer?.addressInfo.pinCode || '',
    landDetails: farmer?.landDetails.map((land) => ({
      landName: land.landName || '',
      landOwnership: land.landDetails || '',
      totalLand: land.ownLand?.split(' ')[0] || land.leasedLand?.split(' ')[0] || '',
    })) || [{ landName: '', landOwnership: '', totalLand: '' }],
    cropLandName: farmer?.cropDetails.landName || '',
    plotNumber: farmer?.cropDetails.plotNumber || '',
    cropLandArea: farmer?.cropDetails.landArea.split(' ')[0] || '',
    cropSown: farmer?.cropDetails.cropSown || '',
    cropVariety: farmer?.cropDetails.variety || '',
    seedVariety: farmer?.cropDetails.seedVariety || '',
    livestockCount: String(farmer?.livestockDetails.totalLivestock || ''),
    cattle: String(farmer?.livestockDetails.cattle || ''),
    poultry: String(farmer?.livestockDetails.poultry || ''),
    smallAnimals: String(farmer?.livestockDetails.smallAnimals || ''),
    livestockBreakdown: farmer?.livestockDetails.detailedBreakdown.map((category) => ({
      category: category.category,
      items: category.items.map((item) => ({
        name: item.name,
        count: String(item.count || ''),
      })),
    })) || [],
    totalAdults: String(farmer?.familyDetails.totalAdults || ''),
    totalChildren: String(farmer?.familyDetails.totalChildren || ''),
    workingMembers: String(farmer?.familyDetails.workingMembers || ''),
    tractor: String(farmer?.farmMachineryDetails.tractor || ''),
    harvester: String(farmer?.farmMachineryDetails.harvester || ''),
    truck: String(farmer?.farmMachineryDetails.truck || ''),
    plough: String(farmer?.farmMachineryDetails.plough || ''),
    sprayer: String(farmer?.farmMachineryDetails.sprayer || ''),
  });

  // If farmer not found, show a message
  if (!farmer) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/farmers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Farmer Not Found</h1>
            <p className="text-gray-600">The requested farmer profile does not exist.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/farmers')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Farmers List
        </button>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData({
      fullName: farmer.basicDetails.fullName,
      mobileNumber: farmer.basicDetails.mobileNumber,
      emailAddress: farmer.basicDetails.emailAddress,
      dateOfBirth: farmer.basicDetails.dateOfBirth,
      gender: farmer.basicDetails.gender,
      fatherName: farmer.basicDetails.fatherName,
      education: farmer.basicDetails.education,
      alternateMobileNumber: farmer.basicDetails.alternateMobileNumber,
      aadharCard: farmer.kycDocuments.aadharCard,
      completeAddress: farmer.addressInfo.completeAddress,
      village: farmer.addressInfo.village,
      mandal: farmer.addressInfo.mandal,
      district: farmer.addressInfo.district,
      state: farmer.addressInfo.state,
      pinCode: farmer.addressInfo.pinCode,
      landDetails: farmer.landDetails.map((land) => ({
        landName: land.landName || '',
        landOwnership: land.landDetails || '',
        totalLand: land.ownLand?.split(' ')[0] || land.leasedLand?.split(' ')[0] || '',
      })),
      cropLandName: farmer.cropDetails.landName,
      plotNumber: farmer.cropDetails.plotNumber,
      cropLandArea: farmer.cropDetails.landArea.split(' ')[0] || '',
      cropSown: farmer.cropDetails.cropSown,
      cropVariety: farmer.cropDetails.variety,
      seedVariety: farmer.cropDetails.seedVariety,
      livestockCount: String(farmer.livestockDetails.totalLivestock),
      cattle: String(farmer.livestockDetails.cattle),
      poultry: String(farmer.livestockDetails.poultry),
      smallAnimals: String(farmer.livestockDetails.smallAnimals),
      livestockBreakdown: farmer.livestockDetails.detailedBreakdown.map((category) => ({
        category: category.category,
        items: category.items.map((item) => ({
          name: item.name,
          count: String(item.count || ''),
        })),
      })),
      totalAdults: String(farmer.familyDetails.totalAdults),
      totalChildren: String(farmer.familyDetails.totalChildren),
      workingMembers: String(farmer.familyDetails.workingMembers),
      tractor: String(farmer.farmMachineryDetails.tractor),
      harvester: String(farmer.farmMachineryDetails.harvester),
      truck: String(farmer.farmMachineryDetails.truck),
      plough: String(farmer.farmMachineryDetails.plough),
      sprayer: String(farmer.farmMachineryDetails.sprayer),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('landDetails')) {
      const [_, index, field] = name.split('.');
      const updatedLandDetails = [...formData.landDetails];
      updatedLandDetails[parseInt(index)] = {
        ...updatedLandDetails[parseInt(index)],
        [field]: value,
      };
      setFormData({
        ...formData,
        landDetails: updatedLandDetails,
      });
    } else if (name.startsWith('livestockBreakdown')) {
      const [_, categoryIndex, itemIndex, field] = name.split('.');
      const updatedBreakdown = [...formData.livestockBreakdown];
      updatedBreakdown[parseInt(categoryIndex)].items[parseInt(itemIndex)] = {
        ...updatedBreakdown[parseInt(categoryIndex)].items[parseInt(itemIndex)],
        [field]: value,
      };
      // Update top-level livestock counts based on breakdown
      const newCattle = updatedBreakdown
        .filter((cat) => cat.category === 'Cattle')
        .reduce((sum, cat) => sum + cat.items.reduce((itemSum, item) => itemSum + Number(item.count || 0), 0), 0);
      const newPoultry = updatedBreakdown
        .filter((cat) => cat.category === 'Poultry')
        .reduce((sum, cat) => sum + cat.items.reduce((itemSum, item) => itemSum + Number(item.count || 0), 0), 0);
      const newSmallAnimals = updatedBreakdown
        .filter((cat) => cat.category === 'Small Animals')
        .reduce((sum, cat) => sum + cat.items.reduce((itemSum, item) => itemSum + Number(item.count || 0), 0), 0);
      const newLivestockCount = newCattle + newPoultry + newSmallAnimals;
      setFormData({
        ...formData,
        livestockBreakdown: updatedBreakdown,
        cattle: String(newCattle),
        poultry: String(newPoultry),
        smallAnimals: String(newSmallAnimals),
        livestockCount: String(newLivestockCount),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddLand = () => {
    setFormData({
      ...formData,
      landDetails: [...formData.landDetails, { landName: '', landOwnership: '', totalLand: '' }],
    });
  };

  const handleRemoveLand = (index: number) => {
    setFormData({
      ...formData,
      landDetails: formData.landDetails.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Integrate API call for saving farmer profile changes
    // API Endpoint: PUT /api/farmers/{id}
    // Example: await saveFarmerProfile(farmer.id, formData);

    const updatedFarmer: Farmer = {
      ...farmer,
      basicDetails: {
        ...farmer.basicDetails,
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        emailAddress: formData.emailAddress,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        fatherName: formData.fatherName,
        education: formData.education,
        alternateMobileNumber: formData.alternateMobileNumber,
      },
      kycDocuments: {
        aadharCard: formData.aadharCard,
      },
      addressInfo: {
        completeAddress: formData.completeAddress,
        village: formData.village,
        mandal: formData.mandal,
        district: formData.district,
        state: formData.state,
        pinCode: formData.pinCode,
      },
      landDetails: formData.landDetails.map((land) => ({
        landName: land.landName,
        landDetails: land.landOwnership,
        ownLand: land.landOwnership === 'Own' ? `${land.totalLand} Acres` : '',
        leasedLand: land.landOwnership === 'Leased' ? `${land.totalLand} Acres` : '',
      })),
      cropDetails: {
        landName: formData.cropLandName,
        plotNumber: formData.plotNumber,
        landArea: formData.cropLandArea ? `${formData.cropLandArea} acres` : '',
        cropSown: formData.cropSown,
        variety: formData.cropVariety,
        seedVariety: formData.seedVariety,
      },
      livestockDetails: {
        totalLivestock: Number(formData.livestockCount),
        cattle: Number(formData.cattle),
        poultry: Number(formData.poultry),
        smallAnimals: Number(formData.smallAnimals),
        detailedBreakdown: formData.livestockBreakdown.map((category) => ({
          category: category.category,
          items: category.items.map((item) => ({
            name: item.name,
            count: Number(item.count || 0),
          })),
        })),
      },
      quickStats: {
        ...farmer.quickStats,
        totalLand: `${formData.landDetails.reduce((sum, land) => sum + Number(land.totalLand || 0), 0)} acres`,
        familyMembers: Number(formData.totalAdults || 0) + Number(formData.totalChildren || 0),
        livestock: Number(formData.livestockCount),
        assets: Number(formData.tractor) + Number(formData.harvester) + Number(formData.truck) + Number(formData.plough) + Number(formData.sprayer),
      },
      familyDetails: {
        totalAdults: Number(formData.totalAdults),
        totalChildren: Number(formData.totalChildren),
        workingMembers: Number(formData.workingMembers),
      },
      farmMachineryDetails: {
        tractor: Number(formData.tractor),
        harvester: Number(formData.harvester),
        truck: Number(formData.truck),
        plough: Number(formData.plough),
        sprayer: Number(formData.sprayer),
      },
    };

    console.log('Updating farmer with full details:', updatedFarmer);
    // In a real app, send to API: api.put(`/farmers/${farmer.id}`, updatedFarmer);

    setShowSuccess(true);
    setIsEditMode(false);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Status toggle handler
  const handleToggleStatus = (newStatus: 'Active' | 'Inactive') => {
    // TODO: Integrate API call for toggling farmer status
    // API Endpoint: PUT /api/farmers/{id}/status
    // Example: await toggleFarmerStatus(farmer.id, newStatus);
    
    if (farmer) {
      setFarmer(prev => prev ? {
        ...prev,
        status: newStatus
      } : prev);
    }
  };




  return (
    <div className="min-h-screen p-1">
      <ProfileHeader
        farmer={farmer} 
        navigate={navigate} 
        isEditMode={isEditMode}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        onToggleStatus={handleToggleStatus}
      />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <PersonalInfo
            farmer={farmer}
            isEditMode={isEditMode}
            formData={formData}
            handleChange={handleChange}
          />
          <AddressInfo
            farmer={farmer}
            isEditMode={isEditMode}
            formData={formData}
            handleChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-6">
            <FamilyDetails
              farmer={farmer}
              isEditMode={isEditMode}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
        </div>
      )}
      {activeTab === 'Machinery & Livestock' && (
        <div className="space-y-6">
          <LivestockDetails
            farmer={farmer}
            isEditMode={isEditMode}
            formData={formData}
            handleChange={handleChange}
          />
          <FarmMachinery
            farmer={farmer}
            isEditMode={isEditMode}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
      )}
      {activeTab === 'Land & Crop' && (
        <div className="space-y-6">
          <LandCrop
            farmer={farmer}
            isEditMode={isEditMode}
            formData={formData}
            handleChange={handleChange}
            handleAddLand={handleAddLand}
            handleRemoveLand={handleRemoveLand}
          />
        </div>
      )}

      <SuccessModal showSuccess={showSuccess} />
    </div>
  );
};

export default FarmerProfile;