import React, { useRef, useState, useCallback, useMemo } from 'react';
import { View, useTheme } from 'app-studio';
import { CalendarWeekProps, CalendarWeekEvent } from './CalendarWeek.props';
import {
  layoutEvents,
  PositionedEvent,
  DAY_NAMES,
  getDateForDay,
  getDayOfWeek,
  getDateNumber,
  addDateDays,
} from './CalendarWeek.utils';
import {
  containerStyles,
  dayColumnStyles,
  dayHeaderStyles,
  dayNameStyles,
  dayDateStyles,
  todayDateStyles,
  selectedDateStyles,
  eventsAreaStyles,
  EVENT_COLORS,
  getEventPositionStyles,
  dropTargetStyles,
} from './CalendarWeek.style';

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

export const CalendarWeek: React.FC<CalendarWeekProps> = ({
  startDate,
  events = [],
  today = new Date().toISOString().slice(0, 10),
  onEventDrop,
  onEventResize,
  onDateClick,
  views = {},
  width = '100%',
  maxWidth = 1200,
}) => {
  const { getColor } = useTheme();
  const weekGridRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [localEvents, setLocalEvents] = useState<CalendarWeekEvent[]>(events);
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

  // Layout events
  const { items: positionedEvents } = useMemo(
    () => layoutEvents(localEvents, startDate),
    [localEvents, startDate]
  );

  // Get day index from mouse X position
  const getDayFromMouseX = useCallback((clientX: number): number => {
    if (!weekGridRef.current) return 0;
    const rect = weekGridRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const dayWidth = rect.width / 7;
    return Math.max(0, Math.min(6, Math.floor(relativeX / dayWidth)));
  }, []);

  // Handle date click
  const handleDateClick = useCallback(
    (dateISO: string) => {
      setSelectedDate(dateISO);
      onDateClick?.(dateISO);
    },
    [onDateClick]
  );

  // Handle mouse down on event (start dragging)
  const handleEventMouseDown = useCallback(
    (e: React.MouseEvent, event: PositionedEvent) => {
      e.preventDefault();
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

  // Handle mouse down on resize handle
  const handleResizeMouseDown = useCallback(
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

  // Handle mouse move (dragging or resizing)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState.event || (!dragState.isDragging && !dragState.isResizing))
        return;
      if (!weekGridRef.current) return;

      const rect = weekGridRef.current.getBoundingClientRect();
      const dayWidth = rect.width / 7;
      const deltaX = e.clientX - dragState.startX;
      const daysDelta = Math.round(deltaX / dayWidth);

      if (dragState.isDragging) {
        // Calculate new position
        const newStartDay = Math.max(
          0,
          Math.min(6, dragState.startDay + daysDelta)
        );
        const duration = dragState.event.duration;
        const newEndDay = Math.min(6, newStartDay + duration - 1);

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
        // Handle resizing
        if (dragState.resizeDirection === 'right') {
          const newDuration = Math.max(1, dragState.startDuration + daysDelta);
          const newEndDay = Math.min(6, dragState.startDay + newDuration - 1);
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
    [localEvents]
  );

  // Handle mouse up (finish dragging or resizing)
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

  return (
    <View
      {...containerStyles}
      width={width}
      maxWidth={maxWidth}
      {...views.container}
    >
      <View
        ref={weekGridRef}
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)"
        position="relative"
        width="100%"
        {...views.weekGrid}
      >
        {/* Day columns */}
        {Array.from({ length: 7 }).map((_, dayIdx) => {
          const dateISO = getDateForDay(startDate, dayIdx);
          const dayOfWeek = getDayOfWeek(dateISO);
          const dateNum = getDateNumber(dateISO);
          const isToday = dateISO === today;
          const isSelected = dateISO === selectedDate;
          const isDropTarget = dropTargetDays.includes(dayIdx);

          return (
            <View
              key={dayIdx}
              {...dayColumnStyles}
              {...(isDropTarget && dropTargetStyles)}
              borderRight={dayIdx === 6 ? 'none' : '1px solid'}
              {...views.dayColumn}
            >
              {/* Day header */}
              <View {...dayHeaderStyles} {...views.dayHeader}>
                <View {...dayNameStyles} {...views.dayName}>
                  {DAY_NAMES[dayOfWeek]}
                </View>
                <View
                  {...dayDateStyles}
                  {...(isToday && todayDateStyles)}
                  {...(isSelected && !isToday && selectedDateStyles)}
                  onClick={() => handleDateClick(dateISO)}
                  {...views.dayDate}
                >
                  {dateNum}
                </View>
              </View>

              {/* Events area (empty, just for spacing) */}
              <View {...eventsAreaStyles} {...views.eventsArea} />
            </View>
          );
        })}

        {/* Events layer */}
        <View
          position="absolute"
          top={60}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
        >
          {positionedEvents.map((event) => {
            const colorConfig = EVENT_COLORS[event.color || 'blue'];
            const positionStyles = getEventPositionStyles(
              event.startDay,
              event.duration,
              event.row
            );

            const isDragging =
              dragStateRef.current.isDragging &&
              dragStateRef.current.event?.id === event.id;
            const isResizing =
              dragStateRef.current.isResizing &&
              dragStateRef.current.event?.id === event.id;

            return (
              <View
                key={event.id}
                position="absolute"
                height={22}
                display="flex"
                alignItems="center"
                padding={8}
                paddingLeft={8}
                paddingRight={8}
                borderRadius={4}
                backgroundColor={colorConfig.background}
                borderLeft={`3px solid`}
                borderLeftColor={colorConfig.border}
                color={colorConfig.text}
                fontSize={12}
                fontWeight={500}
                overflow="hidden"
                cursor={isDragging ? 'grabbing' : 'grab'}
                opacity={isDragging || isResizing ? 0.7 : 1}
                boxShadow={
                  isDragging || isResizing
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 1px 2px rgba(0,0,0,0.1)'
                }
                transition={
                  isDragging || isResizing ? 'none' : 'box-shadow 0.2s'
                }
                pointerEvents="auto"
                userSelect="none"
                left={positionStyles.left}
                width={positionStyles.width}
                top={positionStyles.top}
                onMouseDown={(e) => handleEventMouseDown(e, event)}
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

                {/* Resize handles */}
                <ResizeHandle
                  direction="left"
                  onMouseDown={(e) => handleResizeMouseDown(e, event, 'left')}
                />
                <ResizeHandle
                  direction="right"
                  onMouseDown={(e) => handleResizeMouseDown(e, event, 'right')}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
