import React, { useState, useMemo, ChangeEvent } from 'react';
import { Users, Search, ChevronDown, Calendar } from 'lucide-react';

interface AttendanceRecord {
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

const AttendanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'present' | 'absent'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedDate, setSelectedDate] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

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

  const roles = ['All Roles', 'Krishi Didi', 'Farm Manager', 'Operator'];

  const getFilteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesSearch =
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All Roles' || record.role === selectedRole;
      const matchesDate = selectedDate === '' || record.date === selectedDate;
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'present' && record.status === 'Present') ||
        (activeTab === 'absent' && record.status === 'Absent');

      return matchesSearch && matchesRole && matchesDate && matchesTab;
    });
  }, [searchTerm, selectedRole, selectedDate, activeTab]);

  const summary = useMemo(() => {
    const filteredRecords = attendanceRecords.filter(
      (record) => selectedDate === '' || record.date === selectedDate
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
  }, [selectedDate]);

  const handleTabChange = (tab: 'all' | 'present' | 'absent') => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedRole('All Roles');
    setSelectedDate('');
    setIsRoleDropdownOpen(false);
    setIsDateDropdownOpen(false);
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
          Attendance Management
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => handleTabChange('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          All Records
        </button>
        <button
          onClick={() => handleTabChange('present')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'present' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Present
        </button>
        <button
          onClick={() => handleTabChange('absent')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'absent' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Absent
        </button>
      </div>

      {/* Filters */}
      {activeTab !== 'all' && (
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or member ID..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Inter', fontSize: '14px' }}
            />
          </div>

          <div className="relative w-[136px]">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              style={{ fontFamily: 'Inter', fontSize: '13px' }}
            >
              <span>{selectedRole}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {isRoleDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setIsRoleDropdownOpen(false);
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

          <div className="relative w-[136px]">
            <button
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              style={{ fontFamily: 'Inter', fontSize: '13px' }}
            >
              <span>{selectedDate || 'Filter By Dates'}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {isDateDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setSelectedDate(e.target.value);
                    setIsDateDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-sm border-none rounded-lg focus:outline-none"
                  style={{ fontFamily: 'Inter', fontSize: '13px' }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
              >
                Member ID
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
              >
                Name
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
              >
                Role
              </th>
              {activeTab === 'all' && (
                <>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
                  >
                    Location
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
                  >
                    Date
                  </th>
                </>
              )}
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
              >
                Check In
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
              >
                Check Out
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
              >
                Work Hours
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500 }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getFilteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td
                  className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                  style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}
                >
                  {record.id}
                </td>
                <td
                  className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 underline hover:text-blue-800 cursor-pointer"
                  style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}
                >
                  {record.name}
                </td>
                <td
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                  style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 400 }}
                >
                  {record.role}
                </td>
                {activeTab === 'all' && (
                  <>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                      style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 400 }}
                    >
                      {record.location}
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                      style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 400 }}
                    >
                      {record.date}
                    </td>
                  </>
                )}
                <td
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center"
                  style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 400 }}
                >
                  {record.checkIn}
                </td>
                <td
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center"
                  style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 400 }}
                >
                  {record.checkOut}
                </td>
                <td
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center"
                  style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 400 }}
                >
                  {record.workHours}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      record.status === 'Present' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}
                    style={{ fontFamily: 'Inter' }}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {getFilteredRecords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500" style={{ fontFamily: 'Inter' }}>
              No {activeTab === 'all' ? 'attendance' : activeTab} records found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;