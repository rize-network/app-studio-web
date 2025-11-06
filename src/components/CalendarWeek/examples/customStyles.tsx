import React from 'react';
import { CalendarWeek } from '../CalendarWeek';
import { CalendarWeekViews } from '../CalendarWeek/CalendarWeek.props';

export const CalendarWeekCustomStyles = () => {
  const customViews: CalendarWeekViews = {
    container: {
      borderRadius: 12,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    dayHeader: {
      backgroundColor: 'color.primary.50',
      minHeight: 70,
    },
    dayName: {
      fontSize: 12,
      fontWeight: 600,
      color: 'color.primary.700',
    },
    dayDate: {
      width: 40,
      height: 40,
      fontSize: 14,
    },
  };

  return (
    <CalendarWeek
      startDate="2025-11-03"
      events={[
        {
          id: '1',
          title: 'Team Standup',
          start: '2025-11-04',
          end: '2025-11-04',
          color: 'blue',
        },
        {
          id: '2',
          title: 'Design Review',
          start: '2025-11-05',
          end: '2025-11-06',
          color: 'purple',
        },
        {
          id: '3',
          title: 'Client Presentation',
          start: '2025-11-07',
          end: '2025-11-07',
          color: 'green',
        },
      ]}
      views={customViews}
    />
  );
};
