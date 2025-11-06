import React from 'react';
import { CalendarWeek } from '../CalendarWeek';
import { CalendarWeekEvent } from '../CalendarWeek/CalendarWeek.props';

export const CalendarWeekDefault = () => {
  const [events, setEvents] = React.useState<CalendarWeekEvent[]>([
    {
      id: '1',
      title: 'Conference',
      start: '2025-11-04',
      end: '2025-11-06',
      color: 'blue',
    },
    {
      id: '2',
      title: 'Workshop',
      start: '2025-11-05',
      end: '2025-11-05',
      color: 'green',
    },
    {
      id: '3',
      title: 'Team Offsite',
      start: '2025-11-07',
      end: '2025-11-09',
      color: 'purple',
    },
    {
      id: '4',
      title: 'Sprint Planning',
      start: '2025-11-06',
      end: '2025-11-08',
      color: 'orange',
    },
    {
      id: '5',
      title: 'Review Meeting',
      start: '2025-11-03',
      end: '2025-11-03',
      color: 'red',
    },
    {
      id: '6',
      title: 'Client Call',
      start: '2025-11-08',
      end: '2025-11-09',
      color: 'blue',
    },
  ]);

  const handleEventDrop = (event: CalendarWeekEvent) => {
    console.log('Event dropped:', event);
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  };

  const handleEventResize = (event: CalendarWeekEvent) => {
    console.log('Event resized:', event);
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  };

  const handleDateClick = (date: string) => {
    console.log('Date clicked:', date);
  };

  return (
    <CalendarWeek
      startDate="2025-11-03"
      events={events}
      today="2025-11-06"
      onEventDrop={handleEventDrop}
      onEventResize={handleEventResize}
      onDateClick={handleDateClick}
    />
  );
};
