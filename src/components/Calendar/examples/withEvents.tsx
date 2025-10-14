import React from 'react';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../Calendar/Calendar.props';

export const CalendarWithEvents = () => {
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2025, 9, 15, 10, 0),
      end: new Date(2025, 9, 15, 11, 0),
      description: 'Weekly team sync-up',
    },
    {
      id: 2,
      title: 'Project Deadline',
      start: new Date(2025, 9, 18, 17, 0),
      description: 'Submit final deliverables',
    },
    {
      id: 3,
      title: 'Client Presentation',
      start: new Date(2025, 9, 20, 14, 0),
      end: new Date(2025, 9, 20, 15, 30),
      description: 'Present Q4 roadmap',
    },
    {
      id: 4,
      title: 'Code Review',
      start: new Date(2025, 9, 16, 15, 0),
      end: new Date(2025, 9, 16, 16, 0),
    },
    {
      id: 5,
      title: 'Lunch with Team',
      start: new Date(2025, 9, 17, 12, 0),
      end: new Date(2025, 9, 17, 13, 0),
      description: 'Team building lunch',
    },
    {
      id: 6,
      title: 'Morning Standup',
      start: new Date(2025, 9, 15, 9, 0),
      end: new Date(2025, 9, 15, 9, 30),
      description: 'Daily standup meeting',
    },
    {
      id: 7,
      title: 'Design Review',
      start: new Date(2025, 9, 15, 14, 0),
      end: new Date(2025, 9, 15, 15, 0),
      description: 'Review new UI designs',
    },
    {
      id: 8,
      title: 'Sprint Planning',
      start: new Date(2025, 9, 16, 10, 0),
      end: new Date(2025, 9, 16, 12, 0),
      description: 'Plan next sprint tasks',
    },
    {
      id: 9,
      title: 'One-on-One',
      start: new Date(2025, 9, 16, 13, 0),
      end: new Date(2025, 9, 16, 13, 30),
      description: 'Manager check-in',
    },
    {
      id: 10,
      title: 'Workshop',
      start: new Date(2025, 9, 17, 14, 0),
      end: new Date(2025, 9, 17, 17, 0),
      description: 'React best practices workshop',
    },
    {
      id: 11,
      title: 'Coffee Chat',
      start: new Date(2025, 9, 18, 10, 30),
      end: new Date(2025, 9, 18, 11, 0),
      description: 'Casual team chat',
    },
    {
      id: 12,
      title: 'Bug Triage',
      start: new Date(2025, 9, 18, 15, 0),
      end: new Date(2025, 9, 18, 16, 0),
      description: 'Review and prioritize bugs',
    },
    {
      id: 13,
      title: 'Demo Day',
      start: new Date(2025, 9, 19, 14, 0),
      end: new Date(2025, 9, 19, 16, 0),
      description: 'Showcase completed features',
    },
    {
      id: 14,
      title: 'Retrospective',
      start: new Date(2025, 9, 19, 16, 30),
      end: new Date(2025, 9, 19, 17, 30),
      description: 'Sprint retrospective',
    },
  ];

  return <Calendar events={events} />;
};
