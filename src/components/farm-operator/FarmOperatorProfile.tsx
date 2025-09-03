import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Phone, MapPin, Calendar, CheckCircle, Save, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const FarmOperatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditMode, setIsEditMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedRecord, setSelectedRecord] = useState(null);

const openModal = (record) => {
  setSelectedRecord(record);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedRecord(null);
  setIsModalOpen(false);
};

  const [farmOperator, setFarmOperator] = useState({
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
      education: '12th Pass',
      alternativeMobile: '+91 9876543210'
    },
    kycDocuments: {
      aadharCard: '*-*-0012'
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
  });

  const [editData, setEditData] = useState({});

  const handleEdit = () => {
    setEditData({ ...farmOperator });
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditMode(false);
  };

  const handleSave = () => {
    setFarmOperator({ ...editData });
    setIsEditMode(false);
    setEditData({});
  };

  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderEditableField = (label, value, section, field, type = 'text') => {
    const currentValue = section ? editData[section]?.[field] || value : editData[field] || value;

    return (
      <div>
        <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{label}</span>
        {isEditMode ? (
          <input
            type={type}
            value={currentValue}
            onChange={(e) => section ? handleInputChange(section, field, e.target.value) : handleDirectChange(field, e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            style={{ fontFamily: 'Inter' }}
          />
        ) : (
          <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{value}</p>
        )}
      </div>
    );
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
            {renderEditableField('Full Name', farmOperator.basicDetails.fullName, 'basicDetails', 'fullName')}
            {renderEditableField('Date of Birth', farmOperator.basicDetails.dateOfBirth, 'basicDetails', 'dateOfBirth', 'date')}
            {renderEditableField('Gender', farmOperator.basicDetails.gender, 'basicDetails', 'gender')}
            {renderEditableField('Mobile Number', farmOperator.basicDetails.mobileNumber, 'basicDetails', 'mobileNumber')}
            {renderEditableField('Email Address', farmOperator.basicDetails.emailAddress, 'basicDetails', 'emailAddress', 'email')}
            {renderEditableField('Father\'s Name', farmOperator.basicDetails.fatherName, 'basicDetails', 'fatherName')}
            {renderEditableField('Education', farmOperator.basicDetails.education, 'basicDetails', 'education')}
            {renderEditableField('Alternative Mobile Number', farmOperator.basicDetails.alternativeMobile, 'basicDetails', 'alternativeMobile')}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3" style={{ fontFamily: 'Inter' }}>KYC Documents</h4>
            {renderEditableField('Aadhar Card', farmOperator.kycDocuments.aadharCard, 'kycDocuments', 'aadharCard')}
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
          {renderEditableField('Complete Address', farmOperator.addressInfo.completeAddress, 'addressInfo', 'completeAddress')}
          <div className="grid grid-cols-2 gap-4">
            {renderEditableField('Village', farmOperator.addressInfo.village, 'addressInfo', 'village')}
            {renderEditableField('District', farmOperator.addressInfo.district, 'addressInfo', 'district')}
            {renderEditableField('State', farmOperator.addressInfo.state, 'addressInfo', 'state')}
            {renderEditableField('Mandal', farmOperator.addressInfo.mandal, 'addressInfo', 'mandal')}
            {renderEditableField('PIN Code', farmOperator.addressInfo.pinCode, 'addressInfo', 'pinCode')}
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
            {farmOperator.assignedTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-100">
                <td className="py-3 text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>{task.title}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.location}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.assignedDate}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{task.dueDate}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
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
            {farmOperator.attendanceRecords.map((record, index) => (
              <tr key={index} className="border-b border-gray-100">
                {/* <td className="py-3 text-sm text-gray-900" style={{ fontFamily: 'Inter' }}>{record.date}</td> */}
                <td
  className="py-3 text-sm text-blue-600 cursor-pointer underline"
  style={{ fontFamily: "Inter" }}
  onClick={() => openModal(record)}  // 👈 Open modal with that record
>

  {record.date}
</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{record.checkIn}</td>
                <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>{record.checkOut}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
    <div className="" style={{ fontFamily: "Inter" }}>
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/farm-Operators")}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Inter" }}
              >
                Farm Operator Profile
              </h1>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={farmOperator.profileImage}
              alt={farmOperator.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: "Inter" }}
              >
                {farmOperator.name}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Phone size={16} className="text-gray-400" />
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter" }}
                  >
                    {farmOperator.mobile}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter" }}
                  >
                    # {farmOperator.memberId}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-gray-400" />
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter" }}
                  >
                    {farmOperator.location}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-gray-400" />
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter" }}
                  >
                    Joined {farmOperator.joinedDate}
                  </span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
              {farmOperator.status}
            </span>
          </div>
        </div>

        {/* Stats Cards Row - Fixed height container with relative positioning */}
        <div className="relative min-h-[128px]">
          {" "}
          {/* Fixed minimum height container */}
          <div className="flex gap-6 min-w-full">
            {/* First Three Cards */}
            <div className="flex gap-6 flex-grow">
              <div className="bg-white border border-gray-200 rounded-xl p-4 w-72 h-44 flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Total Tasks
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {farmOperator.totalTasks}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      {farmOperator.completedTasks} completed,{" "}
                      {farmOperator.pendingTasks} pending
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 w-72 h-44 flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Completion Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {farmOperator.completionRate}%
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      1 overdue tasks
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 w-72 h-44 flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Working Days
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {farmOperator.workingDays}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      Total days since joining
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Record Card - Positioned absolutely to not affect layout */}
            {activeTab === "attendance" && (
              <div className="absolute top-0 right-0 bg-white border border-gray-200 rounded-xl p-6 w-[500px] h-[300px] shadow-lg z-10 mr-20">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Attendance Record
                  </h3>
                  <button className="p-2 text-blue-600 hover:text-blue-700">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Main Content */}
                <div className="flex items-center justify-start gap-6">
                  {/* Chart */}
                  <div className="relative w-36 h-36">
                    <ResponsiveContainer width={144} height={144}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Present", value: 150, color: "#3B82F6" },
                            { name: "Absent", value: 50, color: "#8B5CF6" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#3B82F6" />
                          <Cell fill="#8B5CF6" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">200</p>
                        <p className="text-sm text-gray-600">Total</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Present</span>
                      </div>
                      <span className="text-base font-medium text-gray-900">
                        150
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Absent</span>
                      </div>
                      <span className="text-base font-medium text-gray-900">
                        50
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <br />
        <br />

        {/* Tabs and Edit Button */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-green-50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "tasks"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Assigned Tasks (3)
            </button>
            <button
              onClick={() => setActiveTab("attendance")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "attendance"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Attendance Records
            </button>
          </div>

          {/* Conditionally render Edit/Save/Cancel */}
          {activeTab === "overview" && (
            <div className="flex items-center gap-2">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "tasks" && renderAssignedTasks()}
        {activeTab === "attendance" && renderAttendanceRecords()}
      </div>
      {isModalOpen && selectedRecord && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg w-[800px] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Attendance Details</h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
      </div>

      {/* Form Layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Task Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Task Title</label>
          <input
            type="text"
            value={selectedRecord.taskTitle || "Crop Health Inspection"}
            readOnly
            className="w-full border rounded-lg p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Task Description</label>
          <input
            type="text"
            value={selectedRecord.taskDescription || "Description of task"}
            readOnly
            className="w-full border rounded-lg p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Check-In Time */}
        <div>
          <label className="block text-sm font-medium mb-1">Check-In Time</label>
          <input
            type="text"
            value={selectedRecord.checkIn}
            readOnly
            className="w-full border rounded-lg p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Check-Out Time */}
        <div>
          <label className="block text-sm font-medium mb-1">Check-Out Time</label>
          <input
            type="text"
            value={selectedRecord.checkOut}
            readOnly
            className="w-full border rounded-lg p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Check-In Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Check-In Location</label>
          <input
            type="text"
            value={selectedRecord.checkInLocation || "Village Sarkhej, Taluka Sanand"}
            readOnly
            className="w-full border rounded-lg p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Check-Out Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Check-Out Location</label>
          <input
            type="text"
            value={selectedRecord.checkOutLocation || "Ahmedabad, Gujarat"}
            readOnly
            className="w-full border rounded-lg p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <input
            type="text"
            value={selectedRecord.notes || "Not able to upload Task image due to some reasons"}
            readOnly
            className="w-full border rounded-lg p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Working Hours */}
        <div>
          <label className="block text-sm font-medium mb-1">Working Hours</label>
          <input
            type="text"
            value={selectedRecord.workingHours || "07:15 Hrs"}
            readOnly
            className="w-full border rounded-lg p-2 text-sm bg-gray-100"
          />
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">Check-In Image</label>
          <div className="w-24 h-24 border rounded-lg flex items-center justify-center bg-gray-100">
            {selectedRecord.checkInImage ? (
              <img
                src={selectedRecord.checkInImage}
                alt="Check-In"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Check-Out Image</label>
          <div className="w-24 h-24 border rounded-lg flex items-center justify-center bg-gray-100">
            {selectedRecord.checkOutImage ? (
              <img
                src={selectedRecord.checkOutImage}
                alt="Check-Out"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => alert("Rejected")}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Reject
        </button>
        <button
          onClick={() => alert("Approved")}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Approve
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default FarmOperatorProfile;
