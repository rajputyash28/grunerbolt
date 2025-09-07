import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import ProfileHeader from './profile/ProfileHeader';
import ProfileStatsCards from './profile/ProfileStatsCards';
import ProfileOverview from './profile/ProfileOverview';
import TaskAssignment from './profile/TaskAssignment';
import AttendanceHistory from './profile/AttendanceHistory';
import AttendanceChart from './profile/AttendanceChart';
import ConfirmationDialog from './shared/ConfirmationDialog';

// Define interfaces for data structures
interface FarmOperator {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rejected';
  assignedTasks: string;
  joinedDate: string;
  profileImage: string;
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  fathersName: string;
  education: string;
  alternativeMobile: string;
  // KYC Documents
  aadharCard: string;
  // Address Information
  completeAddress: string;
  village: string;
  district: string;
  state: string;
  mandal: string;
  pinCode: string;
  // Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  tasks?: Task[];
  attendanceRecords?: AttendanceRecord[];
  attendanceStats?: AttendanceStats;
}

interface Task {
  id: number;
  title: string;
  location: string;
  assignedDate: string;
  dueDate: string;
  status: string;
  priority: string;
  description: string;
  notes: string;
}

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

interface AttendanceStats {
  present: number;
  absent: number;
  total: number;
}

interface TaskFilters {
  status: string;
}

interface AttendanceFilters {
  status: string;
  period: string;
}

// Utility type to filter keys of FarmOperator that are string or number
type EditableFieldKeys = Extract<
  keyof FarmOperator,
  'id' | 'name' | 'memberId' | 'mobile' | 'location' | 'status' | 'assignedTasks' | 'joinedDate' | 'profileImage' |
  'fullName' | 'dateOfBirth' | 'gender' | 'email' | 'fathersName' | 'education' | 'alternativeMobile' |
  'aadharCard' | 'completeAddress' | 'village' | 'district' | 'state' | 'mandal' | 'pinCode' |
  'bankName' | 'accountNumber' | 'ifscCode'
>;

const FarmOperatorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'attendance'>('overview');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Check if this is a pending approval or edit mode
  const isPendingApproval = searchParams.get('pending') === 'true';
  const isEditFromManagement = searchParams.get('edit') === 'true';

  // Modal and dialog states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState<boolean>(false);
  const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false);

  // Filter states
  const [showTaskFilter, setShowTaskFilter] = useState<boolean>(false);
  const [showAttendanceFilter, setShowAttendanceFilter] = useState<boolean>(false);
  const [taskFilters, setTaskFilters] = useState<TaskFilters>({ status: '' });
  const [appliedTaskFilters, setAppliedTaskFilters] = useState<TaskFilters>({ status: '' });
  const [attendanceFilters, setAttendanceFilters] = useState<AttendanceFilters>({ status: '', period: '' });
  const [appliedAttendanceFilters, setAppliedAttendanceFilters] = useState<AttendanceFilters>({ status: '', period: '' });

  // Modal handlers
  const openModal = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(false);
  };

  // Farm operator data
  const [farmOperator, setFarmOperator] = useState<FarmOperator>({
    id: id ? parseInt(id) : 1,
    name: isPendingApproval ? 'Kavita Singh' : 'Ravi Sharma',
    memberId: isPendingApproval ? 'MEM-KD-2024-101' : 'MEM-KD-2024-001',
    mobile: isPendingApproval ? '+91 9876543220' : '+91 9785432110',
    location: isPendingApproval ? 'Bihar, Patna, Boring Road' : 'Rajasthan, Jaipur, Sangaria',
    status: isPendingApproval ? 'Pending' : 'Active',
    assignedTasks: isPendingApproval ? '0/0' : '10/12',
    joinedDate: isPendingApproval ? '2024-03-15' : '2024-01-10',
    profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150',
    // Personal Information
    fullName: isPendingApproval ? 'Kavita Singh' : 'Rajesh Kumar',
    dateOfBirth: isPendingApproval ? '1988-03-15' : '1985-06-15',
    gender: isPendingApproval ? 'Female' : 'Male',
    email: isPendingApproval ? 'kavita.singh@email.com' : 'rajesh.kumar@email.com',
    fathersName: isPendingApproval ? 'Ram Singh' : 'Ramesh Kumar',
    education: isPendingApproval ? 'Graduate' : '12th Pass',
    alternativeMobile: isPendingApproval ? '+91 9876543221' : '+91 9876543210',
    // KYC Documents
    aadharCard: isPendingApproval ? '**** **** **** 1012' : '**** **** **** 9012',
    // Address Information
    completeAddress: isPendingApproval ? 'House No 456, Gandhi Road' : 'House No 123, Main Street',
    village: isPendingApproval ? 'Patna City' : 'Rampur',
    district: isPendingApproval ? 'Patna' : 'Hyderabad',
    state: isPendingApproval ? 'Bihar' : 'Telangana',
    mandal: isPendingApproval ? 'Boring Road' : 'Secunderabad',
    pinCode: isPendingApproval ? '800001' : '500001',
    // Bank Details
    bankName: isPendingApproval ? 'Bank of India' : 'State Bank of India',
    accountNumber: isPendingApproval ? '**** **** 1012' : '**** **** 1220',
    ifscCode: isPendingApproval ? 'BKID0001012' : 'SBIN0000123',
    tasks: isPendingApproval ? [] : [
      {
        id: 1,
        title: 'Farmer Training on Organic Fertilizers',
        location: 'Farm A, Jaipur',
        assignedDate: '2024-01-20',
        dueDate: '2024-01-25',
        status: 'Completed',
        priority: 'High',
        description: 'Conduct comprehensive training session for farmers on organic fertilizer usage and benefits.',
        notes: 'Training materials provided. Ensure all farmers receive certificates.',
      },
      {
        id: 2,
        title: 'Crop Health Inspection',
        location: 'Farm B, Jaipur',
        assignedDate: '2024-01-22',
        dueDate: '2024-01-18',
        status: 'In Progress',
        priority: 'Medium',
        description: 'Inspect crop health and identify potential diseases or pest issues.',
        notes: 'Focus on wheat and rice crops. Take samples if necessary.',
      },
      {
        id: 3,
        title: 'Soil Testing Guidance',
        location: 'Farm C, Jaipur',
        assignedDate: '2024-01-18',
        dueDate: '2024-01-23',
        status: 'Overdue',
        priority: 'High',
        description: 'Guide farmers through soil testing process and interpretation of results.',
        notes: 'Bring soil testing kits and pH meters.',
      },
    ],
    attendanceRecords: isPendingApproval ? [] : [
      {
        date: '2024-01-25',
        checkIn: '09:00 AM',
        checkOut: '06:00 PM',
        status: 'Present',
        taskTitle: 'Farmer Training on Organic Fertilizers',
        taskDescription: 'Conducted training session on organic fertilizer usage',
        checkInLocation: 'Village Sangaria, Jaipur',
        checkOutLocation: 'Jaipur, Rajasthan',
        notes: 'Successfully completed training session for 25 farmers',
        workingHours: '09:00 Hrs',
        checkInImage: null,
        checkOutImage: null,
      },
      {
        date: '2024-01-24',
        checkIn: '09:15 AM',
        checkOut: '05:45 PM',
        status: 'Present',
        taskTitle: 'Crop Health Inspection',
        taskDescription: 'Inspected crop health in assigned fields',
        checkInLocation: 'Village Sangaria, Jaipur',
        checkOutLocation: 'Jaipur, Rajasthan',
        notes: 'Found minor pest issues in wheat crops',
        workingHours: '08:30 Hrs',
        checkInImage: null,
        checkOutImage: null,
      },
    ],
    attendanceStats: isPendingApproval ? { present: 0, absent: 0, total: 0 } : {
      present: 200,
      absent: 50,
      total: 250,
    },
  });

  const [editData, setEditData] = useState<Partial<FarmOperator>>({});

  // Set edit mode if coming from management page
  useEffect(() => {
    if (isEditFromManagement) {
      setIsEditMode(true);
      setEditData({ ...farmOperator });
    }
  }, [isEditFromManagement, farmOperator]);

  // Filter handlers
  const handleTaskFilterChange = (field: keyof TaskFilters, value: string) => {
    setTaskFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetTaskFilters = () => {
    setTaskFilters({ status: '' });
    setAppliedTaskFilters({ status: '' });
  };

  const applyTaskFilters = () => {
    setAppliedTaskFilters({ ...taskFilters });
    setShowTaskFilter(false);
  };

  const handleAttendanceFilterChange = (field: keyof AttendanceFilters, value: string) => {
    setAttendanceFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetAttendanceFilters = () => {
    setAttendanceFilters({ status: '', period: '' });
    setAppliedAttendanceFilters({ status: '', period: '' });
  };

  const applyAttendanceFilters = () => {
    setAppliedAttendanceFilters({ ...attendanceFilters });
    setShowAttendanceFilter(false);
  };


  // Edit handlers
  const handleEdit = () => {
    // TODO: Integrate API call for editing farm operator profile
    // API Endpoint: PUT /api/farm-operators/{id}
    // Example: await updateFarmOperatorProfile(farmOperator.id, formData);
    setEditData({ ...farmOperator });
    setIsEditMode(true);
  };

  const handleCancel = () => {
    // TODO: Integrate API call for canceling farm operator profile changes
    // API Endpoint: GET /api/farm-operators/{id} (to reset data)
    // Example: await resetFarmOperatorProfile(farmOperator.id);
    setEditData({});
    setIsEditMode(false);
  };

  const handleSave = () => {
    // TODO: Integrate API call for saving farm operator profile changes
    // API Endpoint: PUT /api/farm-operators/{id}
    // Example: await saveFarmOperatorProfile(farmOperator.id, editData);
    setFarmOperator({ ...farmOperator, ...editData });
    setIsEditMode(false);
    setEditData({});
  };

  const handleInputChange = (field: EditableFieldKeys, value: string | number) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Status toggle handler
  const handleToggleStatus = (newStatus: 'Active' | 'Inactive') => {
    // TODO: Integrate API call for toggling farm operator status
    // API Endpoint: PUT /api/farm-operators/{id}/status
    // Example: await toggleFarmOperatorStatus(farmOperator.id, newStatus);
    setFarmOperator(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  // Approval handlers
  const handleApprove = () => {
    setShowApproveDialog(true);
  };

  const handleReject = () => {
    setShowRejectDialog(true);
  };

  const confirmApprove = () => {
    console.log('Approving farm operator:', farmOperator.id);
    
    // TODO: Integrate API call for approving farm operator from profile
    // API Endpoint: PUT /api/farm-operators/{id}/approve
    // Example: await approveFarmOperator(farmOperator.id);
    
    // Update the farm operator status to Active
    setFarmOperator(prev => ({
      ...prev,
      status: 'Active'
    }));
    
    // Store the approval in localStorage so the management component can pick it up
    const approvalData = {
      id: farmOperator.id,
      action: 'approve',
      timestamp: Date.now()
    };
    localStorage.setItem('farmOperatorApproval', JSON.stringify(approvalData));
    
    // Close dialog and navigate back to farm operators list
    setShowApproveDialog(false);
    navigate('/farm-operators');
  };

  const confirmReject = () => {
    console.log('Rejecting farm operator:', farmOperator.id);
    
    // TODO: Integrate API call for rejecting farm operator from profile
    // API Endpoint: PUT /api/farm-operators/{id}/reject
    // Example: await rejectFarmOperator(farmOperator.id);
    
    // Update the farm operator status to Rejected (this will hide them from lists)
    setFarmOperator(prev => ({
      ...prev,
      status: 'Rejected'
    }));
    
    // Store the rejection in localStorage so the management component can pick it up
    const rejectionData = {
      id: farmOperator.id,
      action: 'reject',
      timestamp: Date.now()
    };
    localStorage.setItem('farmOperatorRejection', JSON.stringify(rejectionData));
    
    // Close dialog and navigate back to farm operators list
    setShowRejectDialog(false);
    navigate('/farm-operators');
  };





  return (
    <div className="" style={{ fontFamily: 'Inter' }}>
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/farm-operators')}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                {isPendingApproval ? 'Pending Farm Operator Profile' : 'Farm Operator Profile'}
              </h1>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <ProfileHeader 
          farmOperator={farmOperator} 
          isPendingApproval={isPendingApproval} 
          onToggleStatus={handleToggleStatus}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Stats Cards Row */}
        <div className="relative min-h-[128px]">
          <div className="flex gap-6 min-w-full">
            <div className="flex gap-6 flex-grow">
              <ProfileStatsCards farmOperator={farmOperator} activeTab={activeTab} isPendingApproval={isPendingApproval} />
            </div>

            {activeTab === 'attendance' && farmOperator.attendanceStats && !isPendingApproval && (
              <AttendanceChart attendanceStats={farmOperator.attendanceStats} />
            )}
          </div>
        </div>

        {!isPendingApproval && (
          <>
            <br />
            <br />
          </>
        )}

        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-green-50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'tasks' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Assigned Tasks ({isPendingApproval ? 0 : farmOperator.tasks?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'attendance' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Attendance Records
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!isPendingApproval && activeTab === 'overview' && (
              <>
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
              </>
            )}
          </div>
        </div>

        {activeTab === 'overview' && (
          <ProfileOverview
            farmOperator={farmOperator}
            isEditMode={isEditMode}
            editData={editData}
            handleInputChange={handleInputChange}
          />
        )}
        {activeTab === 'tasks' && (
          <TaskAssignment
            tasks={farmOperator.tasks || []}
            isPendingApproval={isPendingApproval}
            showTaskFilter={showTaskFilter}
            setShowTaskFilter={setShowTaskFilter}
            taskFilters={taskFilters}
            appliedTaskFilters={appliedTaskFilters}
            handleTaskFilterChange={handleTaskFilterChange}
            resetTaskFilters={resetTaskFilters}
            applyTaskFilters={applyTaskFilters}
            openTaskModal={openTaskModal}
          />
        )}
        {activeTab === 'attendance' && (
          <AttendanceHistory
            attendanceRecords={farmOperator.attendanceRecords || []}
            isPendingApproval={isPendingApproval}
            showAttendanceFilter={showAttendanceFilter}
            setShowAttendanceFilter={setShowAttendanceFilter}
            attendanceFilters={attendanceFilters}
            appliedAttendanceFilters={appliedAttendanceFilters}
            handleAttendanceFilterChange={handleAttendanceFilterChange}
            resetAttendanceFilters={resetAttendanceFilters}
            applyAttendanceFilters={applyAttendanceFilters}
            openModal={openModal}
          />
        )}

        {isTaskModalOpen && selectedTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Task Details</h2>
                <button onClick={closeTaskModal} className="text-gray-500 hover:text-gray-700 text-2xl">
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Task Title</label>
                    <input
                      type="text"
                      value={selectedTask.title}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={selectedTask.location}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Assigned Date</label>
                    <input
                      type="text"
                      value={selectedTask.assignedDate}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <input
                      type="text"
                      value={selectedTask.dueDate}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <input
                      type="text"
                      value={selectedTask.status}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <input
                      type="text"
                      value={selectedTask.priority}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={selectedTask.description}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100 h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <textarea
                    value={selectedTask.notes}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100 h-16 resize-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeTaskModal}
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && selectedRecord && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[800px] p-6">
              <div className="flex justify-center items-center mb-6 relative">
                <h2 className="text-xl font-semibold" style={{ fontFamily: 'Inter' }}>
                  Attendance History ({selectedRecord.date})
                </h2>
                <button onClick={closeModal} className="absolute right-0 text-gray-500 hover:text-gray-700 text-2xl">
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Date
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.date}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.taskTitle}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Check-In Time
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.checkIn}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Check-In Location
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.checkInLocation}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Notes
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.notes}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Task Description
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.taskDescription}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Check-Out Time
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.checkOut}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Check-Out Location
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.checkOutLocation}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter' }}>
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.workingHours}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>
                </div>
              </div>

              {/* Image Placeholders - Left Side */}
              <div className="flex gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                    Check-In Image
                  </label>
                  <div className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {selectedRecord.checkInImage ? (
                      <img
                        src={selectedRecord.checkInImage}
                        alt="Check-In"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'Inter' }}>No Image</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                    Check-Out Image
                  </label>
                  <div className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {selectedRecord.checkOutImage ? (
                      <img
                        src={selectedRecord.checkOutImage}
                        alt="Check-Out"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'Inter' }}>No Image</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Right Side Only */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    alert('Marked as Absent');
                    closeModal();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
                >
                  Absent
                </button>
                <button
                  onClick={() => {
                    alert('Marked as Present');
                    closeModal();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
                >
                  Present
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialogs */}
        <ConfirmationDialog
          isOpen={showApproveDialog}
          onClose={() => setShowApproveDialog(false)}
          onConfirm={confirmApprove}
          title="Approve User"
          message="Are you sure you want to Approve this User"
        />

        <ConfirmationDialog
          isOpen={showRejectDialog}
          onClose={() => setShowRejectDialog(false)}
          onConfirm={confirmReject}
          title="Reject User"
          message="Are you sure you want to Reject this User"
        />
      </div>
    </div>
  );
};

export default FarmOperatorProfile;