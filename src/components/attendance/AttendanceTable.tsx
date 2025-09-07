import React from 'react';
import { AttendanceRecord, AttendanceTab } from './types';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  activeTab: AttendanceTab;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, activeTab }) => {
  return (
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
          {records.map((record) => (
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
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded ${
                    record.status === 'Present' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
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
      {records.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500" style={{ fontFamily: 'Inter' }}>
            No {activeTab === 'all' ? 'attendance' : activeTab} records found
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
