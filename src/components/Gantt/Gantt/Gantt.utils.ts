import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  format,
  isWeekend,
  isSameDay,
  parseISO,
  isValid,
} from 'date-fns';
import { GanttViewType, GanttMilestone, GanttTask } from './Gantt.props';
import { CELL_WIDTHS } from './Gantt.style';

// Parse ISO string to Date safely
export const parseDate = (dateISO: string): Date => {
  const parsed = parseISO(dateISO);
  return isValid(parsed) ? parsed : new Date();
};

// Format date to ISO string (YYYY-MM-DD)
export const toISODate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Get today's date as ISO string
export const getToday = (): string => {
  return toISODate(new Date());
};

// Calculate the visible date range based on milestones
export const calculateDateRange = (
  milestones: GanttMilestone[],
  startDate?: string,
  endDate?: string
): { start: string; end: string } => {
  if (startDate && endDate) {
    return { start: startDate, end: endDate };
  }

  let minDate = new Date();
  let maxDate = new Date();
  let hasAnyDate = false;

  milestones.forEach((milestone) => {
    if (milestone.startDate) {
      const date = parseDate(milestone.startDate);
      if (!hasAnyDate || date < minDate) minDate = date;
      hasAnyDate = true;
    }
    if (milestone.endDate) {
      const date = parseDate(milestone.endDate);
      if (!hasAnyDate || date > maxDate) maxDate = date;
      hasAnyDate = true;
    }

    milestone.tasks.forEach((task) => {
      if (task.startDate) {
        const date = parseDate(task.startDate);
        if (!hasAnyDate || date < minDate) minDate = date;
        hasAnyDate = true;
      }
      if (task.endDate) {
        const date = parseDate(task.endDate);
        if (!hasAnyDate || date > maxDate) maxDate = date;
        hasAnyDate = true;
      }
    });
  });

  if (!hasAnyDate) {
    // Default to current month if no dates
    minDate = startOfMonth(new Date());
    maxDate = endOfMonth(new Date());
  }

  // Add padding
  minDate = addDays(startOfWeek(minDate), -7);
  maxDate = addDays(endOfWeek(maxDate), 7);

  return {
    start: startDate || toISODate(minDate),
    end: endDate || toISODate(maxDate),
  };
};

// Generate array of dates for the timeline
export const generateTimelineDates = (
  startDate: string,
  endDate: string,
  view: GanttViewType
): string[] => {
  const dates: string[] = [];
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  let current = start;

  if (view === 'day') {
    current = startOfDay(start);
    while (current <= end) {
      dates.push(toISODate(current));
      current = addDays(current, 1);
    }
  } else if (view === 'week') {
    current = startOfWeek(start);
    while (current <= end) {
      dates.push(toISODate(current));
      current = addWeeks(current, 1);
    }
  } else if (view === 'month') {
    current = startOfMonth(start);
    while (current <= end) {
      dates.push(toISODate(current));
      current = addMonths(current, 1);
    }
  }

  return dates;
};

// Format date for display in timeline header
export const formatDateHeader = (dateISO: string, view: GanttViewType): string => {
  const date = parseDate(dateISO);

  if (view === 'day') {
    return format(date, 'd');
  } else if (view === 'week') {
    const weekEnd = addDays(date, 6);
    return `${format(date, 'MMM d')} - ${format(weekEnd, 'd')}`;
  } else {
    return format(date, 'MMM yyyy');
  }
};

// Format month/year header for day view
export const formatMonthHeader = (dateISO: string): string => {
  return format(parseDate(dateISO), 'MMMM yyyy');
};

// Get day of week label
export const getDayLabel = (dateISO: string): string => {
  return format(parseDate(dateISO), 'EEE');
};

// Check if date is weekend
export const isWeekendDate = (dateISO: string): boolean => {
  return isWeekend(parseDate(dateISO));
};

// Check if date is today
export const isToday = (dateISO: string, today: string): boolean => {
  return isSameDay(parseDate(dateISO), parseDate(today));
};

// Calculate task bar position and width
export const calculateTaskPosition = (
  taskStart: string,
  taskEnd: string,
  timelineStart: string,
  view: GanttViewType
): { left: number; width: number } | null => {
  const start = parseDate(taskStart);
  const end = parseDate(taskEnd);
  const rangeStart = parseDate(timelineStart);
  const cellWidth = CELL_WIDTHS[view];

  let leftOffset: number;
  let widthUnits: number;

  if (view === 'day') {
    leftOffset = differenceInDays(start, rangeStart);
    widthUnits = differenceInDays(end, start) + 1;
  } else if (view === 'week') {
    const weekStart = startOfWeek(rangeStart);
    leftOffset = differenceInDays(start, weekStart) / 7;
    widthUnits = (differenceInDays(end, start) + 1) / 7;
  } else {
    const monthStart = startOfMonth(rangeStart);
    leftOffset = differenceInMonths(start, monthStart);
    widthUnits = differenceInMonths(end, start) + 1;
  }

  if (leftOffset < 0 || widthUnits <= 0) {
    return null;
  }

  return {
    left: leftOffset * cellWidth,
    width: Math.max(widthUnits * cellWidth - 4, cellWidth - 4), // -4 for padding
  };
};

// Calculate today line position
export const calculateTodayPosition = (
  today: string,
  timelineStart: string,
  view: GanttViewType
): number | null => {
  const todayDate = parseDate(today);
  const rangeStart = parseDate(timelineStart);
  const cellWidth = CELL_WIDTHS[view];

  if (view === 'day') {
    const daysDiff = differenceInDays(todayDate, rangeStart);
    if (daysDiff < 0) return null;
    return daysDiff * cellWidth + cellWidth / 2;
  } else if (view === 'week') {
    const weekStart = startOfWeek(rangeStart);
    const daysDiff = differenceInDays(todayDate, weekStart);
    if (daysDiff < 0) return null;
    return (daysDiff / 7) * cellWidth + cellWidth / 2;
  } else {
    const monthStart = startOfMonth(rangeStart);
    const monthsDiff = differenceInMonths(todayDate, monthStart);
    if (monthsDiff < 0) return null;
    // Approximate position within month
    const dayOfMonth = todayDate.getDate();
    const daysInMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate();
    return (monthsDiff + dayOfMonth / daysInMonth) * cellWidth;
  }
};

// Calculate total timeline width
export const calculateTimelineWidth = (dates: string[], view: GanttViewType): number => {
  return dates.length * CELL_WIDTHS[view];
};

// Get total row count (including milestone headers)
export const getTotalRowCount = (milestones: GanttMilestone[]): number => {
  return milestones.reduce((count, milestone) => {
    return count + 1 + (milestone.collapsed ? 0 : milestone.tasks.length);
  }, 0);
};

// Flatten milestones and tasks for rendering
export interface FlatRow {
  type: 'milestone' | 'task';
  milestone: GanttMilestone;
  task?: GanttTask;
  index: number;
}

export const flattenMilestones = (milestones: GanttMilestone[]): FlatRow[] => {
  const rows: FlatRow[] = [];
  let index = 0;

  milestones.forEach((milestone) => {
    rows.push({
      type: 'milestone',
      milestone,
      index: index++,
    });

    if (!milestone.collapsed) {
      milestone.tasks.forEach((task) => {
        rows.push({
          type: 'task',
          milestone,
          task,
          index: index++,
        });
      });
    }
  });

  return rows;
};

// Group dates by month for header rendering
export const groupDatesByMonth = (dates: string[]): { month: string; dates: string[] }[] => {
  const groups: { month: string; dates: string[] }[] = [];
  let currentMonth = '';
  let currentGroup: string[] = [];

  dates.forEach((date) => {
    const month = format(parseDate(date), 'MMMM yyyy');
    if (month !== currentMonth) {
      if (currentGroup.length > 0) {
        groups.push({ month: currentMonth, dates: currentGroup });
      }
      currentMonth = month;
      currentGroup = [date];
    } else {
      currentGroup.push(date);
    }
  });

  if (currentGroup.length > 0) {
    groups.push({ month: currentMonth, dates: currentGroup });
  }

  return groups;
};

// Convert pixel position to date
export const pixelToDate = (
  pixelX: number,
  timelineStart: string,
  view: GanttViewType
): string => {
  const cellWidth = CELL_WIDTHS[view];
  const units = Math.floor(pixelX / cellWidth);
  const start = parseDate(timelineStart);

  let result: Date;
  if (view === 'day') {
    result = addDays(start, units);
  } else if (view === 'week') {
    result = addWeeks(startOfWeek(start), units);
  } else {
    result = addMonths(startOfMonth(start), units);
  }

  return toISODate(result);
};
