import React from 'react';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../Calendar/Calendar.props';

export const CustomStyledCalendar = () => {
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Important Meeting',
      start: new Date(2025, 9, 15, 10, 0),
      end: new Date(2025, 9, 15, 11, 0),
    },
  ];

  return (
    <Calendar
      events={events}
      views={{
        container: {
          backgroundColor: 'color.primary.50',
          borderColor: 'color.primary.300',
        },
        headerTitle: {
          color: 'color.primary.700',
          fontSize: 24,
        },
        navigationButton: {
          variant: 'outline',
        },
        viewButton: {
          variant: 'filled',
        },
        dayColumn: {
          backgroundColor: 'color.white',
          borderColor: 'color.primary.200',
        },
        event: {
          backgroundColor: 'color.primary.100',
          borderColor: 'color.primary.400',
        },
        eventTitle: {
          color: 'color.primary.900',
        },
      }}
    />
  );
};
