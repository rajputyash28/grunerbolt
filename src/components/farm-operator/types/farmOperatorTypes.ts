export interface FarmOperator {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive';
  assignedTasks: string;
  joinedDate: string;
  profileImage: string;
}

export interface PendingApproval {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  appliedDate: string;
}

export interface FilterState {
  state: string;
  district: string;
  mandal: string;
  landSizeFrom: string;
  landSizeTo: string;
}

export interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent';
}

export interface AssignedTask {
  id: number;
  title: string;
  location: string;
  assignedDate: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Overdue';
}

export interface FarmOperatorProfile {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: string;
  joinedDate: string;
  profileImage: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completionRate: number;
  workingDays: number;
  attendanceStats: {
    present: number;
    absent: number;
    total: number;
  };
  basicDetails: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    mobileNumber: string;
    emailAddress: string;
    fatherName: string;
    education: string;
  };
  kycDocuments: {
    aadharCard: string;
  };
  addressInfo: {
    completeAddress: string;
    village: string;
    mandal: string;
    district: string;
    state: string;
    pinCode: string;
  };
  assignedTasks: AssignedTask[];
  attendanceRecords: AttendanceRecord[];
}