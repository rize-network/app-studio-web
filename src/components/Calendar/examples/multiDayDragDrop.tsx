import React, { useState } from 'react';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../Calendar/Calendar.props';

export const CalendarMultiDayDragDrop = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Conference',
      start: new Date(2025, 10, 4, 9, 0),
      end: new Date(2025, 10, 6, 17, 0),
      description: 'Annual tech conference - 3 day event',
    },
    {
      id: 2,
      title: 'Team Workshop',
      start: new Date(2025, 10, 8, 10, 0),
      end: new Date(2025, 10, 9, 16, 0),
      description: 'Two-day intensive workshop',
    },
    {
      id: 3,
      title: 'Client Visit',
      start: new Date(2025, 10, 5, 14, 0),
      end: new Date(2025, 10, 5, 16, 0),
      description: 'Quarterly business review',
    },
    {
      id: 4,
      title: 'Sprint',
      start: new Date(2025, 10, 11, 9, 0),
      end: new Date(2025, 10, 17, 17, 0),
      description: 'Two-week development sprint',
    },
    {
      id: 5,
      title: 'Team Meeting',
      start: new Date(2025, 10, 7, 10, 0),
      end: new Date(2025, 10, 7, 11, 0),
      description: 'Weekly team sync',
    },
    {
      id: 6,
      title: 'Training Session',
      start: new Date(2025, 10, 12, 13, 0),
      end: new Date(2025, 10, 14, 15, 0),
      description: 'New technology training',
    },
  ]);

  const handleEventDrop = (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) => {
    console.log('Event dropped:', event.title, 'New dates:', newStart, newEnd);

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
      )
    );
  };

  const handleEventResize = (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) => {
    console.log('Event resized:', event.title, 'New dates:', newStart, newEnd);

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
      )
    );
  };

  const handleEventCreate = (start: Date, end: Date) => {
    console.log('Creating new event:', start, end);

    const newEvent: CalendarEvent = {
      id: events.length + 1,
      title: 'New Event',
      start,
      end,
      description: 'Double-click to create an event',
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <Calendar
      events={events}
      onEventDrop={handleEventDrop}
      onEventResize={handleEventResize}
      onEventCreate={handleEventCreate}
      initialView="week"
    />
  );
};
