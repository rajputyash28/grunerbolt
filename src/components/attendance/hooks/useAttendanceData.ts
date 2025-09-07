import { useMemo } from 'react';
import { AttendanceRecord, AttendanceTab, AttendanceFilters, AttendanceSummary } from '../types';

// Mock data - in a real app, this would come from an API
const attendanceRecords: AttendanceRecord[] = [
  {
    id: 'MEM-KD-2024-001',
    name: 'Priya Sharma',
    role: 'Krishi Didi',
    location: 'Rajasthan, Jaipur, Sanganer',
    date: '2024-03-15',
    checkIn: '09:00 AM',
    checkOut: '05:00 PM',
    workHours: '8h 0m',
    status: 'Absent',
  },
  {
    id: 'MEM-FM-2024-001',
    name: 'Rajesh Kumar',
    role: 'Farm Manager',
    location: 'Uttar Pradesh, Lucknow, Gomti Nagar',
    date: '2024-03-15',
    checkIn: '08:30 AM',
    checkOut: '06:00 PM',
    workHours: '9h 30m',
    status: 'Present',
  },
  {
    id: 'MEM-OP-2024-001',
    name: 'Amit Singh',
    role: 'Operator',
    location: 'Bihar, Patna, Boring Road',
    date: '2024-03-15',
    checkIn: '10:00 AM',
    checkOut: '04:00 PM',
    workHours: '6h 0m',
    status: 'Present',
  },
  {
    id: 'MEM-KD-2024-002',
    name: 'Sunita Devi',
    role: 'Krishi Didi',
    location: 'Uttar Pradesh, Lucknow, Gomti Nagar',
    date: '2024-03-14',
    checkIn: '-',
    checkOut: '-',
    workHours: '0h 0m',
    status: 'Absent',
  },
];

export const useAttendanceData = (
  activeTab: AttendanceTab,
  filters: AttendanceFilters
) => {
  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesSearch =
        record.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesRole = filters.selectedRole === 'All Roles' || record.role === filters.selectedRole;
      const matchesDate = filters.selectedDate === '' || record.date === filters.selectedDate;
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'present' && record.status === 'Present') ||
        (activeTab === 'absent' && record.status === 'Absent');

      return matchesSearch && matchesRole && matchesDate && matchesTab;
    });
  }, [filters.searchTerm, filters.selectedRole, filters.selectedDate, activeTab]);

  const summary = useMemo((): AttendanceSummary => {
    const filteredRecords = attendanceRecords.filter(
      (record) => filters.selectedDate === '' || record.date === filters.selectedDate
    );
    const presentCount = filteredRecords.filter((record) => record.status === 'Present').length;
    const absentCount = filteredRecords.filter((record) => record.status === 'Absent').length;
    const totalHours = filteredRecords.reduce((sum, record) => {
      const hours = parseFloat(record.workHours.split('h')[0]) || 0;
      const minutes = parseFloat(record.workHours.split('h')[1]?.split('m')[0]) || 0;
      return sum + hours + minutes / 60;
    }, 0);

    return {
      present: presentCount,
      absent: absentCount,
      avgHours: filteredRecords.length > 0 ? (totalHours / filteredRecords.length).toFixed(1) : '0.0',
    };
  }, [filters.selectedDate]);

  return {
    records: filteredRecords,
    summary,
    allRecords: attendanceRecords
  };
};
