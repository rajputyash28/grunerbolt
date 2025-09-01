import React, { useState } from 'react';
import { Search, Plus, Filter, Eye, Edit, MoreHorizontal } from 'lucide-react';

const FarmManagerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const farmManagers = [
    {
      id: 1,
      name: 'Ravi Gupta',
      registrationId: 'FM-2024-001',
      mobile: '+91 9876543210',
      location: 'Surat, Gujarat',
      status: 'Active',
      assignedFarms: 12,
      experience: '8 years'
    },
    {
      id: 2,
      name: 'Amit Singh',
      registrationId: 'FM-2024-002',
      mobile: '+91 9876543211',
      location: 'Rajkot, Gujarat',
      status: 'Active',
      assignedFarms: 8,
      experience: '5 years'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farm Manager Management</h1>
          <p className="text-gray-600 mt-1">Manage farm managers, assign tasks, and track activities</p>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Add New Manager
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, mobile, or registration ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Registration ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assigned Farms
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmManagers.map((manager) => (
              <tr key={manager.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {manager.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {manager.registrationId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {manager.mobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {manager.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {manager.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {manager.assignedFarms} farms
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600" title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600" title="More Actions">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmManagerManagement;