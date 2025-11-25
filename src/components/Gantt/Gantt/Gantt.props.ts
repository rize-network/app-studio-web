export type GanttViewMode = 'day' | 'week' | 'month';

export interface GanttTask {
  id: string;
  title: string;
  icon?: 'task' | 'bug' | 'feature' | 'improvement'; // Simplified for now
  completed: boolean;
  progress?: number; // 0-100
  start: string; // ISO date
  end: string; // ISO date
  milestoneId: string;
  assignee?: string;
}

export interface GanttMilestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
}

export interface GanttProps {
  tasks: GanttTask[];
  milestones: GanttMilestone[];
  initialViewMode?: GanttViewMode;
  onTaskClick?: (taskId: string) => void;
  onTaskUpdate?: (task: GanttTask) => void;

  // Style overrides
  width?: string | number;
  height?: string | number;
  leftPanelWidth?: number;
}

export interface GanttState {
  viewMode: GanttViewMode;
  scrollLeft: number;
}
