import React, { useEffect, useMemo, useState } from 'react';
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';

import CalendarView from './Calendar/Calendar.view';
import {
  CalendarEvent,
  CalendarProps,
  CalendarView as CalendarViewType,
} from './Calendar/Calendar.props';
import {
  CalendarEventInternal,
  chunk,
  formatDayKey,
  getEventsForDay,
  normalizeEvent,
  toDate,
} from './Calendar/Calendar.utils';

const getLabelForView = (
  date: Date,
  view: CalendarViewType,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
) => {
  if (view === 'day') {
    return format(date, 'MMMM d, yyyy');
  }

  if (view === 'week') {
    const start = startOfWeek(date, { weekStartsOn });
    const end = endOfWeek(date, { weekStartsOn });

    if (start.getMonth() === end.getMonth()) {
      return `${format(start, 'MMM d')} – ${format(end, 'd, yyyy')}`;
    }

    return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`;
  }

  return format(date, 'MMMM yyyy');
};

const normalizeEvents = (events: CalendarEvent[]): CalendarEventInternal[] =>
  events.map((event) => normalizeEvent(event));

const CalendarComponent: React.FC<CalendarProps> = ({
  events = [],
  initialDate,
  initialView = 'month',
  weekStartsOn = 0,
  height = '800px',
  renderEvent,
  onDateChange,
  onViewChange,
  onEventDrop,
  onEventResize,
  views,
}) => {
  const parsedInitialDate = useMemo(
    () => (initialDate ? toDate(initialDate) : new Date()),
    [initialDate]
  );
  const [currentDate, setCurrentDate] = useState<Date>(parsedInitialDate);
  const [view, setView] = useState<CalendarViewType>(initialView);

  // Only update currentDate if initialDate prop is explicitly provided and changes
  useEffect(() => {
    if (initialDate !== undefined) {
      setCurrentDate(parsedInitialDate);
    }
  }, [initialDate, parsedInitialDate]);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    onDateChange?.(date);
  };

  const handleViewChange = (nextView: CalendarViewType) => {
    setView(nextView);
    onViewChange?.(nextView);
  };

  const handleToday = () => handleDateChange(new Date());

  const handlePrevious = () => {
    switch (view) {
      case 'day':
        return handleDateChange(subDays(currentDate, 1));
      case 'week':
        return handleDateChange(subWeeks(currentDate, 1));
      case 'month':
      default:
        return handleDateChange(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'day':
        return handleDateChange(addDays(currentDate, 1));
      case 'week':
        return handleDateChange(addWeeks(currentDate, 1));
      case 'month':
      default:
        return handleDateChange(addMonths(currentDate, 1));
    }
  };

  const normalizedEvents = useMemo(() => normalizeEvents(events), [events]);

  const visibleDays = useMemo(() => {
    if (view === 'day') {
      return [currentDate];
    }

    if (view === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn });
      return Array.from({ length: 7 }, (_, index) => addDays(start, index));
    }

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const start = startOfWeek(monthStart, { weekStartsOn });
    const end = endOfWeek(monthEnd, { weekStartsOn });

    return eachDayOfInterval({ start, end });
  }, [currentDate, view, weekStartsOn]);

  const weeks = useMemo(() => {
    if (view === 'month') {
      return chunk(visibleDays, 7);
    }

    return [visibleDays];
  }, [visibleDays, view]);

  const eventsByDay = useMemo(() => {
    const days = weeks.flat();
    const map = new Map<string, CalendarEventInternal[]>();

    days.forEach((day) => {
      map.set(formatDayKey(day), getEventsForDay(normalizedEvents, day));
    });

    return map;
  }, [normalizedEvents, weeks]);

  const weekdayLabels = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn });
    return Array.from({ length: 7 }, (_, index) => addDays(start, index));
  }, [currentDate, weekStartsOn]);

  const label = useMemo(
    () => getLabelForView(currentDate, view, weekStartsOn),
    [currentDate, view, weekStartsOn]
  );

  return (
    <CalendarView
      currentDate={currentDate}
      view={view}
      label={label}
      weeks={weeks}
      weekdayLabels={weekdayLabels}
      eventsByDay={eventsByDay}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onToday={handleToday}
      onViewChange={handleViewChange}
      renderEvent={renderEvent}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      views={views}
      height={height}
    />
  );
};

export const Calendar = CalendarComponent;
