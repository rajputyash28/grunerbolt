import React, { useState, useMemo } from 'react';
import { Users, Search, ChevronDown, Calendar } from 'lucide-react';

const AttendanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedDate, setSelectedDate] = useState(''); // Initialize as empty to show all records by default
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const attendanceRecords = [
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

  // Filter records based on search term, role, and date
  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesSearch =
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All Roles' || record.role === selectedRole;
      const matchesDate = selectedDate === '' || record.date === selectedDate;

      return matchesSearch && matchesRole && matchesDate;
    });
  }, [searchTerm, selectedRole, selectedDate, attendanceRecords]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const todayRecords = attendanceRecords.filter(
      (record) => selectedDate === '' || record.date === selectedDate
    );
    const presentCount = todayRecords.filter((record) => record.status === 'Present').length;
    const absentCount = todayRecords.filter((record) => record.status === 'Absent').length;
    const totalHours = todayRecords.reduce((sum, record) => {
      const hours = parseFloat(record.workHours.split('h')[0]) || 0;
      const minutes = parseFloat(record.workHours.split('h')[1]?.split('m')[0]) || 0;
      return sum + hours + minutes / 60;
    }, 0);

    return {
      present: presentCount,
      absent: absentCount,
      avgHours: todayRecords.length > 0 ? (totalHours / todayRecords.length).toFixed(1) : '0.0',
    };
  }, [selectedDate, attendanceRecords]);

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today Present</p>
              <p className="text-2xl font-bold text-gray-900">{summary.present}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today Absent</p>
              <p className="text-2xl font-bold text-gray-900">{summary.absent}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Work Hours</p>
              <p className="text-2xl font-bold text-gray-900">{summary.avgHours}h</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-row items-center gap-4 mb-9">
        {/* Search Bar */}
        <div className="flex-1 relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name or member ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[36px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Role Dropdown */}
        <div className="relative w-40">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
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
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Filter */}
        <div className="relative w-40">
          <button
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            <span>{selectedDate || 'Filter By Dates'}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {isDateDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setIsDateDropdownOpen(false);
                }}
                className="w-full px-3 py-2 text-sm border-none rounded-lg focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Member ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Work Hours
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{record.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold underline text-gray-600 hover:text-blue-800 cursor-pointer">
                    {record.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.role}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.location}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.date}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-gray-600 ${record.checkIn === '-' ? 'text-center' : 'text-center'}`}>
                    {record.checkIn}
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-gray-600 ${record.checkOut === '-' ? 'text-center' : 'text-center'}`}>
                    {record.checkOut}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 text-center">{record.workHours}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${
                        record.status === 'Present'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No attendance records found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;