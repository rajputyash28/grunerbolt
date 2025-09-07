import React, { ChangeEvent } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { AttendanceFilters as Filters } from './types';

interface AttendanceFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
  isRoleDropdownOpen: boolean;
  isDateDropdownOpen: boolean;
  onRoleDropdownToggle: () => void;
  onDateDropdownToggle: () => void;
  showFilters: boolean;
}

const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  filters,
  onFiltersChange,
  isRoleDropdownOpen,
  isDateDropdownOpen,
  onRoleDropdownToggle,
  onDateDropdownToggle,
  showFilters
}) => {
  const roles = ['All Roles', 'Krishi Didi', 'Farm Manager', 'Operator'];

  if (!showFilters) return null;

  return (
    <div className="flex items-center gap-4">
      {/* Search Input */}
      <div className="relative w-[400px]">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by name or member ID..."
          value={filters.searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => 
            onFiltersChange({ searchTerm: e.target.value })
          }
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ fontFamily: 'Inter', fontSize: '14px' }}
        />
      </div>

      {/* Role Filter */}
      <div className="relative w-[136px]">
        <button
          onClick={onRoleDropdownToggle}
          className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          style={{ fontFamily: 'Inter', fontSize: '13px' }}
        >
          <span>{filters.selectedRole}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
        {isRoleDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => {
                  onFiltersChange({ selectedRole: role });
                  onRoleDropdownToggle();
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm first:rounded-t-lg last:rounded-b-lg"
                style={{ fontFamily: 'Inter', fontSize: '13px' }}
              >
                {role}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Filter */}
      <div className="relative w-[136px]">
        <button
          onClick={onDateDropdownToggle}
          className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          style={{ fontFamily: 'Inter', fontSize: '13px' }}
        >
          <span>{filters.selectedDate || 'Filter by Date'}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
        {isDateDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <input
              type="date"
              value={filters.selectedDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onFiltersChange({ selectedDate: e.target.value });
                onDateDropdownToggle();
              }}
              className="w-full px-3 py-2 text-sm border-none rounded-lg focus:outline-none"
              style={{ fontFamily: 'Inter', fontSize: '13px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceFilters;
