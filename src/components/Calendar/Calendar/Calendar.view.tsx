import React, { isValidElement, useState, useRef, useEffect } from 'react';
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
  useTimeBasedLayout: boolean = false,
  isResizing: boolean = false,
  showCollisionError: boolean = false
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

    const eventCard = (
      <View
        position="absolute"
        top={`${topPosition}px`}
        left="60px" // Offset for time labels
        right="8px"
        height={`${Math.max(height, minHeight)}px`}
        draggable
        onDragStart={onDragStart}
        zIndex={isResizing ? 1000 : 1}
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
  views,
  height = '800px',
}) => {
  const [draggedEvent, setDraggedEvent] =
    useState<CalendarEventInternal | null>(null);
  const [resizingEvent, setResizingEvent] = useState<{
    event: CalendarEventInternal;
    direction: 'start' | 'end';
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

  // Time grid component for day/week views
  const renderTimeGrid = () => {
    const hours = Array.from({ length: HOURS_IN_DAY }, (_, i) => i);

    return (
      <View position="relative">
        {hours.map((hour) => (
          <Horizontal
            key={hour}
            height={`${HOUR_HEIGHT}px`}
            borderTopWidth={1}
            borderStyle="solid"
            borderColor="color.gray.200"
            alignItems="flex-start"
            position="relative"
          >
            <View
              width="60px"
              paddingTop={4}
              paddingRight={8}
              flexShrink={0}
            >
              <Text
                fontSize={11}
                color="color.gray.600"
                textAlign="right"
              >
                {format(setHours(new Date(), hour), 'h a')}
              </Text>
            </View>
            <View
              flex={1}
              height="100%"
              borderLeftWidth={1}
              borderStyle="solid"
              borderColor="color.gray.200"
            />
          </Horizontal>
        ))}
      </View>
    );
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

      {view === 'week' && <View flexShrink={0}>{weekdayRow}</View>}

      {/* Render time-based grid for day/week views */}
      {(view === 'day' || view === 'week') ? (
        <Vertical gap={12} flex={1} overflow="auto" ref={timeGridRef} {...views?.grid}>
          <View
            display="grid"
            gridTemplateColumns={view === 'day' ? '1fr' : `repeat(${weekdayLabels.length}, 1fr)`}
            gap={view === 'day' ? 0 : 12}
            position="relative"
            minHeight={`${HOURS_IN_DAY * HOUR_HEIGHT}px`}
          >
            {weeks[0].map((day) => {
              const dayKey = formatDayKey(day);
              const isToday = isSameDay(day, today);
              const events = eventsByDay.get(dayKey) ?? [];
              const context: CalendarRenderEventContext = {
                day,
                isToday,
                view,
              };

              return (
                <View
                  key={dayKey}
                  position="relative"
                  borderWidth={1}
                  borderStyle="solid"
                  borderColor={isToday ? COLORS.primaryBlue : 'color.gray.200'}
                  borderRadius={12}
                  backgroundColor="color.gray.50"
                  overflow="hidden"
                >
                  {/* Day header */}
                  <Horizontal
                    justifyContent="space-between"
                    alignItems="center"
                    padding={12}
                    backgroundColor="color.white"
                    borderBottomWidth={1}
                    borderStyle="solid"
                    borderColor="color.gray.200"
                    position="sticky"
                    top={0}
                    zIndex={10}
                  >
                    <Text fontWeight="600" fontSize={14}>
                      {format(day, view === 'day' ? 'EEEE, MMMM d' : 'EEE d')}
                    </Text>
                  </Horizontal>

                  {/* Time grid */}
                  <View position="relative">
                    {renderTimeGrid()}

                    {/* Events positioned absolutely based on time */}
                    <View position="relative">
                      {events.length > 0 &&
                        events.map((event) => {
                          const key = `${formatDayKey(day)}-${
                            event.id ?? event.title
                          }-${event.startDate.getTime()}`;

                          const isResizingThis = resizingEvent?.event.id === event.id;
                          const showCollisionError = isResizingThis && resizingEvent?.hasCollision;

                          if (renderEvent) {
                            const rendered = renderEvent(event, context);
                            // Custom render not supported for time-based layout
                            // Fall back to default
                          }

                          return renderDefaultEvent(
                            event,
                            context,
                            views,
                            key,
                            onEventDrop ? handleDragStart(event) : undefined,
                            onEventResize
                              ? (e, direction) =>
                                  handleTimeBasedResizeStart(event, direction, day)(e)
                              : undefined,
                            true, // useTimeBasedLayout
                            isResizingThis || false,
                            showCollisionError || false
                          );
                        })}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </Vertical>
      ) : (
        // Month view - original grid layout
        <Vertical gap={12} flex={1} overflow="auto" {...views?.grid}>
          {weeks.map((week, index) => (
          <View
            key={`${view}-week-${index}`}
            display="grid"
            gridTemplateColumns={`repeat(${week.length}, 1fr)`}
            gap={12}
            height={
              view === 'month' ? '180px' : view === 'week' ? '100%' : 'auto'
            }
            minHeight={view === 'week' ? '300px' : 'auto'}
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

              const shouldDim =
                view === 'month' && !isSameMonth(day, currentDate);

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
                  minHeight={view === 'month' ? '180px' : '300px'}
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
                    {view !== 'month' && (
                      <Text
                        fontSize={12}
                        color="color.gray.600"
                        {...views?.dayMeta}
                      >
                        {format(day, 'EEEE')}
                      </Text>
                    )}
                  </Horizontal>
                  <Vertical gap={8} flex={1} overflow="auto" {...views?.events}>
                    {events.length > 0
                      ? events.map((event) => {
                          const key = `${formatDayKey(day)}-${
                            event.id ?? event.title
                          }-${event.startDate.getTime()}`;

                          // Skip rendering multi-day events on non-first days
                          const spanInfo = getEventSpanInfo(event, day);
                          const isMultiDay = isMultiDayEvent(event);
                          if (
                            isMultiDay &&
                            spanInfo &&
                            !spanInfo.isFirst &&
                            view !== 'day'
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
                      : view === 'day' && (
                          <Text
                            fontSize={11}
                            color="color.gray.600"
                            fontStyle="italic"
                            {...views?.emptyState}
                          >
                            No events scheduled
                          </Text>
                        )}
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
