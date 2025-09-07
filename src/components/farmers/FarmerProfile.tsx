// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, MapPin, Users, Sprout, Tractor, Phone, CreditCard, Edit } from 'lucide-react';
// import initialFarmerData, { Farmer } from './farmerprofile';

// const FarmerProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isEditMode, setIsEditMode] = useState(false);

//   // Find the farmer based on the ID
//   const farmer = initialFarmerData.find((f) => f.id === parseInt(id || ''));

//   // Form state for editing
//   const [formData, setFormData] = useState({
//     fullName: farmer?.basicDetails.fullName || '',
//     mobileNumber: farmer?.basicDetails.mobileNumber || '',
//     emailAddress: farmer?.basicDetails.emailAddress || '',
//     dateOfBirth: farmer?.basicDetails.dateOfBirth || '',
//     gender: farmer?.basicDetails.gender || '',
//     fatherName: farmer?.basicDetails.fatherName || '',
//     education: farmer?.basicDetails.education || '',
//     aadharCard: farmer?.kycDocuments.aadharCard || '',
//     completeAddress: farmer?.addressInfo.completeAddress || '',
//     village: farmer?.addressInfo.village || '',
//     mandal: farmer?.addressInfo.mandal || '',
//     district: farmer?.addressInfo.district || '',
//     state: farmer?.addressInfo.state || '',
//     pinCode: farmer?.addressInfo.pinCode || '',
//     landDetails: farmer?.landDetails.map(land => ({
//       landName: land.landName || '',
//       landOwnership: land.landDetails || '',
//       totalLand: land.ownLand?.split(' ')[0] || land.leasedLand?.split(' ')[0] || '',
//     })) || [{ landName: '', landOwnership: '', totalLand: '' }],
//     cropLandName: farmer?.cropDetails.landName || '',
//     plotNumber: farmer?.cropDetails.plotNumber || '',
//     cropLandArea: farmer?.cropDetails.landArea.split(' ')[0] || '',
//     cropSown: farmer?.cropDetails.cropSown || '',
//     cropVariety: farmer?.cropDetails.variety || '',
//     seedVariety: farmer?.cropDetails.seedVariety || '',
//     livestockCount: String(farmer?.livestockDetails.totalLivestock || ''),
//     cattle: String(farmer?.livestockDetails.cattle || ''),
//     poultry: String(farmer?.livestockDetails.poultry || ''),
//     smallAnimals: String(farmer?.livestockDetails.smallAnimals || ''),
//     livestockBreakdown: farmer?.livestockDetails.detailedBreakdown.map(category => ({
//       category: category.category,
//       items: category.items.map(item => ({
//         name: item.name,
//         count: String(item.count || ''),
//       })),
//     })) || [],
//     totalLand: farmer?.quickStats.totalLand.split(' ')[0] || '', // Editable totalLand
//     familyMembers: String(farmer?.quickStats.familyMembers || ''),
//     livestock: String(farmer?.quickStats.livestock || ''),
//     assets: String(farmer?.quickStats.assets || ''),
//     totalAdults: String(farmer?.familyDetails.totalAdults || ''),
//     totalChildren: String(farmer?.familyDetails.totalChildren || ''),
//     workingMembers: String(farmer?.familyDetails.workingMembers || ''),
//     tractor: String(farmer?.farmMachineryDetails.tractor || ''),
//     harvester: String(farmer?.farmMachineryDetails.harvester || ''),
//     truck: String(farmer?.farmMachineryDetails.truck || ''),
//     plough: String(farmer?.farmMachineryDetails.plough || ''),
//     sprayer: String(farmer?.farmMachineryDetails.sprayer || ''),
//   });

//   // If farmer not found, show a message
//   if (!farmer) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate('/farmers')}
//             className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-blue-600">Farmer Not Found</h1>
//             <p className="text-gray-600">The requested farmer profile does not exist.</p>
//           </div>
//         </div>
//         <button
//           onClick={() => navigate('/farmers')}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Back to Farmers List
//         </button>
//       </div>
//     );
//   }

//   const handleEdit = () => {
//     setIsEditMode(true);
//   };

//   const handleCancel = () => {
//     setIsEditMode(false);
//     // Reset form data to original farmer data
//     setFormData({
//       fullName: farmer.basicDetails.fullName,
//       mobileNumber: farmer.basicDetails.mobileNumber,
//       emailAddress: farmer.basicDetails.emailAddress,
//       dateOfBirth: farmer.basicDetails.dateOfBirth,
//       gender: farmer.basicDetails.gender,
//       fatherName: farmer.basicDetails.fatherName,
//       education: farmer.basicDetails.education,
//       aadharCard: farmer.kycDocuments.aadharCard,
//       completeAddress: farmer.addressInfo.completeAddress,
//       village: farmer.addressInfo.village,
//       mandal: farmer.addressInfo.mandal,
//       district: farmer.addressInfo.district,
//       state: farmer.addressInfo.state,
//       pinCode: farmer.addressInfo.pinCode,
//       landDetails: farmer.landDetails.map(land => ({
//         landName: land.landName || '',
//         landOwnership: land.landDetails || '',
//         totalLand: land.ownLand?.split(' ')[0] || land.leasedLand?.split(' ')[0] || '',
//       })),
//       cropLandName: farmer.cropDetails.landName,
//       plotNumber: farmer.cropDetails.plotNumber,
//       cropLandArea: farmer.cropDetails.landArea.split(' ')[0] || '',
//       cropSown: farmer.cropDetails.cropSown,
//       cropVariety: farmer.cropDetails.variety,
//       seedVariety: farmer.cropDetails.seedVariety,
//       livestockCount: String(farmer.livestockDetails.totalLivestock),
//       cattle: String(farmer.livestockDetails.cattle),
//       poultry: String(farmer.livestockDetails.poultry),
//       smallAnimals: String(farmer.livestockDetails.smallAnimals),
//       livestockBreakdown: farmer.livestockDetails.detailedBreakdown.map(category => ({
//         category: category.category,
//         items: category.items.map(item => ({
//           name: item.name,
//           count: String(item.count || ''),
//         })),
//       })),
//       totalLand: farmer.quickStats.totalLand.split(' ')[0] || '',
//       familyMembers: String(farmer.quickStats.familyMembers),
//       livestock: String(farmer.quickStats.livestock),
//       assets: String(farmer.quickStats.assets),
//       totalAdults: String(farmer.familyDetails.totalAdults),
//       totalChildren: String(farmer.familyDetails.totalChildren),
//       workingMembers: String(farmer.familyDetails.workingMembers),
//       tractor: String(farmer.farmMachineryDetails.tractor),
//       harvester: String(farmer.farmMachineryDetails.harvester),
//       truck: String(farmer.farmMachineryDetails.truck),
//       plough: String(farmer.farmMachineryDetails.plough),
//       sprayer: String(farmer.farmMachineryDetails.sprayer),
//     });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     if (name.startsWith('landDetails')) {
//       const [_, index, field] = name.split('.');
//       const updatedLandDetails = [...formData.landDetails];
//       updatedLandDetails[parseInt(index)] = {
//         ...updatedLandDetails[parseInt(index)],
//         [field]: value,
//       };
//       setFormData({
//         ...formData,
//         landDetails: updatedLandDetails,
//       });
//     } else if (name.startsWith('livestockBreakdown')) {
//       const [_, categoryIndex, itemIndex, field] = name.split('.');
//       const updatedBreakdown = [...formData.livestockBreakdown];
//       updatedBreakdown[parseInt(categoryIndex)].items[parseInt(itemIndex)] = {
//         ...updatedBreakdown[parseInt(categoryIndex)].items[parseInt(itemIndex)],
//         [field]: value,
//       };
//       // Update top-level livestock counts based on breakdown
//       const newCattle = updatedBreakdown
//         .filter(cat => cat.category === 'Cattle')
//         .reduce((sum, cat) => sum + cat.items.reduce((itemSum, item) => itemSum + Number(item.count || 0), 0), 0);
//       const newPoultry = updatedBreakdown
//         .filter(cat => cat.category === 'Poultry')
//         .reduce((sum, cat) => sum + cat.items.reduce((itemSum, item) => itemSum + Number(item.count || 0), 0), 0);
//       const newSmallAnimals = updatedBreakdown
//         .filter(cat => cat.category === 'Small Animals')
//         .reduce((sum, cat) => sum + cat.items.reduce((itemSum, item) => itemSum + Number(item.count || 0), 0), 0);
//       const newLivestockCount = newCattle + newPoultry + newSmallAnimals;
//       setFormData({
//         ...formData,
//         livestockBreakdown: updatedBreakdown,
//         cattle: String(newCattle),
//         poultry: String(newPoultry),
//         smallAnimals: String(newSmallAnimals),
//         livestockCount: String(newLivestockCount),
//         livestock: String(newLivestockCount), // Update quickStats.livestock
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleAddLand = () => {
//     setFormData({
//       ...formData,
//       landDetails: [...formData.landDetails, { landName: '', landOwnership: '', totalLand: '' }],
//     });
//   };

//   const handleRemoveLand = (index: number) => {
//     setFormData({
//       ...formData,
//       landDetails: formData.landDetails.filter((_, i) => i !== index),
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const updatedFarmer: Farmer = {
//       ...farmer,
//       basicDetails: {
//         ...farmer.basicDetails,
//         fullName: formData.fullName,
//         mobileNumber: formData.mobileNumber,
//         emailAddress: formData.emailAddress,
//         dateOfBirth: formData.dateOfBirth,
//         gender: formData.gender,
//         fatherName: formData.fatherName,
//         education: formData.education,
//       },
//       kycDocuments: {
//         aadharCard: formData.aadharCard,
//       },
//       addressInfo: {
//         completeAddress: formData.completeAddress,
//         village: formData.village,
//         mandal: formData.mandal,
//         district: formData.district,
//         state: formData.state,
//         pinCode: formData.pinCode,
//       },
//       landDetails: formData.landDetails.map(land => ({
//         landName: land.landName,
//         landDetails: land.landOwnership,
//         ownLand: land.landOwnership === 'Own' ? `${land.totalLand} Acres` : '',
//         leasedLand: land.landOwnership === 'Leased' ? `${land.totalLand} Acres` : '',
//       })),
//       cropDetails: {
//         landName: formData.cropLandName,
//         plotNumber: formData.plotNumber,
//         landArea: formData.cropLandArea ? `${formData.cropLandArea} acres` : '',
//         cropSown: formData.cropSown,
//         variety: formData.cropVariety,
//         seedVariety: formData.seedVariety,
//       },
//       livestockDetails: {
//         totalLivestock: Number(formData.livestockCount),
//         cattle: Number(formData.cattle),
//         poultry: Number(formData.poultry),
//         smallAnimals: Number(formData.smallAnimals),
//         detailedBreakdown: formData.livestockBreakdown.map(category => ({
//           category: category.category,
//           items: category.items.map(item => ({
//             name: item.name,
//             count: Number(item.count || 0),
//           })),
//         })),
//       },
//       quickStats: {
//         ...farmer.quickStats,
//         totalLand: `${formData.totalLand} acres`,
//         familyMembers: Number(formData.totalAdults || 0) + Number(formData.totalChildren || 0),
//         livestock: Number(formData.livestock),
//         assets: Number(formData.assets),
//       },
//       familyDetails: {
//         totalAdults: Number(formData.totalAdults),
//         totalChildren: Number(formData.totalChildren),
//         workingMembers: Number(formData.workingMembers),
//       },
//       farmMachineryDetails: {
//         tractor: Number(formData.tractor),
//         harvester: Number(formData.harvester),
//         truck: Number(formData.truck),
//         plough: Number(formData.plough),
//         sprayer: Number(formData.sprayer),
//       },
//     };

//     console.log('Updating farmer with full details:', updatedFarmer);
//     // In a real app, you would send this to an API
//     // api.put(`/farmers/${farmer.id}`, updatedFarmer).then(() => navigate('/farmers'));

//     setIsEditMode(false); // Exit edit mode
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate('/farmers')}
//             className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-blue-600">Farmer Profile</h1>
//             <p className="text-gray-600">Complete Information for {farmer.name}</p>
//           </div>
//         </div>
//         {isEditMode ? (
//           <div className="flex gap-3">
//             <button
//               onClick={handleCancel}
//               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Save
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={handleEdit}
//             className="bg-[#0A6802] text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
//           >
//             <Edit size={18} />
//             Edit Profile
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Column - Profile Overview */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* Profile Card (Non-Editable) */}
//           <div className="bg-white rounded-lg p-6 border border-gray-200">
//             <div className="text-center">
//               <img
//                 src={farmer.profileImage}
//                 alt={farmer.name}
//                 className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
//               />
//               <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
//               <p className="text-sm text-gray-600">{farmer.memberId}</p>
//               <span className="inline-block mt-2 px-3 py-1 bg-[#0A6802] font-bold text-white text-sm rounded-full">
//                 {farmer.kycStatus}
//               </span>
//               <div className="border-t border-gray-200 my-4"></div>
//               <p className="text-sm text-gray-500 mt-2">Assigned Kisan Didi</p>
//               <p className="text-sm font-medium text-blue-500 border border-gray-200 font-semibold rounded-md py-1 px-3 inline-block">
//                 {farmer.kd}
//               </p>
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="bg-white rounded-lg p-6 border border-gray-200">
//             <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h4>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center py-2">
//                 <span className="text-gray-600">Total Land</span>
//                 {isEditMode ? (
//                   <input
//                     type="number"
//                     name="totalLand"
//                     value={formData.totalLand}
//                     onChange={handleChange}
//                     className="w-[150px] px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <span className="font-medium w-[150px] px-3 py-1 rounded border">{farmer.quickStats.totalLand}</span>
//                 )}
//               </div>
//               <div className="flex justify-between items-center py-2">
//                 <span className="text-gray-600">Family Members</span>
//                 {isEditMode ? (
//                   <input
//                     type="number"
//                     name="familyMembers"
//                     value={formData.familyMembers}
//                     onChange={handleChange}
//                     className="w-[150px] px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <span className="font-medium w-[150px] px-3 py-1 rounded border">{farmer.quickStats.familyMembers}</span>
//                 )}
//               </div>
//               <div className="flex justify-between items-center py-2">
//                 <span className="text-gray-600">Livestock</span>
//                 {isEditMode ? (
//                   <input
//                     type="number"
//                     name="livestock"
//                     value={formData.livestock}
//                     onChange={handleChange}
//                     className="w-[150px] px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <span className="font-medium w-[150px] px-3 py-1 rounded border">{farmer.quickStats.livestock}</span>
//                 )}
//               </div>
//               <div className="flex justify-between items-center py-2">
//                 <span className="text-gray-600">Assets</span>
//                 {isEditMode ? (
//                   <input
//                     type="number"
//                     name="assets"
//                     value={formData.assets}
//                     onChange={handleChange}
//                     className="w-[150px] px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <span className="font-medium w-[150px] px-3 py-1 rounded border">{farmer.quickStats.assets}</span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Family Details */}
//           <div className="bg-white rounded-lg p-6 border border-gray-200">
//             <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Users size={20} />
//               Family Details
//             </h4>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <span className="text-sm text-gray-600 block mb-1">Total Adults</span>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="totalAdults"
//                       value={formData.totalAdults}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="border border-gray-300 rounded px-3 py-2">
//                       <span className="font-semibold text-black-800">{farmer.familyDetails.totalAdults}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <span className="text-sm text-gray-600 block mb-1">Total Children</span>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="totalChildren"
//                       value={formData.totalChildren}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="border border-gray-300 rounded px-3 py-2">
//                       <span className="font-semibold text-black-800">{farmer.familyDetails.totalChildren}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-600 block mb-1">Working Members</span>
//                 {isEditMode ? (
//                   <input
//                     type="number"
//                     name="workingMembers"
//                     value={formData.workingMembers}
//                     onChange={handleChange}
//                     className="w-[150px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <div className="border border-gray-300 rounded px-3 py-2 w-[150px]">
//                     <span className="font-semibold text-black-800">{farmer.familyDetails.workingMembers}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Farm Machinery Details */}
//           <div className="bg-white rounded-lg p-6 border border-gray-200">
//             <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <CreditCard size={20} />
//               Farm Machinery Details
//             </h4>
//             <div className="space-y-4">
//               <div className="grid grid-cols-3 gap-2">
//                 <div>
//                   <span className="text-sm text-gray-600 block mb-1">Tractor</span>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="tractor"
//                       value={formData.tractor}
//                       onChange={handleChange}
//                       className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="border border-gray-300 rounded px-2 py-2">
//                       <span className="font-semibold text-black-800">{farmer.farmMachineryDetails.tractor}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <span className="text-sm text-gray-600 block mb-1">Harvester</span>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="harvester"
//                       value={formData.harvester}
//                       onChange={handleChange}
//                       className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="border border-gray-300 rounded px-2 py-2">
//                       <span className="font-semibold text-black-800">{farmer.farmMachineryDetails.harvester}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <span className="text-sm text-gray-600 block mb-1">Truck</span>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="truck"
//                       value={formData.truck}
//                       onChange={handleChange}
//                       className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="border border-gray-300 rounded px-2 py-2">
//                       <span className="font-semibold text-black-800">{farmer.farmMachineryDetails.truck}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <span className="text-sm text-gray-600 block mb-1">Plough</span>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="plough"
//                       value={formData.plough}
//                       onChange={handleChange}
//                       className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="border border-gray-300 rounded px-2 py-2">
//                       <span className="font-semibold text-black-800">{farmer.farmMachineryDetails.plough}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <span className="text-sm text-gray-600 block mb-1">Sprayer</span>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="sprayer"
//                       value={formData.sprayer}
//                       onChange={handleChange}
//                       className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="border border-gray-300 rounded px-2 py-2">
//                       <span className="font-semibold text-black-800">{farmer.farmMachineryDetails.sprayer}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Detailed Information */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Personal Information & KYC Documents */}
//           <div className="bg-white rounded-lg p-6 border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
//               <Phone size={20} /> Personal Information & KYC Documents
//             </h3>

//             {/* Basic Details */}
//             <div className="mb-6">
//               <h4 className="text-md font-medium text-gray-700 mb-3">Basic Details</h4>
//               <div className="space-y-3">
//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="text-sm text-gray-600 font-bold block mb-1">Full Name</label>
//                     {isEditMode ? (
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         required
//                       />
//                     ) : (
//                       <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                         <span className="text-sm text-black-800 font-semibold">{farmer.basicDetails.fullName}</span>
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600 font-bold block mb-1">Date of Birth</label>
//                     {isEditMode ? (
//                       <input
//                         type="date"
//                         name="dateOfBirth"
//                         value={formData.dateOfBirth}
//                         onChange={handleChange}
//                         className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                         <span className="text-sm text-black-800 font-semibold">{farmer.basicDetails.dateOfBirth}</span>
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600 font-bold block mb-1">Gender</label>
//                     {isEditMode ? (
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     ) : (
//                       <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                         <span className="text-sm text-black-800 font-semibold">{farmer.basicDetails.gender}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="text-sm text-gray-600 font-bold block mb-1">Mobile Number</label>
//                     {isEditMode ? (
//                       <input
//                         type="tel"
//                         name="mobileNumber"
//                         value={formData.mobileNumber}
//                         onChange={handleChange}
//                         className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         required
//                       />
//                     ) : (
//                       <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                         <span className="text-sm text-black-800 font-semibold">{farmer.basicDetails.mobileNumber}</span>
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600 font-bold block mb-1">Email Address</label>
//                     {isEditMode ? (
//                       <input
//                         type="email"
//                         name="emailAddress"
//                         value={formData.emailAddress}
//                         onChange={handleChange}
//                         className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                         <span className="text-sm text-black-800 font-semibold">{farmer.basicDetails.emailAddress}</span>
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600 font-bold block mb-1">Father's Name</label>
//                     {isEditMode ? (
//                       <input
//                         type="text"
//                         name="fatherName"
//                         value={formData.fatherName}
//                         onChange={handleChange}
//                         className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                         <span className="text-sm text-black-800 font-semibold">{farmer.basicDetails.fatherName}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="text-sm text-gray-600 font-bold block mb-1">Education</label>
//                     {isEditMode ? (
//                       <input
//                         type="text"
//                         name="education"
//                         value={formData.education}
//                         onChange={handleChange}
//                         className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                         <span className="text-sm text-black-800 font-semibold">{farmer.basicDetails.education}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* KYC Documents */}
//             <div>
//               <h4 className="text-md font-medium text-gray-700 mb-3">KYC Documents</h4>
//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <div className="border border-gray-300 rounded-md p-3">
//                     <label className="text-sm text-gray-600 font-bold block mb-1">Aadhar Card</label>
//                     {isEditMode ? (
//                       <input
//                         type="text"
//                         name="aadharCard"
//                         value={formData.aadharCard}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <span className="text-sm text-black-800 font-semibold">{farmer.kycDocuments.aadharCard}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Address Information */}
//           <div className="bg-white rounded-lg p-6 border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <MapPin size={20} />
//               Address Information
//             </h3>
//             <div className="space-y-3">
//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Complete Address</label>
//                   {isEditMode ? (
//                     <textarea
//                       name="completeAddress"
//                       value={formData.completeAddress}
//                       onChange={handleChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.addressInfo.completeAddress}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Village</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="village"
//                       value={formData.village}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.addressInfo.village}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Mandal</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="mandal"
//                       value={formData.mandal}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.addressInfo.mandal}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">District</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="district"
//                       value={formData.district}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.addressInfo.district}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">State</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.addressInfo.state}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">PIN Code</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="pinCode"
//                       value={formData.pinCode}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-300 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.addressInfo.pinCode}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//         {/* Land Details */}
// <div className="bg-white rounded-lg p-6 border border-gray-200">
//   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//     <Tractor size={20} /> Land Details
//   </h3>
//   <div className="space-y-4">
//     {formData.landDetails.map((land, index) => (
//       <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <label className="text-sm text-gray-600 font-bold block mb-1">Land Name</label>
//             {isEditMode ? (
//               <input
//                 type="text"
//                 name={`landDetails.${index}.landName`}
//                 value={land.landName}
//                 onChange={handleChange}
//                 className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               />
//             ) : (
//               <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                 <span className="text-sm text-black-800 font-semibold">{land.landName}</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <label className="text-sm text-gray-600 font-bold block mb-1">Land Details</label>
//             {isEditMode ? (
//               <select
//                 name={`landDetails.${index}.landOwnership`}
//                 value={land.landOwnership}
//                 onChange={handleChange}
//                 className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               >
//                 <option value="">Select Ownership</option>
//                 <option value="Own">Own</option>
//                 <option value="Leased">Leased</option>
//                 <option value="Shared">Shared</option>
//               </select>
//             ) : (
//               <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                 <span className="text-sm text-black-800 font-semibold">{land.landOwnership}</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <label className="text-sm text-gray-600 font-bold block mb-1">
//               {land.landOwnership === 'Own' ? 'Own Land' : land.landOwnership === 'Leased' ? 'Leased Land' : 'Land Area'}
//             </label>
//             {isEditMode ? (
//               <input
//                 type="number"
//                 name={`landDetails.${index}.totalLand`}
//                 value={land.totalLand}
//                 onChange={handleChange}
//                 className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               />
//             ) : (
//               <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                 <span className="text-sm text-black-800 font-semibold">{farmer.landDetails[index].ownLand || farmer.landDetails[index].leasedLand}</span>
//               </div>
//             )}
//           </div>
//         </div>
//         {isEditMode && formData.landDetails.length > 1 && (
//           <button
//             onClick={() => handleRemoveLand(index)}
//             className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
//           >
//             Remove
//           </button>
//         )}
//       </div>
//     ))}
//     {isEditMode && (
//       <button
//         onClick={handleAddLand}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//       >
//         Add Land
//       </button>
//     )}
//   </div>
// </div>

//           {/* Crop Details */}
//           <div className="bg-white rounded-lg p-6 border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Sprout size={20} />
//               Crop Details
//             </h3>
//             <div className="space-y-3">
//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Land Name</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="cropLandName"
//                       value={formData.cropLandName}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.cropDetails.landName}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Plot Number</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="plotNumber"
//                       value={formData.plotNumber}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.cropDetails.plotNumber}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Land Area</label>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="cropLandArea"
//                       value={formData.cropLandArea}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.cropDetails.landArea}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Crop Sown</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="cropSown"
//                       value={formData.cropSown}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.cropDetails.cropSown}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Variety</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="cropVariety"
//                       value={formData.cropVariety}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.cropDetails.variety}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Seed Variety</label>
//                   {isEditMode ? (
//                     <input
//                       type="text"
//                       name="seedVariety"
//                       value={formData.seedVariety}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.cropDetails.seedVariety}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Livestock Details */}
//           <div className="bg-white rounded-lg p-6 border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Users size={20} /> Livestock Details
//             </h3>

//             {/* Total Livestock Row */}
//             <div className="mb-6">
//               <div className="grid grid-cols-4 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Total Livestock</label>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="livestockCount"
//                       value={formData.livestockCount}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.livestockDetails.totalLivestock}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Cattle</label>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="cattle"
//                       value={formData.cattle}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.livestockDetails.cattle}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Poultry</label>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="poultry"
//                       value={formData.poultry}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.livestockDetails.poultry}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 font-bold block mb-1">Small Animals</label>
//                   {isEditMode ? (
//                     <input
//                       type="number"
//                       name="smallAnimals"
//                       value={formData.smallAnimals}
//                       onChange={handleChange}
//                       className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
//                       <span className="text-sm text-black-800 font-semibold">{farmer.livestockDetails.smallAnimals}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Detailed Breakdown */}
//             <div>
//               <h4 className="text-md font-medium text-gray-700 mb-3">Detailed Breakdown</h4>
//               <div className="grid grid-cols-2 gap-6">
//                 {formData.livestockBreakdown.map((category, categoryIndex) => {
//                   const isLastAndOdd =
//                     categoryIndex === formData.livestockBreakdown.length - 1 &&
//                     formData.livestockBreakdown.length % 2 !== 0;
//                   return (
//                     <div
//                       key={category.category}
//                       className={`border border-gray-200 rounded-lg p-4 ${isLastAndOdd ? 'col-span-2' : ''}`}
//                     >
//                       <h5 className="text-sm font-medium text-gray-700 mb-3">{category.category}</h5>
//                       <div className="space-y-3">
//                         {category.items.map((item, itemIndex) => (
//                           <div key={itemIndex} className="flex justify-between items-center">
//                             <span className="text-sm text-gray-600">{item.name}:</span>
//                             {isEditMode ? (
//                               <input
//                                 type="number"
//                                 name={`livestockBreakdown.${categoryIndex}.${itemIndex}.count`}
//                                 value={item.count}
//                                 onChange={handleChange}
//                                 className="w-16 h-[30px] px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <div className="w-16 h-[30px] border border-gray-200 rounded flex items-center justify-center">
//                                 <span className="text-sm text-black-800 font-semibold">{item.count}</span>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerProfile;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Sprout, Tractor, Phone, CreditCard, Edit, CheckCircle } from 'lucide-react';
import initialFarmerData, { Farmer } from './farmerprofile';

const FarmerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  // Find the farmer based on the ID
  const farmer = initialFarmerData.find((f) => f.id === parseInt(id || ''));

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
            <ArrowLeft size={20} />
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

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Personal Information & KYC Documents */}
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

      {/* Address Information */}
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

      <div className="grid grid-cols-2 gap-6">
        {/* Family Details */}
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
      </div>
    </div>
  );

  const renderMachineryLivestockTab = () => (
    <div className="space-y-6">
      {/* Livestock Details */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users size={20} /> Livestock Details
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Total Livestock</label>
              {isEditMode ? (
                <input
                  type="number"
                  name="livestockCount"
                  value={formData.livestockCount}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.livestockDetails.totalLivestock}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Cattle</label>
              {isEditMode ? (
                <input
                  type="number"
                  name="cattle"
                  value={formData.cattle}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.livestockDetails.cattle}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Poultry</label>
              {isEditMode ? (
                <input
                  type="number"
                  name="poultry"
                  value={formData.poultry}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.livestockDetails.poultry}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Small Animals</label>
              {isEditMode ? (
                <input
                  type="number"
                  name="smallAnimals"
                  value={formData.smallAnimals}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                  <span className="text-sm text-gray-800">{farmer.livestockDetails.smallAnimals}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Detailed Breakdown</h4>
            <div className="grid grid-cols-2 gap-6">
              {formData.livestockBreakdown.map((category, categoryIndex) => {
                const isLastAndOdd =
                  categoryIndex === formData.livestockBreakdown.length - 1 &&
                  formData.livestockBreakdown.length % 2 !== 0;
                return (
                  <div
                    key={category.category}
                    className={`border border-gray-200 rounded-lg p-4 ${isLastAndOdd ? 'col-span-2' : ''}`}
                  >
                    <h5 className="text-sm font-medium text-gray-700 mb-3">{category.category}</h5>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{item.name}:</span>
                          {isEditMode ? (
                            <input
                              type="number"
                              name={`livestockBreakdown.${categoryIndex}.${itemIndex}.count`}
                              value={item.count}
                              onChange={handleChange}
                              className="w-16 h-[30px] px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ) : (
                            <div className="w-16 h-[30px] border border-gray-200 rounded flex items-center justify-center">
                              <span className="text-sm text-gray-800">{item.count}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Farm Machinery Details */}
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
    </div>
  );

  const renderLandCropTab = () => (
    <div className="space-y-6">
      {/* Land Details */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Tractor size={20} /> Land Details
          </h3>
          {isEditMode && (
            <button
              onClick={handleAddLand}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Land & Crop
            </button>
          )}
        </div>

        <div className="space-y-4">
          {formData.landDetails.map((land, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Land name</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name={`landDetails.${index}.landName`}
                      value={land.landName}
                      onChange={handleChange}
                      placeholder="Enter Land Name"
                      className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                      <span className="text-sm text-gray-800">{land.landName}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Land Type</label>
                  {isEditMode ? (
                    <select
                      name={`landDetails.${index}.landOwnership`}
                      value={land.landOwnership}
                      onChange={handleChange}
                      className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="">Enter Land Type</option>
                      <option value="Own">Own</option>
                      <option value="Leased">Leased</option>
                      <option value="Shared">Shared</option>
                    </select>
                  ) : (
                    <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                      <span className="text-sm text-gray-800">{land.landOwnership}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Land Size</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name={`landDetails.${index}.totalLand`}
                      value={land.totalLand}
                      onChange={handleChange}
                      placeholder="Enter Land Size"
                      className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                      <span className="text-sm text-gray-800">{farmer.landDetails[index]?.ownLand || farmer.landDetails[index]?.leasedLand || ''}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Crop Sown</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="cropSown"
                      value={formData.cropSown}
                      onChange={handleChange}
                      placeholder="Enter Crop Sown"
                      className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                      <span className="text-sm text-gray-800">{farmer.cropDetails.cropSown}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Variety</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="cropVariety"
                      value={formData.cropVariety}
                      onChange={handleChange}
                      placeholder="Enter Variety"
                      className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                      <span className="text-sm text-gray-800">{farmer.cropDetails.variety}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Seed Variety</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="seedVariety"
                      value={formData.seedVariety}
                      onChange={handleChange}
                      placeholder="Enter Seed Variety"
                      className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                      <span className="text-sm text-gray-800">{farmer.cropDetails.seedVariety}</span>
                    </div>
                  )}
                </div>
              </div>

              {isEditMode && formData.landDetails.length > 1 && (
                <button
                  onClick={() => handleRemoveLand(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  p-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/farmers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Profile</h1>
        </div>
        {isEditMode ? (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Edit size={18} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={farmer.profileImage}
            alt={farmer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{farmer.name}</h2>
              <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                {farmer.kycStatus}
              </span>
              <span className="text-gray-500">●</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Phone size={16} />
                <span>{farmer.basicDetails.mobileNumber}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>#</span>
                <span>{farmer.memberId}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{farmer.addressInfo.district}, {farmer.addressInfo.state}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>Joined 2024-01-10</span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Assigned Kisan Didi</p>
              <p className="text-sm font-medium text-blue-600 border border-gray-200 rounded-md py-1 px-3 inline-block">
                {farmer.kd}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-green-50 rounded-lg p-1 mb-6 flex">
        {['Overview', 'Machinery & Livestock', 'Land & Crop'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && renderOverviewTab()}
      {activeTab === 'Machinery & Livestock' && renderMachineryLivestockTab()}
      {activeTab === 'Land & Crop' && renderLandCropTab()}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Saved successfully</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerProfile;