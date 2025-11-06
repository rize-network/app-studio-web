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
      ]}
    />
  );
};
