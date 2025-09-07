import React, { useState } from 'react';
import AttendanceHeader from './AttendanceHeader';
import AttendanceFilters from './AttendanceFilters';
import AttendanceTable from './AttendanceTable';
import AttendanceSummary from './AttendanceSummary';
import { useAttendanceData } from './hooks/useAttendanceData';
import { AttendanceFilters as Filters } from './types';

const AttendanceManagement: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    selectedRole: 'All Roles',
    selectedDate: ''
  });
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Always show all records (no tabs)
  const { records, summary } = useAttendanceData('all', filters);

  const handleFiltersChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      <AttendanceHeader />
      
      <AttendanceSummary 
        summary={summary} 
        className="mb-6" 
      />

      <AttendanceFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isRoleDropdownOpen={isRoleDropdownOpen}
        isDateDropdownOpen={isDateDropdownOpen}
        onRoleDropdownToggle={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
        onDateDropdownToggle={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
        showFilters={true}
      />

      <AttendanceTable 
        records={records} 
        activeTab="all" 
      />
    </div>
  );
};

export default AttendanceManagement;