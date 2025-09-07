import React from 'react';
import { X, ChevronDown } from 'lucide-react';
import { FilterState } from '../types/farmOperatorTypes';

interface FilterMenuProps {
  filters: FilterState;
  onFilterChange: (field: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
  onClose: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onApplyFilters,
  onClose
}) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-4 space-y-4 h-[390px]">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Filter by</h3>
          <button
            onClick={onClose}
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
              onChange={(e) => onFilterChange('state', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">States</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
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
              onChange={(e) => onFilterChange('district', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Districts</option>
              <option value="Ludhiana">Ludhiana</option>
              <option value="Karnal">Karnal</option>
              <option value="Amritsar">Amritsar</option>
              <option value="Panipat">Panipat</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Udaipur">Udaipur</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Mumbai">Mumbai</option>
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
              onChange={(e) => onFilterChange('mandal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Mandals</option>
              <option value="Ludhiana-I">Ludhiana-I</option>
              <option value="Karnal-II">Karnal-II</option>
              <option value="Amritsar-I">Amritsar-I</option>
              <option value="Panipat-I">Panipat-I</option>
              <option value="Sanganer">Sanganer</option>
              <option value="Girwa">Girwa</option>
              <option value="Naranpura">Naranpura</option>
              <option value="Andheri">Andheri</option>
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
                  onChange={(e) => onFilterChange('landSizeFrom', e.target.value)}
                  className="w-[35px] h-[15px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin"
                />
              </div>
              <div className="flex items-center gap-1">
                <label className="whitespace-nowrap">To</label>
                <input
                  type="number"
                  placeholder=""
                  value={filters.landSizeTo}
                  onChange={(e) => onFilterChange('landSizeTo', e.target.value)}
                  className="w-[35px] h-[15px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3">
          <button
            onClick={onResetFilters}
            className="flex-1 px-3 py-2 font-bold text-black bg-white border border-gray-300 rounded-md transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onApplyFilters}
            className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;