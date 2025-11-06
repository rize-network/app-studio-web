import React from 'react';
import { CalendarMonth } from '../CalendarMonth';
import { CalendarMonthViews } from '../CalendarMonth/CalendarMonth.props';

export const CalendarMonthCustomStyles = () => {
  const customViews: CalendarMonthViews = {
    container: {
      borderRadius: 12,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    header: {
      backgroundColor: 'color.primary.50',
      padding: 20,
    },
    monthTitle: {
      fontSize: 24,
      fontWeight: 600,
      color: 'color.primary.700',
    },
    weekdayHeader: {
      backgroundColor: 'color.primary.100',
    },
    weekdayLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: 'color.primary.700',
    },
    dayCell: {
      minHeight: 120,
    },
  };

  return (
    <CalendarMonth
      initialDate="2025-11-01"
      events={[
        {
          id: '1',
          title: 'Quarterly Review',
          start: '2025-11-10',
          end: '2025-11-12',
          color: 'blue',
        },
        {
          id: '2',
          title: 'Team Building',
          start: '2025-11-18',
          end: '2025-11-19',
          color: 'purple',
        },
        {
          id: '3',
          title: 'Product Launch',
          start: '2025-11-25',
          end: '2025-11-25',
          color: 'red',
        },
      ]}
      views={customViews}
      weekStartsOn={1}
    />
  );
};
