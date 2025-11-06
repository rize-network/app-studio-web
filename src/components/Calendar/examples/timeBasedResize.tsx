import React, { useState } from 'react';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../Calendar/Calendar.props';

export const CalendarTimeBasedResize = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Morning Stand-up',
      start: new Date(2025, 10, 6, 9, 0), // 9:00 AM
      end: new Date(2025, 10, 6, 9, 30), // 9:30 AM
      description: 'Daily team sync',
    },
    {
      id: 2,
      title: 'Design Review',
      start: new Date(2025, 10, 6, 10, 0), // 10:00 AM
      end: new Date(2025, 10, 6, 11, 30), // 11:30 AM
      description: 'Review new calendar design',
    },
    {
      id: 3,
      title: 'Lunch Break',
      start: new Date(2025, 10, 6, 12, 0), // 12:00 PM
      end: new Date(2025, 10, 6, 13, 0), // 1:00 PM
      description: 'Team lunch',
    },
    {
      id: 4,
      title: 'Development Time',
      start: new Date(2025, 10, 6, 14, 0), // 2:00 PM
      end: new Date(2025, 10, 6, 16, 0), // 4:00 PM
      description: 'Focus time for implementation',
    },
    {
      id: 5,
      title: 'Code Review',
      start: new Date(2025, 10, 6, 16, 15), // 4:15 PM
      end: new Date(2025, 10, 6, 17, 0), // 5:00 PM
      description: 'Review PRs',
    },
    // Week view events
    {
      id: 6,
      title: 'Weekly Planning',
      start: new Date(2025, 10, 7, 9, 0), // Thursday 9:00 AM
      end: new Date(2025, 10, 7, 10, 0), // Thursday 10:00 AM
      description: 'Sprint planning',
    },
    {
      id: 7,
      title: 'Client Meeting',
      start: new Date(2025, 10, 7, 14, 0), // Thursday 2:00 PM
      end: new Date(2025, 10, 7, 15, 30), // Thursday 3:30 PM
      description: 'Quarterly review',
    },
    {
      id: 8,
      title: 'Team Retrospective',
      start: new Date(2025, 10, 8, 16, 0), // Friday 4:00 PM
      end: new Date(2025, 10, 8, 17, 0), // Friday 5:00 PM
      description: 'End of week retrospective',
    },
  ]);

  const handleEventResize = (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) => {
    console.log('Event resized:', {
      title: event.title,
      oldStart: event.start,
      oldEnd: event.end,
      newStart,
      newEnd,
    });

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
      )
    );
  };

  const handleEventDrop = (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) => {
    console.log('Event dropped:', {
      title: event.title,
      newStart,
      newEnd,
    });

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Time-Based Calendar with Resize Feature</h1>
      <p>
        This example demonstrates the new time-based calendar with vertical
        resize functionality:
      </p>
      <ul>
        <li>✅ Time grid with hourly slots (60px per hour)</li>
        <li>✅ Vertical resize handles (top/bottom) for adjusting event times</li>
        <li>✅ Snap to 15-minute intervals</li>
        <li>✅ Real-time tooltip showing time range during resize</li>
        <li>✅ Collision detection with visual feedback</li>
        <li>✅ Blue color scheme with gradient backgrounds</li>
        <li>✅ Minimum 15 minutes, maximum 24 hours duration</li>
      </ul>
      <p>
        <strong>Try it:</strong> Hover over the top or bottom edge of an event
        and drag to resize it!
      </p>

      <Calendar
        events={events}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        initialView="day"
        initialDate={new Date(2025, 10, 6)}
        height="800px"
      />
    </div>
  );
};
