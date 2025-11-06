import React from 'react';
import { CalendarMonth } from '../CalendarMonth';
import { CalendarMonthEvent } from '../CalendarMonth/CalendarMonth.props';

export const CalendarMonthDefault = () => {
  const [events, setEvents] = React.useState<CalendarMonthEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: '2025-11-04',
      end: '2025-11-04',
      color: 'blue',
    },
    {
      id: '2',
      title: 'Conference',
      start: '2025-11-06',
      end: '2025-11-08',
      color: 'purple',
    },
    {
      id: '3',
      title: 'Workshop',
      start: '2025-11-12',
      end: '2025-11-12',
      color: 'green',
    },
    {
      id: '4',
      title: 'Sprint Planning',
      start: '2025-11-14',
      end: '2025-11-15',
      color: 'orange',
    },
    {
      id: '5',
      title: 'Client Presentation',
      start: '2025-11-18',
      end: '2025-11-18',
      color: 'red',
    },
    {
      id: '6',
      title: 'Team Offsite',
      start: '2025-11-20',
      end: '2025-11-22',
      color: 'purple',
    },
    {
      id: '7',
      title: 'Product Review',
      start: '2025-11-25',
      end: '2025-11-25',
      color: 'blue',
    },
    {
      id: '8',
      title: 'Design Sprint',
      start: '2025-11-27',
      end: '2025-11-29',
      color: 'green',
    },
  ]);

  const handleEventDrop = (event: CalendarMonthEvent) => {
    console.log('Event dropped:', event);
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? event : e))
    );
  };

  const handleDateClick = (date: string) => {
    console.log('Date clicked:', date);
  };

  const handleMonthChange = (date: Date) => {
    console.log('Month changed:', date);
  };

  return (
    <CalendarMonth
      initialDate="2025-11-01"
      events={events}
      onEventDrop={handleEventDrop}
      onDateClick={handleDateClick}
      onMonthChange={handleMonthChange}
    />
  );
};
