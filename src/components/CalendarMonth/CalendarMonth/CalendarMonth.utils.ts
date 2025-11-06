import { CalendarMonthEvent } from './CalendarMonth.props';

export interface PositionedEvent extends CalendarMonthEvent {
  /** Starting day index (0-41, representing 6 weeks * 7 days) */
  startDay: number;
  /** Ending day index (0-41) */
  endDay: number;
  /** Number of days the event spans */
  duration: number;
  /** Row index for vertical positioning (to avoid overlaps) */
  row: number;
  /** Week index (0-5) */
  weekIndex: number;
  /** Day of week (0-6) */
  dayOfWeek: number;
}

/**
 * Convert an ISO date string to a UTC Date object
 */
export const dateUTC = (iso: string): Date => {
  return new Date(iso + (iso.includes('T') ? '' : 'T00:00:00Z'));
};

/**
 * Calculate the number of days between two ISO date strings
 */
export const daysBetweenUTC = (a: string, b: string): number => {
  return Math.floor((dateUTC(a).getTime() - dateUTC(b).getTime()) / 86400000);
};

/**
 * Add a number of days to an ISO date string
 */
export const addDateDays = (dateISO: string, days: number): string => {
  const d = new Date(dateISO + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

/**
 * Get the day of the week (0-6) from an ISO date string
 */
export const getDayOfWeek = (dateISO: string): number => {
  return dateUTC(dateISO).getUTCDay();
};

/**
 * Get the date number (1-31) from an ISO date string
 */
export const getDateNumber = (dateISO: string): number => {
  return dateUTC(dateISO).getUTCDate();
};

/**
 * Get the month (0-11) from an ISO date string
 */
export const getMonth = (dateISO: string): number => {
  return dateUTC(dateISO).getUTCMonth();
};

/**
 * Get the year from an ISO date string
 */
export const getYear = (dateISO: string): number => {
  return dateUTC(dateISO).getUTCFullYear();
};

/**
 * Get the first day of the month for a given date
 */
export const getFirstDayOfMonth = (dateISO: string): string => {
  const d = dateUTC(dateISO);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
    .toISOString()
    .slice(0, 10);
};

/**
 * Get the last day of the month for a given date
 */
export const getLastDayOfMonth = (dateISO: string): string => {
  const d = dateUTC(dateISO);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0))
    .toISOString()
    .slice(0, 10);
};

/**
 * Get the start date of the calendar grid (may be in previous month)
 */
export const getCalendarStartDate = (
  monthDateISO: string,
  weekStartsOn: number = 0
): string => {
  const firstDay = getFirstDayOfMonth(monthDateISO);
  const firstDayOfWeek = getDayOfWeek(firstDay);
  const daysToSubtract = (firstDayOfWeek - weekStartsOn + 7) % 7;
  return addDateDays(firstDay, -daysToSubtract);
};

/**
 * Generate array of dates for the calendar grid (42 days = 6 weeks)
 */
export const getCalendarDates = (
  monthDateISO: string,
  weekStartsOn: number = 0
): string[] => {
  const startDate = getCalendarStartDate(monthDateISO, weekStartsOn);
  const dates: string[] = [];
  for (let i = 0; i < 42; i++) {
    dates.push(addDateDays(startDate, i));
  }
  return dates;
};

/**
 * Get month name from date
 */
export const getMonthName = (dateISO: string): string => {
  return dateUTC(dateISO).toLocaleDateString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });
};

/**
 * Get the previous month date
 */
export const getPreviousMonth = (dateISO: string): string => {
  const d = dateUTC(dateISO);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1))
    .toISOString()
    .slice(0, 10);
};

/**
 * Get the next month date
 */
export const getNextMonth = (dateISO: string): string => {
  const d = dateUTC(dateISO);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))
    .toISOString()
    .slice(0, 10);
};

/**
 * Day names array (Sunday to Saturday)
 */
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Get day names starting from specified day
 */
export const getDayNames = (weekStartsOn: number = 0): string[] => {
  const names = [...DAY_NAMES];
  return [...names.slice(weekStartsOn), ...names.slice(0, weekStartsOn)];
};

/**
 * Layout events with proper positioning to avoid overlaps
 * Returns positioned events for each week
 */
export const layoutEvents = (
  events: CalendarMonthEvent[],
  calendarDates: string[]
): { items: PositionedEvent[]; rowCountByWeek: number[] } => {
  const calendarStart = calendarDates[0];

  // Convert events to positioned items with day indices
  const items: PositionedEvent[] = events
    .map((ev) => {
      const startIdx = daysBetweenUTC(ev.start, calendarStart);
      const endIdx = daysBetweenUTC(ev.end, calendarStart);

      // Clamp to calendar boundaries (0-41 for 6 weeks)
      const clampedStart = Math.max(0, Math.min(41, startIdx));
      const clampedEnd = Math.max(0, Math.min(41, endIdx));

      // Skip if completely outside calendar
      if (endIdx < 0 || startIdx > 41) return null;

      const duration = clampedEnd - clampedStart + 1;
      const weekIndex = Math.floor(clampedStart / 7);
      const dayOfWeek = clampedStart % 7;

      return {
        ...ev,
        startDay: clampedStart,
        endDay: clampedEnd,
        duration: duration,
        row: 0, // Will be assigned below
        weekIndex,
        dayOfWeek,
      };
    })
    .filter((item): item is PositionedEvent => item !== null);

  // Sort by start day, then by duration (longer first)
  items.sort((a, b) => {
    if (a.startDay !== b.startDay) return a.startDay - b.startDay;
    return b.duration - a.duration;
  });

  // Assign rows per week using greedy algorithm to prevent overlaps
  const rowsByWeek: PositionedEvent[][][] = Array.from({ length: 6 }, () => []);
  const rowCountByWeek: number[] = Array.from({ length: 6 }, () => 0);

  items.forEach((item) => {
    const weekIdx = item.weekIndex;
    const rows = rowsByWeek[weekIdx];

    let placed = false;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const hasConflict = row.some(
        (existing) =>
          !(item.startDay > existing.endDay || item.endDay < existing.startDay)
      );
      if (!hasConflict) {
        row.push(item);
        item.row = i;
        placed = true;
        break;
      }
    }
    if (!placed) {
      item.row = rows.length;
      rows.push([item]);
    }

    rowCountByWeek[weekIdx] = rows.length;
  });

  return { items, rowCountByWeek };
};

/**
 * Check if a date is in the current month
 */
export const isInMonth = (dateISO: string, monthDateISO: string): boolean => {
  return (
    getMonth(dateISO) === getMonth(monthDateISO) &&
    getYear(dateISO) === getYear(monthDateISO)
  );
};
