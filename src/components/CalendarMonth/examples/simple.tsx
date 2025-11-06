import React from 'react';
import { CalendarMonth } from '../CalendarMonth';

export const CalendarMonthSimple = () => {
  return (
    <CalendarMonth
      initialDate="2025-11-01"
      events={[
        {
          id: '1',
          title: 'Meeting',
          start: '2025-11-15',
          end: '2025-11-15',
          color: 'blue',
        },
        {
          id: '2',
          title: 'Vacation',
          start: '2025-11-20',
          end: '2025-11-25',
          color: 'green',
        },
        {
          id: '3',
          title: 'Conference',
          start: '2025-11-10',
          end: '2025-11-12',
          color: 'purple',
        },
        {
          id: '4',
          title: 'Deadline',
          start: '2025-11-18',
          end: '2025-11-18',
          color: 'red',
        },
        {
          id: '5',
          title: 'Review',
          start: '2025-11-08',
          end: '2025-11-08',
          color: 'orange',
        },
      ]}
    />
  );
};
