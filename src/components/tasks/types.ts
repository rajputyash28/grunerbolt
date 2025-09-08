// Define interfaces for tasks
export interface DraftTask {
  id: number;
  title: string;
  createdDate: string;
  status: "Draft";
  userType?: string;
  state?: string;  // Display name
  district?: string;  // Display name
  mandal?: string;  // Display name
  stateId?: string;  // ID for form operations
  districtId?: string;  // ID for form operations
  mandalId?: string;  // ID for form operations
  selectedUsers?: number[];
  taskDescription?: string;
  dueDate?: string;
}

export interface AssignedTask {
  id: number;
  title: string;
  assignedTo: string;
  state: string;  // Display name
  district: string;  // Display name
  mandal: string;  // Display name
  stateId?: string;  // ID for form operations
  districtId?: string;  // ID for form operations
  mandalId?: string;  // ID for form operations
  assignedDate: string;
  status: "Assigned";
  taskDescription?: string;
  dueDate?: string;
}

export type Task = DraftTask | AssignedTask;

export interface User {
  id: number;
  name: string;
  memberId: string;
  userType: string;
}

export interface FormData {
  userType: string;
  state: string;
  district: string;
  mandal: string;
  selectedUsers: number[];
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'state' | 'district' | 'city';
  parentId: string | null;
}

export type TabType = "draft" | "assigned" | "create";
export type ConfirmationType = 'delete' | 'assign' | null;
