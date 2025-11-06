import { CalendarWeekEvent } from './CalendarWeek.props';

export interface PositionedEvent extends CalendarWeekEvent {
  /** Starting day index (0-6) within the week */
  startDay: number;
  /** Ending day index (0-6) within the week */
  endDay: number;
  /** Number of days the event spans */
  duration: number;
  /** Row index for vertical positioning (to avoid overlaps) */
  row: number;
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
 * Layout events with proper positioning to avoid overlaps
 * Returns positioned events and the total number of rows needed
 */
export const layoutEvents = (
  events: CalendarWeekEvent[],
  weekStart: string
): { items: PositionedEvent[]; rowCount: number } => {
  // Convert events to positioned items with day indices
  const items: PositionedEvent[] = events
    .map((ev) => {
      const startIdx = daysBetweenUTC(ev.start, weekStart);
      const endIdx = daysBetweenUTC(ev.end, weekStart);

      // Clamp to week boundaries
      const clampedStart = Math.max(0, Math.min(6, startIdx));
      const clampedEnd = Math.max(0, Math.min(6, endIdx));

      // Skip if completely outside week
      if (endIdx < 0 || startIdx > 6) return null;

      const duration = clampedEnd - clampedStart + 1;

      return {
        ...ev,
        startDay: clampedStart,
        endDay: clampedEnd,
        duration: duration,
        row: 0, // Will be assigned below
      };
    })
    .filter((item): item is PositionedEvent => item !== null);

  // Sort by start day, then by duration (longer first)
  items.sort((a, b) => {
    if (a.startDay !== b.startDay) return a.startDay - b.startDay;
    return b.duration - a.duration;
  });

  // Assign rows using greedy algorithm to prevent overlaps
  const rows: PositionedEvent[][] = [];
  items.forEach((item) => {
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
  });

  return { items, rowCount: rows.length };
};

/**
 * Day names array (Sunday to Saturday)
 */
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Get the date ISO string for a specific day in the week
 */
export const getDateForDay = (weekStart: string, dayIndex: number): string => {
  return addDateDays(weekStart, dayIndex);
};

/**
 * Get the day index (0-6) from a clientX position within a week grid element
 */
export const getDayFromX = (x: number, weekGridRect: DOMRect): number => {
  const relativeX = x - weekGridRect.left;
  const dayWidth = weekGridRect.width / 7;
  return Math.max(0, Math.min(6, Math.floor(relativeX / dayWidth)));
};
