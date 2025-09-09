// import React, { useState, ChangeEvent, useRef, useEffect } from "react";
// import { Search, ChevronDown, MoreHorizontal, Edit2, UserPlus, Trash2, X } from "lucide-react";

// // Define interfaces for tasks
// interface DraftTask {
//   id: number;
//   title: string;
//   createdDate: string;
//   status: "Draft";
//   userType?: string;
//   state?: string;
//   district?: string;
//   mandal?: string;
//   selectedUsers?: number[];
//   taskDescription?: string;
//   dueDate?: string;
// }

// interface AssignedTask {
//   id: number;
//   title: string;
//   assignedTo: string;
//   state: string;
//   district: string;
//   mandal: string;
//   assignedDate: string;
//   status: "Assigned";
//   taskDescription?: string;
//   dueDate?: string;
// }

// type Task = DraftTask | AssignedTask;

// interface User {
//   id: number;
//   name: string;
//   memberId: string;
//   userType: string;
// }

// interface FormData {
//   userType: string;
//   state: string;
//   district: string;
//   mandal: string;
//   selectedUsers: number[];
//   taskTitle: string;
//   taskDescription: string;
//   dueDate: string;
// }

// const TaskManagement: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"draft" | "assigned" | "create">("draft");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [userSearchTerm, setUserSearchTerm] = useState("");
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const [editingTask, setEditingTask] = useState<DraftTask | null>(null);
//   const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [confirmationType, setConfirmationType] = useState<'delete' | 'assign' | null>(null);
//   const [confirmationTask, setConfirmationTask] = useState<DraftTask | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const actionMenuRef = useRef<HTMLDivElement>(null);

//   const [formData, setFormData] = useState<FormData>({
//     userType: "",
//     state: "",
//     district: "",
//     mandal: "",
//     selectedUsers: [],
//     taskTitle: "",
//     taskDescription: "",
//     dueDate: "",
//   });

//   const [draftTasks, setDraftTasks] = useState<DraftTask[]>([
//     {
//       id: 1,
//       title: "Soil Testing Campaign",
//       createdDate: "2024-03-15",
//       status: "Draft",
//       userType: "farm-manager",
//       state: "uttar-pradesh",
//       district: "noida",
//       mandal: "sector1",
//       selectedUsers: [1, 2, 7],
//       taskDescription: "Soil Testing Campaign for agricultural assessment",
//       dueDate: "2024-04-15",
//     },
//     {
//       id: 2,
//       title: "Farmer Training Session",
//       createdDate: "2024-03-14",
//       status: "Draft",
//       userType: "kisani-didi",
//       state: "gujarat",
//       district: "ahmedabad",
//       mandal: "sector2",
//       selectedUsers: [3, 4],
//       taskDescription: "Farmer Training Session on modern techniques",
//       dueDate: "2024-04-20",
//     },
//     {
//       id: 3,
//       title: "Equipment Maintenance",
//       createdDate: "2024-03-13",
//       status: "Draft",
//       userType: "operator",
//       state: "rajasthan",
//       district: "jaipur",
//       mandal: "sector3",
//       selectedUsers: [5, 6],
//       taskDescription: "Regular equipment maintenance and inspection",
//       dueDate: "2024-04-10",
//     },
//   ]);

//   const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([
//     {
//       id: 1,
//       title: "Crop Disease Survey",
//       assignedTo: "Priya Sharma",
//       state: "Uttar Pradesh",
//       district: "Noida",
//       mandal: "Sector1",
//       assignedDate: "2024-03-10",
//       status: "Assigned",
//       taskDescription: "Crop Disease Survey for agricultural assessment",
//       dueDate: "2024-04-15",
//     },
//     {
//       id: 2,
//       title: "Water Management",
//       assignedTo: "Rajesh Kumar",
//       state: "Gujarat",
//       district: "Ahmedabad",
//       mandal: "Sector2",
//       assignedDate: "2024-03-09",
//       status: "Assigned",
//       taskDescription: "Water Management on modern techniques",
//       dueDate: "2024-04-20",
//     },
//   ]);

//   const userOptions: User[] = [
//     {
//       id: 1,
//       name: "Rajesh Kumar",
//       memberId: "MEM-FM-2024-001",
//       userType: "farm-manager",
//     },
//     {
//       id: 2,
//       name: "Suresh Kumar",
//       memberId: "MEM-FM-2024-002",
//       userType: "farm-manager",
//     },
//     {
//       id: 3,
//       name: "Priya Sharma",
//       memberId: "MEM-KD-2024-001",
//       userType: "kisani-didi",
//     },
//     {
//       id: 4,
//       name: "Anita Singh",
//       memberId: "MEM-KD-2024-002",
//       userType: "kisani-didi",
//     },
//     {
//       id: 5,
//       name: "Mukesh Patel",
//       memberId: "MEM-OP-2024-001",
//       userType: "operator",
//     },
//     {
//       id: 6,
//       name: "Ramesh Gupta",
//       memberId: "MEM-OP-2024-002",
//       userType: "operator",
//     },
//     {
//       id: 7,
//       name: "Sunita Devi",
//       memberId: "MEM-FM-2024-003",
//       userType: "farm-manager",
//     },
//     {
//       id: 8,
//       name: "Maya Patel",
//       memberId: "MEM-KD-2024-003",
//       userType: "kisani-didi",
//     },
//     {
//       id: 9,
//       name: "Vikram Singh",
//       memberId: "MEM-OP-2024-003",
//       userType: "operator",
//     },
//   ];

//   const getCurrentData = (): Task[] => {
//     const data = activeTab === "assigned" ? assignedTasks : draftTasks;
//     if (!searchTerm) return data;
//     return data.filter((task) =>
//       task.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const getFilteredUsers = (): User[] => {
//     let filtered = userOptions;
//     let baseType = "";
//     if (formData.userType) {
//       if (formData.userType.startsWith("individual-")) {
//         baseType = formData.userType.replace("individual-", "");
//       } else {
//         baseType = formData.userType;
//       }
//       filtered = filtered.filter((user) => user.userType === baseType);
//     }
//     if (userSearchTerm) {
//       filtered = filtered.filter(
//         (user) =>
//           user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
//           user.memberId.toLowerCase().includes(userSearchTerm.toLowerCase())
//       );
//     }
//     return filtered;
//   };

//   const getUserTypeDisplayName = (userType: string): string => {
//     const displayNames: { [key: string]: string } = {
//       "farm-manager": "Farm Manager",
//       "individual-farm-manager": "Individual Farm Manager",
//       "kisani-didi": "Kisani Didi",
//       "individual-kisani-didi": "Individual Kisani Didi",
//       "operator": "Operator",
//       "individual-operator": "Individual Operator",
//     };
//     return displayNames[userType] || userType;
//   };

//   const getSelectedUsersDisplay = (): string => {
//     if (!formData.userType) {
//       return "";
//     }

//     const isIndividual = formData.userType.startsWith("individual-");
//     const baseType = isIndividual ? formData.userType.replace("individual-", "") : formData.userType;
//     const totalCount = userOptions.filter((user) => user.userType === baseType).length;
//     const selectedCount = formData.selectedUsers.length;

//     if (isIndividual) {
//       if (showUserDropdown) {
//         return userSearchTerm;
//       } else {
//         if (selectedCount === 0) {
//           return "";
//         } else {
//           return `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount})`;
//         }
//       }
//     } else {
//       if (selectedCount === totalCount && totalCount > 0) {
//         return `All ${getUserTypeDisplayName(formData.userType)} Selected (${totalCount})`;
//       } else if (selectedCount > 0) {
//         return `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount})`;
//       } else {
//         return `Select ${getUserTypeDisplayName(formData.userType)}`;
//       }
//     }
//   };

//   const formatLocation = (str: string): string => {
//     if (!str) return '';
//     return str.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//   };

//   const handleTabChange = (tab: "draft" | "assigned" | "create") => {
//     setActiveTab(tab);
//     setShowCreateForm(false);
//     setSearchTerm("");
//     setEditingTask(null);
//     setActionMenuOpen(null);
//   };

//   const handleCreateTask = () => {
//     setShowCreateForm(true);
//     setActiveTab("create");
//     setEditingTask(null);
//     setActionMenuOpen(null);
//     setFormData({
//       userType: "",
//       state: "",
//       district: "",
//       mandal: "",
//       selectedUsers: [],
//       taskTitle: "",
//       taskDescription: "",
//       dueDate: "",
//     });
//     setUserSearchTerm("");
//   };

//   const handleEditTask = (task: DraftTask) => {
//     setEditingTask(task);
//     setShowCreateForm(true);
//     setActiveTab("create");
//     setActionMenuOpen(null);
//     setFormData({
//       userType: task.userType || "",
//       state: task.state || "",
//       district: task.district || "",
//       mandal: task.mandal || "",
//       selectedUsers: task.selectedUsers || [],
//       taskTitle: task.title || "",
//       taskDescription: task.taskDescription || "",
//       dueDate: task.dueDate || "",
//     });
//     setUserSearchTerm("");
//   };

//   const handleDeleteTask = (taskId: number) => {
//     setDraftTasks((prev) => prev.filter((task) => task.id !== taskId));
//     setActionMenuOpen(null);
//   };

//   const handleAssignFromMenu = (task: DraftTask) => {
//     if (task.selectedUsers && task.selectedUsers.length > 0) {
//       const newTasks: AssignedTask[] = task.selectedUsers.map((userId, index) => {
//         const selectedUser = userOptions.find((user) => user.id === userId);
//         return {
//           id: assignedTasks.length + 1 + index,
//           title: task.title,
//           taskDescription: task.taskDescription || "",
//           assignedTo: selectedUser ? selectedUser.name : "Unknown",
//           state: formatLocation(task.state || "uttar-pradesh"),
//           district: formatLocation(task.district || "noida"),
//           mandal: formatLocation(task.mandal || "sector1"),
//           assignedDate: new Date().toISOString().split("T")[0],
//           status: "Assigned",
//           dueDate: task.dueDate || "",
//         };
//       });
//       setAssignedTasks([...assignedTasks, ...newTasks]);
//       setDraftTasks((prev) => prev.filter((t) => t.id !== task.id));
//     }
//     setActionMenuOpen(null);
//   };

//   const handleUserSelection = (userId: number) => {
//     setFormData((prev) => {
//       const isSelected = prev.selectedUsers.includes(userId);
//       return {
//         ...prev,
//         selectedUsers: isSelected
//           ? prev.selectedUsers.filter((id) => id !== userId)
//           : [...prev.selectedUsers, userId],
//       };
//     });
//   };

//   const handleSelectAll = () => {
//     const filteredUsers = getFilteredUsers();
//     const allUserIds = filteredUsers.map((user) => user.id);
//     setFormData((prev) => ({
//       ...prev,
//       selectedUsers: allUserIds,
//     }));
//   };

//   const handleDeselectAll = () => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedUsers: [],
//     }));
//   };

//   const handleUserTypeChange = (userType: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       userType,
//       selectedUsers: [],
//     }));
//     if (!userType.startsWith("individual-") && userType) {
//       const usersOfType = userOptions.filter((user) => user.userType === userType);
//       setFormData((prev) => ({
//         ...prev,
//         selectedUsers: usersOfType.map((user) => user.id),
//       }));
//     }
//   };

//   const handleSaveToDraft = () => {
//     if (formData.taskTitle) {
//       if (editingTask) {
//         const updatedTask: DraftTask = {
//           ...editingTask,
//           title: formData.taskTitle,
//           userType: formData.userType,
//           state: formData.state,
//           district: formData.district,
//           mandal: formData.mandal,
//           selectedUsers: formData.selectedUsers,
//           taskDescription: formData.taskDescription,
//           dueDate: formData.dueDate,
//         };
//         setDraftTasks((prev) => prev.map((task) => (task.id === editingTask.id ? updatedTask : task)));
//       } else {
//         const newTask: DraftTask = {
//           id: Date.now(),
//           title: formData.taskTitle,
//           createdDate: new Date().toISOString().split("T")[0],
//           status: "Draft",
//           userType: formData.userType,
//           state: formData.state,
//           district: formData.district,
//           mandal: formData.mandal,
//           selectedUsers: formData.selectedUsers,
//           taskDescription: formData.taskDescription,
//           dueDate: formData.dueDate,
//         };
//         setDraftTasks([...draftTasks, newTask]);
//       }
//       setFormData({
//         userType: "",
//         state: "",
//         district: "",
//         mandal: "",
//         selectedUsers: [],
//         taskTitle: "",
//         taskDescription: "",
//         dueDate: "",
//       });
//       setUserSearchTerm("");
//       setShowCreateForm(false);
//       setEditingTask(null);
//       setActiveTab("draft");
//     }
//   };

//   const handleAssignTask = () => {
//     if (formData.taskTitle && formData.selectedUsers.length > 0) {
//       const newTasks: AssignedTask[] = formData.selectedUsers.map((userId, index) => {
//         const selectedUser = userOptions.find((user) => user.id === userId);
//         return {
//           id: assignedTasks.length + 1 + index,
//           title: formData.taskTitle,
//           taskDescription: formData.taskDescription,
//           assignedTo: selectedUser ? selectedUser.name : "Unknown",
//           state: formatLocation(formData.state || "uttar-pradesh"),
//           district: formatLocation(formData.district || "noida"),
//           mandal: formatLocation(formData.mandal || "sector1"),
//           assignedDate: new Date().toISOString().split("T")[0],
//           status: "Assigned",
//           dueDate: formData.dueDate,
//         };
//       });
//       setAssignedTasks([...assignedTasks, ...newTasks]);
//       if (editingTask) {
//         setDraftTasks((prev) => prev.filter((task) => task.id !== editingTask.id));
//       }
//       setFormData({
//         userType: "",
//         state: "",
//         district: "",
//         mandal: "",
//         selectedUsers: [],
//         taskTitle: "",
//         taskDescription: "",
//         dueDate: "",
//       });
//       setUserSearchTerm("");
//       setShowCreateForm(false);
//       setEditingTask(null);
//       setActiveTab("assigned");
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       userType: "",
//       state: "",
//       district: "",
//       mandal: "",
//       selectedUsers: [],
//       taskTitle: "",
//       taskDescription: "",
//       dueDate: "",
//     });
//     setUserSearchTerm("");
//     setShowCreateForm(false);
//     setEditingTask(null);
//     setActiveTab("draft");
//   };

//   const handleOutsideClick = (e: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//       setShowUserDropdown(false);
//     }
//     if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
//       setActionMenuOpen(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleOutsideClick as EventListener);
//     return () => document.removeEventListener("mousedown", handleOutsideClick as EventListener);
//   }, []);

//   return (
//     <div className="space-y-6" style={{ fontFamily: "Poppins" }}>
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
//             Task Management
//           </h1>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
//         <button
//           onClick={() => handleTabChange("draft")}
//           className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "draft" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
//             }`}
//           style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
//         >
//           Draft Tasks
//         </button>
//         <button
//           onClick={() => handleTabChange("assigned")}
//           className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "assigned" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
//             }`}
//           style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
//         >
//           Assigned Tasks
//         </button>
//         <button
//           onClick={handleCreateTask}
//           className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${showCreateForm ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
//             }`}
//           style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
//         >
//           Create Task
//         </button>
//       </div>

//       {/* Search - Only show for Draft and Assigned Tasks */}
//       {!showCreateForm && (activeTab === "draft" || activeTab === "assigned") && (
//         <div className="flex items-center gap-4">
//           <div className="flex-1 relative">
//             <Search
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               size={20}
//             />
//             <input
//               type="text"
//               placeholder={`Search ${activeTab === "draft" ? "Draft" : "Assigned"} Tasks`}
//               value={searchTerm}
//               onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               style={{ fontFamily: "Poppins", fontSize: "14px" }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {showCreateForm ? (
//         // <div className="bg-white rounded-lg p-6 border border-gray-200">
//         //   <div className="space-y-5">
//         //     {/* Select User Type */}
//         //     <div>
//         //       <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//         //         Select User Type
//         //       </label>
//         //       <div className="relative">
//         //         <select
//         //           value={formData.userType}
//         //           onChange={(e: ChangeEvent<HTMLSelectElement>) => handleUserTypeChange(e.target.value)}
//         //           className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
//         //           style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //         >
//         //           <option value="">Select User Type</option>
//         //           <option value="farm-manager">All Farm Manager</option>
//         //           <option value="individual-farm-manager">Individual Farm Manager</option>
//         //           <option value="kisani-didi">All Kisani Didi</option>
//         //           <option value="individual-kisani-didi">Individual Kisani Didi</option>
//         //           <option value="operator">All Operator</option>
//         //           <option value="individual-operator">Individual Operator</option>
//         //         </select>
//         //         <ChevronDown
//         //           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//         //           size={16}
//         //         />
//         //       </div>
//         //     </div>

//         //     <div className="flex gap-3">
//         //       <div>
//         //         <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//         //           State
//         //         </label>
//         //         <div className="relative">
//         //           <select
//         //             value={formData.state}
//         //             onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//         //               setFormData({ ...formData, state: e.target.value })
//         //             }
//         //             className="w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
//         //             style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //           >
//         //             <option value="">Select State</option>
//         //             <option value="uttar-pradesh">Uttar Pradesh</option>
//         //             <option value="gujarat">Gujarat</option>
//         //             <option value="rajasthan">Rajasthan</option>
//         //           </select>
//         //           <ChevronDown
//         //             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//         //             size={16}
//         //           />
//         //         </div>
//         //       </div>
//         //       <div>
//         //         <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//         //           District
//         //         </label>
//         //         <div className="relative">
//         //           <select
//         //             value={formData.district}
//         //             onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//         //               setFormData({ ...formData, district: e.target.value })
//         //             }
//         //             className="w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
//         //             style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //           >
//         //             <option value="">Select District</option>
//         //             <option value="noida">Noida</option>
//         //             <option value="lucknow">Lucknow</option>
//         //             <option value="ahmedabad">Ahmedabad</option>
//         //             <option value="jaipur">Jaipur</option>
//         //           </select>
//         //           <ChevronDown
//         //             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//         //             size={16}
//         //           />
//         //         </div>
//         //       </div>
//         //       <div>
//         //         <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//         //           Mandal
//         //         </label>
//         //         <div className="relative">
//         //           <select
//         //             value={formData.mandal}
//         //             onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//         //               setFormData({ ...formData, mandal: e.target.value })
//         //             }
//         //             className="w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
//         //             style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //           >
//         //             <option value="">Select Mandal</option>
//         //             <option value="sector1">Sector1</option>
//         //             <option value="sector2">Sector2</option>
//         //             <option value="sector3">Sector3</option>
//         //           </select>
//         //           <ChevronDown
//         //             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//         //             size={16}
//         //           />
//         //         </div>
//         //       </div>
//         //     </div>

//         //     {/* Search Users */}
//         //     <div>
//         //       <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//         //         Search
//         //       </label>
//         //       <div className="relative mb-1">
//         //         <input
//         //           type="text"
//         //           placeholder="Search by name or member ID"
//         //           value={getSelectedUsersDisplay()}
//         //           onChange={(e: ChangeEvent<HTMLInputElement>) => {
//         //             if (formData.userType.startsWith("individual-")) {
//         //               setUserSearchTerm(e.target.value);
//         //               setShowUserDropdown(true);
//         //             }
//         //           }}
//         //           onClick={() => {
//         //             if (formData.userType.startsWith("individual-")) {
//         //               setShowUserDropdown(true);
//         //               setUserSearchTerm("");
//         //             }
//         //           }}
//         //           readOnly={!formData.userType.startsWith("individual-")}
//         //           className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm truncate ${
//         //             !formData.userType.startsWith("individual-") ? "bg-gray-50 cursor-default" : "cursor-text"
//         //           }`}
//         //           style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //         />
//         //         {formData.userType.startsWith("individual-") && (
//         //           <ChevronDown
//         //             size={16}
//         //             className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform ${
//         //               showUserDropdown ? "rotate-180" : ""
//         //             }`}
//         //           />
//         //         )}
//         //       </div>

//         //       {showUserDropdown && formData.userType.startsWith("individual-") && (
//         //         <div
//         //           ref={dropdownRef}
//         //           className="border border-gray-200 rounded-md max-h-48 overflow-y-auto bg-white shadow-lg z-50"
//         //         >
//         //           <div className="px-3 py-2 text-xs text-gray-500 border-b bg-gray-50 flex justify-between items-center">
//         //             <button
//         //               onClick={handleSelectAll}
//         //               className="text-blue-600 hover:underline text-xs"
//         //               type="button"
//         //             >
//         //               Select All ({getFilteredUsers().length})
//         //             </button>
//         //             <button
//         //               onClick={handleDeselectAll}
//         //               className="text-blue-600 hover:underline text-xs"
//         //               type="button"
//         //             >
//         //               Deselect All
//         //             </button>
//         //           </div>
//         //           {getFilteredUsers().length === 0 ? (
//         //             <div className="px-3 py-2 text-sm text-gray-500">No users found</div>
//         //           ) : (
//         //             getFilteredUsers().map((user) => (
//         //               <div
//         //                 key={user.id}
//         //                 className="flex items-center px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
//         //               >
//         //                 <input
//         //                   type="checkbox"
//         //                   className="mr-2 w-4 h-4 text-blue-600"
//         //                   checked={formData.selectedUsers.includes(user.id)}
//         //                   onChange={() => handleUserSelection(user.id)}
//         //                 />
//         //                 <div>
//         //                   <p className="text-sm font-medium text-gray-900">{user.name}</p>
//         //                   <p className="text-xs text-gray-500">{user.memberId}</p>
//         //                 </div>
//         //               </div>
//         //             ))
//         //           )}
//         //           {/* Done Button */}
//         //           <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex justify-start">
//         //             <button
//         //               onClick={() => setShowUserDropdown(false)}
//         //               className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
//         //               style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //               type="button"
//         //             >
//         //               Done
//         //             </button>
//         //           </div>
//         //         </div>
//         //       )}
//         //     </div>

//         //     {/* Task Title */}
//         //     <div>
//         //       <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//         //         Task Title
//         //       </label>
//         //       <input
//         //         type="text"
//         //         value={formData.taskTitle}
//         //         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//         //           setFormData({ ...formData, taskTitle: e.target.value })
//         //         }
//         //         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//         //         placeholder="Enter task title"
//         //         style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //       />
//         //     </div>

//         //     {/* Task Description */}
//         //     <div>
//         //       <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//         //         Description
//         //       </label>
//         //       <textarea
//         //         rows={3}
//         //         value={formData.taskDescription}
//         //         onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//         //           setFormData({ ...formData, taskDescription: e.target.value })
//         //         }
//         //         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
//         //         placeholder="Enter task description"
//         //         style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //       />
//         //     </div>

//         //     {/* Due Date */}
//         //     <div>
//         //       <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//         //         Due Date
//         //       </label>
//         //       <input
//         //         type="date"
//         //         value={formData.dueDate}
//         //         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//         //           setFormData({ ...formData, dueDate: e.target.value })
//         //         }
//         //         className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//         //         style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //       />
//         //     </div>

//         //     {/* Action Buttons */}
//         //     <div className="flex justify-end gap-2 pt-2">
//         //       <button
//         //         type="button"
//         //         onClick={handleCancel}
//         //         className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
//         //         style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //       >
//         //         Cancel
//         //       </button>
//         //       <button
//         //         type="button"
//         //         onClick={handleSaveToDraft}
//         //         disabled={!formData.taskTitle}
//         //         className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//         //         style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //       >
//         //         Save to Draft
//         //       </button>
//         //       <button
//         //         type="button"
//         //         onClick={handleAssignTask}
//         //         disabled={!formData.taskTitle || formData.selectedUsers.length === 0}
//         //         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//         //         style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         //       >
//         //         Assign Task
//         //       </button>
//         //     </div>
//         //   </div>
//         // </div>
//         <div className="bg-white rounded-lg p-6 border border-gray-200">
//     <div className="space-y-5">
//       {/* Select User Type */}
//       <div>
//         <label
//           className="block text-sm font-medium text-gray-700 mb-1"
//           style={{ fontFamily: "Poppins" }}
//         >
//           Select User Type
//         </label>
//         <div className="relative">
//           <select
//             value={formData.userType}
//             onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//               handleUserTypeChange(e.target.value)
//             }
//             className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
//             style={{ fontFamily: "Poppins", fontSize: "13px" }}
//           >
//             <option value="">Select User Type</option>
//             <option value="farm-manager">All Farm Manager</option>
//             <option value="individual-farm-manager">Individual Farm Manager</option>
//             <option value="kisani-didi">All Kisani Didi</option>
//             <option value="individual-kisani-didi">Individual Kisani Didi</option>
//             <option value="operator">All Operator</option>
//             <option value="individual-operator">Individual Operator</option>
//           </select>
//           <ChevronDown
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//             size={16}
//           />
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700 mb-1"
//             style={{ fontFamily: "Poppins" }}
//           >
//             State
//           </label>
//           <div className="relative">
//             <select
//               value={formData.state}
//               onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//                 setFormData({ ...formData, state: e.target.value, district: "", mandal: "" })
//               }
//               disabled={!formData.userType}
//               className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${
//                 !formData.userType ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               style={{ fontFamily: "Poppins", fontSize: "13px" }}
//             >
//               <option value="">Select State</option>
//               <option value="uttar-pradesh">Uttar Pradesh</option>
//               <option value="gujarat">Gujarat</option>
//               <option value="rajasthan">Rajasthan</option>
//             </select>
//             <ChevronDown
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//               size={16}
//             />
//           </div>
//         </div>
//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700 mb-1"
//             style={{ fontFamily: "Poppins" }}
//           >
//             District
//           </label>
//           <div className="relative">
//             <select
//               value={formData.district}
//               onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//                 setFormData({ ...formData, district: e.target.value, mandal: "" })
//               }
//               disabled={!formData.state}
//               className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${
//                 !formData.state ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               style={{ fontFamily: "Poppins", fontSize: "13px" }}
//             >
//               <option value="">Select District</option>
//               <option value="noida">Noida</option>
//               <option value="lucknow">Lucknow</option>
//               <option value="ahmedabad">Ahmedabad</option>
//               <option value="jaipur">Jaipur</option>
//             </select>
//             <ChevronDown
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//               size={16}
//             />
//           </div>
//         </div>
//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700 mb-1"
//             style={{ fontFamily: "Poppins" }}
//           >
//             Mandal
//           </label>
//           <div className="relative">
//             <select
//               value={formData.mandal}
//               onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//                 setFormData({ ...formData, mandal: e.target.value })
//               }
//               disabled={!formData.district}
//               className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${
//                 !formData.district ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               style={{ fontFamily: "Poppins", fontSize: "13px" }}
//             >
//               <option value="">Select Mandal</option>
//               <option value="sector1">Sector1</option>
//               <option value="sector2">Sector2</option>
//               <option value="sector3">Sector3</option>
//             </select>
//             <ChevronDown
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//               size={16}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Search Users */}
//       <div>
//         <label
//           className="block text-sm font-medium text-gray-700 mb-1"
//           style={{ fontFamily: "Poppins" }}
//         >
//           Search
//         </label>
//         <div className="relative mb-1">
//           <input
//             type="text"
//             placeholder="Search by name or member ID"
//             value={getSelectedUsersDisplay()}
//             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//               if (formData.userType.startsWith("individual-")) {
//                 setUserSearchTerm(e.target.value);
//                 setShowUserDropdown(true);
//               }
//             }}
//             onClick={() => {
//               if (formData.userType.startsWith("individual-")) {
//                 setShowUserDropdown(true);
//                 setUserSearchTerm("");
//               }
//             }}
//             disabled={!formData.userType || !formData.userType.startsWith("individual-")}
//             className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm truncate ${
//               !formData.userType || !formData.userType.startsWith("individual-")
//                 ? "bg-gray-50 cursor-not-allowed opacity-50"
//                 : "cursor-text"
//             }`}
//             style={{ fontFamily: "Poppins", fontSize: "13px" }}
//           />
//           {formData.userType.startsWith("individual-") && (
//             <ChevronDown
//               size={16}
//               className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform ${
//                 showUserDropdown ? "rotate-180" : ""
//               }`}
//             />
//           )}
//         </div>

//         {showUserDropdown && formData.userType.startsWith("individual-") && (
//           <div
//             ref={dropdownRef}
//             className="border border-gray-200 rounded-md max-h-48 overflow-y-auto bg-white shadow-lg z-50"
//           >
//             <div className="px-3 py-2 text-xs text-gray-500 border-b bg-gray-50 flex justify-between items-center">
//               <button
//                 onClick={handleSelectAll}
//                 className="text-blue-600 hover:underline text-xs"
//                 type="button"
//               >
//                 Select All ({getFilteredUsers().length})
//               </button>
//               <button
//                 onClick={handleDeselectAll}
//                 className="text-blue-600 hover:underline text-xs"
//                 type="button"
//               >
//                 Deselect All
//               </button>
//             </div>
//             {getFilteredUsers().length === 0 ? (
//               <div className="px-3 py-2 text-sm text-gray-500">No users found</div>
//             ) : (
//               getFilteredUsers().map((user) => (
//                 <div
//                   key={user.id}
//                   className="flex items-center px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
//                 >
//                   <input
//                     type="checkbox"
//                     className="mr-2 w-4 h-4 text-blue-600"
//                     checked={formData.selectedUsers.includes(user.id)}
//                     onChange={() => handleUserSelection(user.id)}
//                   />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                     <p className="text-xs text-gray-500">{user.memberId}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//             {/* Done Button */}
//             <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex justify-start">
//               <button
//                 onClick={() => setShowUserDropdown(false)}
//                 className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
//                 style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 type="button"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Task Title */}
//       <div>
//         <label
//           className="block text-sm font-medium text-gray-700 mb-1"
//           style={{ fontFamily: "Poppins" }}
//         >
//           Task Title
//         </label>
//         <input
//           type="text"
//           value={formData.taskTitle}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setFormData({ ...formData, taskTitle: e.target.value })
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//           placeholder="Enter task title"
//           style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         />
//       </div>

//       {/* Task Description */}
//       <div>
//         <label
//           className="block text-sm font-medium text-gray-700 mb-1"
//           style={{ fontFamily: "Poppins" }}
//         >
//           Description
//         </label>
//         <textarea
//           rows={3}
//           value={formData.taskDescription}
//           onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//             setFormData({ ...formData, taskDescription: e.target.value })
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
//           placeholder="Enter task description"
//           style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         />
//       </div>

//       {/* Due Date */}
//       <div>
//         <label
//           className="block text-sm font-medium text-gray-700 mb-1"
//           style={{ fontFamily: "Poppins" }}
//         >
//           Due Date
//         </label>
//         <input
//           type="date"
//           value={formData.dueDate}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setFormData({ ...formData, dueDate: e.target.value })
//           }
//           className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//           style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         />
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-2 pt-2">
//         <button
//           type="button"
//           onClick={handleCancel}
//           className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
//           style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={handleSaveToDraft}
//           disabled={!formData.taskTitle}
//           className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//           style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         >
//           Save to Draft
//         </button>
//         <button
//           type="button"
//           onClick={handleAssignTask}
//           disabled={!formData.taskTitle || formData.selectedUsers.length === 0}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//           style={{ fontFamily: "Poppins", fontSize: "13px" }}
//         >
//           Assign Task
//         </button>
//       </div>
//     </div>
//   </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                 >
//                   Task Title
//                 </th>
//                 {activeTab === "assigned" && (
//                   <>
//                     <th
//                       className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                     >
//                       Assigned To
//                     </th>
//                     <th
//                       className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                     >
//                       State
//                     </th>
//                     <th
//                       className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                     >
//                       District
//                     </th>
//                     <th
//                       className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                     >
//                       Mandal
//                     </th>
//                     <th
//                       className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                     >
//                       Assigned Date
//                     </th>
//                   </>
//                 )}
//                 {activeTab === "draft" && (
//                   <th
//                     className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                   >
//                     Created Date
//                   </th>
//                 )}
//                 <th
//                   className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                 >
//                   Status
//                 </th>
//                 {activeTab === "draft" && (
//                   <th
//                     className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
//                   >
//                     Actions
//                   </th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {getCurrentData().map((task) => (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td
//                     onClick={() => setSelectedTask(task)}
//                     className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 underline cursor-pointer"
//                     style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 500 }}
//                   >
//                     {task.title}
//                   </td>
//                   {activeTab === "assigned" && (
//                     <>
//                       <td
//                         className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
//                         style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
//                       >
//                         {"assignedTo" in task ? task.assignedTo : "-"}
//                       </td>
//                       <td
//                         className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
//                         style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
//                       >
//                         {"state" in task ? task.state : "-"}
//                       </td>
//                       <td
//                         className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
//                         style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
//                       >
//                         {"district" in task ? task.district : "-"}
//                       </td>
//                       <td
//                         className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
//                         style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
//                       >
//                         {"mandal" in task ? task.mandal : "-"}
//                       </td>
//                       <td
//                         className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
//                         style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
//                       >
//                         {"assignedDate" in task ? task.assignedDate : "-"}
//                       </td>
//                     </>
//                   )}
//                   {activeTab === "draft" && (
//                     <td
//                       className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
//                       style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
//                     >
//                       {"createdDate" in task ? task.createdDate : "-"}
//                     </td>
//                   )}
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${task.status === "Assigned" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
//                         }`}
//                       style={{ fontFamily: "Poppins" }}
//                     >
//                       {task.status}
//                     </span>
//                   </td>
//                   {activeTab === "draft" && (
//                     <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium relative">
//                       <button
//                         className="text-gray-400 hover:text-gray-600 text-lg p-1 z-10"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setActionMenuOpen(actionMenuOpen === task.id ? null : task.id);
//                         }}
//                       >
//                         <MoreHorizontal size={16} />
//                       </button>
//                       {actionMenuOpen === task.id && (
//                         <div
//                           ref={actionMenuRef}
//                           className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[1000] py-1 min-w-[150px]"
//                           style={{ position: "absolute" }}
//                         >
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleEditTask(task as DraftTask);
//                             }}
//                             className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                           >
//                             <Edit2 size={14} />
//                             Edit Details
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setConfirmationType('assign');
//                               setConfirmationTask(task as DraftTask);
//                               setShowConfirmation(true);
//                               setActionMenuOpen(null);
//                             }}
//                             className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                             disabled={!(task as DraftTask).selectedUsers?.length}
//                           >
//                             <UserPlus size={14} />
//                             Assign Task
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setConfirmationType('delete');
//                               setConfirmationTask(task as DraftTask);
//                               setShowConfirmation(true);
//                               setActionMenuOpen(null);
//                             }}
//                             className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                           >
//                             <Trash2 size={14} />
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {getCurrentData().length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500" style={{ fontFamily: "Poppins" }}>
//                 No {activeTab === "draft" ? "draft" : "assigned"} tasks found
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Modal for Task Details */}
//       {selectedTask && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 border border-gray-200 relative max-w-lg w-full">
//             <button
//               onClick={() => setSelectedTask(null)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>
//             <h2 className="text-lg font-bold text-center mb-4" style={{ fontFamily: "Poppins" }}>
//               Task Detail
//             </h2>
//             <div className="space-y-4">
//               {selectedTask.status === "Draft" ? (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                     Select User Type
//                   </label>
//                   <input
//                     readOnly
//                     value={getUserTypeDisplayName((selectedTask as DraftTask).userType || "")}
//                     className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//               ) : (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                     Assigned To
//                   </label>
//                   <input
//                     readOnly
//                     value={(selectedTask as AssignedTask).assignedTo}
//                     className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//               )}
//               <div className="flex gap-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                     State
//                   </label>
//                   <input
//                     readOnly
//                     value={formatLocation(selectedTask.state || "")}
//                     className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                     District
//                   </label>
//                   <input
//                     readOnly
//                     value={formatLocation(selectedTask.district || "")}
//                     className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                     Mandal
//                   </label>
//                   <input
//                     readOnly
//                     value={formatLocation(selectedTask.mandal || "")}
//                     className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                   Task Title
//                 </label>
//                 <input
//                   readOnly
//                   value={selectedTask.title}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                   style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                   Description
//                 </label>
//                 <textarea
//                   readOnly
//                   rows={3}
//                   value={"taskDescription" in selectedTask ? selectedTask.taskDescription || "" : selectedTask.title}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none text-sm"
//                   style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                   Due Date
//                 </label>
//                 <input
//                   readOnly
//                   value={"dueDate" in selectedTask ? selectedTask.dueDate || "" : ""}
//                   className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                   style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 />
//               </div>
//               {selectedTask.status === "Assigned" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
//                     Assigned Date
//                   </label>
//                   <input
//                     readOnly
//                     value={(selectedTask as AssignedTask).assignedDate || ""}
//                     className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirmation Dialog */}
//       {showConfirmation && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 w-80 relative">
//             <button
//               onClick={() => setShowConfirmation(false)}
//               className="absolute top-2 right-2 text-black"
//             >
//               <X size={20} />
//             </button>
//             <h2 className="text-lg font-bold text-center mb-4">
//               {confirmationType === 'delete' ? 'Delete Task' : 'Assign Task'}
//             </h2>
//             <p className="text-center mb-6">
//               Are you sure you want to {confirmationType === 'delete' ? 'delete' : 'assign'} this Task?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowConfirmation(false)}
//                 className="px-6 py-2 border border-blue-500 text-black rounded-md"
//               >
//                 No
//               </button>
//               <button
//                 onClick={() => {
//                   if (confirmationType === 'delete') {
//                     handleDeleteTask(confirmationTask!.id);
//                   } else {
//                     handleAssignFromMenu(confirmationTask!);
//                   }
//                   setShowConfirmation(false);
//                   setConfirmationType(null);
//                   setConfirmationTask(null);
//                 }}
//                 className="px-6 py-2 bg-black text-white rounded-md"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskManagement;




// // Without integrated short  code 

// import React, { useState, ChangeEvent, useRef, useEffect } from "react";
// import { Search, ChevronDown, MoreHorizontal, Edit2, UserPlus, Trash2, X } from "lucide-react";

// // Interfaces
// interface DraftTask {
//   id: number;
//   title: string;
//   createdDate: string;
//   status: "Draft";
//   userType?: string;
//   state?: string;
//   district?: string;
//   mandal?: string;
//   selectedUsers?: number[];
//   taskDescription?: string;
//   dueDate?: string;
// }

// interface AssignedTask {
//   id: number;
//   title: string;
//   assignedTo: string;
//   state: string;
//   district: string;
//   mandal: string;
//   assignedDate: string;
//   status: "Assigned";
//   taskDescription?: string;
//   dueDate?: string;
// }

// type Task = DraftTask | AssignedTask;

// interface User {
//   id: number;
//   name: string;
//   memberId: string;
//   userType: string;
// }

// interface FormData {
//   userType: string;
//   state: string;
//   district: string;
//   mandal: string;
//   selectedUsers: number[];
//   taskTitle: string;
//   taskDescription: string;
//   dueDate: string;
// }

// const TaskManagement: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"draft" | "assigned" | "create">("draft");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [userSearchTerm, setUserSearchTerm] = useState("");
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const [editingTask, setEditingTask] = useState<DraftTask | null>(null);
//   const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [confirmationType, setConfirmationType] = useState<"delete" | "assign" | null>(null);
//   const [confirmationTask, setConfirmationTask] = useState<DraftTask | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const actionMenuRef = useRef<HTMLDivElement>(null);

//   const [formData, setFormData] = useState<FormData>({
//     userType: "",
//     state: "",
//     district: "",
//     mandal: "",
//     selectedUsers: [],
//     taskTitle: "",
//     taskDescription: "",
//     dueDate: "",
//   });

//   const [draftTasks, setDraftTasks] = useState<DraftTask[]>([
//     {
//       id: 1,
//       title: "Review Farm Reports",
//       createdDate: "2025-09-01",
//       status: "Draft",
//       userType: "farm-manager",
//       state: "state-01",
//       district: "district-01",
//       mandal: "mandal-01",
//       selectedUsers: [1, 2],
//       taskDescription: "Review and approve farm reports for Q3 2025",
//       dueDate: "2025-09-15",
//     },
//     {
//       id: 2,
//       title: "Soil Testing Plan",
//       createdDate: "2025-09-02",
//       status: "Draft",
//       userType: "individual-farm-manager",
//       state: "state-02",
//       district: "district-02",
//       mandal: "mandal-02",
//       selectedUsers: [2],
//       taskDescription: "Draft a plan for soil testing in the northern region",
//       dueDate: "",
//     },
//   ]);

//   const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([
//     {
//       id: 1,
//       title: "Crop Disease Survey",
//       assignedTo: "Priya Sharma",
//       state: "State 01",
//       district: "District 01",
//       mandal: "Mandal 01",
//       assignedDate: "2025-09-03",
//       status: "Assigned",
//       taskDescription: "Conduct a survey on crop diseases in the region",
//       dueDate: "2025-09-15",
//     },
//     {
//       id: 2,
//       title: "Water Management",
//       assignedTo: "Ramesh Gupta",
//       state: "State 03",
//       district: "District 03",
//       mandal: "Mandal 03",
//       assignedDate: "2025-09-04",
//       status: "Assigned",
//       taskDescription: "Implement water management techniques for irrigation",
//       dueDate: "2025-09-20",
//     },
//   ]);

//   const userOptions: User[] = [
//     {
//       id: 1,
//       name: "John Doe",
//       memberId: "FM001",
//       userType: "farm-manager",
//     },
//     {
//       id: 2,
//       name: "Suresh Kumar",
//       memberId: "FM002",
//       userType: "farm-manager",
//     },
//     {
//       id: 3,
//       name: "Priya Sharma",
//       memberId: "KD001",
//       userType: "kisani-didi",
//     },
//   ];

//   const getCurrentData = (): Task[] => {
//     const data = activeTab === "assigned" ? assignedTasks : draftTasks;
//     if (!searchTerm) return data;
//     return data.filter((task) =>
//       task.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const getFilteredUsers = (): User[] => {
//     let filtered = userOptions;
//     let baseType = formData.userType.startsWith("individual-")
//       ? formData.userType.replace("individual-", "")
//       : formData.userType;
//     if (baseType) {
//       filtered = filtered.filter((user) => user.userType === baseType);
//     }
//     if (userSearchTerm) {
//       filtered = filtered.filter(
//         (user) =>
//           user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
//           user.memberId.toLowerCase().includes(userSearchTerm.toLowerCase())
//       );
//     }
//     return filtered;
//   };

//   const getUserTypeDisplayName = (userType: string): string => {
//     const displayNames: { [key: string]: string } = {
//       "farm-manager": "Farm Manager",
//       "individual-farm-manager": "Individual Farm Manager",
//       "kisani-didi": "Kisani Didi",
//       "individual-kisani-didi": "Individual Kisani Didi",
//       operator: "Operator",
//       "individual-operator": "Individual Operator",
//     };
//     return displayNames[userType] || userType;
//   };

//   const getSelectedUsersDisplay = (): string => {
//     if (!formData.userType) return "";
//     const isIndividual = formData.userType.startsWith("individual-");
//     const baseType = isIndividual ? formData.userType.replace("individual-", "") : formData.userType;
//     const totalCount = userOptions.filter((user) => user.userType === baseType).length;
//     const selectedCount = formData.selectedUsers.length;

//     if (isIndividual) {
//       return showUserDropdown
//         ? userSearchTerm
//         : selectedCount === 0
//         ? ""
//         : `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount})`;
//     }
//     return selectedCount === totalCount && totalCount > 0
//       ? `All ${getUserTypeDisplayName(formData.userType)} Selected (${totalCount})`
//       : selectedCount > 0
//       ? `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount})`
//       : `Select ${getUserTypeDisplayName(formData.userType)}`;
//   };

//   const formatLocation = (str: string): string => {
//     if (!str) return "";
//     return str
//       .replace(/-/g, " ")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };

//   const handleTabChange = (tab: "draft" | "assigned" | "create") => {
//     setActiveTab(tab);
//     setShowCreateForm(tab === "create");
//     setSearchTerm("");
//     setEditingTask(null);
//     setActionMenuOpen(null);
//     if (tab === "create") {
//       setFormData({
//         userType: "",
//         state: "",
//         district: "",
//         mandal: "",
//         selectedUsers: [],
//         taskTitle: "",
//         taskDescription: "",
//         dueDate: "",
//       });
//       setUserSearchTerm("");
//     }
//   };

//   const handleCreateTask = () => {
//     setActiveTab("create");
//     setShowCreateForm(true);
//     setEditingTask(null);
//     setActionMenuOpen(null);
//     setFormData({
//       userType: "",
//       state: "",
//       district: "",
//       mandal: "",
//       selectedUsers: [],
//       taskTitle: "",
//       taskDescription: "",
//       dueDate: "",
//     });
//     setUserSearchTerm("");
//   };

//   const handleEditTask = (task: DraftTask) => {
//     setEditingTask(task);
//     setShowCreateForm(true);
//     setActiveTab("create");
//     setActionMenuOpen(null);
//     setFormData({
//       userType: task.userType || "",
//       state: task.state || "",
//       district: task.district || "",
//       mandal: task.mandal || "",
//       selectedUsers: task.selectedUsers || [],
//       taskTitle: task.title || "",
//       taskDescription: task.taskDescription || "",
//       dueDate: task.dueDate || "",
//     });
//     setUserSearchTerm("");
//   };

//   const handleDeleteTask = (taskId: number) => {
//     setDraftTasks((prev) => prev.filter((task) => task.id !== taskId));
//     setActionMenuOpen(null);
//   };

//   const handleAssignFromMenu = (task: DraftTask) => {
//     if (task.selectedUsers && task.selectedUsers.length > 0) {
//       const newTasks: AssignedTask[] = task.selectedUsers.map((userId, index) => {
//         const selectedUser = userOptions.find((user) => user.id === userId);
//         return {
//           id: assignedTasks.length + 1 + index,
//           title: task.title,
//           taskDescription: task.taskDescription || "",
//           assignedTo: selectedUser ? selectedUser.name : "Unknown",
//           state: formatLocation(task.state || "state-01"),
//           district: formatLocation(task.district || "district-01"),
//           mandal: formatLocation(task.mandal || "mandal-01"),
//           assignedDate: new Date().toISOString().split("T")[0],
//           status: "Assigned",
//           dueDate: task.dueDate || "",
//         };
//       });
//       setAssignedTasks((prev) => [...prev, ...newTasks]);
//       setDraftTasks((prev) => prev.filter((t) => t.id !== task.id));
//     }
//     setActionMenuOpen(null);
//   };

//   const handleUserSelection = (userId: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedUsers: prev.selectedUsers.includes(userId)
//         ? prev.selectedUsers.filter((id) => id !== userId)
//         : [...prev.selectedUsers, userId],
//     }));
//   };

//   const handleSelectAll = () => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedUsers: getFilteredUsers().map((user) => user.id),
//     }));
//   };

//   const handleDeselectAll = () => {
//     setFormData((prev) => ({ ...prev, selectedUsers: [] }));
//   };

//   const handleUserTypeChange = (userType: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       userType,
//       selectedUsers: [],
//     }));
//     if (!userType.startsWith("individual-") && userType) {
//       const usersOfType = userOptions.filter((user) => user.userType === userType);
//       setFormData((prev) => ({
//         ...prev,
//         selectedUsers: usersOfType.map((user) => user.id),
//       }));
//     }
//   };

//   const handleSaveToDraft = () => {
//     if (!formData.taskTitle) return;

//     if (editingTask) {
//       const updatedTask: DraftTask = {
//         ...editingTask,
//         title: formData.taskTitle,
//         userType: formData.userType,
//         state: formData.state,
//         district: formData.district,
//         mandal: formData.mandal,
//         selectedUsers: formData.selectedUsers,
//         taskDescription: formData.taskDescription,
//         dueDate: formData.dueDate,
//       };
//       setDraftTasks((prev) => prev.map((task) => (task.id === editingTask.id ? updatedTask : task)));
//     } else {
//       const newTask: DraftTask = {
//         id: Date.now(),
//         title: formData.taskTitle,
//         createdDate: new Date().toISOString().split("T")[0],
//         status: "Draft",
//         userType: formData.userType,
//         state: formData.state,
//         district: formData.district,
//         mandal: formData.mandal,
//         selectedUsers: formData.selectedUsers,
//         taskDescription: formData.taskDescription,
//         dueDate: formData.dueDate,
//       };
//       setDraftTasks((prev) => [...prev, newTask]);
//     }
//     setFormData({
//       userType: "",
//       state: "",
//       district: "",
//       mandal: "",
//       selectedUsers: [],
//       taskTitle: "",
//       taskDescription: "",
//       dueDate: "",
//     });
//     setUserSearchTerm("");
//     setShowCreateForm(false);
//     setEditingTask(null);
//     setActiveTab("draft");
//   };

//   const handleAssignTask = () => {
//     if (!formData.taskTitle || formData.selectedUsers.length === 0) return;

//     const newTasks: AssignedTask[] = formData.selectedUsers.map((userId, index) => {
//       const selectedUser = userOptions.find((user) => user.id === userId);
//       return {
//         id: assignedTasks.length + 1 + index,
//         title: formData.taskTitle,
//         taskDescription: formData.taskDescription,
//         assignedTo: selectedUser ? selectedUser.name : "Unknown",
//         state: formatLocation(formData.state || "state-01"),
//         district: formatLocation(formData.district || "district-01"),
//         mandal: formatLocation(formData.mandal || "mandal-01"),
//         assignedDate: new Date().toISOString().split("T")[0],
//         status: "Assigned",
//         dueDate: formData.dueDate,
//       };
//     });
//     setAssignedTasks((prev) => [...prev, ...newTasks]);
//     if (editingTask) {
//       setDraftTasks((prev) => prev.filter((task) => task.id !== editingTask.id));
//     }
//     setFormData({
//       userType: "",
//       state: "",
//       district: "",
//       mandal: "",
//       selectedUsers: [],
//       taskTitle: "",
//       taskDescription: "",
//       dueDate: "",
//     });
//     setUserSearchTerm("");
//     setShowCreateForm(false);
//     setEditingTask(null);
//     setActiveTab("assigned");
//   };

//   const handleCancel = () => {
//     setFormData({
//       userType: "",
//       state: "",
//       district: "",
//       mandal: "",
//       selectedUsers: [],
//       taskTitle: "",
//       taskDescription: "",
//       dueDate: "",
//     });
//     setUserSearchTerm("");
//     setShowCreateForm(false);
//     setEditingTask(null);
//     setActiveTab("draft");
//   };

//   const handleOutsideClick = (e: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//       setShowUserDropdown(false);
//     }
//     if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
//       setActionMenuOpen(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, []);

//   return (
//     <div className="space-y-6" style={{ fontFamily: "Poppins" }}>
//       {/* Header */}
//       <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>

//       {/* Tabs */}
//       <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
//         {["draft", "assigned", "create"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => handleTabChange(tab as "draft" | "assigned" | "create")}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === tab
//                 ? "bg-white text-gray-900 shadow-sm"
//                 : "text-gray-600 hover:text-gray-900"
//             }`}
//             style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
//           >
//             {tab === "draft" ? "Draft Tasks" : tab === "assigned" ? "Assigned Tasks" : "Create Task"}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       {activeTab !== "create" && (
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder={`Search ${activeTab === "draft" ? "Draft" : "Assigned"} Tasks`}
//             value={searchTerm}
//             onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             style={{ fontFamily: "Poppins", fontSize: "14px" }}
//           />
//         </div>
//       )}

//       {/* Create Task Form */}
//       {activeTab === "create" && (
//         <div className="bg-white rounded-lg p-6 border border-gray-200">
//           <div className="space-y-5">
//             {/* Select User Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Select User Type</label>
//               <div className="relative">
//                 <select
//                   value={formData.userType as string}
//                   onChange={(e: ChangeEvent<HTMLSelectElement>) => handleUserTypeChange(e.target.value)}
//                   className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
//                   style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 >
//                   <option value="">Select User Type</option>
//                   {[
//                     "farm-manager",
//                     "individual-farm-manager",
//                     "kisani-didi",
//                     "individual-kisani-didi",
//                     "operator",
//                     "individual-operator",
//                   ].map((type) => (
//                     <option key={type} value={type}>
//                       {getUserTypeDisplayName(type)}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
//               </div>
//             </div>

//             {/* Location Selects */}
//             <div className="flex gap-3">
//               {[
//                 { label: "State", key: "state", options: ["state-01", "state-02", "state-03"] },
//                 { label: "District", key: "district", options: ["district-01", "district-02", "district-03"] },
//                 { label: "Mandal", key: "mandal", options: ["mandal-01", "mandal-02", "mandal-03"] },
//               ].map(({ label, key, options }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//                   <div className="relative">
//                     <select
//                       value={formData[key as keyof FormData] as string}
//                       onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//                         setFormData({ ...formData, [key]: e.target.value })
//                       }
//                       className="w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
//                       style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                     >
//                       <option value="">Select {label}</option>
//                       {options.map((option) => (
//                         <option key={option} value={option}>
//                           {formatLocation(option)}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Search Users */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
//               <div className="relative mb-1">
//                 <input
//                   type="text"
//                   placeholder="Search by name or member ID"
//                   value={getSelectedUsersDisplay() as string}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                     if (formData.userType.startsWith("individual-")) {
//                       setUserSearchTerm(e.target.value);
//                       setShowUserDropdown(true);
//                     }
//                   }}
//                   onClick={() => {
//                     if (formData.userType.startsWith("individual-")) {
//                       setShowUserDropdown(true);
//                       setUserSearchTerm("");
//                     }
//                   }}
//                   readOnly={!formData.userType.startsWith("individual-")}
//                   className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm truncate ${
//                     !formData.userType.startsWith("individual-") ? "bg-gray-50 cursor-default" : "cursor-text"
//                   }`}
//                   style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 />
//                 {formData.userType.startsWith("individual-") && (
//                   <ChevronDown
//                     size={16}
//                     className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
//                   />
//                 )}
//               </div>
//               {showUserDropdown && formData.userType.startsWith("individual-") && (
//                 <div ref={dropdownRef} className="border border-gray-200 rounded-md max-h-48 overflow-y-auto bg-white shadow-lg z-50">
//                   <div className="px-3 py-2 text-xs text-gray-500 border-b bg-gray-50 flex justify-between items-center">
//                     <button onClick={handleSelectAll} className="text-blue-600 hover:underline text-xs" type="button">
//                       Select All ({getFilteredUsers().length})
//                     </button>
//                     <button onClick={handleDeselectAll} className="text-blue-600 hover:underline text-xs" type="button">
//                       Deselect All
//                     </button>
//                   </div>
//                   {getFilteredUsers().length === 0 ? (
//                     <div className="px-3 py-2 text-sm text-gray-500">No users found</div>
//                   ) : (
//                     getFilteredUsers().map((user) => (
//                       <div key={user.id} className="flex items-center px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
//                         <input
//                           type="checkbox"
//                           className="mr-2 w-4 h-4 text-blue-600"
//                           checked={formData.selectedUsers.includes(user.id)}
//                           onChange={() => handleUserSelection(user.id)}
//                         />
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                           <p className="text-xs text-gray-500">{user.memberId}</p>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                   <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex justify-start">
//                     <button
//                       onClick={() => setShowUserDropdown(false)}
//                       className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
//                       style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                       type="button"
//                     >
//                       Done
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Task Title */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
//               <input
//                 type="text"
//                 value={formData.taskTitle}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, taskTitle: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 placeholder="Enter task title"
//                 style={{ fontFamily: "Poppins", fontSize: "13px" }}
//               />
//             </div>

//             {/* Task Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 rows={3}
//                 value={formData.taskDescription}
//                 onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, taskDescription: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
//                 placeholder="Enter task description"
//                 style={{ fontFamily: "Poppins", fontSize: "13px" }}
//               />
//             </div>

//             {/* Due Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//               <input
//                 type="date"
//                 value={formData.dueDate}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dueDate: e.target.value })}
//                 className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 style={{ fontFamily: "Poppins", fontSize: "13px" }}
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-2 pt-2">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
//                 style={{ fontFamily: "Poppins", fontSize: "13px" }}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSaveToDraft}
//                 disabled={!formData.taskTitle}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                 style={{ fontFamily: "Poppins", fontSize: "13px" }}
//               >
//                 Save to Draft
//               </button>
//               <button
//                 type="button"
//                 onClick={handleAssignTask}
//                 disabled={!formData.taskTitle || formData.selectedUsers.length === 0}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                 style={{ fontFamily: "Poppins", fontSize: "13px" }}
//               >
//                 Assign Task
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Task Table */}
//       {activeTab !== "create" && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                   Task Title
//                 </th>
//                 {activeTab === "assigned" && (
//                   <>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                       Assigned To
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                       State
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                       District
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                       Mandal
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                       Assigned Date
//                     </th>
//                   </>
//                 )}
//                 {activeTab === "draft" && (
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                     Created Date
//                   </th>
//                 )}
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                   Status
//                 </th>
//                 {activeTab === "draft" && (
//                   <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
//                     Actions
//                   </th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {getCurrentData().map((task) => (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td
//                     onClick={() => setSelectedTask(task)}
//                     className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 underline cursor-pointer"
//                     style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 500 }}
//                   >
//                     {task.title}
//                   </td>
//                   {activeTab === "assigned" && (
//                     <>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700" style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}>
//                         {"assignedTo" in task ? task.assignedTo : "-"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700" style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}>
//                         {"state" in task ? task.state : "-"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700" style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}>
//                         {"district" in task ? task.district : "-"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700" style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}>
//                         {"mandal" in task ? task.mandal : "-"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700" style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}>
//                         {"assignedDate" in task ? task.assignedDate : "-"}
//                       </td>
//                     </>
//                   )}
//                   {activeTab === "draft" && (
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700" style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}>
//                       {"createdDate" in task ? task.createdDate : "-"}
//                     </td>
//                   )}
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                         task.status === "Assigned" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
//                       }`}
//                       style={{ fontFamily: "Poppins" }}
//                     >
//                       {task.status}
//                     </span>
//                   </td>
//                   {activeTab === "draft" && (
//                     <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium relative">
//                       <button
//                         className="text-gray-400 hover:text-gray-600 p-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setActionMenuOpen(actionMenuOpen === task.id ? null : task.id);
//                         }}
//                       >
//                         <MoreHorizontal size={16} />
//                       </button>
//                       {actionMenuOpen === task.id && (
//                         <div
//                           ref={actionMenuRef}
//                           className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[1000] py-1 min-w-[150px]"
//                         >
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleEditTask(task as DraftTask);
//                             }}
//                             className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                           >
//                             <Edit2 size={14} />
//                             Edit Details
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setConfirmationType("assign");
//                               setConfirmationTask(task as DraftTask);
//                               setShowConfirmation(true);
//                               setActionMenuOpen(null);
//                             }}
//                             className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                             disabled={!(task as DraftTask).selectedUsers?.length}
//                           >
//                             <UserPlus size={14} />
//                             Assign Task
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setConfirmationType("delete");
//                               setConfirmationTask(task as DraftTask);
//                               setShowConfirmation(true);
//                               setActionMenuOpen(null);
//                             }}
//                             className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                           >
//                             <Trash2 size={14} />
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {getCurrentData().length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500" style={{ fontFamily: "Poppins" }}>
//                 No {activeTab === "draft" ? "draft" : "assigned"} tasks found
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Modal for Task Details */}
//       {selectedTask && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 border border-gray-200 relative max-w-lg w-full">
//             <button onClick={() => setSelectedTask(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//               <X size={20} />
//             </button>
//             <h2 className="text-lg font-bold text-center mb-4">Task Detail</h2>
//             <div className="space-y-4">
//               {selectedTask.status === "Draft" ? (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Select User Type</label>
//                   <input
//                     readOnly
//                     value={getUserTypeDisplayName((selectedTask as DraftTask).userType || "")}
//                     className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//               ) : (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
//                   <input
//                     readOnly
//                     value={(selectedTask as AssignedTask).assignedTo}
//                     className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//               )}
//               <div className="flex gap-3">
//                 {["state", "district", "mandal"].map((key) => (
//                   <div key={key}>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//                     <input
//                       readOnly
//                       value={formatLocation(selectedTask[key as keyof Task] as string || "")}
//                       className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                       style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
//                 <input
//                   readOnly
//                   value={selectedTask.title}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                   style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   readOnly
//                   rows={3}
//                   value={"taskDescription" in selectedTask ? selectedTask.taskDescription || "" : selectedTask.title}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none text-sm"
//                   style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//                 <input
//                   readOnly
//                   value={"dueDate" in selectedTask ? selectedTask.dueDate || "" : ""}
//                   className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                   style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                 />
//               </div>
//               {selectedTask.status === "Assigned" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Date</label>
//                   <input
//                     readOnly
//                     value={(selectedTask as AssignedTask).assignedDate || ""}
//                     className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
//                     style={{ fontFamily: "Poppins", fontSize: "13px" }}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirmation Dialog */}
//       {showConfirmation && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 w-80 relative">
//             <button onClick={() => setShowConfirmation(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//               <X size={20} />
//             </button>
//             <h2 className="text-lg font-bold text-center mb-4">{confirmationType === "delete" ? "Delete task" : "Assign task"}</h2>
//             <p className="text-center mb-6">Are you sure you want to {confirmationType === "delete" ? "delete" : "assign"} this task?</p>
//             <div className="flex justify-center gap-4">
//               <button onClick={() => setShowConfirmation(false)} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//                 No
//               </button>
//               <button
//                 onClick={() => {
//                   if (confirmationType === "delete") {
//                     handleDeleteTask(confirmationTask!.id);
//                   } else {
//                     handleAssignFromMenu(confirmationTask!);
//                   }
//                   setShowConfirmation(false);
//                   setConfirmationType(null);
//                   setConfirmationTask(null);
//                 }}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskManagement;





// //api integrated 


import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { Search, ChevronDown, MoreHorizontal, Edit2, UserPlus, Trash2, X } from "lucide-react";

// Import API services
import { taskManagementService, Task, Assignee, CreateTaskRequest, UpdateTaskRequest } from "../../services/taskmanagementsimulation";
import {  Location } from "../../services/locationService";
import { locationServiceMock as locationService } from "../../services/locationservicesimulation";

// Define interfaces for local state management
interface DraftTask extends Task {
  status: "DRAFT";
}

interface AssignedTask extends Task {
  status: "ASSIGNED";
}

type LocalTask = DraftTask | AssignedTask;

interface FormData {
  userType: string;
  stateId: string;
  districtId: string;
  mandalId: string;
  selectedUsers: string[];
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
}

const TaskManagement: React.FC = () => {
  // Basic state
  const [activeTab, setActiveTab] = useState<"draft" | "assigned" | "create">("draft");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [editingTask, setEditingTask] = useState<DraftTask | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<LocalTask | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'assign' | null>(null);
  const [confirmationTask, setConfirmationTask] = useState<DraftTask | null>(null);
  
  // API data state
  const [draftTasks, setDraftTasks] = useState<DraftTask[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [assignees, setAssignees] = useState<Assignee[] >([]);
  const [states, setStates] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [mandals, setMandals] = useState<Location[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState({
    tasks: false,
    assignees: false,
    states: false,
    districts: false,
    mandals: false
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    userType: "",
    stateId: "",
    districtId: "",
    mandalId: "",
    selectedUsers: [],
    taskTitle: "",
    taskDescription: "",
    dueDate: "",
  });

  // Mock auth token - replace with actual auth implementation
  const authToken = "your-auth-token-here";
  const locationAuthToken = "your-location-auth-token-here";

  // Load initial data
  useEffect(() => {
    loadTasks();
  }, [activeTab]);

  const loadTasks = async () => {
    setLoading(prev => ({ ...prev, tasks: true }));
    try {
      if (activeTab === "draft") {
        const result = await taskManagementService.fetchDraftTasks(authToken);
        if (result.success) {
          setDraftTasks(result.data as DraftTask[]);
        } else {
          console.error("Failed to load draft tasks:", result.message);
        }
      } else if (activeTab === "assigned") {
        const result = await taskManagementService.fetchAssignedTasks(authToken);
        if (result.success) {
          setAssignedTasks(result.data as AssignedTask[]);
        } else {
          console.error("Failed to load assigned tasks:", result.message);
        }
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(prev => ({ ...prev, tasks: false }));
    }
  };

  // Load states when user type is selected
  useEffect(() => {
    if (formData.userType) {
      loadStates();
    } else {
      setStates([]);
      setDistricts([]);
      setMandals([]);
      setFormData(prev => ({ ...prev, stateId: "", districtId: "", mandalId: "" }));
    }
  }, [formData.userType]);

  // Load districts when state is selected
  useEffect(() => {
    if (formData.stateId) {
      loadDistricts(formData.stateId);
    } else {
      setDistricts([]);
      setMandals([]);
      setFormData(prev => ({ ...prev, districtId: "", mandalId: "" }));
    }
  }, [formData.stateId]);

  // Load mandals when district is selected
  useEffect(() => {
    if (formData.districtId) {
      loadMandals(formData.districtId);
    } else {
      setMandals([]);
      setFormData(prev => ({ ...prev, mandalId: "" }));
    }
  }, [formData.districtId]);

  const loadStates = async () => {
    setLoading(prev => ({ ...prev, states: true }));
    try {
      const result = await locationService.fetchLocations(
        "state",
        undefined,
        undefined,
        1,
        100,
        "en",
        locationAuthToken
      );
      if (result.success && result.data) {
        setStates(result.data.locations);
      } else {
        console.error("Failed to load states:", result.message);
      }
    } catch (error) {
      console.error("Error loading states:", error);
    } finally {
      setLoading(prev => ({ ...prev, states: false }));
    }
  };

  const loadDistricts = async (stateId: string) => {
    setLoading(prev => ({ ...prev, districts: true }));
    try {
      const result = await locationService.fetchStateDistricts(
        stateId,
        undefined,
        1,
        100,
        "en",
        locationAuthToken
      );
      if (result.success && result.data) {
        setDistricts(result.data.locations);
      } else {
        console.error("Failed to load districts:", result.message);
      }
    } catch (error) {
      console.error("Error loading districts:", error);
    } finally {
      setLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const loadMandals = async (districtId: string) => {
    setLoading(prev => ({ ...prev, mandals: true }));
    try {
      const result = await locationService.fetchDistrictCities(
        districtId,
        1,
        100,
        "en",
        locationAuthToken
      );
      if (result.success && result.data) {
        setMandals(result.data.locations);
      } else {
        console.error("Failed to load mandals:", result.message);
      }
    } catch (error) {
      console.error("Error loading mandals:", error);
    } finally {
      setLoading(prev => ({ ...prev, mandals: false }));
    }
  };

  const searchAssignees = async () => {
    if (!formData.userType || !formData.stateId || !formData.districtId || !formData.mandalId) {
      return;
    }

    setLoading(prev => ({ ...prev, assignees: true }));
    try {
      const userTypeMap: { [key: string]: string } = {
        "farm-manager": "fm",
        "individual-farm-manager": "ifm",
        "kisani-didi": "kd",
        "individual-kisani-didi": "ikd",
        "operator": "operator",
        "individual-operator": "ioperator",
      };

      const apiUserType = userTypeMap[formData.userType];
      
      const result = await taskManagementService.searchAssignees(
        userSearchTerm,
        apiUserType,
        formData.stateId,
        formData.districtId,
        formData.mandalId,
        authToken
      );

      if (result.success && result.data) {
        setAssignees(result.data);
      } else {
        console.error("Failed to search assignees:", result.message);
      }
    } catch (error) {
      console.error("Error searching assignees:", error);
    } finally {
      setLoading(prev => ({ ...prev, assignees: false }));
    }
  };

  // Trigger assignee search when search term changes or location changes
  useEffect(() => {
    if (formData.userType && formData.stateId && formData.districtId && formData.mandalId) {
      const timeoutId = setTimeout(() => {
        searchAssignees();
      }, 300); // Debounce search
      return () => clearTimeout(timeoutId);
    }
  }, [userSearchTerm, formData.userType, formData.stateId, formData.districtId, formData.mandalId]);

  const getCurrentData = (): LocalTask[] => {
    const data = activeTab === "assigned" ? assignedTasks : draftTasks;
    if (!searchTerm) return data;
    return data.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredUsers = (): Assignee[] => {
    let filtered = assignees;
    if (userSearchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
          user.memberId.toLowerCase().includes(userSearchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const getUserTypeDisplayName = (userType: string): string => {
    const displayNames: { [key: string]: string } = {
      "farm-manager": "Farm Manager",
      "individual-farm-manager": "Individual Farm Manager",
      "kisani-didi": "Kisani Didi",
      "individual-kisani-didi": "Individual Kisani Didi",
      "operator": "Operator",
      "individual-operator": "Individual Operator",
    };
    return displayNames[userType] || userType;
  };

  const getSelectedUsersDisplay = (): string => {
    if (!formData.userType) {
      return "";
    }

    const isIndividual = formData.userType.startsWith("individual-");
    const selectedCount = formData.selectedUsers.length;
    const totalCount = assignees.length;

    if (isIndividual) {
      if (showUserDropdown) {
        return userSearchTerm;
      } else {
        if (selectedCount === 0) {
          return "";
        } else {
          return `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount})`;
        }
      }
    } else {
      if (selectedCount === totalCount && totalCount > 0) {
        return `All ${getUserTypeDisplayName(formData.userType)} Selected (${totalCount})`;
      } else if (selectedCount > 0) {
        return `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount})`;
      } else {
        return `Select ${getUserTypeDisplayName(formData.userType)}`;
      }
    }
  };

  const getLocationName = (locations: Location[], id: string): string => {
    const location = locations.find(loc => loc.id === id);
    return location ? location.name : '';
  };

  const handleTabChange = (tab: "draft" | "assigned" | "create") => {
    setActiveTab(tab);
    setShowCreateForm(false);
    setSearchTerm("");
    setEditingTask(null);
    setActionMenuOpen(null);
  };

  const handleCreateTask = () => {
    setShowCreateForm(true);
    setActiveTab("create");
    setEditingTask(null);
    setActionMenuOpen(null);
    setFormData({
      userType: "",
      stateId: "",
      districtId: "",
      mandalId: "",
      selectedUsers: [],
      taskTitle: "",
      taskDescription: "",
      dueDate: "",
    });
    setUserSearchTerm("");
    setAssignees([]);
  };

  const handleEditTask = (task: DraftTask) => {
    setEditingTask(task);
    setShowCreateForm(true);
    setActiveTab("create");
    setActionMenuOpen(null);
    
    // Map task data to form data
    const userTypeMap: { [key: string]: string } = {
      "fm": "farm-manager",
      "ifm": "individual-farm-manager",
      "kd": "kisani-didi",
      "ikd": "individual-kisani-didi",
      "operator": "operator",
      "ioperator": "individual-operator",
    };

    setFormData({
      userType: userTypeMap[task.assigneeUserType] || "",
      stateId: task.stateId || "",
      districtId: task.districtId || "",
      mandalId: task.mandalId || "",
      selectedUsers: [task.assigneeId],
      taskTitle: task.title || "",
      taskDescription: task.description || "",
      dueDate: task.dueDate || "",
    });
    setUserSearchTerm("");
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const result = await taskManagementService.deleteTask(taskId, authToken);
      if (result.success) {
        setDraftTasks(prev => prev.filter(task => task.id !== taskId));
      } else {
        console.error("Failed to delete task:", result.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setActionMenuOpen(null);
  };

  const handleAssignFromMenu = async (task: DraftTask) => {
    try {
      const result = await taskManagementService.assignTask(task.id, authToken);
      if (result.success) {
        const assignedTask = { ...result.data, status: "ASSIGNED" as const };
        setAssignedTasks(prev => [...prev, assignedTask as AssignedTask]);
        setDraftTasks(prev => prev.filter(t => t.id !== task.id));
      } else {
        console.error("Failed to assign task:", result.message);
      }
    } catch (error) {
      console.error("Error assigning task:", error);
    }
    setActionMenuOpen(null);
  };

  const handleUserSelection = (userId: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedUsers.includes(userId);
      return {
        ...prev,
        selectedUsers: isSelected
          ? prev.selectedUsers.filter(id => id !== userId)
          : [...prev.selectedUsers, userId],
      };
    });
  };

  const handleSelectAll = () => {
    const filteredUsers = getFilteredUsers();
    const allUserIds = filteredUsers.map(user => user.id);
    setFormData(prev => ({
      ...prev,
      selectedUsers: allUserIds,
    }));
  };

  const handleDeselectAll = () => {
    setFormData(prev => ({
      ...prev,
      selectedUsers: [],
    }));
  };

  const handleUserTypeChange = (userType: string) => {
    setFormData(prev => ({
      ...prev,
      userType,
      selectedUsers: [],
    }));
    setAssignees([]);
    
    if (!userType.startsWith("individual-") && userType && assignees.length > 0) {
      setFormData(prev => ({
        ...prev,
        selectedUsers: assignees.map(user => user.id),
      }));
    }
  };

  const handleSaveToDraft = async () => {
    if (!formData.taskTitle) return;

    const userTypeMap: { [key: string]: string } = {
      "farm-manager": "fm",
      "individual-farm-manager": "ifm",
      "kisani-didi": "kd",
      "individual-kisani-didi": "ikd",
      "operator": "operator",
      "individual-operator": "ioperator",
    };

    const taskData: CreateTaskRequest = {
      title: formData.taskTitle,
      description: formData.taskDescription,
      status: "DRAFT",
      userType: userTypeMap[formData.userType] as any,
      assigneeIds: formData.selectedUsers,
      stateId: formData.stateId,
      districtId: formData.districtId,
      mandalId: formData.mandalId,
      dueDate: formData.dueDate || undefined,
    };

    try {
      if (editingTask) {
        const updateData: UpdateTaskRequest = {
          title: formData.taskTitle,
          description: formData.taskDescription,
          stateId: formData.stateId,
          districtId: formData.districtId,
          mandalId: formData.mandalId,
          dueDate: formData.dueDate || undefined,
        };
        
        const result = await taskManagementService.updateTask(editingTask.id, updateData, authToken);
        if (result.success) {
          setDraftTasks(prev => prev.map(task => 
            task.id === editingTask.id ? { ...result.data, status: "DRAFT" as const } as DraftTask : task
          ));
        } else {
          console.error("Failed to update task:", result.message);
          return;
        }
      } else {
        const result = await taskManagementService.createTask(taskData, authToken);
        if (result.success && result.data) {
          const newTasks = result.data.map(task => ({ ...task, status: "DRAFT" as const })) as DraftTask[];
          setDraftTasks(prev => [...prev, ...newTasks]);
        } else {
          console.error("Failed to create task:", result.message);
          return;
        }
      }

      // Reset form and navigate to draft tab
      resetForm();
      setActiveTab("draft");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleAssignTask = async () => {
    if (!formData.taskTitle || formData.selectedUsers.length === 0) return;

    const userTypeMap: { [key: string]: string } = {
      "farm-manager": "fm",
      "individual-farm-manager": "ifm",
      "kisani-didi": "kd",
      "individual-kisani-didi": "ikd",
      "operator": "operator",
      "individual-operator": "ioperator",
    };

    const taskData: CreateTaskRequest = {
      title: formData.taskTitle,
      description: formData.taskDescription,
      status: "ASSIGNED",
      userType: userTypeMap[formData.userType] as any,
      assigneeIds: formData.selectedUsers,
      stateId: formData.stateId,
      districtId: formData.districtId,
      mandalId: formData.mandalId,
      dueDate: formData.dueDate || undefined,
    };

    try {
      const result = await taskManagementService.createTask(taskData, authToken);
      if (result.success && result.data) {
        
        const newTasks = result.data.map(task => ({ ...task, status: "ASSIGNED" as const })) as AssignedTask[];
        setAssignedTasks(prev => [...prev, ...newTasks]);
        
        if (editingTask) {
          setDraftTasks(prev => prev.filter(task => task.id !== editingTask.id));
        }
      } else {
        console.error("Failed to assign task:", result.message);
        return;
      }

      // Reset form and navigate to assigned tab
      resetForm();
      setActiveTab("assigned");
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      userType: "",
      stateId: "",
      districtId: "",
      mandalId: "",
      selectedUsers: [],
      taskTitle: "",
      taskDescription: "",
      dueDate: "",
    });
    setUserSearchTerm("");
    setShowCreateForm(false);
    setEditingTask(null);
    setAssignees([]);
  };

  const handleCancel = () => {
    resetForm();
    setActiveTab("draft");
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowUserDropdown(false);
    }
    if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
      setActionMenuOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick as EventListener);
    return () => document.removeEventListener("mousedown", handleOutsideClick as EventListener);
  }, []);

  // Check if search should be enabled
  const isSearchEnabled = formData.userType && formData.stateId && formData.districtId && formData.mandalId;

  return (
    <div className="space-y-6" style={{ fontFamily: "Poppins" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
            Task Management
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => handleTabChange("draft")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "draft" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
        >
          Draft Tasks
        </button>
        <button
          onClick={() => handleTabChange("assigned")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "assigned" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
        >
          Assigned Tasks
        </button>
        <button
          onClick={handleCreateTask}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${showCreateForm ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
        >
          Create Task
        </button>
      </div>

      {/* Search - Only show for Draft and Assigned Tasks */}
      {!showCreateForm && (activeTab === "draft" || activeTab === "assigned") && (
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab === "draft" ? "Draft" : "Assigned"} Tasks`}
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: "Poppins", fontSize: "14px" }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      {showCreateForm ? (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="space-y-5">
            {/* Select User Type */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "Poppins" }}
              >
                Select User Type
              </label>
              <div className="relative">
                <select
                  value={formData.userType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleUserTypeChange(e.target.value)
                  }
                  className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                >
                  <option value="">Select User Type</option>
                  <option value="farm-manager">All Farm Manager</option>
                  <option value="individual-farm-manager">Individual Farm Manager</option>
                  <option value="kisani-didi">All Kisani Didi</option>
                  <option value="individual-kisani-didi">Individual Kisani Didi</option>
                  <option value="operator">All Operator</option>
                  <option value="individual-operator">Individual Operator</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  style={{ fontFamily: "Poppins" }}
                >
                  State
                </label>
                <div className="relative">
                  <select
                    value={formData.stateId}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setFormData({ ...formData, stateId: e.target.value, districtId: "", mandalId: "" })
                    }
                    disabled={!formData.userType || loading.states}
                    className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${!formData.userType || loading.states ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  >
                    <option value="">
                      {loading.states ? "Loading..." : "Select State"}
                    </option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  style={{ fontFamily: "Poppins" }}
                >
                  District
                </label>
                <div className="relative">
                  <select
                    value={formData.districtId}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setFormData({ ...formData, districtId: e.target.value, mandalId: "" })
                    }
                    disabled={!formData.stateId || loading.districts}
                    className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${!formData.stateId || loading.districts ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  >
                    <option value="">
                      {loading.districts ? "Loading..." : "Select District"}
                    </option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  style={{ fontFamily: "Poppins" }}
                >
                  Mandal
                </label>
                <div className="relative">
                  <select
                    value={formData.mandalId}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setFormData({ ...formData, mandalId: e.target.value })
                    }
                    disabled={!formData.districtId || loading.mandals}
                    className={`w-[136px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm ${!formData.districtId || loading.mandals ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  >
                    <option value="">
                      {loading.mandals ? "Loading..." : "Select Mandal"}
                    </option>
                    {mandals.map((mandal) => (
                      <option key={mandal.id} value={mandal.id}>
                        {mandal.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Search Users */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "Poppins" }}
              >
                Search
              </label>
              <div className="relative mb-1">
                <input
                  type="text"
                  placeholder={isSearchEnabled ? "Search by name or member ID" : "Please select user type, state, district, and mandal first"}
                  value={getSelectedUsersDisplay()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (formData.userType.startsWith("individual-") && isSearchEnabled) {
                      setUserSearchTerm(e.target.value);
                      setShowUserDropdown(true);
                    }
                  }}
                  onClick={() => {
                    if (formData.userType.startsWith("individual-") && isSearchEnabled) {
                      setShowUserDropdown(true);
                      setUserSearchTerm("");
                    }
                  }}
                  disabled={!isSearchEnabled || !formData.userType.startsWith("individual-")}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm truncate ${
                    !isSearchEnabled || !formData.userType.startsWith("individual-")
                      ? "bg-gray-50 cursor-not-allowed opacity-50"
                      : "cursor-text"
                  }`}
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
                {formData.userType.startsWith("individual-") && isSearchEnabled && (
                  <ChevronDown
                    size={16}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform ${
                      showUserDropdown ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {!isSearchEnabled && (
                <p className="text-xs text-gray-500 mt-1">
                  Please select user type, state, district, and mandal to enable search
                </p>
              )}

              {showUserDropdown && formData.userType.startsWith("individual-") && isSearchEnabled && (
                <div
                  ref={dropdownRef}
                  className="border border-gray-200 rounded-md max-h-48 overflow-y-auto bg-white shadow-lg z-50"
                >
                  <div className="px-3 py-2 text-xs text-gray-500 border-b bg-gray-50 flex justify-between items-center">
                    <button
                      onClick={handleSelectAll}
                      className="text-blue-600 hover:underline text-xs"
                      type="button"
                      disabled={loading.assignees}
                    >
                      Select All ({getFilteredUsers().length})
                    </button>
                    <button
                      onClick={handleDeselectAll}
                      className="text-blue-600 hover:underline text-xs"
                      type="button"
                    >
                      Deselect All
                    </button>
                  </div>
                  {loading.assignees ? (
                    <div className="px-3 py-2 text-sm text-gray-500">Loading assignees...</div>
                  ) : getFilteredUsers().length === 0 ? (
                    <div className="px-3 py-2 text-sm text-gray-500">No users found</div>
                  ) : (
                    getFilteredUsers().map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 w-4 h-4 text-blue-600"
                          checked={formData.selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.memberId}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {/* Done Button */}
                  <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex justify-start">
                    <button
                      onClick={() => setShowUserDropdown(false)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
                      style={{ fontFamily: "Poppins", fontSize: "13px" }}
                      type="button"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Task Title */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "Poppins" }}
              >
                Task Title
              </label>
              <input
                type="text"
                value={formData.taskTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, taskTitle: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Enter task title"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>

            {/* Task Description */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "Poppins" }}
              >
                Description
              </label>
              <textarea
                rows={3}
                value={formData.taskDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, taskDescription: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                placeholder="Enter task description"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>

            {/* Due Date */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "Poppins" }}
              >
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveToDraft}
                disabled={!formData.taskTitle}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              >
                Save to Draft
              </button>
              <button
                type="button"
                onClick={handleAssignTask}
                disabled={!formData.taskTitle || formData.selectedUsers.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading.tasks ? (
            <div className="text-center py-12">
              <p className="text-gray-500" style={{ fontFamily: "Poppins" }}>
                Loading tasks...
              </p>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                    >
                      Task Title
                    </th>
                    {activeTab === "assigned" && (
                      <>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                        >
                          Assigned To
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                        >
                          State
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                        >
                          District
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                        >
                          Mandal
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                        >
                          Assigned Date
                        </th>
                      </>
                    )}
                    {activeTab === "draft" && (
                      <th
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                      >
                        Created Date
                      </th>
                    )}
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                    >
                      Status
                    </th>
                    {activeTab === "draft" && (
                      <th
                        className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}
                      >
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentData().map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td
                        onClick={() => setSelectedTask(task)}
                        className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 underline cursor-pointer"
                        style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 500 }}
                      >
                        {task.title}
                      </td>
                      {activeTab === "assigned" && (
                        <>
                          <td
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                            style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                          >
                            {task.assigneeName || "-"}
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                            style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                          >
                            {getLocationName(states, task.stateId) || "-"}
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                            style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                          >
                            {getLocationName(districts, task.districtId) || "-"}
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                            style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                          >
                            {getLocationName(mandals, task.mandalId) || "-"}
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                            style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                          >
                            {task.assignedAt ? new Date(task.assignedAt).toLocaleDateString() : "-"}
                          </td>
                        </>
                      )}
                      {activeTab === "draft" && (
                        <td
                          className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                          style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400 }}
                        >
                          {new Date(task.createdAt).toLocaleDateString()}
                        </td>
                      )}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            task.status === "ASSIGNED" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                          }`}
                          style={{ fontFamily: "Poppins" }}
                        >
                          {task.status === "ASSIGNED" ? "Assigned" : "Draft"}
                        </span>
                      </td>
                      {activeTab === "draft" && (
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium relative">
                          <button
                            className="text-gray-400 hover:text-gray-600 text-lg p-1 z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionMenuOpen(actionMenuOpen === task.id ? null : task.id);
                            }}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {actionMenuOpen === task.id && (
                            <div
                              ref={actionMenuRef}
                              className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[1000] py-1 min-w-[150px]"
                              style={{ position: "absolute" }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditTask(task as DraftTask);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit2 size={14} />
                                Edit Details
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmationType('assign');
                                  setConfirmationTask(task as DraftTask);
                                  setShowConfirmation(true);
                                  setActionMenuOpen(null);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                disabled={!task.assigneeId}
                              >
                                <UserPlus size={14} />
                                Assign Task
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmationType('delete');
                                  setConfirmationTask(task as DraftTask);
                                  setShowConfirmation(true);
                                  setActionMenuOpen(null);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {getCurrentData().length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500" style={{ fontFamily: "Poppins" }}>
                    No {activeTab === "draft" ? "draft" : "assigned"} tasks found
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Modal for Task Details */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 border border-gray-200 relative max-w-lg w-full">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-center mb-4" style={{ fontFamily: "Poppins" }}>
              Task Detail
            </h2>
            <div className="space-y-4">
              {selectedTask.status === "DRAFT" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                    User Type
                  </label>
                  <input
                    readOnly
                    value={getUserTypeDisplayName(selectedTask.assigneeUserType || "")}
                    className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                    Assigned To
                  </label>
                  <input
                    readOnly
                    value={selectedTask.assigneeName || "Unknown"}
                    className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
              )}
              <div className="flex gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                    State
                  </label>
                  <input
                    readOnly
                    value={getLocationName(states, selectedTask.stateId) || ""}
                    className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                    District
                  </label>
                  <input
                    readOnly
                    value={getLocationName(districts, selectedTask.districtId) || ""}
                    className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                    Mandal
                  </label>
                  <input
                    readOnly
                    value={getLocationName(mandals, selectedTask.mandalId) || ""}
                    className="w-[136px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  Task Title
                </label>
                <input
                  readOnly
                  value={selectedTask.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  Description
                </label>
                <textarea
                  readOnly
                  rows={3}
                  value={selectedTask.description || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                  Due Date
                </label>
                <input
                  readOnly
                  value={selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : ""}
                  className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>
              {selectedTask.status === "ASSIGNED" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "Poppins" }}>
                    Assigned Date
                  </label>
                  <input
                    readOnly
                    value={selectedTask.assignedAt ? new Date(selectedTask.assignedAt).toLocaleDateString() : ""}
                    className="w-[280px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-2 right-2 text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-center mb-4">
              {confirmationType === 'delete' ? 'Delete Task' : 'Assign Task'}
            </h2>
            <p className="text-center mb-6">
              Are you sure you want to {confirmationType === 'delete' ? 'delete' : 'assign'} this Task?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-2 border border-blue-500 text-black rounded-md"
              >
                No
              </button>
              <button
                onClick={() => {
                  if (confirmationType === 'delete') {
                    handleDeleteTask(confirmationTask!.id);
                  } else {
                    handleAssignFromMenu(confirmationTask!);
                  }
                  setShowConfirmation(false);
                  setConfirmationType(null);
                  setConfirmationTask(null);
                }}
                className="px-6 py-2 bg-black text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;