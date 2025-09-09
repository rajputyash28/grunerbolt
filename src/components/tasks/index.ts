// Main component
export { default as TaskManagement } from './TaskManagementRefactored';

// Sub-components
export { default as TaskManagementHeader } from './TaskManagementHeader';
export { default as TaskTabs } from './TaskTabs';
export { default as TaskSearch } from './TaskSearch';
export { default as ErrorMessage } from './ErrorMessage';
export { default as TaskForm } from './TaskForm';
export { default as EditTaskForm } from './EditTaskForm';
export { default as TaskTable } from './TaskTable';
export { default as TaskDetailsModal } from './TaskDetailsModal';
export { default as ConfirmationDialog } from './ConfirmationDialog';

// Types
export * from './types';

// Hooks
export { useTaskManagement } from './hooks/useTaskManagement';
export { useLocationManagement } from './hooks/useLocationManagement';
