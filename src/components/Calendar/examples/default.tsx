import React from 'react';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../Calendar/Calendar.props';

export const CalendarDefault = () => {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
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
    {
      id: '9',
      title: 'Standup',
      start: '2025-11-05',
      end: '2025-11-05',
      color: 'blue',
    },
    {
      id: '10',
      title: 'Code Review',
      start: '2025-11-07',
      end: '2025-11-07',
      color: 'orange',
    },
    {
      id: '11',
      title: 'Deployment',
      start: '2025-11-11',
      end: '2025-11-13',
      color: 'red',
    },
    {
      id: '12',
      title: 'Training Session',
      start: '2025-11-19',
      end: '2025-11-19',
      color: 'green',
    },
  ]);

  const handleEventDrop = (event: CalendarEvent) => {
    console.log('Event dropped:', event);
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  };

  const handleEventResize = (event: CalendarEvent) => {
    console.log('Event resized:', event);
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  };

  const handleDateClick = (date: string) => {
    console.log('Date clicked:', date);
  };

  const handleDateChange = (date: Date) => {
    console.log('Date changed:', date);
  };

  const handleViewChange = (view: 'month' | 'week' | 'day') => {
    console.log('View changed:', view);
  };

  const handleEventAdd = (start: string, end: string) => {
    // Create a new event when user double-clicks
    const newEvent: CalendarEvent = {
      id: `new-${Date.now()}`,
      title: 'New Event',
      start,
      end,
      color: 'blue',
    };
    console.log('Adding new event:', newEvent);
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <Calendar
      initialDate="2025-11-01"
      initialView="month"
      events={events}
      onEventDrop={handleEventDrop}
      onEventResize={handleEventResize}
      onDateClick={handleDateClick}
      onDateChange={handleDateChange}
      onViewChange={handleViewChange}
      onEventAdd={handleEventAdd}
    />
  );
};
