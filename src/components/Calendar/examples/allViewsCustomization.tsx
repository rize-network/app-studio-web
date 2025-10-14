import React from 'react';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../Calendar/Calendar.props';

export const AllViewsCustomization = () => {
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
      title: 'Project Review',
      start: new Date(2025, 9, 16, 14, 0),
      end: new Date(2025, 9, 16, 15, 0),
      description: 'Review project progress',
    },
  ];

  return (
    <Calendar
      events={events}
      views={{
        // Container
        container: {
          backgroundColor: 'color.gray.50',
          borderColor: 'color.primary.300',
          borderWidth: 2,
          padding: 32,
        },
        // Header
        header: {
          gap: 20,
        },
        headerTitle: {
          color: 'color.primary.700',
          fontSize: 24,
        },
        navigation: {
          gap: 12,
        },
        navigationButton: {
          variant: 'outline',
          size: 'md',
        },
        viewSwitcher: {
          gap: 12,
        },
        viewButton: {
          size: 'md',
        },
        // Weekday row
        weekdayRow: {
          padding: '12px 0',
          backgroundColor: 'color.primary.50',
          borderRadius: 8,
        },
        weekdayHeader: {
          padding: 12,
        },
        weekdayLabel: {
          fontSize: 16,
          fontWeight: '700',
          color: 'color.primary.700',
        },
        // Grid
        grid: {
          gap: 16,
        },
        weekRow: {
          gap: 16,
        },
        // Day cells
        dayColumn: {
          padding: 20,
          borderRadius: 16,
          backgroundColor: 'color.white',
          borderColor: 'color.primary.200',
          borderWidth: 2,
          gap: 16,
        },
        dayHeader: {
          padding: 8,
          backgroundColor: 'color.primary.50',
          borderRadius: 8,
        },
        dayNumber: {
          fontSize: 20,
          fontWeight: '700',
          color: 'color.primary.700',
        },
        dayMeta: {
          fontSize: 14,
          color: 'color.primary.600',
        },
        // Events
        events: {
          gap: 12,
        },
        event: {
          padding: 16,
          borderRadius: 12,
          backgroundColor: 'color.primary.100',
          borderColor: 'color.primary.400',
          borderWidth: 2,
        },
        eventTitle: {
          fontSize: 16,
          fontWeight: '700',
          color: 'color.primary.900',
        },
        eventTime: {
          fontSize: 14,
          color: 'color.primary.700',
        },
        emptyState: {
          fontSize: 14,
          color: 'color.gray.500',
        },
      }}
    />
  );
};
