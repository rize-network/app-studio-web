import { ViewProps } from 'app-studio';

// View types for the timeline
export type GanttViewType = 'day' | 'week' | 'month';

// Task status
export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'blocked';

// Task priority
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// Task color
export type TaskColor = 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'gray';

// Individual task in the Gantt chart
export interface GanttTask {
  id: string;
  title: string;
  icon?: string | React.ReactNode;
  status?: TaskStatus;
  priority?: TaskPriority;
  progress?: number; // 0-100
  startDate?: string; // ISO format (YYYY-MM-DD)
  endDate?: string; // ISO format (YYYY-MM-DD)
  color?: TaskColor;
  assignee?: string;
  checked?: boolean;
}

// Milestone/Version grouping
export interface GanttMilestone {
  id: string;
  title: string;
  icon?: string | React.ReactNode;
  startDate?: string;
  endDate?: string;
  color?: TaskColor;
  tasks: GanttTask[];
  collapsed?: boolean;
}

// Style customization
export interface GanttViews {
  container?: ViewProps;
  leftPanel?: ViewProps;
  rightPanel?: ViewProps;
  header?: ViewProps;
  milestoneRow?: ViewProps;
  taskRow?: ViewProps;
  taskBar?: ViewProps;
  todayLine?: ViewProps;
  timelineHeader?: ViewProps;
  filterBar?: ViewProps;
}

// Main component props
export interface GanttProps {
  // Data
  milestones: GanttMilestone[];

  // Date range
  startDate?: string; // ISO format - start of visible range
  endDate?: string; // ISO format - end of visible range
  today?: string; // ISO format - today's date for the indicator

  // View settings
  initialView?: GanttViewType;

  // Callbacks
  onTaskClick?: (task: GanttTask, milestone: GanttMilestone) => void;
  onTaskDoubleClick?: (task: GanttTask, milestone: GanttMilestone) => void;
  onTaskCheck?: (task: GanttTask, checked: boolean, milestone: GanttMilestone) => void;
  onMilestoneClick?: (milestone: GanttMilestone) => void;
  onMilestoneToggle?: (milestone: GanttMilestone, collapsed: boolean) => void;
  onViewChange?: (view: GanttViewType) => void;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  onTaskDrag?: (task: GanttTask, newStartDate: string, newEndDate: string, milestone: GanttMilestone) => void;

  // Sizing
  width?: number | string;
  height?: number | string;
  leftPanelWidth?: number;
  rowHeight?: number;

  // Style customization
  views?: GanttViews;

  // Features
  showProgress?: boolean;
  showCheckboxes?: boolean;
  showTodayLine?: boolean;
  allowCollapse?: boolean;
}
