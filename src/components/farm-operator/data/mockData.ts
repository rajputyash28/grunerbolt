import { FarmOperator, PendingApproval, FarmOperatorProfile } from '../types/farmOperatorTypes';

export const mockFarmOperators: FarmOperator[] = [
  {
    id: 1,
    name: 'Ravi Sharma',
    memberId: 'MEM-FO-2024-001',
    mobile: '+91 9785432110',
    location: 'Rajasthan, Jaipur, Sangaria',
    status: 'Active',
    assignedTasks: '10/12',
    joinedDate: '2024-01-10',
    profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 2,
    name: 'Amit Singh',
    memberId: 'MEM-FO-2024-002',
    mobile: '+91 9876543211',
    location: 'Uttar Pradesh, Lucknow, Gomti Nagar',
    status: 'Active',
    assignedTasks: '7/8',
    joinedDate: '2024-01-15',
    profileImage: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 3,
    name: 'Suresh Verma',
    memberId: 'MEM-FO-2024-003',
    mobile: '+91 9876543212',
    location: 'Madhya Pradesh, Bhopal, Indrapuri',
    status: 'Inactive',
    assignedTasks: '3/5',
    joinedDate: '2024-01-20',
    profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 4,
    name: 'Vikash Yadav',
    memberId: 'MEM-FO-2024-004',
    mobile: '+91 9876543213',
    location: 'Maharashtra, Mumbai, Andheri',
    status: 'Active',
    assignedTasks: '9/10',
    joinedDate: '2024-01-25',
    profileImage: 'https://images.pexels.com/photos/7403910/pexels-photo-7403910.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 5,
    name: 'Deepak Patel',
    memberId: 'MEM-FO-2024-005',
    mobile: '+91 9876543214',
    location: 'Gujarat, Ahmedabad, Naranpura',
    status: 'Active',
    assignedTasks: '12/15',
    joinedDate: '2024-02-01',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const mockPendingApprovals: PendingApproval[] = [
  {
    id: 101,
    name: 'Kavita Singh',
    memberId: 'MEM-FO-2024-101',
    mobile: '+91 9876543220',
    location: 'Bihar, Patna, Boring Road',
    appliedDate: '2024-03-15'
  },
  {
    id: 102,
    name: 'Ritu Kumari',
    memberId: 'MEM-FO-2024-102',
    mobile: '+91 9876543221',
    location: 'Jharkhand, Ranchi, Hinoo',
    appliedDate: '2024-03-18'
  },
  {
    id: 103,
    name: 'Neha Sharma',
    memberId: 'MEM-FO-2024-103',
    mobile: '+91 9876543222',
    location: 'Assam, Guwahati, Dispur',
    appliedDate: '2024-03-20'
  }
];

export const mockFarmOperatorProfile: FarmOperatorProfile = {
  id: 1,
  name: 'Meera Patel',
  memberId: 'REG-KD-2024-001',
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
      dueDate: '2024-01-28',
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
    { date: '2024-01-25', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present' },
    { date: '2024-01-24', checkIn: '09:15 AM', checkOut: '05:45 PM', status: 'Present' },
    { date: '2024-01-23', checkIn: '09:30 AM', checkOut: '05:15 PM', status: 'Present' },
    { date: '2024-01-22', checkIn: 'N/A', checkOut: 'N/A', status: 'Absent' },
    { date: '2024-01-21', checkIn: '08:45 AM', checkOut: '05:30 PM', status: 'Present' }
  ]
};