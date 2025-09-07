// Main component
export { default as AttendanceManagement } from './AttendanceManagement';

// Sub-components
export { default as AttendanceHeader } from './AttendanceHeader';
export { default as AttendanceTabs } from './AttendanceTabs';
export { default as AttendanceFilters } from './AttendanceFilters';
export { default as AttendanceTable } from './AttendanceTable';
export { default as AttendanceSummary } from './AttendanceSummary';

// Hooks
export { useAttendanceData } from './hooks/useAttendanceData';

// Types
export type {
  AttendanceRecord,
  AttendanceTab,
  AttendanceSummary,
  AttendanceFilters,
  AttendanceState
} from './types';
