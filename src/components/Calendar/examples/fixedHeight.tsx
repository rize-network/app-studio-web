import React from 'react';
import { Vertical } from 'app-studio';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../Calendar/Calendar.props';
import { Text } from '../../Text/Text';

export const FixedHeightCalendar = () => {
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
      title: 'Morning Standup',
      start: new Date(2025, 9, 15, 9, 0),
      end: new Date(2025, 9, 15, 9, 30),
      description: 'Daily standup meeting',
    },
    {
      id: 3,
      title: 'Design Review',
      start: new Date(2025, 9, 15, 14, 0),
      end: new Date(2025, 9, 15, 15, 0),
      description: 'Review new UI designs',
    },
    {
      id: 4,
      title: 'Code Review',
      start: new Date(2025, 9, 15, 16, 0),
      end: new Date(2025, 9, 15, 17, 0),
      description: 'Review pull requests',
    },
    {
      id: 5,
      title: 'Client Call',
      start: new Date(2025, 9, 15, 13, 0),
      end: new Date(2025, 9, 15, 14, 0),
      description: 'Discuss project requirements',
    },
  ];

  return (
    <Vertical gap={12}>
      <Text fontSize={16} fontWeight="600">
        Fixed Height Calendar (600px) - Scroll to see all events
      </Text>
      <Calendar events={events} height="600px" initialView="week" />
    </Vertical>
  );
};
