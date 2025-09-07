export interface AttendanceRecord {
  id: string;
  name: string;
  role: string;
  location: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  status: 'Present' | 'Absent';
}

export type AttendanceTab = 'all' | 'present' | 'absent';

export interface AttendanceSummary {
  present: number;
  absent: number;
  avgHours: string;
}

export interface AttendanceFilters {
  searchTerm: string;
  selectedRole: string;
  selectedDate: string;
}

export interface AttendanceState {
  activeTab: AttendanceTab;
  filters: AttendanceFilters;
  isRoleDropdownOpen: boolean;
  isDateDropdownOpen: boolean;
}
