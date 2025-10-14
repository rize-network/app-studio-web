import React from 'react';
import { Vertical, Horizontal } from 'app-studio';
import { Calendar } from '../Calendar';
import {
  CalendarEvent,
  CalendarRenderEventContext,
} from '../Calendar/Calendar.props';
import { Text } from '../../Text/Text';

export const CustomRenderCalendar = () => {
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: 'High Priority Meeting',
      start: new Date(2025, 9, 15, 10, 0),
      end: new Date(2025, 9, 15, 11, 0),
      metadata: { priority: 'high', type: 'meeting' },
    },
    {
      id: 2,
      title: 'Low Priority Task',
      start: new Date(2025, 9, 16, 14, 0),
      metadata: { priority: 'low', type: 'task' },
    },
    {
      id: 3,
      title: 'Medium Priority Review',
      start: new Date(2025, 9, 17, 15, 0),
      end: new Date(2025, 9, 17, 16, 0),
      metadata: { priority: 'medium', type: 'review' },
    },
  ];

  const renderEvent = (
    event: CalendarEvent,
    context: CalendarRenderEventContext
  ) => {
    const priority = event.metadata?.priority as string;
    const type = event.metadata?.type as string;

    const priorityColors = {
      high: 'color.error.500',
      medium: 'color.warning.500',
      low: 'color.success.500',
    };

    const backgroundColor = {
      high: 'color.error.50',
      medium: 'color.warning.50',
      low: 'color.success.50',
    };

    const borderColor = {
      high: 'color.error.200',
      medium: 'color.warning.200',
      low: 'color.success.200',
    };

    return (
      <Vertical
        gap={8}
        padding={12}
        borderRadius={12}
        backgroundColor={
          backgroundColor[priority as keyof typeof backgroundColor] ||
          'color.gray.100'
        }
        borderWidth={1}
        borderStyle="solid"
        borderColor={
          borderColor[priority as keyof typeof borderColor] || 'color.gray.200'
        }
      >
        <Horizontal justifyContent="space-between" alignItems="center">
          <Text fontWeight="600" fontSize={14}>
            {event.title}
          </Text>
          <Text
            fontSize={10}
            fontWeight="600"
            color={
              priorityColors[priority as keyof typeof priorityColors] ||
              'color.gray.600'
            }
            textTransform="uppercase"
          >
            {priority}
          </Text>
        </Horizontal>
        <Text fontSize={12} color="color.gray.600">
          {type}
        </Text>
      </Vertical>
    );
  };

  return <Calendar events={events} renderEvent={renderEvent} />;
};
