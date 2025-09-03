import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Edit, Ban, Trash, X, ChevronDown } from 'lucide-react';
import initialFarmers, { Farmer } from './farmerprofile';

const FarmerManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    mandal: '',
    landSizeFrom: '',
    landSizeTo: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({
    state: '',
    district: '',
    mandal: '',
    landSizeFrom: '',
    landSizeTo: ''
  });
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const actionMenuRef = useRef(null);

  const [allFarmers, setAllFarmers] = useState<Farmer[]>(initialFarmers);

  const getLandSizeValue = (sizeStr: string) => {
    const num = parseFloat(sizeStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const filteredFarmers = allFarmers.filter((farmer: Farmer) => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.basicDetails.mobileNumber.includes(searchTerm) ||
      farmer.memberId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = appliedFilters.state === '' || farmer.addressInfo.state === appliedFilters.state;
    const matchesDistrict = appliedFilters.district === '' || farmer.addressInfo.district === appliedFilters.district;
    const matchesMandal = appliedFilters.mandal === '' || farmer.addressInfo.mandal === appliedFilters.mandal;
    const landValue = getLandSizeValue(farmer.quickStats.totalLand);
    const from = parseFloat(appliedFilters.landSizeFrom) || 0;
    const to = parseFloat(appliedFilters.landSizeTo) || Number.POSITIVE_INFINITY;
    const matchesLandSize = (appliedFilters.landSizeFrom === '' && appliedFilters.landSizeTo === '') ||
      (landValue >= from && landValue <= to);

    return matchesSearch && matchesState && matchesDistrict && matchesMandal && matchesLandSize;
  });

  const totalEntries = filteredFarmers.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
  const currentFarmers = filteredFarmers.slice(startIndex, endIndex);

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
    const headers = ['Name', 'Mobile', 'Member ID', 'KYC Status', 'Registered Date', 'State', 'District', 'Mandal', 'Land Size'];
    const csvData = [
      headers,
      ...filteredFarmers.map((farmer: Farmer) => [
        farmer.name,
        farmer.basicDetails.mobileNumber,
        farmer.memberId,
        farmer.kycStatus,
        farmer.registeredDate,
        farmer.addressInfo.state,
        farmer.addressInfo.district,
        farmer.addressInfo.mandal,
        farmer.quickStats.totalLand
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
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      state: '',
      district: '',
      mandal: '',
      landSizeFrom: '',
      landSizeTo: ''
    });
    setAppliedFilters({
      state: '',
      district: '',
      mandal: '',
      landSizeFrom: '',
      landSizeTo: ''
    });
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setShowFilterMenu(false);
    setCurrentPage(1);
  };

  const handleDeleteFarmer = (farmer: Farmer) => {
    setAllFarmers(prev => prev.filter(f => f.id !== farmer.id));
    setShowActionMenu(null);
  };

  const handleBlockFarmer = (farmer: Farmer) => {
    setAllFarmers(prev =>
      prev.map(f =>
        f.id === farmer.id
          ? { ...f, kycStatus: f.kycStatus === 'Active' ? 'Inactive' : 'Active' }
          : f
      )
    );
    setShowActionMenu(null);
  };

  const toggleActionMenu = (farmerId: number, e: React.MouseEvent) => {
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
                hasActiveFilters ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300'
              }`}
            >
              <img src="/filter.svg" alt="Filter" />
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 space-y-4 h-[390px]">
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
                    {/* State Filter */}
                    <div className="relative">
                      <select
                        value={filters.state}
                        onChange={(e) => handleFilterChange('state', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">States</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Haryana">Haryana</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                        size={20}
                      />
                    </div>

                    {/* District Filter */}
                    <div className="relative">
                      <select
                        value={filters.district}
                        onChange={(e) => handleFilterChange('district', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Districts</option>
                        <option value="Ludhiana">Ludhiana</option>
                        <option value="Karnal">Karnal</option>
                        <option value="Amritsar">Amritsar</option>
                        <option value="Panipat">Panipat</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                        size={20}
                      />
                    </div>

                    {/* Mandal Filter */}
                    <div className="relative">
                      <select
                        value={filters.mandal}
                        onChange={(e) => handleFilterChange('mandal', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Mandals</option>
                        <option value="Ludhiana-I">Ludhiana-I</option>
                        <option value="Karnal-II">Karnal-II</option>
                        <option value="Amritsar-I">Amritsar-I</option>
                        <option value="Panipat-I">Panipat-I</option>
                        <option value="Mandal-1">Mandal-1</option>
                        <option value="Mandal-2">Mandal-2</option>
                        <option value="Mandal-3">Mandal-3</option>
                        <option value="Mandal-4">Mandal-4</option>
                        <option value="Mandal-5">Mandal-5</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                        size={20}
                      />
                    </div>

                    {/* Land Size Filter */}
                    <div className="border rounded p-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Land size</label>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <label className="whitespace-nowrap">From</label>
                          <input
                            type="number"
                            placeholder=""
                            value={filters.landSizeFrom}
                            onChange={(e) => handleFilterChange('landSizeFrom', e.target.value)}
                            className="w-[35px] h-[15px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <label className="whitespace-nowrap">To</label>
                          <input
                            type="number"
                            placeholder=""
                            value={filters.landSizeTo}
                            onChange={(e) => handleFilterChange('landSizeTo', e.target.value)}
                            className="w-[35px] h-[15px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin"
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
                      className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors"
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

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Active filters:</span>
          {appliedFilters.state && (
            <span key="state" className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
              State: {appliedFilters.state}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, state: '' }));
                  setAppliedFilters(prev => ({ ...prev, state: '' }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {appliedFilters.district && (
            <span key="district" className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
              District: {appliedFilters.district}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, district: '' }));
                  setAppliedFilters(prev => ({ ...prev, district: '' }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {appliedFilters.mandal && (
            <span key="mandal" className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
              Mandal: {appliedFilters.mandal}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, mandal: '' }));
                  setAppliedFilters(prev => ({ ...prev, mandal: '' }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {(appliedFilters.landSizeFrom || appliedFilters.landSizeTo) && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
              Land size: {appliedFilters.landSizeFrom || ''} - {appliedFilters.landSizeTo || ''}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, landSizeFrom: '', landSizeTo: '' }));
                  setAppliedFilters(prev => ({ ...prev, landSizeFrom: '', landSizeTo: '' }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Name</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Mobile</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Member ID</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Status</th>
              <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700 w-1/6">Registered Date</th>
              <th className="text-right py-4 text-sm font-semibold text-gray-700 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFarmers.length > 0 ? (
              currentFarmers.map((farmer: Farmer, index: number) => (
                <tr key={farmer.id} className={index < currentFarmers.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-4 pr-8">
                    <button
                      onClick={() => handleViewProfile(farmer)}
                      className="text-sm font-medium text-[#000000] hover:text-blue-800 underline"
                    >
                      {farmer.name}
                    </button>
                  </td>
                  <td className="py-4 pr-8 text-sm text-gray-600">{farmer.basicDetails.mobileNumber}</td>
                  <td className="py-4 pr-8 text-sm text-gray-600">{farmer.memberId}</td>
                  <td className="py-4 pr-8">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        farmer.kycStatus === 'Active' ? 'bg-gray-100 text-[#000000]' : 'bg-gray-100 text-red-800'
                      }`}
                    >
                      {farmer.kycStatus}
                    </span>
                  </td>
                  <td className="py-4 pr-8 text-sm text-gray-600">{farmer.registeredDate}</td>
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
                              handleBlockFarmer(farmer);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                          >
                            <Ban size={16} />
                            {farmer.kycStatus === 'Active' ? 'Block' : 'Unblock'}
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteFarmer(farmer);
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
                <td colSpan={6} className="py-8 text-center text-gray-500">
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
            Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
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
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
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