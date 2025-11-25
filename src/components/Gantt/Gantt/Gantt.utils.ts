import { GanttViewMode } from './Gantt.props';

/**
 * Convert an ISO date string to a Date object (UTC to avoid timezone issues if needed,
 * but usually local time is preferred for UI unless specified otherwise.
 * Let's stick to local for simplicity or UTC if we follow Calendar.utils).
 * Calendar utils used UTC. Let's try to keep it simple.
 */
export const parseDate = (dateISO: string): Date => {
  return new Date(dateISO);
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Get start of the week (Monday)
 */
export const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const newDate = new Date(date);
  newDate.setDate(diff);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * Get start of the month
 */
export const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};


/**
 * Calculate total days between two dates
 */
export const differenceInDays = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};


export const COLUMN_WIDTH_DAY = 40;
export const COLUMN_WIDTH_WEEK = 30; // Per day in week view? No, week view usually shows days too but maybe compressed?
// Let's define pixel widths per day for different modes
export const PIXELS_PER_DAY = {
  day: 50,
  week: 20,
  month: 5,
};

export const getGridWidth = (days: number, viewMode: GanttViewMode) => {
  return days * PIXELS_PER_DAY[viewMode];
};

export const getDateXPosition = (
  date: Date,
  startDate: Date,
  viewMode: GanttViewMode
): number => {
  const days = differenceInDays(date, startDate);
  // Check if date is before startDate
  if (date < startDate) return -1; // Or handle appropriately

  return days * PIXELS_PER_DAY[viewMode];
};
