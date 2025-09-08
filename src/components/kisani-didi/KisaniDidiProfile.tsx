import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Phone, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';

const KisaniDidiProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const kisaniDidi = {
    id: 1,
    name: 'Meera Patel',
    registrationId: 'REG-KD-2024-001',
    mobile: '+91 9876543220',
    location: 'Ahmedabad, Gujarat',
    status: 'Active',
    joinedDate: '2024-01-10',
    profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150',
    totalTasks: 12,
    completedTasks: 9,
    pendingTasks: 3,
    completionRate: 67,
    workingDays: 45,
    personalInfo: {
      fullName: 'Meera Patel',
      mobileNumber: '+91 9876543220',
      registrationId: 'REG-KD-2024-001',
      completeAddress: 'Village Sankhej, Taluka Sanand, District Ahmedabad, Gujarat - 382210'
    },
    locationInfo: {
      state: 'Gujarat',
      district: 'Ahmedabad',
      mandal: 'Mandal Name',
      village: 'Village Name',
      registrationDate: '2024-01-10',
      approvalStatus: 'Approved'
    },
    bankDetails: {
      bankName: 'State Bank of India',
      accountNumber: '******1220',
      ifscCode: 'SBIN0000123'
    },
    assignedTasks: [
      { id: 1, title: 'Crop Disease Survey', status: 'Completed', dueDate: '2024-01-15', assignedDate: '2024-01-10' },
      { id: 2, title: 'Farmer Training Session', status: 'In Progress', dueDate: '2024-01-20', assignedDate: '2024-01-12' },
      { id: 3, title: 'Soil Testing Campaign', status: 'Assigned', dueDate: '2024-01-25', assignedDate: '2024-01-15' }
    ],
    attendanceRecords: [
      { date: '2024-01-15', location: 'Village A', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', workHours: '8h 0m' },
      { date: '2024-01-14', location: 'Village B', checkIn: '08:30 AM', checkOut: '04:30 PM', status: 'Present', workHours: '8h 0m' },
      { date: '2024-01-13', location: 'Village A', checkIn: '-', checkOut: '-', status: 'Absent', workHours: '0h 0m' }
    ]
  };

  const handleEdit = () => {
    navigate(`/kisani-didi/edit/${id}`);
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Inter' }}>Personal Information</h3>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Full Name</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.personalInfo.fullName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Mobile Number</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.personalInfo.mobileNumber}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Registration ID</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.personalInfo.registrationId}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Complete Address</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.personalInfo.completeAddress}</p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Inter' }}>Location</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>State</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.locationInfo.state}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>District</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.locationInfo.district}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Mandal</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.locationInfo.mandal}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Village</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.locationInfo.village}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Registration Date</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.locationInfo.registrationDate}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Approval Status</span>
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
              {kisaniDidi.locationInfo.approvalStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Inter' }}>Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Bank Name</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.bankDetails.bankName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Account Number</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.bankDetails.accountNumber}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>IFSC Code</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.bankDetails.ifscCode}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssignedTasks = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Inter' }}>Assigned Tasks (3)</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Task Title</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Status</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Due Date</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Assigned Date</th>
            </tr>
          </thead>
          <tbody>
            {kisaniDidi.assignedTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-100">
                <td className="py-3 text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{task.title}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.dueDate}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.assignedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendanceRecords = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Inter' }}>Attendance Records</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Date</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Location</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Check In</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Check Out</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Work Hours</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {kisaniDidi.attendanceRecords.map((record, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-sm text-gray-900" style={{ fontFamily: 'Inter' }}>{record.date}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{record.location}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{record.checkIn}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{record.checkOut}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{record.workHours}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/kisani-didi')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>Kisani Didi Profile</h1>
          </div>
        </div>
        <button 
          onClick={handleEdit}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
        >
          <Edit size={18} />
          Edit Profile
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <img
            src={kisaniDidi.profileImage}
            alt={kisaniDidi.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.name}</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{kisaniDidi.mobile}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}># {kisaniDidi.registrationId}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{kisaniDidi.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Joined {kisaniDidi.joinedDate}</span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
            {kisaniDidi.status}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.totalTasks}</p>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>{kisaniDidi.completedTasks} completed, {kisaniDidi.pendingTasks} pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.completionRate}%</p>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>Previous tasks</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>Working Days</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{kisaniDidi.workingDays}</p>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>Total days since joining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'tasks'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Assigned Tasks (3)
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'attendance'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Inter', fontSize: '13.02px' }}
        >
          Attendance Records
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'tasks' && renderAssignedTasks()}
      {activeTab === 'attendance' && renderAttendanceRecords()}
    </div>
  );
};

export default KisaniDidiProfile;