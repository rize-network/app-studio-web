import React from 'react';
import { CalendarWeek } from '../CalendarWeek';

export const CalendarWeekSimple = () => {
  return (
    <CalendarWeek
      startDate="2025-11-03"
      events={[
        {
          id: '1',
          title: 'Meeting',
          start: '2025-11-05',
          end: '2025-11-05',
          color: 'blue',
        },
        {
          id: '2',
          title: 'Conference',
          start: '2025-11-06',
          end: '2025-11-07',
          color: 'green',
        },
      ]}
    />
  );
};
