import React, { useState } from 'react';
import { Vertical } from 'app-studio';
import { Calendar } from '../Calendar';
import { CalendarEvent, CalendarView } from '../Calendar/Calendar.props';

const sampleEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Morning Standup',
    start: new Date(2025, 9, 14, 9, 0),
    end: new Date(2025, 9, 14, 9, 30),
  },
  {
    id: 2,
    title: 'Design Review',
    start: new Date(2025, 9, 14, 14, 0),
    end: new Date(2025, 9, 14, 15, 0),
  },
];

export const DayViewCalendar = () => {
  return <Calendar events={sampleEvents} initialView="day" />;
};

export const WeekViewCalendar = () => {
  return <Calendar events={sampleEvents} initialView="week" />;
};

export const MonthViewCalendar = () => {
  return <Calendar events={sampleEvents} initialView="month" />;
};

export const CalendarViewSwitcher = () => {
  const [view, setView] = useState<CalendarView>('month');

  return (
    <Vertical gap={16}>
      <Calendar
        events={sampleEvents}
        initialView={view}
        onViewChange={setView}
      />
    </Vertical>
  );
};

