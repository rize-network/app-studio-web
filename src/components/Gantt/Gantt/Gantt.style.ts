import { ViewProps } from 'app-studio';

// Container styles
export const containerStyles: ViewProps = {
  width: '100%',
  height: '100%',
  border: '1px solid',
  borderColor: 'color.gray.200',
  borderRadius: 8,
  overflow: 'hidden',
  backgroundColor: 'color.white',
  display: 'flex',
  flexDirection: 'column',
};

// Header styles
export const headerStyles: ViewProps = {
  padding: 12,
  paddingLeft: 16,
  paddingRight: 16,
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'color.gray.50',
};

// Filter bar styles
export const filterBarStyles: ViewProps = {
  display: 'flex',
  gap: 4,
  backgroundColor: 'color.gray.100',
  borderRadius: 6,
  padding: 2,
};

export const filterButtonStyles: ViewProps = {
  padding: 6,
  paddingLeft: 12,
  paddingRight: 12,
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 500,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'color.gray.600',
  transition: 'all 0.2s',
};

export const filterButtonActiveStyles: ViewProps = {
  ...filterButtonStyles,
  backgroundColor: 'color.white',
  color: 'color.gray.900',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

// Main content area
export const contentStyles: ViewProps = {
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
};

// Left panel styles
export const leftPanelStyles: ViewProps = {
  borderRight: '1px solid',
  borderColor: 'color.gray.200',
  overflow: 'auto',
  flexShrink: 0,
  backgroundColor: 'color.white',
};

export const leftPanelHeaderStyles: ViewProps = {
  padding: 12,
  paddingLeft: 16,
  paddingRight: 16,
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  backgroundColor: 'color.gray.50',
  fontWeight: 600,
  fontSize: 12,
  color: 'color.gray.500',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

// Right panel (timeline) styles
export const rightPanelStyles: ViewProps = {
  flex: 1,
  overflow: 'auto',
  position: 'relative',
};

// Timeline header styles
export const timelineHeaderStyles: ViewProps = {
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: 'color.gray.50',
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
};

export const timelineHeaderRowStyles: ViewProps = {
  display: 'flex',
  borderBottom: '1px solid',
  borderColor: 'color.gray.100',
};

export const timelineDateCellStyles: ViewProps = {
  flexShrink: 0,
  padding: 8,
  textAlign: 'center',
  fontSize: 11,
  fontWeight: 500,
  color: 'color.gray.600',
  borderRight: '1px solid',
  borderColor: 'color.gray.100',
};

export const timelineDateCellWeekendStyles: ViewProps = {
  ...timelineDateCellStyles,
  backgroundColor: 'color.gray.50',
};

export const timelineDateCellTodayStyles: ViewProps = {
  ...timelineDateCellStyles,
  backgroundColor: 'color.blue.50',
  color: 'color.blue.600',
  fontWeight: 600,
};

// Timeline body
export const timelineBodyStyles: ViewProps = {
  position: 'relative',
};

// Milestone row styles
export const milestoneRowStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  paddingLeft: 12,
  paddingRight: 12,
  backgroundColor: 'color.gray.50',
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 13,
};

export const milestoneIconStyles: ViewProps = {
  marginRight: 8,
  fontSize: 14,
};

export const milestoneToggleStyles: ViewProps = {
  marginRight: 8,
  cursor: 'pointer',
  color: 'color.gray.400',
  fontSize: 12,
  transition: 'transform 0.2s',
};

// Task row styles
export const taskRowStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  paddingLeft: 16,
  paddingRight: 12,
  borderBottom: '1px solid',
  borderColor: 'color.gray.100',
  fontSize: 13,
  color: 'color.gray.700',
  cursor: 'pointer',
  transition: 'background-color 0.15s',
};

export const taskRowHoverStyles: ViewProps = {
  ...taskRowStyles,
  backgroundColor: 'color.gray.50',
};

export const taskCheckboxStyles: ViewProps = {
  marginRight: 8,
  cursor: 'pointer',
};

export const taskIconStyles: ViewProps = {
  marginRight: 8,
  fontSize: 14,
  color: 'color.gray.500',
};

export const taskIdStyles: ViewProps = {
  marginRight: 8,
  fontSize: 11,
  color: 'color.gray.400',
  fontFamily: 'monospace',
};

export const taskTitleStyles: ViewProps = {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const taskProgressStyles: ViewProps = {
  width: 40,
  height: 4,
  backgroundColor: 'color.gray.200',
  borderRadius: 2,
  marginLeft: 8,
  overflow: 'hidden',
};

export const taskProgressBarStyles: ViewProps = {
  height: '100%',
  backgroundColor: 'color.blue.500',
  borderRadius: 2,
  transition: 'width 0.3s',
};

// Timeline grid row
export const timelineRowStyles: ViewProps = {
  display: 'flex',
  position: 'relative',
  borderBottom: '1px solid',
  borderColor: 'color.gray.100',
};

export const timelineCellStyles: ViewProps = {
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'color.gray.50',
};

export const timelineCellWeekendStyles: ViewProps = {
  ...timelineCellStyles,
  backgroundColor: 'color.gray.25',
};

// Task bar styles
export const taskBarStyles: ViewProps = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  height: 24,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 8,
  paddingRight: 8,
  fontSize: 11,
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'grab',
  transition: 'box-shadow 0.2s',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
};

export const taskBarDraggingStyles: ViewProps = {
  ...taskBarStyles,
  cursor: 'grabbing',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  opacity: 0.9,
};

// Today line
export const todayLineStyles: ViewProps = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 2,
  backgroundColor: 'color.blue.500',
  zIndex: 5,
  pointerEvents: 'none',
};

export const todayLineDotStyles: ViewProps = {
  position: 'absolute',
  top: -4,
  left: -3,
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: 'color.blue.500',
};

// Empty state
export const emptyStateStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 40,
  color: 'color.gray.400',
  fontSize: 14,
};

// Task colors
export const TASK_COLORS = {
  blue: {
    background: 'color.blue.100',
    border: 'color.blue.500',
    text: 'color.blue.700',
  },
  green: {
    background: 'color.green.100',
    border: 'color.green.500',
    text: 'color.green.700',
  },
  red: {
    background: 'color.red.100',
    border: 'color.red.500',
    text: 'color.red.700',
  },
  purple: {
    background: 'color.purple.100',
    border: 'color.purple.500',
    text: 'color.purple.700',
  },
  orange: {
    background: 'color.orange.100',
    border: 'color.orange.500',
    text: 'color.orange.700',
  },
  gray: {
    background: 'color.gray.100',
    border: 'color.gray.500',
    text: 'color.gray.700',
  },
};

// Status colors
export const STATUS_COLORS = {
  todo: 'color.gray.400',
  in_progress: 'color.blue.500',
  done: 'color.green.500',
  blocked: 'color.red.500',
};

// Priority colors
export const PRIORITY_COLORS = {
  low: 'color.gray.400',
  medium: 'color.yellow.500',
  high: 'color.orange.500',
  urgent: 'color.red.500',
};

// Cell width constants
export const CELL_WIDTHS = {
  day: 40,
  week: 120,
  month: 160,
};
