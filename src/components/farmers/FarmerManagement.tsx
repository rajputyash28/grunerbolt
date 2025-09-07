// import { useState, useRef, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, Plus, MoreHorizontal, Edit, Ban, Trash, X, ChevronDown } from 'lucide-react';
// import farmers from './farmerlist';

// // Define the Farmer type based on farmerlist.ts structure
// interface Farmer {
//   id: number;
//   name: string;
//   mobile: string;
//   memberId: string;
//   registeredDate: string;
//   status: string;
//   state: string;
//   district: string;
//   mandal: string;
//   landSize: string;
//   totalLandSize: number; // Added totalLandSize to the interface
// }

// const FarmerManagement = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilterMenu, setShowFilterMenu] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(4);
//   const [filters, setFilters] = useState({
//     status: '',
//     state: '',
//     district: '',
//     mandal: '',
//     landSizeFrom: '',
//     landSizeTo: ''
//   });
//   const [appliedFilters, setAppliedFilters] = useState({
//     status: '',
//     state: '',
//     district: '',
//     mandal: '',
//     landSizeFrom: '',
//     landSizeTo: ''
//   });
//   const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
//   const actionMenuRef = useRef(null);
//   const [allFarmers, setAllFarmers] = useState<Farmer[]>(farmers);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedAction, setSelectedAction] = useState<{ action: 'delete' | 'block'; farmer: Farmer } | null>(null);

//   const uniqueStates = useMemo(() => [...new Set(allFarmers.map(f => f.state))].sort(), [allFarmers]);

//   const districtsByState = useMemo(() => 
//     allFarmers.reduce((acc, f) => {
//       if (!acc[f.state]) acc[f.state] = new Set();
//       acc[f.state].add(f.district);
//       return acc;
//     }, {} as Record<string, Set<string>>),
//   [allFarmers]);

//   const mandalsByDistrict = useMemo(() => 
//     allFarmers.reduce((acc, f) => {
//       if (!acc[f.district]) acc[f.district] = new Set();
//       acc[f.district].add(f.mandal);
//       return acc;
//     }, {} as Record<string, Set<string>>),
//   [allFarmers]);

//   const filteredFarmers = allFarmers.filter((farmer: Farmer) => {
//     const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       farmer.mobile.includes(searchTerm) ||
//       farmer.memberId.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus = appliedFilters.status === '' || farmer.status === appliedFilters.status;
//     const matchesState = appliedFilters.state === '' || farmer.state === appliedFilters.state;
//     const matchesDistrict = appliedFilters.district === '' || farmer.district === appliedFilters.district;
//     const matchesMandal = appliedFilters.mandal === '' || farmer.mandal === appliedFilters.mandal;
//     const from = parseFloat(appliedFilters.landSizeFrom) || 0;
//     const to = parseFloat(appliedFilters.landSizeTo) || Number.POSITIVE_INFINITY;
//     const matchesLandSize = (appliedFilters.landSizeFrom === '' && appliedFilters.landSizeTo === '') ||
//       (farmer.totalLandSize >= from && farmer.totalLandSize <= to);

//     return matchesSearch && matchesStatus && matchesState && matchesDistrict && matchesMandal && matchesLandSize;
//   });

//   const totalEntries = filteredFarmers.length;
//   const totalPages = Math.ceil(totalEntries / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
//   const currentFarmers = filteredFarmers.slice(startIndex, endIndex);

//   const handleViewProfile = (farmer: Farmer) => {
//     navigate(`/farmers/${farmer.id}`);
//   };

//   const handleEditFarmer = (farmer: Farmer) => {
//     navigate(`/farmers/${farmer.id}`);
//   };

//   const handleAddFarmer = () => {
//     navigate('/farmers/add');
//   };

//   const handleExportCSV = () => {
//     const headers = ['Name', 'Mobile', 'Member ID', 'Status', 'Registered Date', 'State', 'District', 'Mandal', 'Land Size', 'Total Land Size'];
//     const csvData = [
//       headers,
//       ...filteredFarmers.map((farmer: Farmer) => [
//         farmer.name,
//         farmer.mobile,
//         farmer.memberId,
//         farmer.status,
//         farmer.registeredDate,
//         farmer.state,
//         farmer.district,
//         farmer.mandal,
//         farmer.landSize,
//         farmer.totalLandSize
//       ])
//     ];

//     const csvContent = csvData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'farmers_data.csv';
//     link.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const handleFilterChange = (filterType: string, value: string) => {
//     setFilters(prev => {
//       const newFilters = { ...prev, [filterType]: value };
//       if (filterType === 'state') {
//         newFilters.district = '';
//         newFilters.mandal = '';
//         newFilters.landSizeFrom = '';
//         newFilters.landSizeTo = '';
//       } else if (filterType === 'district') {
//         newFilters.mandal = '';
//         newFilters.landSizeFrom = '';
//         newFilters.landSizeTo = '';
//       }
//       return newFilters;
//     });
//   };

//   const handleResetFilters = () => {
//     setFilters({
//       status: '',
//       state: '',
//       district: '',
//       mandal: '',
//       landSizeFrom: '',
//       landSizeTo: ''
//     });
//     setAppliedFilters({
//       status: '',
//       state: '',
//       district: '',
//       mandal: '',
//       landSizeFrom: '',
//       landSizeTo: ''
//     });
//     setCurrentPage(1);
//     setShowFilterMenu(false);
//   };

//   const handleApplyFilters = () => {
//     setAppliedFilters({ ...filters });
//     setShowFilterMenu(false);
//     setCurrentPage(1);
//   };

//   const handleDeleteFarmer = (farmer: Farmer) => {
//     setAllFarmers(prev => prev.filter(f => f.id !== farmer.id));
//     setShowActionMenu(null);
//   };

//   const handleBlockFarmer = (farmer: Farmer) => {
//     setAllFarmers(prev =>
//       prev.map(f =>
//         f.id === farmer.id
//           ? { ...f, status: f.status === 'Active' ? 'Inactive' : 'Active' }
//           : f
//       )
//     );
//     setShowActionMenu(null);
//   };

//   const handleActionConfirm = () => {
//     if (selectedAction) {
//       if (selectedAction.action === 'delete') {
//         handleDeleteFarmer(selectedAction.farmer);
//       } else if (selectedAction.action === 'block') {
//         handleBlockFarmer(selectedAction.farmer);
//       }
//       setShowConfirmation(false);
//       setSelectedAction(null);
//     }
//   };

//   const handleActionCancel = () => {
//     setShowConfirmation(false);
//     setSelectedAction(null);
//   };

//   const toggleActionMenu = (farmerId: number, e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (showActionMenu === farmerId) {
//       setShowActionMenu(null);
//     } else {
//       setShowActionMenu(farmerId);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const isActionButton = (event.target as HTMLElement).closest('button[title="More Actions"]');
//       if (actionMenuRef.current && !(actionMenuRef.current as any).contains(event.target) && !isActionButton) {
//         setShowActionMenu(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const hasActiveFilters = Object.values(appliedFilters).some(filter => filter !== '');

//   const isApplyDisabled = !Object.values(filters).some(value => value !== '');

//   return (
//     <div className="space-y-8 relative">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Farmer Management</h1>
//           <p className="text-gray-600 mt-1">
//             Manage farmers, status, and details
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleAddFarmer}
//             className="bg-[#000000] text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
//           >
//             <Plus size={20} />
//             Add New Farmer
//           </button>
//         </div>
//       </div>

//       <div className="">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by name, mobile, or member ID..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-[448px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
//           />
//         </div>
//         <div className="flex items-center justify-end mt-4 gap-3">
//           <button
//             onClick={handleExportCSV}
//             className="bg-white border font-bold border-black text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
//           >
//             <img src="/export.svg" alt="export" />
//             Export CSV
//           </button>
//           <div className="relative">
//             <button
//               onClick={() => setShowFilterMenu(!showFilterMenu)}
//               className={`flex items-center gap-2 px-4 py-2 transition-colors ${
//                 hasActiveFilters ? 'relative' : 'border-gray-300'
//               }`}
//             >
//               <img
//                 src="/filter.svg"
//                 alt="Filter"
//                 className={hasActiveFilters ? 'relative' : ''}
//               />
//               {hasActiveFilters && (
//                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//               )}
//             </button>

//             {showFilterMenu && (
//               <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                 <div className="p-4 space-y-4 h-[450px]">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-medium text-gray-900">Filter by</h3>
//                     <button
//                       onClick={() => setShowFilterMenu(false)}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <X size={19} className="text-[#000000]" />
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     {/* Status Filter */}
//                     <div className="relative">
//                       <select
//                         value={filters.status}
//                         onChange={(e) => handleFilterChange('status', e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">Status</option>
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                       </select>
//                       <ChevronDown
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
//                         size={20}
//                       />
//                     </div>

//                     {/* State Filter */}
//                     <div className="relative">
//                       <select
//                         value={filters.state}
//                         onChange={(e) => handleFilterChange('state', e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">States</option>
//                         {uniqueStates.map(state => (
//                           <option key={state} value={state}>{state}</option>
//                         ))}
//                       </select>
//                       <ChevronDown
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
//                         size={20}
//                       />
//                     </div>

//                     {/* District Filter */}
//                     <div className="relative">
//                       <select
//                         value={filters.district}
//                         onChange={(e) => handleFilterChange('district', e.target.value)}
//                         disabled={!filters.state}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
//                       >
//                         <option value="">Districts</option>
//                         {filters.state && Array.from(districtsByState[filters.state] || []).sort().map(district => (
//                           <option key={district} value={district}>{district}</option>
//                         ))}
//                       </select>
//                       <ChevronDown
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
//                         size={20}
//                       />
//                     </div>

//                     {/* Mandal Filter */}
//                     <div className="relative">
//                       <select
//                         value={filters.mandal}
//                         onChange={(e) => handleFilterChange('mandal', e.target.value)}
//                         disabled={!filters.district}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
//                       >
//                         <option value="">Mandals</option>
//                         {filters.district && Array.from(mandalsByDistrict[filters.district] || []).sort().map(mandal => (
//                           <option key={mandal} value={mandal}>{mandal}</option>
//                         ))}
//                       </select>
//                       <ChevronDown
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
//                         size={20}
//                       />
//                     </div>

//                     {/* Land Size Filter */}
//                     <div className="border rounded p-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Total land size</label>
//                       <div className="flex items-center gap-6">
//                         <div className="flex items-center gap-2">
//                           <label className="whitespace-nowrap">From</label>
//                           <input
//                             type="number"
//                             min="0"
//                             placeholder=""
//                             value={filters.landSizeFrom}
//                             onChange={(e) => handleFilterChange('landSizeFrom', e.target.value)}
//                             disabled={!filters.state}
//                             className="w-[60px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin disabled:opacity-50"
//                           />
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <label className="whitespace-nowrap">To</label>
//                           <input
//                             type="number"
//                             placeholder=""
//                             value={filters.landSizeTo}
//                             onChange={(e) => handleFilterChange('landSizeTo', e.target.value)}
//                             disabled={!filters.state}
//                             className="w-[60px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin disabled:opacity-50"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 pt-3">
//                     <button
//                       onClick={handleResetFilters}
//                       className="flex-1 px-3 py-2 font-bold text-black bg-white border border-gray-300 rounded-md transition-colors"
//                     >
//                       Reset
//                     </button>
//                     <button
//                       onClick={handleApplyFilters}
//                       disabled={isApplyDisabled}
//                       className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors disabled:opacity-50"
//                     >
//                       Apply
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-200">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-200">
//               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Name</th>
//               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Mobile</th>
//               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Member ID</th>
//               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Status</th>
//               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Registered Date</th>
//               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Total Land Size</th>
//               <th className="text-right py-4 text-sm font-semibold text-gray-700 w-1/7">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentFarmers.length > 0 ? (
//               currentFarmers.map((farmer: Farmer, index: number) => (
//                 <tr key={farmer.id} className={index < currentFarmers.length - 1 ? 'border-b border-gray-100' : ''}>
//                   <td className="py-4 pr-8">
//                     <button
//                       onClick={() => handleViewProfile(farmer)}
//                       className="text-sm font-medium text-[#000000] hover:text-blue-800 underline"
//                     >
//                       {farmer.name}
//                     </button>
//                   </td>
//                   <td className="py-4 pr-8 text-sm text-gray-600">{farmer.mobile}</td>
//                   <td className="py-4 pr-8 text-sm text-gray-600">{farmer.memberId}</td>
//                   <td className="py-4 pr-8">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                         farmer.status === 'Active' ? 'bg-gray-100 text-[#000000]' : 'bg-gray-100 text-[#000000]'
//                       }`}
//                     >
//                       {farmer.status}
//                     </span>
//                   </td>
//                   <td className="py-4 pr-8 text-sm text-gray-600">{farmer.registeredDate}</td>
//                   <td className="py-4 pr-8 text-sm text-gray-600">{farmer.totalLandSize} acres</td>
//                   <td className="py-4 text-right relative">
//                     <button
//                       onClick={(e) => toggleActionMenu(farmer.id, e)}
//                       className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
//                       title="More Actions"
//                     >
//                       <MoreHorizontal size={16} />
//                     </button>
//                     {showActionMenu === farmer.id && (
//                       <div
//                         ref={actionMenuRef}
//                         className="absolute right-0 top-8 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
//                       >
//                         <div className="py-1">
//                           <button
//                             onClick={() => {
//                               handleEditFarmer(farmer);
//                               setShowActionMenu(null);
//                             }}
//                             className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
//                           >
//                             <Edit size={16} />
//                             Edit Details
//                           </button>
//                           <button
//                             onClick={() => {
//                               setSelectedAction({ action: 'block', farmer });
//                               setShowConfirmation(true);
//                               setShowActionMenu(null);
//                             }}
//                             className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
//                           >
//                             <Ban size={16} />
//                             {farmer.status === 'Active' ? 'Block' : 'Unblock'}
//                           </button>
//                           <button
//                             onClick={() => {
//                               setSelectedAction({ action: 'delete', farmer });
//                               setShowConfirmation(true);
//                               setShowActionMenu(null);
//                             }}
//                             className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#000000] hover:bg-gray-100 transition-colors"
//                           >
//                             <Trash size={16} />
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="py-8 text-center text-gray-500">
//                   No farmers found matching your criteria
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalEntries > 0 && (
//         <div className="flex items-center justify-between">
//           <div className="font-semibold text-sm text-[#000000]">
//             Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
//           </div>

//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>

//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }

//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`px-3 py-1 text-sm transition-colors text-[#8A8A8A] ${
//                     pageNum === currentPage ? 'border rounded border-[#000000]' : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {showConfirmation && selectedAction && (
//         <div className="fixed inset-0  flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg relative w-[400px]">
//             <h2 className="text-lg font-bold">{selectedAction.action === 'delete' ? 'Delete User' : 'Block/Unblock User'}</h2>
//             <p className="mt-2">Are you sure you want to {selectedAction.action} this User?</p>
//             <div className="mt-4 flex justify-end gap-4">
//               <button
//                 onClick={handleActionCancel}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handleActionConfirm}
//                 className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showFilterMenu && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setShowFilterMenu(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default FarmerManagement;


// //-------------------------------------------------------------------------------//

// //api integrated 
// // import { useEffect, useRef, useState } from 'react';
// // import { Plus, Search, MoreHorizontal, Edit, Ban, Trash } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { farmerService, Farmer } from '../../services/farmerManagement';

// // const FarmerManagement = () => {
// //   const [farmers, setFarmers] = useState<Farmer[]>([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [totalEntries, setTotalEntries] = useState(0);
// //   const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
// //   const itemsPerPage = 10; how many items should be displayed at a time 
// //   // NOTE: In a real app, the token would be managed by a more robust state management system (e.g., Context, Redux)
// //   // or a custom hook that handles authentication.
// //   const token = localStorage.getItem('token') || '';
// //   const actionMenuRef = useRef<HTMLDivElement>(null);
// //   const navigate = useNavigate();

// //   // Fetches farmer data from the service
// //   const fetchFarmers = async () => {
// //     const result = await farmerService.fetchFarmers(searchTerm, currentPage, itemsPerPage, token);
    
// //     if (result.success && result.data) {
// //       setFarmers(result.data.farmers);
// //       setTotalEntries(result.data.count);
// //       setTotalPages(result.data.totalPages);
// //     } else {
// //       console.error(result.message);
// //       // NOTE: Using a custom modal or toast for user feedback instead of a native alert
// //       // as `alert()` is not supported in this environment.
// //       // This is a placeholder for your custom UI message.
// //       console.log('Failed to fetch farmers. Please try again.');
// //     }
// //   };

// //   // Re-fetches farmers whenever the search term or current page changes
// //   useEffect(() => {
// //     fetchFarmers();
// //   }, [searchTerm, currentPage]);

// //   // Handles closing the action menu when clicking outside of it
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       const isActionButton = (event.target as HTMLElement).closest('button[title="More Actions"]');
// //       if (actionMenuRef.current && !(actionMenuRef.current as any).contains(event.target) && !isActionButton) {
// //         setShowActionMenu(null);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   const handleViewProfile = (farmer: Farmer) => {
// //     navigate(`/farmers/${farmer.id}`);
// //   };

// //   const handleEditFarmer = (farmer: Farmer) => {
// //     // Navigate to a client-side route for editing
// //     navigate(`/farmers/${farmer.id}/edit`);
// //   };

// //   const handleAddFarmer = () => {
// //     navigate('/farmers/add');
// //   };

// //   // Exports data to CSV from the currently displayed farmers
// //   const handleExportCSV = () => {
// //     const headers = ['Name', 'Mobile', 'Member ID', 'Status', 'Registered Date'];
// //     const csvData = [
// //       headers,
// //       ...farmers.map((farmer: Farmer) => [
// //         farmer.name,
// //         farmer.phoneNumber,
// //         farmer.memberId,
// //         farmer.isActive ? 'Active' : 'Inactive',
// //         new Date(farmer.createdAt).toLocaleDateString()
// //       ])
// //     ];
// //     const csvContent = csvData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
// //     const blob = new Blob([csvContent], { type: 'text/csv' });
// //     const url = window.URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = 'farmers_data.csv';
// //     link.click();
// //     window.URL.revokeObjectURL(url);
// //   };

// //   // Deletes a farmer using the service and refreshes the data
// //   const handleDeleteFarmer = async (farmer: Farmer) => {
// //     const result = await farmerService.deleteFarmer(farmer.id, token);
// //     if (result.success) {
// //       setShowActionMenu(null);
// //       fetchFarmers();
// //     } else {
// //       console.error(result.message);
// //       console.log('Failed to delete farmer.');
// //     }
// //   };

// //   // Toggles a farmer's status using the service and refreshes the data
// //   const handleBlockFarmer = async (farmer: Farmer) => {
// //     const result = await farmerService.toggleFarmerStatus(farmer.id, token);
// //     if (result.success) {
// //       setShowActionMenu(null);
// //       fetchFarmers();
// //     } else {
// //       console.error(result.message);
// //       console.log('Failed to toggle farmer status.');
// //     }
// //   };

// //   const toggleActionMenu = (farmerId: string, e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setShowActionMenu(showActionMenu === farmerId ? null : farmerId);
// //   };

// //   const startIndex = (currentPage - 1) * itemsPerPage + 1;
// //   const endIndex = Math.min(startIndex + itemsPerPage - 1, totalEntries);

// //   return (
// //     <div className="space-y-8 relative">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Farmer Management</h1>
// //           <p className="text-gray-600 mt-1">Manage farmers, status, and details</p>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <button
// //             onClick={handleAddFarmer}
// //             className="bg-[#000000] text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
// //           >
// //             <Plus size={20} />
// //             Add New Farmer
// //           </button>
// //         </div>
// //       </div>

// //       <div className="flex items-center justify-between">
// //         <div className="flex-1 relative">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
// //           <input
// //             type="text"
// //             placeholder="Search by name, mobile, or member ID..."
// //             value={searchTerm}
// //             onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
// //             className="w-[448px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
// //           />
// //         </div>
// //         <button
// //           onClick={handleExportCSV}
// //           className="bg-white border font-bold border-black text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
// //         >
// //           <img src="/export.svg" alt="export" />
// //           Export CSV
// //         </button>
// //       </div>

// //       <div className="px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-200">
// //         <table className="w-full">
// //           <thead>
// //             <tr className="border-b border-gray-200">
// //               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Name</th>
// //               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Mobile</th>
// //               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Member ID</th>
// //               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Status</th>
// //               <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Registered Date</th>
// //               <th className="text-right py-4 text-sm font-semibold text-gray-700 w-1/6">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {farmers.length > 0 ? (
// //               farmers.map((farmer: Farmer, index: number) => (
// //                 <tr key={farmer.id} className={index < farmers.length - 1 ? "border-b border-gray-100" : ""}>
// //                   <td className="py-4 pr-8">
// //                     <button
// //                       onClick={() => handleViewProfile(farmer)}
// //                       className="text-sm font-medium text-[#000000]-600 hover:text-blue-800 underline"
// //                     >
// //                       {farmer.name}
// //                     </button>
// //                   </td>
// //                   <td className="py-4 pr-8 text-sm text-gray-600">{farmer.phoneNumber}</td>
// //                   <td className="py-4 pr-8 text-sm text-gray-600">{farmer.memberId}</td>
// //                   <td className="py-4 pr-8">
// //                     <span
// //                       className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
// //                         farmer.isActive ? 'bg-gray-100 text-[#000000]-800' : 'bg-gray-100 text-red-800'
// //                       }`}
// //                     >
// //                       {farmer.isActive ? 'Active' : 'Inactive'}
// //                     </span>
// //                   </td>
// //                   <td className="py-4 pr-8 text-sm text-gray-600">
// //                     {new Date(farmer.createdAt).toLocaleDateString()}
// //                   </td>
// //                   <td className="py-4 text-right relative">
// //                     <button
// //                       onClick={(e) => toggleActionMenu(farmer.id, e)}
// //                       className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
// //                       title="More Actions"
// //                     >
// //                       <MoreHorizontal size={16} />
// //                     </button>
// //                     {showActionMenu === farmer.id && (
// //                       <div ref={actionMenuRef} className="absolute right-0 top-8 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
// //                         <div className="py-1">
// //                           <button
// //                             onClick={() => {
// //                               handleEditFarmer(farmer);
// //                               setShowActionMenu(null);
// //                             }}
// //                             className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
// //                           >
// //                             <Edit size={16} />
// //                             Edit Details
// //                           </button>
// //                           <button
// //                             onClick={() => {
// //                               handleBlockFarmer(farmer);
// //                               setShowActionMenu(null);
// //                             }}
// //                             className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
// //                           >
// //                             <Ban size={16} />
// //                             {farmer.isActive ? 'Block' : 'Unblock'}
// //                           </button>
// //                           <button
// //                             onClick={() => {
// //                               handleDeleteFarmer(farmer);
// //                               setShowActionMenu(null);
// //                             }}
// //                             className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#000000]-600 hover:bg-gray-100 transition-colors"
// //                           >
// //                             <Trash size={16} />
// //                             Delete
// //                           </button>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan={6} className="py-8 text-center text-gray-500">
// //                   No farmers found matching your criteria
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {totalEntries > 0 && (
// //         <div className="flex items-center justify-between">
// //           <div className="font-semibold text-sm text-[#000000]">
// //             Showing {startIndex} to {endIndex} of {totalEntries} entries
// //           </div>
// //           <div className="flex items-center gap-1">
// //             <button
// //               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //               disabled={currentPage === 1}
// //               className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               Previous
// //             </button>
// //             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //               let pageNum;
// //               if (totalPages <= 5) {
// //                 pageNum = i + 1;
// //               } else if (currentPage <= 3) {
// //                 pageNum = i + 1;
// //               } else if (currentPage >= totalPages - 2) {
// //                 pageNum = totalPages - 4 + i;
// //               } else {
// //                 pageNum = currentPage - 2 + i;
// //               }
// //               return (
// //                 <button
// //                   key={pageNum}
// //                   onClick={() => setCurrentPage(pageNum)}
// //                   className={`px-3 py-1 text-sm transition-colors text-[#8A8A8A] ${
// //                     pageNum === currentPage ? 'border rounded border-[#000000]' : 'hover:bg-gray-50'
// //                   }`}
// //                 >
// //                   {pageNum}
// //                 </button>
// //               );
// //             })}
// //             <button
// //               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //               disabled={currentPage === totalPages}
// //               className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FarmerManagement;

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Edit, Ban, Trash, X, ChevronDown } from 'lucide-react';
// import { farmerService, FetchFarmersParams } from '../../services/farmerManagement';
// import { locationService, Location } from '../../services/locationService';
import { farmerServiceMock as farmerService } from '../../services/farmermanagementsimulation'; // Updated import
import { locationServiceMock as locationService} from '../../services/locationservicesimulation'; // Updated import
import { Location } from '../../services/locationService'
import { FetchFarmersParams } from '../../services/farmerManagement';

// Define the Farmer type based on API structure
interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  memberId: string;
  isActive: boolean;
  createdAt: string;
  totalLands: number;
  totalLandAreaAcres: number;
}

const FarmerManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [filters, setFilters] = useState({
    status: '',
    stateId: '',
    districtId: '',
    mandalId: '',
    landSizeFrom: '',
    landSizeTo: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({
    status: '',
    stateId: '',
    districtId: '',
    mandalId: '',
    landSizeFrom: '',
    landSizeTo: ''
  });
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const actionMenuRef = useRef(null);
  const [farmersList, setFarmersList] = useState<Farmer[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPagesState, setTotalPagesState] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState<{ action: 'delete' | 'block'; farmer: Farmer } | null>(null);
  const [states, setStates] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [mandals, setMandals] = useState<Location[]>([]);

  // TODO: Replace with actual tokens from auth context or localStorage
  const bearerToken = 'bearer-token';
  const basicToken = 'basic-token';

  const fetchFarmersData = async () => {
    const params: FetchFarmersParams = {
      search: searchTerm || undefined,
      isActive: appliedFilters.status === 'Active' ? true : appliedFilters.status === 'Inactive' ? false : undefined,
      stateId: appliedFilters.stateId || undefined,
      districtId: appliedFilters.districtId || undefined,
      mandalId: appliedFilters.mandalId || undefined,
      totalLandMin: parseFloat(appliedFilters.landSizeFrom) || undefined,
      totalLandMax: parseFloat(appliedFilters.landSizeTo) || undefined,
      page: currentPage,
      limit: itemsPerPage,
      newestFirst: true,
    };

    const response = await farmerService.fetchFarmers(params, bearerToken);
    if (response.success && response.data) {
      setFarmersList(response.data.farmers);
      setTotalEntries(response.data.count);
      setTotalPagesState(response.data.totalPages);
    } else {
      console.error(response.message);
      // Optionally show error message to user
    }
  };

  useEffect(() => {
    fetchFarmersData();
  }, [searchTerm, currentPage, appliedFilters]);

  useEffect(() => {
    const fetchStates = async () => {
      const response = await locationService.fetchLocations('state', undefined, undefined, 1, 100, 'en', basicToken);
      console.log(response);
      if (response.success && response.data ) {
        setStates(response.data.locations);
      } else {
        console.error(response.message);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (filters.stateId) {
      const fetchDistricts = async () => {
        const response = await locationService.fetchStateDistricts(filters.stateId, undefined, 1, 100, 'en', basicToken);
        console.log(response);
        if (response.success && response.data) {
          setDistricts(response.data.locations);
        } else {
          console.error(response.message);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
    // Reset dependent filters (as per original code)
    setFilters(prev => ({ ...prev, districtId: '', mandalId: '' }));
  }, [filters.stateId]);

  useEffect(() => {
    if (filters.districtId) {
      const fetchMandals = async () => {
        const response = await locationService.fetchDistrictCities(filters.districtId, 1, 100, 'en', basicToken);
        if (response.success && response.data) {
          setMandals(response.data.locations);
        } else {
          console.error(response.message);
        }
      };
      fetchMandals();
    } else {
      setMandals([]);
    }
    // Reset dependent filters (as per original code)
    setFilters(prev => ({ ...prev, mandalId: '' }));
  }, [filters.districtId]);

  const handleViewProfile = (farmer: Farmer) => {
    navigate(`/farmers/${farmer.id}`);
  };

  const handleEditFarmer = (farmer: Farmer) => {
    navigate(`/farmers/${farmer.id}`);
  };

  const handleAddFarmer = () => {
    navigate('/farmers/add');
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Mobile', 'Member ID', 'Status', 'Registered Date', 'Total Land Size'];
    const csvData = [
      headers,
      ...farmersList.map((farmer: Farmer) => [
        farmer.name,
        farmer.phoneNumber,
        farmer.memberId,
        farmer.isActive ? 'Active' : 'Inactive',
        farmer.createdAt,
        farmer.totalLandAreaAcres
      ])
    ];

    const csvContent = csvData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'farmers_data.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      if (filterType === 'stateId') {
        newFilters.districtId = '';
        newFilters.mandalId = '';
        newFilters.landSizeFrom = '';
        newFilters.landSizeTo = '';
      } else if (filterType === 'districtId') {
        newFilters.mandalId = '';
        newFilters.landSizeFrom = '';
        newFilters.landSizeTo = '';
      }
      return newFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      stateId: '',
      districtId: '',
      mandalId: '',
      landSizeFrom: '',
      landSizeTo: ''
    });
    setAppliedFilters({
      status: '',
      stateId: '',
      districtId: '',
      mandalId: '',
      landSizeFrom: '',
      landSizeTo: ''
    });
    setCurrentPage(1);
    setShowFilterMenu(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setShowFilterMenu(false);
    setCurrentPage(1);
  };

  const handleActionConfirm = async () => {
    if (selectedAction) {
      let success = false;
      if (selectedAction.action === 'delete') {
        const res = await farmerService.deleteFarmer(selectedAction.farmer.id, bearerToken);
        success = res.success;
      } else if (selectedAction.action === 'block') {
        const res = await farmerService.toggleFarmerStatus(selectedAction.farmer.id, bearerToken);
        success = res.success;
      }
      if (success) {
        fetchFarmersData();
      } else {
        // Handle error
        console.error('Action failed');
      }
      setShowConfirmation(false);
      setSelectedAction(null);
    }
  };

  const handleActionCancel = () => {
    setShowConfirmation(false);
    setSelectedAction(null);
  };

  const toggleActionMenu = (farmerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (showActionMenu === farmerId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(farmerId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isActionButton = (event.target as HTMLElement).closest('button[title="More Actions"]');
      if (actionMenuRef.current && !(actionMenuRef.current as any).contains(event.target) && !isActionButton) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasActiveFilters = Object.values(appliedFilters).some(filter => filter !== '');

  const isApplyDisabled = !Object.values(filters).some(value => value !== '');

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + farmersList.length - 1, totalEntries);

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Management</h1>
          <p className="text-gray-600 mt-1">
            Manage farmers, status, and details
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddFarmer}
            className="bg-[#000000] text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add New Farmer
          </button>
        </div>
      </div>

      <div className="">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, mobile, or member ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[448px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-center justify-end mt-4 gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-white border font-bold border-black text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <img src="/export.svg" alt="export" />
            Export CSV
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                hasActiveFilters ? 'relative' : 'border-gray-300'
              }`}
            >
              <img
                src="/filter.svg"
                alt="Filter"
                className={hasActiveFilters ? 'relative' : ''}
              />
              {hasActiveFilters && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 space-y-4 h-[450px]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Filter by</h3>
                    <button
                      onClick={() => setShowFilterMenu(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={19} className="text-[#000000]" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Status Filter */}
                    <div className="relative">
                      <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                        size={20}
                      />
                    </div>

                    {/* State Filter */}
                    <div className="relative">
                      <select
                        value={filters.stateId}
                        onChange={(e) => handleFilterChange('stateId', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">States</option>
                        {states.map(state => (
                          <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                        size={20}
                      />
                    </div>

                    {/* District Filter */}
                    <div className="relative">
                      <select
                        value={filters.districtId}
                        onChange={(e) => handleFilterChange('districtId', e.target.value)}
                        disabled={!filters.stateId}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      >
                        <option value="">Districts</option>
                        {districts.map(district => (
                          <option key={district.id} value={district.id}>{district.name}</option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                        size={20}
                      />
                    </div>

                    {/* Mandal Filter */}
                    <div className="relative">
                      <select
                        value={filters.mandalId}
                        onChange={(e) => handleFilterChange('mandalId', e.target.value)}
                        disabled={!filters.districtId}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      >
                        <option value="">Mandals</option>
                        {mandals.map(mandal => (
                          <option key={mandal.id} value={mandal.id}>{mandal.name}</option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                        size={20}
                      />
                    </div>

                    {/* Land Size Filter */}
                    <div className="border rounded p-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total land size</label>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <label className="whitespace-nowrap">From</label>
                          <input
                            type="number"
                            min="0"
                            placeholder=""
                            value={filters.landSizeFrom}
                            onChange={(e) => handleFilterChange('landSizeFrom', e.target.value)}
                            disabled={!filters.stateId}
                            className="w-[60px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin disabled:opacity-50"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <label className="whitespace-nowrap">To</label>
                          <input
                            type="number"
                            placeholder=""
                            value={filters.landSizeTo}
                            onChange={(e) => handleFilterChange('landSizeTo', e.target.value)}
                            disabled={!filters.stateId}
                            className="w-[60px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      onClick={handleResetFilters}
                      className="flex-1 px-3 py-2 font-bold text-black bg-white border border-gray-300 rounded-md transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleApplyFilters}
                      disabled={isApplyDisabled}
                      className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Name</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Mobile</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Member ID</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Status</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Registered Date</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/7">Total Land Size</th>
              <th className="text-right py-4 text-sm font-semibold text-gray-700 w-1/7">Actions</th>
            </tr>
          </thead>
          <tbody>
            {farmersList.length > 0 ? (
              farmersList.map((farmer: Farmer, index: number) => (
                <tr key={farmer.id} className={index < farmersList.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-4 pr-8">
                    <button
                      onClick={() => handleViewProfile(farmer)}
                      className="text-sm font-medium text-[#000000] hover:text-blue-800 underline"
                    >
                      {farmer.name}
                    </button>
                  </td>
                  <td className="py-4 pr-8 text-sm text-gray-600">{farmer.phoneNumber}</td>
                  <td className="py-4 pr-8 text-sm text-gray-600">{farmer.memberId}</td>
                  <td className="py-4 pr-8">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        farmer.isActive ? 'bg-gray-100 text-[#000000]' : 'bg-gray-100 text-[#000000]'
                      }`}
                    >
                      {farmer.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 pr-8 text-sm text-gray-600">{farmer.createdAt}</td>
                  <td className="py-4 pr-8 text-sm text-gray-600">{farmer.totalLandAreaAcres} acres</td>
                  <td className="py-4 text-right relative">
                    <button
                      onClick={(e) => toggleActionMenu(farmer.id, e)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="More Actions"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {showActionMenu === farmer.id && (
                      <div
                        ref={actionMenuRef}
                        className="absolute right-0 top-8 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => {
                              handleEditFarmer(farmer);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                          >
                            <Edit size={16} />
                            Edit Details
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAction({ action: 'block', farmer });
                              setShowConfirmation(true);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                          >
                            <Ban size={16} />
                            {farmer.isActive ? 'Block' : 'Unblock'}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAction({ action: 'delete', farmer });
                              setShowConfirmation(true);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#000000] hover:bg-gray-100 transition-colors"
                          >
                            <Trash size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No farmers found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalEntries > 0 && (
        <div className="flex items-center justify-between">
          <div className="font-semibold text-sm text-[#000000]">
            Showing {startIndex} to {endIndex} of {totalEntries} entries
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPagesState) }, (_, i) => {
              let pageNum;
              if (totalPagesState <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPagesState - 2) {
                pageNum = totalPagesState - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm transition-colors text-[#8A8A8A] ${
                    pageNum === currentPage ? 'border rounded border-[#000000]' : 'hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(Math.min(totalPagesState, currentPage + 1))}
              disabled={currentPage === totalPagesState}
              className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showConfirmation && selectedAction && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-[400px]">
            <h2 className="text-lg font-bold">{selectedAction.action === 'delete' ? 'Delete User' : 'Block/Unblock User'}</h2>
            <p className="mt-2">Are you sure you want to {selectedAction.action} this User?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={handleActionCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50"
              >
                No
              </button>
              <button
                onClick={handleActionConfirm}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showFilterMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowFilterMenu(false)}
        />
      )}
    </div>
  );
};

export default FarmerManagement;



