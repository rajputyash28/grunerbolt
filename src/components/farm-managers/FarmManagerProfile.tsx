import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Phone, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';

const FarmManagerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const farmManager = {
    id: 1,
    name: 'Ravi Kumar',
    memberId: 'MEM-F-2024-001',
    mobile: '+91 9876543220',
    location: 'Ahmedabad, Gujarat',
    status: 'Active',
    joinedDate: '2024-01-10',
    profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150',
    totalTasks: 12,
    completedTasks: 8,
    pendingTasks: 3,
    overdueTasks: 1,
    completionRate: 67,
    workingDays: 45,
    attendanceStats: {
      present: 200,
      absent: 50,
      total: 250
    },
    basicDetails: {
      fullName: 'Rajesh Kumar',
      dateOfBirth: '1985-06-15',
      gender: 'Male',
      mobileNumber: '+91 9876543210',
      emailAddress: 'rajesh.kumar@email.com',
      fatherName: 'Ramesh Kumar',
      education: '12th Pass'
    },
    kycDocuments: {
      aadharCard: '****-****-0012'
    },
    addressInfo: {
      completeAddress: 'House No 123, Main Street',
      village: 'Rampur',
      mandal: 'Secunderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500001'
    },
    assignedTasks: [
      { 
        id: 1, 
        title: 'Farmer Training on Organic Fertilizers', 
        location: 'Farm A, Ahmedabad',
        assignedDate: '2024-01-20', 
        dueDate: '2024-01-25',
        status: 'Completed' 
      },
      { 
        id: 2, 
        title: 'Crop Health Inspection', 
        location: 'Farm B, Ahmedabad',
        assignedDate: '2024-01-22', 
        dueDate: '2024-01-18',
        status: 'In Progress' 
      },
      { 
        id: 3, 
        title: 'Soil Testing Guidance', 
        location: 'Farm C, Ahmedabad',
        assignedDate: '2024-01-18', 
        dueDate: '2024-01-23',
        status: 'Overdue' 
      }
    ],
    attendanceRecords: [
      { date: '2024-01-25', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
      { date: '2024-01-24', checkIn: '09:15 AM', checkOut: '05:45 PM', status: 'Present' },
      { date: '2024-01-23', checkIn: '09:30 AM', checkOut: '05:15 PM', status: 'Present' },
      { date: '2024-01-22', checkIn: 'N/A', checkOut: 'N/A', status: 'Absent' },
      { date: '2024-01-21', checkIn: '08:45 AM', checkOut: '05:30 PM', status: 'Present' }
    ]
  };

  const handleEdit = () => {
    navigate(`/farm-managers/edit/${id}`);
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information & KYC Documents */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>Personal Information & KYC Documents</h3>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>Basic Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Full Name</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.basicDetails.fullName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Date of Birth</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.basicDetails.dateOfBirth}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Gender</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.basicDetails.gender}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Mobile Number</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.basicDetails.mobileNumber}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Email Address</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.basicDetails.emailAddress}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Father's Name</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.basicDetails.fatherName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Education</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.basicDetails.education}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Alternative Mobile Number</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.basicDetails.mobileNumber}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3" style={{ fontFamily: 'Inter' }}>KYC Documents</h4>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Aadhar Card</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.kycDocuments.aadharCard}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>Address Information</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Complete Address</span>
            <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.addressInfo.completeAddress}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Village</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.addressInfo.village}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>District</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.addressInfo.district}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>State</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.addressInfo.state}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Mandal</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.addressInfo.mandal}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>PIN Code</span>
              <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.addressInfo.pinCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssignedTasks = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>Task Assignment History</h3>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Inter' }}>Complete list of all tasks assigned to this Krishi Didi</p>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Task Title</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Location</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Assigned Date</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Due Date</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {farmManager.assignedTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-100">
                <td className="py-3 text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{task.title}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.location}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.assignedDate}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.dueDate}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendanceRecords = () => (
    <div className="space-y-6">
      {/* Attendance Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>Attendance Record</h3>
          <button className="p-2 text-blue-600 hover:text-blue-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              {/* Present arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3B82F6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(farmManager.attendanceStats.present / farmManager.attendanceStats.total) * 251.2} 251.2`}
                strokeLinecap="round"
              />
              {/* Absent arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#EF4444"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(farmManager.attendanceStats.absent / farmManager.attendanceStats.total) * 251.2} 251.2`}
                strokeDashoffset={`-${(farmManager.attendanceStats.present / farmManager.attendanceStats.total) * 251.2}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                  {farmManager.attendanceStats.present}
                </p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Total</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Present</span>
            <span className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.attendanceStats.present}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Absent</span>
            <span className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.attendanceStats.absent}</span>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>Attendance History</h3>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Inter' }}>Daily attendance records with location and task details</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Date</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Check In</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Check Out</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {farmManager.attendanceRecords.map((record, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900" style={{ fontFamily: 'Inter' }}>{record.date}</td>
                  <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{record.checkIn}</td>
                  <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{record.checkOut}</td>
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
    </div>
  );

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/farm-managers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>Farm Manager Profile</h1>
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
            src={farmManager.profileImage}
            alt={farmManager.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.name}</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{farmManager.mobile}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}># {farmManager.memberId}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{farmManager.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Joined {farmManager.joinedDate}</span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
            {farmManager.status}
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
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.totalTasks}</p>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>
                {farmManager.completedTasks} completed, {farmManager.pendingTasks} pending
              </p>
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
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.completionRate}%</p>
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
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>{farmManager.workingDays}</p>
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

export default FarmManagerProfile;