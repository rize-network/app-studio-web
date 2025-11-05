import {
  format,
  isWithinInterval,
  startOfDay,
  endOfDay,
  differenceInDays,
  isSameDay,
} from 'date-fns';
import { CalendarEvent } from './Calendar.props';

export interface CalendarEventInternal extends CalendarEvent {
  startDate: Date;
  endDate: Date;
}

export const toDate = (value: Date | string): Date => {
  if (value instanceof Date) {
    return value;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date value provided to Calendar: ${value}`);
  }

  return parsed;
};

export const normalizeEvent = (event: CalendarEvent): CalendarEventInternal => {
  const startDate = toDate(event.start);
  const rawEndDate = event.end ? toDate(event.end) : startDate;
  const [earlier, later] =
    rawEndDate.getTime() >= startDate.getTime()
      ? [startDate, rawEndDate]
      : [rawEndDate, startDate];

  return {
    ...event,
    startDate: earlier,
    endDate: later,
  };
};

export const formatDayKey = (date: Date): string => format(date, 'yyyy-MM-dd');

export const getEventsForDay = (
  events: CalendarEventInternal[],
  day: Date
): CalendarEventInternal[] => {
  const dayInterval = { start: startOfDay(day), end: endOfDay(day) };

  return events
    .filter((event) => {
      const { startDate, endDate } = event;

      if (isWithinInterval(startDate, dayInterval)) {
        return true;
      }

      if (isWithinInterval(endDate, dayInterval)) {
        return true;
      }

      return startDate <= dayInterval.start && endDate >= dayInterval.end;
    })
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export const chunk = <T>(items: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }

  return result;
};

/**
 * Checks if an event spans multiple days
 */
export const isMultiDayEvent = (event: CalendarEventInternal): boolean => {
  const startDay = startOfDay(event.startDate);
  const endDay = startOfDay(event.endDate);
  return differenceInDays(endDay, startDay) > 0;
};

/**
 * Gets the span information for an event on a specific day
 */
export interface EventSpanInfo {
  isFirst: boolean; // Is this the first day of the event?
  isLast: boolean; // Is this the last day of the event?
  totalDays: number; // Total number of days the event spans
  dayIndex: number; // Which day index is this (0-based)
}

export const getEventSpanInfo = (
  event: CalendarEventInternal,
  day: Date
): EventSpanInfo | null => {
  const eventStartDay = startOfDay(event.startDate);
  const eventEndDay = startOfDay(event.endDate);
  const currentDay = startOfDay(day);

  if (currentDay < eventStartDay || currentDay > eventEndDay) {
    return null;
  }

  const totalDays = differenceInDays(eventEndDay, eventStartDay) + 1;
  const dayIndex = differenceInDays(currentDay, eventStartDay);

  return {
    isFirst: isSameDay(currentDay, eventStartDay),
    isLast: isSameDay(currentDay, eventEndDay),
    totalDays,
    dayIndex,
  };
};

/**
 * Calculate the visual span for multi-day events in week/month view
 * Returns the number of cells the event should span starting from the given day
 */
export const calculateEventSpan = (
  event: CalendarEventInternal,
  day: Date,
  visibleDays: Date[]
): number => {
  const spanInfo = getEventSpanInfo(event, day);
  if (!spanInfo || !spanInfo.isFirst) {
    return 0; // Only render on the first day
  }

  const eventEndDay = startOfDay(event.endDate);
  const dayIndex = visibleDays.findIndex((d) => isSameDay(d, day));

  if (dayIndex === -1) {
    return 1;
  }

  let span = 1;
  for (let i = dayIndex + 1; i < visibleDays.length; i++) {
    const nextDay = startOfDay(visibleDays[i]);
    if (nextDay <= eventEndDay) {
      span++;
    } else {
      break;
    }
  }

  return span;
};
