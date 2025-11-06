import React, { isValidElement, useState, useRef } from 'react';
import { Horizontal, Vertical, View } from 'app-studio';
import {
  format,
  isSameDay,
  isSameMonth,
  addDays,
  differenceInDays,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  differenceInMinutes,
  addMinutes,
} from 'date-fns';

import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { HoverCard } from '../../HoverCard/HoverCard';
import {
  CalendarEvent,
  CalendarRenderEventContext,
  CalendarView,
  CalendarViews,
} from './Calendar.props';
import {
  CalendarEventInternal,
  formatDayKey,
  getEventSpanInfo,
  isMultiDayEvent,
} from './Calendar.utils';

interface CalendarViewProps {
  currentDate: Date;
  view: CalendarView;
  label: string;
  weeks: Date[][];
  weekdayLabels: Date[];
  eventsByDay: Map<string, CalendarEventInternal[]>;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
  renderEvent?: (
    event: CalendarEvent,
    context: CalendarRenderEventContext
  ) => React.ReactNode;
  onEventDrop?: (event: CalendarEvent, newStart: Date, newEnd: Date) => void;
  onEventResize?: (event: CalendarEvent, newStart: Date, newEnd: Date) => void;
  onEventCreate?: (start: Date, end: Date) => void;
  views?: CalendarViews;
  height?: string | number;
}

const VIEW_OPTIONS: { label: string; value: CalendarView }[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

const today = new Date();

// Blue color scheme from specifications
const COLORS = {
  primaryBlue: '#2196F3',
  darkBlue: '#1976D2',
  lightBlue: '#E3F2FD',
  mediumBlue: '#64B5F6',
  accentBlue: '#1565C0',
  textDark: '#0D47A1',
  textMedium: '#1976D2',
  shadowBlue: 'rgba(33, 150, 243, 0.2)',
};

// Time grid constants
const HOUR_HEIGHT = 60; // pixels per hour
const HOURS_IN_DAY = 24;
const MINUTES_PER_SLOT = 15; // snap to 15-minute intervals
const MIN_EVENT_DURATION = 15; // minimum 15 minutes
const MAX_EVENT_DURATION = 24 * 60; // maximum 24 hours

// Helper functions for time-based positioning
const getMinutesFromMidnight = (date: Date): number => {
  return getHours(date) * 60 + getMinutes(date);
};

const snapToInterval = (minutes: number, interval: number = MINUTES_PER_SLOT): number => {
  return Math.round(minutes / interval) * interval;
};

const getPositionFromTime = (date: Date): number => {
  const minutes = getMinutesFromMidnight(date);
  return (minutes / 60) * HOUR_HEIGHT;
};

const getTimeFromPosition = (position: number, referenceDate: Date): Date => {
  const totalMinutes = Math.round((position / HOUR_HEIGHT) * 60);
  const snappedMinutes = snapToInterval(totalMinutes);
  const hours = Math.floor(snappedMinutes / 60);
  const minutes = snappedMinutes % 60;
  return setMinutes(setHours(referenceDate, hours), minutes);
};

const getEventHeight = (startDate: Date, endDate: Date): number => {
  const durationMinutes = differenceInMinutes(endDate, startDate);
  return (durationMinutes / 60) * HOUR_HEIGHT;
};

const checkEventCollision = (
  event1Start: Date,
  event1End: Date,
  event2Start: Date,
  event2End: Date
): boolean => {
  return event1Start < event2End && event2Start < event1End;
};

// Calculate grid column span for multi-day events in week view
const getEventGridSpan = (
  event: CalendarEventInternal,
  weekDays: Date[]
): { start: number; span: number } | null => {
  const eventStart = event.startDate;
  const eventEnd = event.endDate;

  // Find which column the event starts in
  let startColumn = -1;
  let endColumn = -1;

  weekDays.forEach((day, index) => {
    if (isSameDay(day, eventStart) || (eventStart < day && startColumn === -1)) {
      if (startColumn === -1) startColumn = index;
    }
    if (isSameDay(day, eventEnd) || eventEnd > day) {
      endColumn = index;
    }
  });

  if (startColumn === -1) return null;

  const span = endColumn - startColumn + 1;
  return { start: startColumn + 1, span: Math.max(1, span) }; // CSS Grid is 1-indexed
};

const renderDefaultEvent = (
  event: CalendarEventInternal,
  context: CalendarRenderEventContext,
  views: CalendarViews | undefined,
  key: string,
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void,
  onResizeStart?: (
    e: React.MouseEvent<HTMLDivElement>,
    direction: 'start' | 'end'
  ) => void,
  onHorizontalResizeStart?: (
    e: React.MouseEvent<HTMLDivElement>,
    direction: 'left' | 'right'
  ) => void,
  useTimeBasedLayout: boolean = false,
  isResizing: boolean = false,
  showCollisionError: boolean = false,
  weekDays?: Date[],
  gridSpan?: { start: number; span: number } | null
) => {
  const timeRange =
    format(event.startDate, 'p') +
    (event.endDate.getTime() !== event.startDate.getTime()
      ? ` – ${format(event.endDate, 'p')}`
      : '');

  const spanInfo = getEventSpanInfo(event, context.day);
  const isMultiDay = isMultiDayEvent(event);

  // Don't render if this is not the first day of a multi-day event
  if (isMultiDay && spanInfo && !spanInfo.isFirst && context.view !== 'day') {
    return null;
  }

  // Time-based layout for day/week views
  if (useTimeBasedLayout) {
    const topPosition = getPositionFromTime(event.startDate);
    const height = getEventHeight(event.startDate, event.endDate);
    const minHeight = (MIN_EVENT_DURATION / 60) * HOUR_HEIGHT;

    // When rendering in table layout, parent handles positioning
    const eventCard = (
      <View
        width="100%"
        height="100%"
        draggable
        onDragStart={onDragStart}
        zIndex={isResizing ? 1000 : 1}
        pointerEvents="auto"
        {...views?.event}
      >
        <Vertical
          gap={6}
          padding="12px 12px 12px 16px"
          borderRadius={8}
          background={`linear-gradient(to bottom, ${COLORS.lightBlue}, ${COLORS.mediumBlue}20)`}
          borderWidth={1}
          borderStyle="solid"
          borderColor={showCollisionError ? '#ef4444' : COLORS.primaryBlue}
          borderLeftWidth={4}
          borderLeftColor={showCollisionError ? '#ef4444' : COLORS.accentBlue}
          flexShrink={0}
          cursor="grab"
          position="relative"
          height="100%"
          opacity={isResizing ? 0.8 : 1}
          boxShadow={
            isResizing
              ? `0 8px 24px ${COLORS.shadowBlue}`
              : `0 2px 8px ${COLORS.shadowBlue}`
          }
          transition="all 0.2s ease"
        >
          {/* Resize handle - Top (adjust start time) */}
          {onResizeStart && height >= minHeight && (
            <View
              position="absolute"
              left={0}
              right={0}
              top={0}
              height="8px"
              cursor="ns-resize"
              onMouseDown={(e) => {
                e.stopPropagation();
                onResizeStart(e, 'start');
              }}
              backgroundColor="transparent"
              display="flex"
              alignItems="center"
              justifyContent="center"
              on={{
                _hover: {
                  backgroundColor: `${COLORS.primaryBlue}40`,
                },
              }}
            >
              <View
                width="40px"
                height="3px"
                borderRadius={2}
                backgroundColor={COLORS.primaryBlue}
                opacity={0}
                on={{
                  _hover: {
                    opacity: 1,
                  },
                }}
              />
            </View>
          )}

          <Text
            fontWeight="700"
            fontSize={14}
            color={showCollisionError ? '#991b1b' : COLORS.textDark}
            maxLines={2}
            {...views?.eventTitle}
          >
            {event.title}
          </Text>
          <Text
            fontSize={12}
            color={showCollisionError ? '#b91c1c' : COLORS.textMedium}
            maxLines={1}
            {...views?.eventTime}
          >
            {timeRange}
          </Text>
          {event.description && height > 80 && (
            <Text fontSize={11} color={COLORS.textMedium} maxLines={2}>
              {event.description}
            </Text>
          )}

          {/* Resize handle - Bottom (adjust end time) */}
          {onResizeStart && height >= minHeight && (
            <View
              position="absolute"
              left={0}
              right={0}
              bottom={0}
              height="8px"
              cursor="ns-resize"
              onMouseDown={(e) => {
                e.stopPropagation();
                onResizeStart(e, 'end');
              }}
              backgroundColor="transparent"
              display="flex"
              alignItems="center"
              justifyContent="center"
              on={{
                _hover: {
                  backgroundColor: `${COLORS.primaryBlue}40`,
                },
              }}
            >
              <View
                width="40px"
                height="3px"
                borderRadius={2}
                backgroundColor={COLORS.primaryBlue}
                opacity={0}
                on={{
                  _hover: {
                    opacity: 1,
                  },
                }}
              />
            </View>
          )}

          {/* Horizontal Resize handle - Left (for multi-day events) */}
          {onHorizontalResizeStart && isMultiDay && (
            <View
              position="absolute"
              left={0}
              top={0}
              bottom={0}
              width="8px"
              cursor="ew-resize"
              onMouseDown={(e) => {
                e.stopPropagation();
                onHorizontalResizeStart(e, 'left');
              }}
              backgroundColor="transparent"
              display="flex"
              alignItems="center"
              justifyContent="center"
              on={{
                _hover: {
                  backgroundColor: `${COLORS.primaryBlue}40`,
                },
              }}
            >
              <View
                width="3px"
                height="40px"
                borderRadius={2}
                backgroundColor={COLORS.primaryBlue}
                opacity={0}
                on={{
                  _hover: {
                    opacity: 1,
                  },
                }}
              />
            </View>
          )}

          {/* Horizontal Resize handle - Right (for multi-day events) */}
          {onHorizontalResizeStart && isMultiDay && (
            <View
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              width="8px"
              cursor="ew-resize"
              onMouseDown={(e) => {
                e.stopPropagation();
                onHorizontalResizeStart(e, 'right');
              }}
              backgroundColor="transparent"
              display="flex"
              alignItems="center"
              justifyContent="center"
              on={{
                _hover: {
                  backgroundColor: `${COLORS.primaryBlue}40`,
                },
              }}
            >
              <View
                width="3px"
                height="40px"
                borderRadius={2}
                backgroundColor={COLORS.primaryBlue}
                opacity={0}
                on={{
                  _hover: {
                    opacity: 1,
                  },
                }}
              />
            </View>
          )}
        </Vertical>
      </View>
    );

    return (
      <HoverCard key={key} openDelay={100} closeDelay={200}>
        <HoverCard.Trigger asChild>{eventCard}</HoverCard.Trigger>
        <HoverCard.Content
          side="right"
          align="start"
          maxWidth="350px"
          backgroundColor="color.white"
          padding={16}
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.15)"
        >
          <Vertical gap={12}>
            <Text fontWeight="700" fontSize={14} color="color.gray.900">
              {event.title}
            </Text>
            <Vertical gap={6}>
              <Horizontal gap={8} alignItems="center">
                <Text fontSize={11} fontWeight="600" color="color.gray.600">
                  📅
                </Text>
                <Text fontSize={12} color="color.gray.700">
                  {format(event.startDate, 'EEEE, MMMM d, yyyy')}
                </Text>
              </Horizontal>
              <Horizontal gap={8} alignItems="center">
                <Text fontSize={11} fontWeight="600" color="color.gray.600">
                  🕐
                </Text>
                <Text fontSize={12} color="color.gray.700">
                  {timeRange}
                </Text>
              </Horizontal>
            </Vertical>
            {event.description && (
              <Vertical gap={4}>
                <Text fontSize={11} fontWeight="600" color="color.gray.600">
                  Description
                </Text>
                <Text fontSize={12} color="color.gray.700">
                  {event.description}
                </Text>
              </Vertical>
            )}
          </Vertical>
        </HoverCard.Content>
      </HoverCard>
    );
  }

  // Original card-based layout for month view
  const eventCard = (
    <View
      position="relative"
      draggable
      onDragStart={onDragStart}
      {...views?.event}
    >
      <Vertical
        gap={6}
        padding={12}
        borderRadius={8}
        backgroundColor={
          context.isToday ? 'color.primary.50' : 'color.gray.100'
        }
        borderWidth={1}
        borderStyle="solid"
        borderColor={context.isToday ? 'color.primary.200' : 'color.gray.200'}
        flexShrink={0}
        cursor="grab"
        position="relative"
      >
        {/* Resize handle - Start */}
        {onResizeStart && (
          <View
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width="8px"
            cursor="col-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, 'start');
            }}
            backgroundColor="transparent"
            on={{
              _hover: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        )}

        <Text
          fontWeight="600"
          fontSize={12}
          maxLines={2}
          {...views?.eventTitle}
        >
          {event.title}
        </Text>
        <Text
          fontSize={11}
          color="color.gray.600"
          maxLines={1}
          {...views?.eventTime}
        >
          {timeRange}
        </Text>
        {event.description && context.view !== 'month' && (
          <Text fontSize={11} color="color.gray.700" maxLines={2}>
            {event.description}
          </Text>
        )}

        {/* Resize handle - End */}
        {onResizeStart && (
          <View
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            width="8px"
            cursor="col-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, 'end');
            }}
            backgroundColor="transparent"
            on={{
              _hover: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        )}
      </Vertical>
    </View>
  );

  return (
    <HoverCard key={key} openDelay={100} closeDelay={200}>
      <HoverCard.Trigger asChild>{eventCard}</HoverCard.Trigger>
      <HoverCard.Content
        side="top"
        align="start"
        maxWidth="350px"
        backgroundColor="color.white"
        padding={16}
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.15)"
      >
        <Vertical gap={12}>
          <Text fontWeight="700" fontSize={14} color="color.gray.900">
            {event.title}
          </Text>
          <Vertical gap={6}>
            <Horizontal gap={8} alignItems="center">
              <Text fontSize={11} fontWeight="600" color="color.gray.600">
                📅
              </Text>
              <Text fontSize={12} color="color.gray.700">
                {format(event.startDate, 'EEEE, MMMM d, yyyy')}
              </Text>
            </Horizontal>
            <Horizontal gap={8} alignItems="center">
              <Text fontSize={11} fontWeight="600" color="color.gray.600">
                🕐
              </Text>
              <Text fontSize={12} color="color.gray.700">
                {timeRange}
              </Text>
            </Horizontal>
          </Vertical>
          {event.description && (
            <Vertical gap={4}>
              <Text fontSize={11} fontWeight="600" color="color.gray.600">
                Description
              </Text>
              <Text fontSize={12} color="color.gray.700">
                {event.description}
              </Text>
            </Vertical>
          )}
          {isMultiDay && spanInfo && (
            <Vertical gap={4}>
              <Text fontSize={11} fontWeight="600" color="color.gray.600">
                Duration
              </Text>
              <Text fontSize={12} color="color.gray.700">
                {spanInfo.totalDays} day{spanInfo.totalDays > 1 ? 's' : ''}
              </Text>
            </Vertical>
          )}
        </Vertical>
      </HoverCard.Content>
    </HoverCard>
  );
};

const CalendarViewComponent: React.FC<CalendarViewProps> = ({
  currentDate,
  view,
  label,
  weeks,
  weekdayLabels,
  eventsByDay,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
  renderEvent,
  onEventDrop,
  onEventResize,
  onEventCreate,
  views,
  height = '800px',
}) => {
  const [draggedEvent, setDraggedEvent] =
    useState<CalendarEventInternal | null>(null);
  const [resizingEvent, setResizingEvent] = useState<{
    event: CalendarEventInternal;
    direction: 'start' | 'end' | 'left' | 'right';
    originalStart: Date;
    originalEnd: Date;
    currentStart: Date;
    currentEnd: Date;
    isValid: boolean;
    hasCollision: boolean;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const timeGridRef = useRef<HTMLDivElement>(null);

  // Use same grid configuration for both header and days
  const columnCount = weekdayLabels.length;

  // Drag and Drop Handlers
  const handleDragStart =
    (event: CalendarEventInternal) => (e: React.DragEvent<HTMLDivElement>) => {
      setDraggedEvent(event);
      e.dataTransfer.effectAllowed = 'move';
    };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop =
    (targetDay: Date) => (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!draggedEvent || !onEventDrop) return;

      // Calculate the difference in days
      const originalStart = draggedEvent.startDate;
      const daysDiff = differenceInDays(targetDay, originalStart);

      // Calculate new dates
      const newStart = addDays(originalStart, daysDiff);
      const newEnd = addDays(draggedEvent.endDate, daysDiff);

      onEventDrop(draggedEvent, newStart, newEnd);
      setDraggedEvent(null);
    };

  // Resize Handlers for time-based resizing (day/week views)
  const handleTimeBasedResizeStart =
    (event: CalendarEventInternal, direction: 'start' | 'end', dayDate: Date) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const initialY = e.clientY;
      const gridRect = timeGridRef.current?.getBoundingClientRect();
      if (!gridRect) return;

      setResizingEvent({
        event,
        direction,
        originalStart: event.startDate,
        originalEnd: event.endDate,
        currentStart: event.startDate,
        currentEnd: event.endDate,
        isValid: true,
        hasCollision: false,
      });

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = moveEvent.clientY - initialY;
        const scrollTop = timeGridRef.current?.scrollTop || 0;
        const relativeY = moveEvent.clientY - gridRect.top + scrollTop;

        let newStart = event.startDate;
        let newEnd = event.endDate;

        if (direction === 'start') {
          // Adjust start time
          const newTime = getTimeFromPosition(relativeY, dayDate);
          newStart = newTime;

          // Validate: start must be before end
          const durationMinutes = differenceInMinutes(newEnd, newStart);
          if (durationMinutes < MIN_EVENT_DURATION) {
            // Set minimum duration
            newStart = addMinutes(newEnd, -MIN_EVENT_DURATION);
          }
        } else {
          // Adjust end time
          const newTime = getTimeFromPosition(relativeY, dayDate);
          newEnd = newTime;

          // Validate: end must be after start
          const durationMinutes = differenceInMinutes(newEnd, newStart);
          if (durationMinutes < MIN_EVENT_DURATION) {
            // Set minimum duration
            newEnd = addMinutes(newStart, MIN_EVENT_DURATION);
          }
        }

        // Check for collisions with other events on the same day
        const dayKey = formatDayKey(dayDate);
        const dayEvents = eventsByDay.get(dayKey) ?? [];
        const hasCollision = dayEvents.some((otherEvent) => {
          if (otherEvent.id === event.id) return false;
          return checkEventCollision(newStart, newEnd, otherEvent.startDate, otherEvent.endDate);
        });

        const durationMinutes = differenceInMinutes(newEnd, newStart);
        const isValid = durationMinutes >= MIN_EVENT_DURATION && durationMinutes <= MAX_EVENT_DURATION;

        setResizingEvent({
          event,
          direction,
          originalStart: event.startDate,
          originalEnd: event.endDate,
          currentStart: newStart,
          currentEnd: newEnd,
          isValid,
          hasCollision,
        });

        setTooltipPosition({ x: moveEvent.clientX, y: moveEvent.clientY });

        // Update in real-time
        if (onEventResize && isValid) {
          onEventResize(event, newStart, newEnd);
        }
      };

      const handleMouseUp = () => {
        if (resizingEvent && resizingEvent.isValid && !resizingEvent.hasCollision && onEventResize) {
          // Final update
          onEventResize(event, resizingEvent.currentStart, resizingEvent.currentEnd);
        } else if (resizingEvent && (!resizingEvent.isValid || resizingEvent.hasCollision) && onEventResize) {
          // Revert to original
          onEventResize(event, event.startDate, event.endDate);
        }

        setResizingEvent(null);
        setTooltipPosition(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

  // Resize Handlers for day-based resizing (month view - horizontal)
  const handleDayBasedResizeStart =
    (event: CalendarEventInternal, direction: 'start' | 'end') =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setResizingEvent({
        event,
        direction,
        originalStart: event.startDate,
        originalEnd: event.endDate,
        currentStart: event.startDate,
        currentEnd: event.endDate,
        isValid: true,
        hasCollision: false,
      });

      const handleMouseMove = (moveEvent: MouseEvent) => {
        // Handled by day mouse enter
      };

      const handleMouseUp = () => {
        setResizingEvent(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

  // Horizontal Resize Handlers for multi-day events (adjust days, not hours)
  const handleHorizontalResizeStart =
    (event: CalendarEventInternal, direction: 'left' | 'right', weekDays: Date[]) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setResizingEvent({
        event,
        direction,
        originalStart: event.startDate,
        originalEnd: event.endDate,
        currentStart: event.startDate,
        currentEnd: event.endDate,
        isValid: true,
        hasCollision: false,
      });

      // Track which day column the mouse is over
      let currentDay: Date | null = null;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        // Find which day column the mouse is over
        const hoveredDay = weekDays.find((day) => {
          const dayElement = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
          if (dayElement) {
            const dayKey = formatDayKey(day);
            return dayElement.closest(`[data-day="${dayKey}"]`) !== null;
          }
          return false;
        });

        if (!hoveredDay) return;
        currentDay = hoveredDay;
      };

      const handleMouseUp = () => {
        if (currentDay && onEventResize) {
          let newStart = event.startDate;
          let newEnd = event.endDate;

          if (direction === 'left') {
            // Adjust start date, preserve time
            newStart = setHours(setMinutes(currentDay, getMinutes(event.startDate)), getHours(event.startDate));
            if (newStart >= event.endDate) {
              newStart = addDays(event.endDate, -1);
            }
          } else {
            // Adjust end date, preserve time
            newEnd = setHours(setMinutes(currentDay, getMinutes(event.endDate)), getHours(event.endDate));
            if (newEnd <= event.startDate) {
              newEnd = addDays(event.startDate, 1);
            }
          }

          onEventResize(event, newStart, newEnd);
        }

        setResizingEvent(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

  // Double-click handler to create events
  const handleDoubleClick = (day: Date, time?: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!onEventCreate) return;

    let startDate: Date;
    let endDate: Date;

    if (time !== undefined) {
      // Time-based view (day/week) - create 1-hour event at clicked time
      startDate = setMinutes(setHours(day, time), 0);
      endDate = addMinutes(startDate, 60);
    } else {
      // Month view - create all-day event
      startDate = setHours(setMinutes(day, 0), 9); // 9 AM
      endDate = addMinutes(startDate, 60); // 1 hour
    }

    onEventCreate(startDate, endDate);
  };

  const handleDayMouseEnter = (day: Date) => {
    if (resizingEvent && onEventResize && view === 'month') {
      const { event, direction, originalStart, originalEnd } = resizingEvent;

      if (direction === 'start') {
        // Resizing from the start
        const newStart = day;
        if (newStart < originalEnd) {
          onEventResize(event, newStart, originalEnd);
        }
      } else {
        // Resizing from the end
        const newEnd = addDays(day, 1);
        if (newEnd > originalStart) {
          onEventResize(event, originalStart, newEnd);
        }
      }
    }
  };

  // Time-based drag handler for day/week views
  const handleTimeDragStart =
    (event: CalendarEventInternal) => (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', JSON.stringify({
        eventId: event.id,
        startTime: event.startDate.toISOString(),
        endTime: event.endDate.toISOString(),
      }));
      setDraggedEvent(event);
    };

  const handleTimeGridDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleTimeGridDrop =
    (day: Date) => (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!draggedEvent || !onEventDrop) return;

      const gridRect = e.currentTarget.getBoundingClientRect();
      const relativeY = e.clientY - gridRect.top;

      // Calculate new start time based on drop position
      const newStartTime = getTimeFromPosition(relativeY, day);
      const duration = differenceInMinutes(draggedEvent.endDate, draggedEvent.startDate);
      const newEndTime = addMinutes(newStartTime, duration);

      onEventDrop(draggedEvent, newStartTime, newEndTime);
      setDraggedEvent(null);
    };

  // Resize tooltip showing current time range
  const renderResizeTooltip = () => {
    if (!resizingEvent || !tooltipPosition) return null;

    const { currentStart, currentEnd, isValid, hasCollision } = resizingEvent;
    const timeRange = `${format(currentStart, 'h:mm a')} – ${format(currentEnd, 'h:mm a')}`;
    const durationMinutes = differenceInMinutes(currentEnd, currentStart);
    const durationText = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;

    let statusText = '';
    let statusColor = COLORS.textDark;

    if (!isValid) {
      statusText = 'Invalid duration';
      statusColor = '#ef4444';
    } else if (hasCollision) {
      statusText = 'Conflicts with another event';
      statusColor = '#f97316';
    }

    return (
      <View
        position="fixed"
        left={`${tooltipPosition.x + 20}px`}
        top={`${tooltipPosition.y - 10}px`}
        backgroundColor={isValid && !hasCollision ? COLORS.darkBlue : statusColor}
        color="white"
        padding="8px 12px"
        borderRadius={6}
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
        zIndex={10000}
        pointerEvents="none"
      >
        <Vertical gap={4}>
          <Text fontSize={12} fontWeight="600" color="white">
            {timeRange}
          </Text>
          <Text fontSize={10} color="white" opacity={0.9}>
            Duration: {durationText}
          </Text>
          {statusText && (
            <Text fontSize={10} color="white" fontWeight="600">
              ⚠️ {statusText}
            </Text>
          )}
        </Vertical>
      </View>
    );
  };

  const weekdayRow = (
    <View
      display="grid"
      gridTemplateColumns={`repeat(${columnCount}, 1fr)`}
      gap={12}
      padding="8px 0"
      {...views?.weekdayRow}
    >
      {weekdayLabels.map((weekday) => (
        <Vertical
          key={formatDayKey(weekday)}
          alignItems="center"
          padding={8}
          {...views?.weekdayHeader}
        >
          <Text
            fontWeight="600"
            fontSize={12}
            color="color.gray.600"
            {...views?.weekdayLabel}
            maxLines={1}
          >
            {format(weekday, 'EEE')}
          </Text>
        </Vertical>
      ))}
    </View>
  );

  return (
    <Vertical
      gap={16}
      borderWidth={1}
      borderStyle="solid"
      borderColor="color.gray.200"
      borderRadius={16}
      padding={24}
      backgroundColor="color.white"
      height={height}
      maxHeight="90vh"
      maxWidth={'100%'}
      display="flex"
      flexDirection="column"
      {...views?.container}
    >
      <Vertical gap={16} flexShrink={0} {...views?.header}>
        <Horizontal
          justifyContent="space-between"
          alignItems="center"
          maxWidth={'100%'}
        >
          <Text fontSize={18} fontWeight="700" {...views?.headerTitle}>
            {label}
          </Text>
          <Horizontal gap={8} {...views?.viewSwitcher}>
            {VIEW_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={view === option.value ? 'filled' : 'ghost'}
                isDisabled={view === option.value}
                onClick={() => onViewChange(option.value)}
                {...views?.viewButton}
              >
                {option.label}
              </Button>
            ))}
          </Horizontal>
        </Horizontal>
        <Horizontal gap={8} alignItems="center" {...views?.navigation}>
          <Button
            variant="ghost"
            onClick={onPrevious}
            {...views?.navigationButton}
          >
            ← Previous{' '}
            {view === 'day' ? 'Day' : view === 'week' ? 'Week' : 'Month'}
          </Button>
          <Button
            variant="ghost"
            onClick={onToday}
            {...views?.navigationButton}
          >
            Today
          </Button>
          <Button variant="ghost" onClick={onNext} {...views?.navigationButton}>
            Next {view === 'day' ? 'Day' : view === 'week' ? 'Week' : 'Month'} →
          </Button>
        </Horizontal>
      </Vertical>

      {/* Render time-based grid for day/week views - Google Calendar style */}
      {(view === 'day' || view === 'week') ? (
        <View
          flex={1}
          overflow="auto"
          position="relative"
          ref={timeGridRef}
          borderWidth={0.5}
          borderStyle="solid"
          borderColor="color.gray.300"
          borderRadius={8}
          {...views?.grid}
        >
          {/* Week grid - day columns */}
          <View
            display="grid"
            gridTemplateColumns={view === 'day' ? '60px 1fr' : `60px repeat(${weekdayLabels.length}, 1fr)`}
            gap={0}
            position="relative"
            minHeight={`${HOURS_IN_DAY * HOUR_HEIGHT}px`}
          >
            {/* Time labels column */}
            <View
              position="relative"
              borderRightWidth={0.5}
              borderStyle="solid"
              borderColor="color.gray.300"
              backgroundColor="color.white"
            >
              {/* Empty space for header alignment */}
              <View
                height="60px"
                borderBottomWidth={0.5}
                borderStyle="solid"
                borderColor="color.gray.300"
                position="sticky"
                top={0}
                zIndex={20}
                backgroundColor="color.white"
              />

              {/* Time labels */}
              {Array.from({ length: HOURS_IN_DAY }, (_, hour) => (
                <View
                  key={`time-${hour}`}
                  height={`${HOUR_HEIGHT}px`}
                  paddingRight={8}
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                  borderBottomWidth={0.5}
                  borderStyle="solid"
                  borderColor="color.gray.300"
                  backgroundColor="color.white"
                  position="sticky"
                  left={0}
                  zIndex={10}
                >
                  <Text fontSize={10} color="color.gray.500" textAlign="right">
                    {format(setHours(new Date(), hour), 'HH:mm')}
                  </Text>
                </View>
              ))}
            </View>

            {/* Day columns */}
            {weeks[0].map((day, dayIndex) => {
              const dayKey = formatDayKey(day);
              const isToday = isSameDay(day, today);

              return (
                <View
                  key={`day-col-${dayKey}`}
                  data-day={dayKey}
                  position="relative"
                  borderRightWidth={dayIndex < weeks[0].length - 1 ? 0.5 : 0}
                  borderStyle="solid"
                  borderColor="color.gray.300"
                  display="flex"
                  flexDirection="column"
                >
                  {/* Day header */}
                  <View
                    height="60px"
                    padding="8px"
                    textAlign="center"
                    borderBottomWidth={0.5}
                    borderStyle="solid"
                    borderColor="color.gray.300"
                    backgroundColor={isToday ? COLORS.lightBlue : 'color.gray.50'}
                    position="sticky"
                    top={0}
                    zIndex={20}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={4}
                  >
                    <Text
                      fontSize={11}
                      fontWeight="500"
                      color="color.gray.600"
                      textTransform="uppercase"
                      letterSpacing="0.5px"
                    >
                      {format(day, 'EEE')}
                    </Text>
                    <View
                      width="36px"
                      height="36px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="50%"
                      backgroundColor={isToday ? COLORS.primaryBlue : 'transparent'}
                      color={isToday ? 'white' : 'color.gray.900'}
                    >
                      <Text fontSize={13} fontWeight={isToday ? '500' : '400'}>
                        {format(day, 'd')}
                      </Text>
                    </View>
                  </View>

                  {/* Day time grid */}
                  <View flex={1} position="relative">
                    {Array.from({ length: HOURS_IN_DAY }, (_, hour) => (
                      <View
                        key={`cell-${dayKey}-${hour}`}
                        data-hour={hour}
                        height={`${HOUR_HEIGHT}px`}
                        borderBottomWidth={0.5}
                        borderStyle="solid"
                        borderColor="color.gray.300"
                        backgroundColor={isToday ? 'rgba(227, 242, 253, 0.1)' : 'color.white'}
                        onDragOver={handleTimeGridDragOver}
                        onDrop={handleTimeGridDrop(day)}
                        onDoubleClick={handleDoubleClick(day, hour)}
                      />
                    ))}
                  </View>
                </View>
              );
            })}

            {/* Events layer - absolutely positioned over the entire grid */}
            <View
              position="absolute"
              top="60px"
              left="60px"
              right={0}
              bottom={0}
              pointerEvents="none"
              zIndex={100}
            >
              {/* Multi-day events spanning across columns */}
              {view === 'week' && weeks[0].map((weekDay) => {
                const weekDayKey = formatDayKey(weekDay);
                const weekEvents = eventsByDay.get(weekDayKey) ?? [];

                return weekEvents
                  .filter((event) => {
                    const isMultiDay = isMultiDayEvent(event);
                    if (!isMultiDay) return false;
                    const spanInfo = getEventSpanInfo(event, weekDay);
                    return spanInfo && spanInfo.isFirst;
                  })
                  .map((event) => {
                    const gridSpan = getEventGridSpan(event, weeks[0]);
                    if (!gridSpan) return null;

                    const key = `multi-${weekDayKey}-${event.id ?? event.title}-${event.startDate.getTime()}`;
                    const isResizingThis = resizingEvent?.event.id === event.id;
                    const showCollisionError = isResizingThis && resizingEvent?.hasCollision;

                    // Calculate position
                    const topPosition = getPositionFromTime(event.startDate);
                    const height = getEventHeight(event.startDate, event.endDate);
                    const minHeight = (MIN_EVENT_DURATION / 60) * HOUR_HEIGHT;

                    // Calculate horizontal position (percentage of week width)
                    const dayWidth = 100 / weeks[0].length;
                    const leftPercent = (gridSpan.start - 1) * dayWidth;
                    const widthPercent = gridSpan.span * dayWidth;

                    return (
                      <View
                        key={key}
                        position="absolute"
                        top={`${topPosition}px`}
                        left={`calc(${leftPercent}% + 6px)`}
                        width={`calc(${widthPercent}% - 12px)`}
                        height={`${Math.max(height, minHeight)}px`}
                        pointerEvents="auto"
                        zIndex={isResizingThis ? 1000 : 100}
                      >
                        {renderDefaultEvent(
                          event,
                          { day: weekDay, isToday: isSameDay(weekDay, today), view },
                          views,
                          key,
                          onEventDrop ? handleTimeDragStart(event) : undefined,
                          onEventResize
                            ? (e, direction) => handleTimeBasedResizeStart(event, direction, weekDay)(e)
                            : undefined,
                          onEventResize
                            ? (e, direction) => handleHorizontalResizeStart(event, direction, weeks[0])(e)
                            : undefined,
                          true,
                          isResizingThis || false,
                          showCollisionError || false,
                          weeks[0],
                          gridSpan
                        )}
                      </View>
                    );
                  });
              })}

              {/* Single-day events */}
              {weeks[0].map((day, dayIndex) => {
                const dayKey = formatDayKey(day);
                const events = eventsByDay.get(dayKey) ?? [];
                const isToday = isSameDay(day, today);

                return events
                  .filter((event) => !isMultiDayEvent(event) || view === 'day')
                  .map((event) => {
                    const key = `${dayKey}-${event.id ?? event.title}-${event.startDate.getTime()}`;
                    const isResizingThis = resizingEvent?.event.id === event.id;
                    const showCollisionError = isResizingThis && resizingEvent?.hasCollision;

                    const topPosition = getPositionFromTime(event.startDate);
                    const height = getEventHeight(event.startDate, event.endDate);
                    const minHeight = (MIN_EVENT_DURATION / 60) * HOUR_HEIGHT;

                    // Calculate horizontal position for single day
                    const dayWidth = 100 / weeks[0].length;
                    const leftPercent = dayIndex * dayWidth;

                    return (
                      <View
                        key={key}
                        position="absolute"
                        top={`${topPosition}px`}
                        left={`calc(${leftPercent}% + 6px)`}
                        width={`calc(${dayWidth}% - 12px)`}
                        height={`${Math.max(height, minHeight)}px`}
                        pointerEvents="auto"
                        zIndex={isResizingThis ? 1000 : 100}
                      >
                        {renderDefaultEvent(
                          event,
                          { day, isToday, view },
                          views,
                          key,
                          onEventDrop ? handleTimeDragStart(event) : undefined,
                          onEventResize
                            ? (e, direction) => handleTimeBasedResizeStart(event, direction, day)(e)
                            : undefined,
                          undefined,
                          true,
                          isResizingThis || false,
                          showCollisionError || false
                        )}
                      </View>
                    );
                  });
              })}
            </View>
          </View>
        </View>
      ) : (
        // Month view - original grid layout
        <Vertical gap={12} flex={1} overflow="auto" {...views?.grid}>
          {weeks.map((week, index) => (
          <View
            key={`${view}-week-${index}`}
            display="grid"
            gridTemplateColumns={`repeat(${week.length}, 1fr)`}
            gap={12}
            height="180px"
            minHeight="auto"
            {...views?.weekRow}
          >
            {week.map((day) => {
              const dayKey = formatDayKey(day);
              const isToday = isSameDay(day, today);
              const events = eventsByDay.get(dayKey) ?? [];
              const context: CalendarRenderEventContext = {
                day,
                isToday,
                view,
              };

              const shouldDim = !isSameMonth(day, currentDate);

              return (
                <Vertical
                  key={dayKey}
                  gap={12}
                  padding={16}
                  borderWidth={1}
                  borderStyle="solid"
                  borderColor={isToday ? 'color.primary.200' : 'color.gray.200'}
                  borderRadius={12}
                  backgroundColor="color.gray.50"
                  opacity={shouldDim ? 0.6 : 1}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  minHeight="180px"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(day)}
                  onMouseEnter={() => handleDayMouseEnter(day)}
                  {...views?.dayColumn}
                >
                  <Horizontal
                    justifyContent="space-between"
                    alignItems="center"
                    flexShrink={0}
                    {...views?.dayHeader}
                  >
                    <Text fontWeight="600" fontSize={14} {...views?.dayNumber}>
                      {format(day, 'd')}
                    </Text>
                  </Horizontal>
                  <Vertical gap={8} flex={1} overflow="auto" {...views?.events}>
                    {events.length > 0
                      ? events.map((event) => {
                          const key = `${formatDayKey(day)}-${
                            event.id ?? event.title
                          }-${event.startDate.getTime()}`;

                          // Skip rendering multi-day events on non-first days in month view
                          const spanInfo = getEventSpanInfo(event, day);
                          const isMultiDay = isMultiDayEvent(event);
                          if (
                            isMultiDay &&
                            spanInfo &&
                            !spanInfo.isFirst
                          ) {
                            return null;
                          }

                          if (renderEvent) {
                            const rendered = renderEvent(event, context);

                            if (isValidElement(rendered)) {
                              return (
                                <View
                                  key={key}
                                  draggable={true}
                                  onDragStart={
                                    onEventDrop
                                      ? handleDragStart(event)
                                      : undefined
                                  }
                                >
                                  {rendered}
                                </View>
                              );
                            }

                            return (
                              <React.Fragment key={key}>
                                {rendered}
                              </React.Fragment>
                            );
                          }

                          return renderDefaultEvent(
                            event,
                            context,
                            views,
                            key,
                            onEventDrop ? handleDragStart(event) : undefined,
                            onEventResize
                              ? (e, direction) =>
                                  handleDayBasedResizeStart(event, direction)(e)
                              : undefined,
                            false, // useTimeBasedLayout - month uses card layout
                            false, // isResizing
                            false  // showCollisionError
                          );
                        })
                      : null}
                  </Vertical>
                </Vertical>
              );
            })}
          </View>
        ))}
        </Vertical>
      )}

      {/* Resize tooltip */}
      {renderResizeTooltip()}
    </Vertical>
  );
};

export default CalendarViewComponent;
