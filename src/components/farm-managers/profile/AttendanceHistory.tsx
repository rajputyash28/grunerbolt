import React from 'react';
import { X } from 'lucide-react';

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  taskTitle: string;
  taskDescription: string;
  checkInLocation: string;
  checkOutLocation: string;
  notes: string;
  workingHours: string;
  checkInImage: string | null;
  checkOutImage: string | null;
}

interface AttendanceFilters {
  status: string;
  period: string;
}

interface AttendanceHistoryProps {
  attendanceRecords: AttendanceRecord[];
  isPendingApproval: boolean;
  showAttendanceFilter: boolean;
  setShowAttendanceFilter: (show: boolean) => void;
  attendanceFilters: AttendanceFilters;
  appliedAttendanceFilters: AttendanceFilters;
  handleAttendanceFilterChange: (field: keyof AttendanceFilters, value: string) => void;
  resetAttendanceFilters: () => void;
  applyAttendanceFilters: () => void;
  openModal: (record: AttendanceRecord) => void;
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
  attendanceRecords,
  isPendingApproval,
  showAttendanceFilter,
  setShowAttendanceFilter,
  attendanceFilters,
  appliedAttendanceFilters,
  handleAttendanceFilterChange,
  resetAttendanceFilters,
  applyAttendanceFilters,
  openModal
}) => {
  const filteredAttendanceRecords = attendanceRecords.filter((record) => {
    if (appliedAttendanceFilters.status && record.status !== appliedAttendanceFilters.status) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
          Attendance History
        </h3>
        {!isPendingApproval && (
          <div className="relative">
            <button
              onClick={() => setShowAttendanceFilter(!showAttendanceFilter)}
              className={`p-2 text-gray-400 hover:text-gray-600 ${
                Object.values(appliedAttendanceFilters).some(value => value !== '') ? 'relative' : ''
              }`}
            >
              <img
                src="/filter.svg"
                alt="Filter"
                className={Object.values(appliedAttendanceFilters).some(value => value !== '') ? 'relative' : ''}
              />
              {Object.values(appliedAttendanceFilters).some(value => value !== '') && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showAttendanceFilter && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Filter by</h3>
                    <button
                      onClick={() => setShowAttendanceFilter(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={19} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="attendanceStatus"
                            value=""
                            checked={attendanceFilters.status === ''}
                            onChange={(e) => handleAttendanceFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">All</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="attendanceStatus"
                            value="Present"
                            checked={attendanceFilters.status === 'Present'}
                            onChange={(e) => handleAttendanceFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">Present</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="attendanceStatus"
                            value="Absent"
                            checked={attendanceFilters.status === 'Absent'}
                            onChange={(e) => handleAttendanceFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">Absent</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleAttendanceFilterChange('period', 'Weekly')}
                          className={`w-full text-left px-3 py-2 rounded border ${
                            attendanceFilters.period === 'Weekly'
                              ? 'bg-blue-50 border-blue-300 text-blue-800'
                              : 'bg-white border-gray-300 text-gray-700'
                          }`}
                        >
                          Weekly
                        </button>
                        <button
                          onClick={() => handleAttendanceFilterChange('period', 'Monthly')}
                          className={`w-full text-left px-3 py-2 rounded border ${
                            attendanceFilters.period === 'Monthly'
                              ? 'bg-blue-50 border-blue-300 text-blue-800'
                              : 'bg-white border-gray-300 text-gray-700'
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => handleAttendanceFilterChange('period', 'Last Six Months')}
                          className={`w-full text-left px-3 py-2 rounded border ${
                            attendanceFilters.period === 'Last Six Months'
                              ? 'bg-blue-50 border-blue-300 text-blue-800'
                              : 'bg-white border-gray-300 text-gray-700'
                          }`}
                        >
                          Last Six Months
                        </button>
                        <button
                          onClick={() => handleAttendanceFilterChange('period', 'Customize Date')}
                          className={`w-full text-left px-3 py-2 rounded border ${
                            attendanceFilters.period === 'Customize Date'
                              ? 'bg-blue-50 border-blue-300 text-blue-800'
                              : 'bg-white border-gray-300 text-gray-700'
                          }`}
                        >
                          Customize Date
                        </button>
                      </div>

                      {attendanceFilters.period === 'Customize Date' && (
                        <div className="mt-3 flex gap-2">
                          <div className="flex-1">
                            <input
                              type="date"
                              placeholder="From"
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="date"
                              placeholder="TO"
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      onClick={resetAttendanceFilters}
                      className="flex-1 px-3 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={applyAttendanceFilters}
                      className="flex-1 px-3 py-2 bg-gray-200 font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-300"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isPendingApproval ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter' }}>
            Manager is not approved yet
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Inter' }}>
            Daily attendance records with location and task details
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Date
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Check In
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Check Out
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendanceRecords.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td
                      className="py-3 text-sm text-blue-600 cursor-pointer underline"
                      style={{ fontFamily: 'Inter' }}
                      onClick={() => openModal(record)}
                    >
                      {record.date}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {record.checkIn}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {record.checkOut}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
        </>
      )}
    </div>
  );
};

export default AttendanceHistory;
