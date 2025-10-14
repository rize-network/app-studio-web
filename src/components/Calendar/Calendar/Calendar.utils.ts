import { format, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
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
