import React, { useState, useCallback, useMemo } from 'react';
import { View, Horizontal, useTheme } from 'app-studio';
import { CalendarMonthProps, CalendarMonthEvent } from './CalendarMonth.props';
import {
  layoutEvents,
  PositionedEvent,
  getDayNames,
  getCalendarDates,
  getDateNumber,
  getMonthName,
  getYear,
  getPreviousMonth,
  getNextMonth,
  addDateDays,
  daysBetweenUTC,
  isInMonth,
  getFirstDayOfMonth,
} from './CalendarMonth.utils';
import {
  containerStyles,
  headerStyles,
  monthTitleStyles,
  monthGridStyles,
  weekdayHeaderStyles,
  weekdayLabelStyles,
  dayCellStyles,
  otherMonthDayCellStyles,
  dayNumberStyles,
  todayDayNumberStyles,
  selectedDayNumberStyles,
  eventsAreaStyles,
  eventStyles,
  EVENT_COLORS,
  dropTargetStyles,
  buttonStyles,
  iconButtonStyles,
} from './CalendarMonth.style';

interface DragState {
  isDragging: boolean;
  event: PositionedEvent | null;
  startDate: string | null;
  originalStart: string | null;
  originalEnd: string | null;
}

interface ResizeState {
  isResizing: boolean;
  resizeDirection: 'left' | 'right' | null;
  event: PositionedEvent | null;
  originalStart: string | null;
  originalEnd: string | null;
  currentHoverDate: string | null;
}

interface ResizeHandleProps {
  direction: 'left' | 'right';
  onMouseDown: (e: React.MouseEvent) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ direction, onMouseDown }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View
      position="absolute"
      top={0}
      bottom={0}
      width={8}
      opacity={isHovered ? 1 : 0}
      transition="opacity 0.2s"
      cursor={direction === 'left' ? 'w-resize' : 'e-resize'}
      zIndex={10}
      backgroundColor={isHovered ? 'rgba(0,0,0,0.1)' : 'transparent'}
      {...(direction === 'left' ? { left: 0 } : { right: 0 })}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  initialDate = new Date(),
  events = [],
  today = new Date().toISOString().slice(0, 10),
  onEventDrop,
  onEventResize,
  onDateClick,
  onMonthChange,
  views = {},
  width = '100%',
  maxWidth = 1200,
  weekStartsOn = 0,
}) => {
  const { getColor } = useTheme();

  // Convert initialDate to ISO string if it's a Date object
  const initialDateISO =
    typeof initialDate === 'string'
      ? initialDate
      : initialDate.toISOString().slice(0, 10);

  const [currentMonth, setCurrentMonth] = useState<string>(
    getFirstDayOfMonth(initialDateISO)
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [localEvents, setLocalEvents] = useState<CalendarMonthEvent[]>(events);
  const [dropTargetDate, setDropTargetDate] = useState<string | null>(null);
  const [resizeHighlightDates, setResizeHighlightDates] = useState<string[]>([]);

  const dragStateRef = React.useRef<DragState>({
    isDragging: false,
    event: null,
    startDate: null,
    originalStart: null,
    originalEnd: null,
  });

  const resizeStateRef = React.useRef<ResizeState>({
    isResizing: false,
    resizeDirection: null,
    event: null,
    originalStart: null,
    originalEnd: null,
    currentHoverDate: null,
  });

  // Update local events when props change
  React.useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  // Generate calendar dates (42 days = 6 weeks)
  const calendarDates = useMemo(
    () => getCalendarDates(currentMonth, weekStartsOn),
    [currentMonth, weekStartsOn]
  );

  // Layout events
  const { items: positionedEvents } = useMemo(
    () => layoutEvents(localEvents, calendarDates),
    [localEvents, calendarDates]
  );

  // Get day names starting from weekStartsOn
  const dayNames = useMemo(() => getDayNames(weekStartsOn), [weekStartsOn]);

  // Handle month navigation
  const handlePreviousMonth = useCallback(() => {
    const newMonth = getPreviousMonth(currentMonth);
    setCurrentMonth(newMonth);
    onMonthChange?.(new Date(newMonth + 'T00:00:00Z'));
  }, [currentMonth, onMonthChange]);

  const handleNextMonth = useCallback(() => {
    const newMonth = getNextMonth(currentMonth);
    setCurrentMonth(newMonth);
    onMonthChange?.(new Date(newMonth + 'T00:00:00Z'));
  }, [currentMonth, onMonthChange]);

  const handleToday = useCallback(() => {
    const todayMonth = getFirstDayOfMonth(today);
    setCurrentMonth(todayMonth);
    onMonthChange?.(new Date(todayMonth + 'T00:00:00Z'));
  }, [today, onMonthChange]);

  // Handle date click
  const handleDateClick = useCallback(
    (dateISO: string) => {
      setSelectedDate(dateISO);
      onDateClick?.(dateISO);
    },
    [onDateClick]
  );

  // Handle event drag start
  const handleEventDragStart = useCallback(
    (e: React.DragEvent, event: PositionedEvent) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('eventId', event.id);

      dragStateRef.current = {
        isDragging: true,
        event,
        startDate: event.start,
        originalStart: event.start,
        originalEnd: event.end,
      };
    },
    []
  );

  // Handle drag over day cell
  const handleDragOver = useCallback((e: React.DragEvent, dateISO: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetDate(dateISO);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDropTargetDate(null);
  }, []);

  // Handle drop on day cell
  const handleDrop = useCallback(
    (e: React.DragEvent, targetDateISO: string) => {
      e.preventDefault();
      setDropTargetDate(null);

      const dragState = dragStateRef.current;
      if (
        !dragState.event ||
        !dragState.originalStart ||
        !dragState.originalEnd
      )
        return;

      // Calculate date difference
      const daysDiff = daysBetweenUTC(targetDateISO, dragState.originalStart);

      // Update event dates
      const newStart = addDateDays(dragState.originalStart, daysDiff);
      const newEnd = addDateDays(dragState.originalEnd, daysDiff);

      const updatedEvent: CalendarMonthEvent = {
        ...dragState.event,
        start: newStart,
        end: newEnd,
      };

      // Update local events
      const updatedEvents = localEvents.map((ev) =>
        ev.id === dragState.event!.id ? updatedEvent : ev
      );
      setLocalEvents(updatedEvents);

      // Call callback
      onEventDrop?.(updatedEvent);

      // Reset drag state
      dragStateRef.current = {
        isDragging: false,
        event: null,
        startDate: null,
        originalStart: null,
        originalEnd: null,
      };
    },
    [localEvents, onEventDrop]
  );

  // Handle resize start
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, event: PositionedEvent, direction: 'left' | 'right') => {
      e.preventDefault();
      e.stopPropagation();

      resizeStateRef.current = {
        isResizing: true,
        resizeDirection: direction,
        event,
        originalStart: event.start,
        originalEnd: event.end,
        currentHoverDate: null,
      };
    },
    []
  );

  // Handle mouse move during resize
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const resizeState = resizeStateRef.current;
      if (!resizeState.isResizing || !resizeState.event) return;

      // Find which date cell we're hovering over
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const dateCell = target?.closest('[data-date]');
      if (!dateCell) return;

      const hoverDate = dateCell.getAttribute('data-date');
      if (!hoverDate || hoverDate === resizeState.currentHoverDate) return;

      resizeState.currentHoverDate = hoverDate;

      let newStart = resizeState.originalStart!;
      let newEnd = resizeState.originalEnd!;

      if (resizeState.resizeDirection === 'right') {
        // Resizing from the right - change end date
        newEnd = hoverDate;
        // Ensure end is not before start
        if (daysBetweenUTC(newEnd, newStart) < 0) {
          newEnd = newStart;
        }
      } else {
        // Resizing from the left - change start date
        newStart = hoverDate;
        // Ensure start is not after end
        if (daysBetweenUTC(newEnd, newStart) < 0) {
          newStart = newEnd;
        }
      }

      // Update visual feedback
      const daysDiff = Math.abs(daysBetweenUTC(newEnd, newStart));
      const highlightDates: string[] = [];
      for (let i = 0; i <= daysDiff; i++) {
        highlightDates.push(addDateDays(newStart, i));
      }
      setResizeHighlightDates(highlightDates);

      // Update event immediately for preview
      const updatedEvents = localEvents.map((ev) =>
        ev.id === resizeState.event!.id
          ? { ...ev, start: newStart, end: newEnd }
          : ev
      );
      setLocalEvents(updatedEvents);
    },
    [localEvents]
  );

  // Handle mouse up - finish resize
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      const resizeState = resizeStateRef.current;
      if (!resizeState.isResizing || !resizeState.event) return;

      setResizeHighlightDates([]);

      // Find the updated event
      const updatedEvent = localEvents.find((ev) => ev.id === resizeState.event!.id);
      if (updatedEvent) {
        onEventResize?.(updatedEvent);
      }

      // Reset resize state
      resizeStateRef.current = {
        isResizing: false,
        resizeDirection: null,
        event: null,
        originalStart: null,
        originalEnd: null,
        currentHoverDate: null,
      };
    },
    [localEvents, onEventResize]
  );

  // Set up global mouse event listeners for resize
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Group events by date for rendering
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, PositionedEvent[]> = {};
    calendarDates.forEach((date) => {
      grouped[date] = [];
    });

    positionedEvents.forEach((event) => {
      // For multi-day events, show on each day it spans
      const startIdx = event.startDay;
      const endIdx = event.endDay;

      for (let i = startIdx; i <= endIdx && i < calendarDates.length; i++) {
        const date = calendarDates[i];
        if (date && grouped[date]) {
          // Mark if this is the first day of the event
          const isFirstDay = i === startIdx;
          grouped[date].push({
            ...event,
            // Add a marker to know if we should show full event or continuation
            isFirstDay,
          } as any);
        }
      }
    });

    return grouped;
  }, [positionedEvents, calendarDates]);

  return (
    <View
      {...containerStyles}
      width={width}
      maxWidth={maxWidth}
      {...views.container}
    >
      {/* Header with navigation */}
      <Horizontal {...headerStyles} {...views.header}>
        <View {...monthTitleStyles} {...views.monthTitle}>
          {getMonthName(currentMonth)} {getYear(currentMonth)}
        </View>

        <Horizontal gap={8}>
          <View
            {...buttonStyles}
            onClick={handleToday}
            style={{ cursor: 'pointer' }}
            {...views.navButton}
          >
            Today
          </View>

          <Horizontal gap={4}>
            <View
              {...iconButtonStyles}
              onClick={handlePreviousMonth}
              style={{ cursor: 'pointer' }}
              {...views.navButton}
            >
              ‹
            </View>
            <View
              {...iconButtonStyles}
              onClick={handleNextMonth}
              style={{ cursor: 'pointer' }}
              {...views.navButton}
            >
              ›
            </View>
          </Horizontal>
        </Horizontal>
      </Horizontal>

      {/* Weekday headers */}
      <View {...weekdayHeaderStyles} {...views.weekdayHeader}>
        {dayNames.map((dayName, index) => (
          <View key={index} {...weekdayLabelStyles} {...views.weekdayLabel}>
            {dayName}
          </View>
        ))}
      </View>

      {/* Month grid */}
      <View {...monthGridStyles} {...views.monthGrid}>
        {calendarDates.map((dateISO, index) => {
          const dateNum = getDateNumber(dateISO);
          const isToday = dateISO === today;
          const isSelected = dateISO === selectedDate;
          const isCurrentMonth = isInMonth(dateISO, currentMonth);
          const isDropTarget = dateISO === dropTargetDate;
          const isResizeHighlight = resizeHighlightDates.includes(dateISO);
          const dayEvents = eventsByDate[dateISO] || [];

          return (
            <View
              key={dateISO}
              data-date={dateISO}
              {...dayCellStyles}
              {...(!isCurrentMonth && otherMonthDayCellStyles)}
              {...(isDropTarget && dropTargetStyles)}
              {...(isResizeHighlight && dropTargetStyles)}
              onDragOver={(e) => handleDragOver(e, dateISO)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, dateISO)}
              {...views.dayCell}
            >
              {/* Day number */}
              <View
                {...dayNumberStyles}
                {...(isToday && todayDayNumberStyles)}
                {...(isSelected && !isToday && selectedDayNumberStyles)}
                onClick={() => handleDateClick(dateISO)}
                style={{ cursor: 'pointer' }}
                {...views.dayNumber}
              >
                {dateNum}
              </View>

              {/* Events */}
              <View {...eventsAreaStyles} {...views.eventsArea}>
                {dayEvents.map((event: any) => {
                  const colorConfig = EVENT_COLORS[event.color || 'blue'];
                  const isMultiDay = event.duration > 1;
                  const isFirstDay = event.isFirstDay !== false;

                  // Only show full event on first day
                  if (!isFirstDay) return null;

                  return (
                    <View
                      key={event.id}
                      position="relative"
                      {...eventStyles}
                      backgroundColor={colorConfig.background}
                      borderLeftColor={colorConfig.border}
                      color={colorConfig.text}
                      draggable
                      onDragStart={(e) => handleEventDragStart(e, event)}
                      title={
                        isMultiDay
                          ? `${event.title} (${event.duration} days)`
                          : event.title
                      }
                      {...views.event}
                    >
                      <View
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        width="100%"
                      >
                        {event.title}
                        {isMultiDay && ` (${event.duration}d)`}
                      </View>

                      {/* Resize handles */}
                      <ResizeHandle
                        direction="left"
                        onMouseDown={(e) => handleResizeStart(e, event, 'left')}
                      />
                      <ResizeHandle
                        direction="right"
                        onMouseDown={(e) => handleResizeStart(e, event, 'right')}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
