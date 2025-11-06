import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, Horizontal, useTheme } from 'app-studio';
import { CalendarProps, CalendarEvent, CalendarView } from './Calendar.props';
import {
  layoutEvents,
  PositionedEvent,
  DAY_NAMES,
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
  getDayOfWeek,
} from './Calendar.utils';
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
} from './Calendar.style';
import { dayDateStyles } from 'src/components/CalendarWeek/CalendarWeek/CalendarWeek.style';

interface DragState {
  isDragging: boolean;
  isResizing: boolean;
  resizeDirection: 'left' | 'right' | null;
  event: PositionedEvent | null;
  startX: number;
  startDay: number;
  startDuration: number;
  originalStart: string | null;
  originalEnd: string | null;
}

interface ResizeHandleProps {
  direction: 'left' | 'right';
  onMouseDown: (e: React.MouseEvent) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  direction,
  onMouseDown,
}) => {
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

export const Calendar: React.FC<CalendarProps> = ({
  initialDate = new Date(),
  initialView = 'month',
  events = [],
  today = new Date().toISOString().slice(0, 10),
  onEventDrop,
  onEventResize,
  onDateClick,
  onDateChange,
  onViewChange,
  onEventAdd,
  views = {},
  width = '100%',
  maxWidth = 1200,
  weekStartsOn = 0,
}) => {
  const { getColor } = useTheme();
  const gridRef = useRef<HTMLDivElement>(null);

  // Convert initialDate to ISO string if it's a Date object
  const initialDateISO =
    typeof initialDate === 'string'
      ? initialDate
      : initialDate.toISOString().slice(0, 10);

  const [currentDate, setCurrentDate] = useState<string>(initialDateISO);
  const [currentView, setCurrentView] = useState<CalendarView>(initialView);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [localEvents, setLocalEvents] = useState<CalendarEvent[]>(events);
  const [dropTargetDays, setDropTargetDays] = useState<number[]>([]);

  const dragStateRef = useRef<DragState>({
    isDragging: false,
    isResizing: false,
    resizeDirection: null,
    event: null,
    startX: 0,
    startDay: 0,
    startDuration: 0,
    originalStart: null,
    originalEnd: null,
  });

  // Update local events when props change
  React.useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  // Get the month start for current date
  const currentMonth = useMemo(
    () => getFirstDayOfMonth(currentDate),
    [currentDate]
  );

  // Generate calendar dates based on view
  const calendarDates = useMemo(() => {
    if (currentView === 'month') {
      return getCalendarDates(currentMonth, weekStartsOn);
    } else if (currentView === 'week') {
      // Get week starting from current date
      const dayOfWeek = getDayOfWeek(currentDate);
      const weekStart = addDateDays(
        currentDate,
        -((dayOfWeek - weekStartsOn + 7) % 7)
      );
      const dates: string[] = [];
      for (let i = 0; i < 7; i++) {
        dates.push(addDateDays(weekStart, i));
      }
      return dates;
    } else {
      // Day view - just current date
      return [currentDate];
    }
  }, [currentDate, currentView, currentMonth, weekStartsOn]);

  // Layout events
  const { items: positionedEvents } = useMemo(
    () => layoutEvents(localEvents, calendarDates),
    [localEvents, calendarDates]
  );

  // Get day names
  const dayNames = useMemo(() => getDayNames(weekStartsOn), [weekStartsOn]);

  // Handle navigation
  const handlePrevious = useCallback(() => {
    let newDate: string;
    if (currentView === 'month') {
      newDate = getPreviousMonth(currentDate);
    } else if (currentView === 'week') {
      newDate = addDateDays(currentDate, -7);
    } else {
      newDate = addDateDays(currentDate, -1);
    }
    setCurrentDate(newDate);
    onDateChange?.(new Date(newDate + 'T00:00:00Z'));
  }, [currentDate, currentView, onDateChange]);

  const handleNext = useCallback(() => {
    let newDate: string;
    if (currentView === 'month') {
      newDate = getNextMonth(currentDate);
    } else if (currentView === 'week') {
      newDate = addDateDays(currentDate, 7);
    } else {
      newDate = addDateDays(currentDate, 1);
    }
    setCurrentDate(newDate);
    onDateChange?.(new Date(newDate + 'T00:00:00Z'));
  }, [currentDate, currentView, onDateChange]);

  const handleToday = useCallback(() => {
    setCurrentDate(today);
    onDateChange?.(new Date(today + 'T00:00:00Z'));
  }, [today, onDateChange]);

  // Handle view change
  const handleViewChange = useCallback(
    (view: CalendarView) => {
      setCurrentView(view);
      onViewChange?.(view);
    },
    [onViewChange]
  );

  // Handle date click
  const handleDateClick = useCallback(
    (dateISO: string) => {
      setSelectedDate(dateISO);
      onDateClick?.(dateISO);
    },
    [onDateClick]
  );

  // Handle double-click to add event
  const handleDateDoubleClick = useCallback(
    (dateISO: string, hour?: number) => {
      if (onEventAdd) {
        let start: string;
        let end: string;

        if (hour !== undefined) {
          // Day view with time
          const hourStr = hour.toString().padStart(2, '0');
          start = `${dateISO}T${hourStr}:00`;
          end = `${dateISO}T${(hour + 1).toString().padStart(2, '0')}:00`;
        } else {
          // Month/week view
          start = dateISO;
          end = dateISO;
        }

        onEventAdd(start, end);
      }
    },
    [onEventAdd]
  );

  // Handle event drag start
  const handleEventDragStart = useCallback(
    (e: React.DragEvent, event: PositionedEvent) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('eventId', event.id);

      dragStateRef.current = {
        isDragging: true,
        isResizing: false,
        resizeDirection: null,
        event,
        startX: e.clientX,
        startDay: event.startDay,
        startDuration: event.duration,
        originalStart: event.start,
        originalEnd: event.end,
      };
    },
    []
  );

  // Handle drag over day cell
  const handleDragOver = useCallback((e: React.DragEvent, dayIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetDays([dayIndex]);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDropTargetDays([]);
  }, []);

  // Handle drop on day cell
  const handleDrop = useCallback(
    (e: React.DragEvent, dayIndex: number) => {
      e.preventDefault();
      setDropTargetDays([]);

      const dragState = dragStateRef.current;
      if (
        !dragState.event ||
        !dragState.originalStart ||
        !dragState.originalEnd
      )
        return;

      // Calculate date difference
      const targetDate = calendarDates[dayIndex];
      if (!targetDate) return;

      const daysDiff = daysBetweenUTC(
        targetDate,
        dragState.originalStart.slice(0, 10)
      );

      // Update event dates
      const newStart = addDateDays(
        dragState.originalStart.slice(0, 10),
        daysDiff
      );
      const newEnd = addDateDays(dragState.originalEnd.slice(0, 10), daysDiff);

      const updatedEvent: CalendarEvent = {
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
        isResizing: false,
        resizeDirection: null,
        event: null,
        startX: 0,
        startDay: 0,
        startDuration: 0,
        originalStart: null,
        originalEnd: null,
      };
    },
    [localEvents, calendarDates, onEventDrop]
  );

  // Handle resize start (FIXED - using pixel-based approach like CalendarWeek)
  const handleResizeStart = useCallback(
    (
      e: React.MouseEvent,
      event: PositionedEvent,
      direction: 'left' | 'right'
    ) => {
      e.preventDefault();
      e.stopPropagation();

      dragStateRef.current = {
        isDragging: false,
        isResizing: true,
        resizeDirection: direction,
        event,
        startX: e.clientX,
        startDay: event.startDay,
        startDuration: event.duration,
        originalStart: event.start,
        originalEnd: event.end,
      };
    },
    []
  );

  // Handle mouse move during resize (FIXED - using pixel-based calculation)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState.event || (!dragState.isDragging && !dragState.isResizing))
        return;
      if (!gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const deltaX = e.clientX - dragState.startX;

      // Calculate day delta based on pixel movement
      let daysDelta: number;
      if (currentView === 'month') {
        const dayWidth = rect.width / 7;
        daysDelta = Math.round(deltaX / dayWidth);
      } else if (currentView === 'week') {
        const dayWidth = rect.width / 7;
        daysDelta = Math.round(deltaX / dayWidth);
      } else {
        // Day view - no horizontal resize
        return;
      }

      if (dragState.isDragging) {
        // Dragging - move the event
        const maxDays = calendarDates.length - 1;
        const newStartDay = Math.max(
          0,
          Math.min(maxDays, dragState.startDay + daysDelta)
        );
        const duration = dragState.event.duration;
        const newEndDay = Math.min(maxDays, newStartDay + duration - 1);

        // Update drop target indicators
        const targetDays: number[] = [];
        for (let i = newStartDay; i <= newEndDay; i++) {
          targetDays.push(i);
        }
        setDropTargetDays(targetDays);

        // Update event position immediately for smooth dragging
        const updatedEvents = localEvents.map((ev) =>
          ev.id === dragState.event!.id
            ? {
                ...ev,
                start: addDateDays(
                  dragState.originalStart!,
                  newStartDay - dragState.startDay
                ),
                end: addDateDays(
                  dragState.originalEnd!,
                  newStartDay - dragState.startDay
                ),
              }
            : ev
        );
        setLocalEvents(updatedEvents);
      } else if (dragState.isResizing) {
        // Resizing
        if (dragState.resizeDirection === 'right') {
          // Resize from right
          const newDuration = Math.max(1, dragState.startDuration + daysDelta);
          const maxDays = calendarDates.length - 1;
          const newEndDay = Math.min(
            maxDays,
            dragState.startDay + newDuration - 1
          );
          const actualDuration = newEndDay - dragState.startDay + 1;

          const updatedEvents = localEvents.map((ev) =>
            ev.id === dragState.event!.id
              ? {
                  ...ev,
                  end: addDateDays(
                    dragState.originalStart!,
                    actualDuration - 1
                  ),
                }
              : ev
          );
          setLocalEvents(updatedEvents);
        } else if (dragState.resizeDirection === 'left') {
          // Resize from left
          const newStartDay = Math.max(
            0,
            Math.min(
              dragState.startDay + dragState.startDuration - 1,
              dragState.startDay + daysDelta
            )
          );
          const newDuration =
            dragState.startDay + dragState.startDuration - newStartDay;

          const updatedEvents = localEvents.map((ev) =>
            ev.id === dragState.event!.id
              ? {
                  ...ev,
                  start: addDateDays(
                    dragState.originalStart!,
                    newStartDay - dragState.startDay
                  ),
                }
              : ev
          );
          setLocalEvents(updatedEvents);
        }
      }
    },
    [localEvents, calendarDates, currentView]
  );

  // Handle mouse up - finish resize/drag
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState.event || (!dragState.isDragging && !dragState.isResizing))
        return;

      setDropTargetDays([]);

      // Find the updated event
      const updatedEvent = localEvents.find(
        (ev) => ev.id === dragState.event!.id
      );
      if (!updatedEvent) return;

      // Call appropriate callback
      if (dragState.isDragging) {
        onEventDrop?.(updatedEvent);
      } else if (dragState.isResizing) {
        onEventResize?.(updatedEvent);
      }

      // Reset drag state
      dragStateRef.current = {
        isDragging: false,
        isResizing: false,
        resizeDirection: null,
        event: null,
        startX: 0,
        startDay: 0,
        startDuration: 0,
        originalStart: null,
        originalEnd: null,
      };
    },
    [localEvents, onEventDrop, onEventResize]
  );

  // Set up global mouse event listeners
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
          const isFirstDay = i === startIdx;
          grouped[date].push({
            ...event,
            isFirstDay,
          } as any);
        }
      }
    });

    return grouped;
  }, [positionedEvents, calendarDates]);

  // Render month view
  const renderMonthView = () => (
    <>
      {/* Weekday headers */}
      <View {...weekdayHeaderStyles} {...views.weekdayHeader}>
        {dayNames.map((dayName, index) => (
          <View key={index} {...weekdayLabelStyles} {...views.weekdayLabel}>
            {dayName}
          </View>
        ))}
      </View>

      {/* Month grid */}
      <View ref={gridRef} {...monthGridStyles} {...views.monthGrid}>
        {calendarDates.map((dateISO, index) => {
          const dateNum = getDateNumber(dateISO);
          const isToday = dateISO === today;
          const isSelected = dateISO === selectedDate;
          const isCurrentMonth = isInMonth(dateISO, currentMonth);
          const isDropTarget = dropTargetDays.includes(index);
          const dayEvents = eventsByDate[dateISO] || [];

          return (
            <View
              key={dateISO}
              data-date={dateISO}
              {...dayCellStyles}
              {...(!isCurrentMonth && otherMonthDayCellStyles)}
              {...(isDropTarget && dropTargetStyles)}
              onClick={() => handleDateClick(dateISO)}
              onDoubleClick={() => handleDateDoubleClick(dateISO)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              {...views.dayCell}
            >
              <View
                {...dayNumberStyles}
                {...(isToday && todayDayNumberStyles)}
                {...(isSelected && !isToday && selectedDayNumberStyles)}
                style={{ cursor: 'pointer' }}
                {...views.dayNumber}
              >
                {dateNum}
              </View>

              <View {...eventsAreaStyles} {...views.eventsArea}>
                {dayEvents.map((event: any) => {
                  const colorConfig = EVENT_COLORS[event.color || 'blue'];
                  const isMultiDay = event.duration > 1;
                  const isFirstDay = event.isFirstDay !== false;

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

                      <ResizeHandle
                        direction="left"
                        onMouseDown={(e) => handleResizeStart(e, event, 'left')}
                      />
                      <ResizeHandle
                        direction="right"
                        onMouseDown={(e) =>
                          handleResizeStart(e, event, 'right')
                        }
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </>
  );

  // Render week view
  const renderWeekView = () => (
    <>
      <View {...weekdayHeaderStyles} {...views.weekdayHeader}>
        {calendarDates.map((dateISO, index) => {
          const dayOfWeek = getDayOfWeek(dateISO);
          const dateNum = getDateNumber(dateISO);
          const isToday = dateISO === today;

          return (
            <View
              key={dateISO}
              display="flex"
              flexDirection="column"
              alignItems="center"
              padding={8}
              gap={4}
              {...views.weekdayLabel}
            >
              <View {...weekdayLabelStyles}>{DAY_NAMES[dayOfWeek]}</View>
              <View
                {...dayDateStyles}
                {...(isToday && todayDayNumberStyles)}
                fontSize={16}
                fontWeight={isToday ? 500 : 400}
              >
                {dateNum}
              </View>
            </View>
          );
        })}
      </View>

      <View
        ref={gridRef}
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)"
        minHeight={400}
      >
        {calendarDates.map((dateISO, index) => {
          const isDropTarget = dropTargetDays.includes(index);
          const dayEvents = eventsByDate[dateISO] || [];

          return (
            <View
              key={dateISO}
              data-date={dateISO}
              {...dayCellStyles}
              {...(isDropTarget && dropTargetStyles)}
              minHeight={400}
              onClick={() => handleDateClick(dateISO)}
              onDoubleClick={() => handleDateDoubleClick(dateISO)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              <View {...eventsAreaStyles} {...views.eventsArea}>
                {dayEvents.map((event: any) => {
                  const colorConfig = EVENT_COLORS[event.color || 'blue'];
                  const isFirstDay = event.isFirstDay !== false;

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
                      title={event.title}
                      {...views.event}
                    >
                      <View
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        width="100%"
                      >
                        {event.title}
                      </View>

                      <ResizeHandle
                        direction="left"
                        onMouseDown={(e) => handleResizeStart(e, event, 'left')}
                      />
                      <ResizeHandle
                        direction="right"
                        onMouseDown={(e) =>
                          handleResizeStart(e, event, 'right')
                        }
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </>
  );

  // Render day view with hourly time slots
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dateISO = currentDate;
    const dayEvents = eventsByDate[dateISO] || [];

    return (
      <View display="flex" flexDirection="column" flex={1}>
        {hours.map((hour) => {
          const hourStr = `${hour.toString().padStart(2, '0')}:00`;

          return (
            <View
              key={hour}
              display="flex"
              borderBottom="1px solid"
              borderColor="color.gray.200"
              minHeight={60}
              onDoubleClick={() => handleDateDoubleClick(dateISO, hour)}
              cursor="pointer"
              _hover={{ backgroundColor: 'color.gray.50' }}
            >
              <View
                width={80}
                padding={8}
                fontSize={12}
                color="color.gray.600"
                borderRight="1px solid"
                borderColor="color.gray.200"
                {...views.timeColumn}
              >
                {hourStr}
              </View>

              <View
                flex={1}
                padding={8}
                position="relative"
                {...views.timeSlot}
              >
                {/* Events for this hour would go here */}
                {dayEvents
                  .filter((event: any) => {
                    // Simple check if event starts in this hour
                    if (event.start.includes('T')) {
                      const eventHour = parseInt(
                        event.start.split('T')[1].split(':')[0]
                      );
                      return eventHour === hour;
                    }
                    return false;
                  })
                  .map((event: any) => {
                    const colorConfig = EVENT_COLORS[event.color || 'blue'];

                    return (
                      <View
                        key={event.id}
                        {...eventStyles}
                        backgroundColor={colorConfig.background}
                        borderLeftColor={colorConfig.border}
                        color={colorConfig.text}
                        marginBottom={4}
                        {...views.event}
                      >
                        {event.title}
                      </View>
                    );
                  })}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View
      {...containerStyles}
      width={width}
      maxWidth={maxWidth}
      {...views.container}
    >
      {/* Header with navigation and view switcher */}
      <Horizontal {...headerStyles} {...views.header}>
        <View {...monthTitleStyles} {...views.monthTitle}>
          {getMonthName(currentMonth)} {getYear(currentMonth)}
        </View>

        <Horizontal gap={8}>
          {/* View switcher */}
          <Horizontal gap={4} {...views.viewSwitcher}>
            <View
              {...buttonStyles}
              backgroundColor={
                currentView === 'month' ? 'color.primary.100' : 'color.white'
              }
              color={
                currentView === 'month' ? 'color.primary.700' : 'color.gray.700'
              }
              onClick={() => handleViewChange('month')}
              style={{ cursor: 'pointer' }}
            >
              Month
            </View>
            <View
              {...buttonStyles}
              backgroundColor={
                currentView === 'week' ? 'color.primary.100' : 'color.white'
              }
              color={
                currentView === 'week' ? 'color.primary.700' : 'color.gray.700'
              }
              onClick={() => handleViewChange('week')}
              style={{ cursor: 'pointer' }}
            >
              Week
            </View>
            <View
              {...buttonStyles}
              backgroundColor={
                currentView === 'day' ? 'color.primary.100' : 'color.white'
              }
              color={
                currentView === 'day' ? 'color.primary.700' : 'color.gray.700'
              }
              onClick={() => handleViewChange('day')}
              style={{ cursor: 'pointer' }}
            >
              Day
            </View>
          </Horizontal>

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
              onClick={handlePrevious}
              style={{ cursor: 'pointer' }}
              {...views.navButton}
            >
              ‹
            </View>
            <View
              {...iconButtonStyles}
              onClick={handleNext}
              style={{ cursor: 'pointer' }}
              {...views.navButton}
            >
              ›
            </View>
          </Horizontal>
        </Horizontal>
      </Horizontal>

      {/* Render appropriate view */}
      {currentView === 'month' && renderMonthView()}
      {currentView === 'week' && renderWeekView()}
      {currentView === 'day' && renderDayView()}
    </View>
  );
};
