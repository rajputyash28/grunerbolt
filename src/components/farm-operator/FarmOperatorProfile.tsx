import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Edit, Phone, MapPin, Calendar, CheckCircle, Save, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Define interfaces for data structures
interface FarmOperator {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending';
  assignedTasks: string;
  joinedDate: string;
  profileImage: string;
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
  'id' | 'name' | 'memberId' | 'mobile' | 'location' | 'status' | 'assignedTasks' | 'joinedDate' | 'profileImage'
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
  const [attendanceFilters, setAttendanceFilters] = useState<AttendanceFilters>({ status: '', period: '' });

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
  };

  const applyTaskFilters = () => {
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
  };

  const applyAttendanceFilters = () => {
    setShowAttendanceFilter(false);
  };

  // Filter functions
  const filteredTasks = (farmOperator.tasks || []).filter((task) => {
    if (taskFilters.status && task.status !== taskFilters.status) {
      return false;
    }
    return true;
  });

  const filteredAttendanceRecords = (farmOperator.attendanceRecords || []).filter((record) => {
    if (attendanceFilters.status && record.status !== attendanceFilters.status) {
      return false;
    }
    return true;
  });

  // Edit handlers
  const handleEdit = () => {
    setEditData({ ...farmOperator });
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditMode(false);
  };

  const handleSave = () => {
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

  // Approval handlers
  const handleApprove = () => {
    setShowApproveDialog(true);
  };

  const handleReject = () => {
    setShowRejectDialog(true);
  };

  const confirmApprove = () => {
    console.log('Approving user:', farmOperator.id);
    setShowApproveDialog(false);
    navigate('/farm-operators');
  };

  const confirmReject = () => {
    console.log('Rejecting user:', farmOperator.id);
    setShowRejectDialog(false);
    navigate('/farm-operators');
  };

  const renderEditableField = (
    label: string,
    value: string,
    field: EditableFieldKeys,
    type: string = 'text'
  ) => {
    const currentValue = editData[field] !== undefined ? String(editData[field]) : value;

    return (
      <div>
        <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
          {label}
        </span>
        {isEditMode ? (
          <input
            type={type}
            value={currentValue}
            onChange={(e) => handleInputChange(field, type === 'number' ? Number(e.target.value) : e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            style={{ fontFamily: 'Inter' }}
          />
        ) : (
          <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter' }}>
            {value}
          </p>
        )}
      </div>
    );
  };

  const renderOverview = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Phone className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
          Profile Information
        </h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {renderEditableField('Name', farmOperator.name, 'name')}
          {renderEditableField('Member ID', farmOperator.memberId, 'memberId')}
          {renderEditableField('Mobile', farmOperator.mobile, 'mobile', 'tel')}
          {renderEditableField('Location', farmOperator.location, 'location')}
          {renderEditableField('Joined Date', farmOperator.joinedDate, 'joinedDate', 'date')}
          {renderEditableField('ID', farmOperator.id.toString(), 'id', 'number')}
        </div>
      </div>
    </div>
  );

  const renderAssignedTasks = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
          Task Assignment History
        </h3>
        {!isPendingApproval && (
          <div className="relative">
            <button
              onClick={() => setShowTaskFilter(!showTaskFilter)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
            </button>

            {showTaskFilter && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Filter by</h3>
                    <button
                      onClick={() => setShowTaskFilter(false)}
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
                            name="taskStatus"
                            value=""
                            checked={taskFilters.status === ''}
                            onChange={(e) => handleTaskFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">All</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taskStatus"
                            value="Completed"
                            checked={taskFilters.status === 'Completed'}
                            onChange={(e) => handleTaskFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">Completed</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taskStatus"
                            value="In Progress"
                            checked={taskFilters.status === 'In Progress'}
                            onChange={(e) => handleTaskFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">In Progress</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taskStatus"
                            value="Overdue"
                            checked={taskFilters.status === 'Overdue'}
                            onChange={(e) => handleTaskFilterChange('status', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">Overdue</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      onClick={resetTaskFilters}
                      className="flex-1 px-3 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={applyTaskFilters}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter' }}>
            No tasks assigned yet
          </p>
          <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Inter' }}>
            Tasks will be available after approval
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Inter' }}>
            Complete list of all tasks assigned to this Farm Operator
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Title
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Location
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Assigned Date
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Due Date
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Inter' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-100">
                    <td
                      className="py-3 text-sm font-medium text-blue-600 cursor-pointer hover:underline"
                      style={{ fontFamily: 'Inter' }}
                      onClick={() => openTaskModal(task)}
                    >
                      {task.title}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {task.location}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {task.assignedDate}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {task.dueDate}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          task.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : task.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {task.status}
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

  const renderAttendanceRecords = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
          Attendance History
        </h3>
        {!isPendingApproval && (
          <div className="relative">
            <button
              onClick={() => setShowAttendanceFilter(!showAttendanceFilter)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
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
            No attendance records yet
          </p>
          <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Inter' }}>
            Records will be available after approval
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
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={farmOperator.profileImage}
              alt={farmOperator.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                {farmOperator.name}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                    {farmOperator.mobile}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                    # {farmOperator.memberId}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                    {farmOperator.location}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                    {isPendingApproval ? 'Applied' : 'Joined'} {farmOperator.joinedDate}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium ${
                farmOperator.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : farmOperator.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {farmOperator.status}
            </span>
          </div>
        </div>

        {/* Stats Cards Row */}
        {!isPendingApproval && (
          <div className="relative min-h-[128px]">
            <div className="flex gap-6 min-w-full">
              <div className="flex gap-6 flex-grow">
                <div className="bg-white border border-gray-200 rounded-xl p-4 w-72 h-44 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Tasks</p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{farmOperator.assignedTasks}</p>
                      <p className="text-xs text-gray-500 leading-tight">Task completion status</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 w-72 h-44 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-600 mb-1">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {farmOperator.tasks
                          ? Math.round(
                              (farmOperator.tasks.filter((t) => t.status === 'Completed').length /
                                farmOperator.tasks.length) *
                                100
                            ) || 0
                          : 0}
                        %
                      </p>
                      <p className="text-xs text-gray-500 leading-tight">
                        {farmOperator.tasks?.filter((t) => t.status === 'Overdue').length || 0} overdue tasks
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
                      <p className="text-sm font-medium text-gray-600 mb-1">Working Days</p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {farmOperator.attendanceStats?.total || 0}
                      </p>
                      <p className="text-xs text-gray-500 leading-tight">Total days since joining</p>
                    </div>
                  </div>
                </div>
              </div>

              {activeTab === 'attendance' && farmOperator.attendanceStats && (
                <div className="absolute top-0 right-0 bg-white border border-gray-200 rounded-xl p-6 w-[520px] h-[300px] shadow-lg z-10 mr-17">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Attendance Record</h3>
                    <button className="p-2 text-blue-600 hover:text-blue-700">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-start gap-6">
                    <div className="relative w-36 h-36">
                      <ResponsiveContainer width={144} height={144}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Present', value: farmOperator.attendanceStats.present, color: '#3B82F6' },
                              { name: 'Absent', value: farmOperator.attendanceStats.absent, color: '#8B5CF6' },
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
                          <p className="text-lg font-bold text-gray-900">{farmOperator.attendanceStats.total}</p>
                          <p className="text-sm text-gray-600">Total</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Present</span>
                        </div>
                        <span className="text-base font-medium text-gray-900">
                          {farmOperator.attendanceStats.present}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Absent</span>
                        </div>
                        <span className="text-base font-medium text-gray-900">
                          {farmOperator.attendanceStats.absent}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
            {!isPendingApproval && (
              <>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'tasks' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Assigned Tasks ({farmOperator.tasks?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'attendance' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Attendance Records
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isPendingApproval ? (
              <>
                <button
                  onClick={handleReject}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <X size={18} />
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
              </>
            ) : (
              activeTab === 'overview' && (
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
              )
            )}
          </div>
        </div>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tasks' && !isPendingApproval && renderAssignedTasks()}
        {activeTab === 'attendance' && !isPendingApproval && renderAttendanceRecords()}

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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Attendance Details</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Task Title</label>
                  <input
                    type="text"
                    value={selectedRecord.taskTitle}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Task Description</label>
                  <input
                    type="text"
                    value={selectedRecord.taskDescription}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Check-In Time</label>
                  <input
                    type="text"
                    value={selectedRecord.checkIn}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Check-Out Time</label>
                  <input
                    type="text"
                    value={selectedRecord.checkOut}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Check-In Location</label>
                  <input
                    type="text"
                    value={selectedRecord.checkInLocation}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Check-Out Location</label>
                  <input
                    type="text"
                    value={selectedRecord.checkOutLocation}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <input
                    type="text"
                    value={selectedRecord.notes}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Working Hours</label>
                  <input
                    type="text"
                    value={selectedRecord.workingHours}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                  />
                </div>
              </div>

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

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    alert('Rejected');
                    closeModal();
                  }}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    alert('Approved');
                    closeModal();
                  }}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {showApproveDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4 text-center">Approve User</h2>
              <p className="text-gray-600 mb-6 text-center">Are you sure you want to Approve this User</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowApproveDialog(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  No
                </button>
                <button
                  onClick={confirmApprove}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {showRejectDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4 text-center">Reject User</h2>
              <p className="text-gray-600 mb-6 text-center">Are you sure you want to Reject this User</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowRejectDialog(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  No
                </button>
                <button
                  onClick={confirmReject}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmOperatorProfile;