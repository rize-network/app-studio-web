import React, { useState, useRef, useCallback } from 'react';
import { Horizontal, Vertical, View } from 'app-studio';
import {
  format,
  isSameDay,
  isSameMonth,
  addDays,
  differenceInDays,
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
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

// Time slots for day view (24 hours)
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => i);

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
  const gridRef = useRef<HTMLDivElement>(null);
  const [draggedEvent, setDraggedEvent] =
    useState<CalendarEventInternal | null>(null);
  const [resizingEvent, setResizingEvent] = useState<{
    event: CalendarEventInternal;
    direction: 'start' | 'end' | 'top' | 'bottom';
    initialX: number;
    initialY: number;
  } | null>(null);

  // Get all visible days
  const allVisibleDays = weeks.flat();

  // Helper to get day from mouse position
  const getDayFromPosition = useCallback(
    (clientX: number): Date | null => {
      if (!gridRef.current) return null;

      const gridRect = gridRef.current.getBoundingClientRect();
      const relativeX = clientX - gridRect.left;
      const dayWidth = gridRect.width / weekdayLabels.length;
      const dayIndex = Math.floor(relativeX / dayWidth);

      if (dayIndex >= 0 && dayIndex < allVisibleDays.length) {
        return allVisibleDays[dayIndex];
      }
      return null;
    },
    [allVisibleDays, weekdayLabels.length]
  );

  // Helper to get time from mouse position (for day view)
  const getTimeFromPosition = useCallback((clientY: number): number => {
    if (!gridRef.current) return 0;

    const gridRect = gridRef.current.getBoundingClientRect();
    const relativeY = clientY - gridRect.top;
    const hourHeight = 60; // pixels per hour
    const hour = Math.floor(relativeY / hourHeight);

    return Math.max(0, Math.min(23, hour));
  }, []);

  // Double-click handler to create events
  const handleDoubleClick = useCallback(
    (day: Date) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onEventCreate) return;

      let start: Date;
      let end: Date;

      if (view === 'day') {
        // For day view, use time from position
        const hour = getTimeFromPosition(e.clientY);
        start = setHours(setMinutes(day, 0), hour);
        end = setHours(setMinutes(day, 0), hour + 1);
      } else {
        // For week/month view, create all-day event
        start = startOfDay(day);
        end = endOfDay(day);
      }

      onEventCreate(start, end);
    },
    [onEventCreate, view, getTimeFromPosition]
  );

  // Resize handler
  const handleResizeStart = useCallback(
    (
      event: CalendarEventInternal,
      direction: 'start' | 'end' | 'top' | 'bottom'
    ) =>
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!onEventResize) return;

        setResizingEvent({
          event,
          direction,
          initialX: e.clientX,
          initialY: e.clientY,
        });

        const handleMouseMove = (moveEvent: MouseEvent) => {
          if (!resizingEvent) return;

          if (direction === 'start' || direction === 'end') {
            // Horizontal resize (for multi-day events)
            const targetDay = getDayFromPosition(moveEvent.clientX);
            if (!targetDay) return;

            if (direction === 'start') {
              const newStart = startOfDay(targetDay);
              if (newStart < event.endDate) {
                onEventResize(event, newStart, event.endDate);
              }
            } else {
              const newEnd = endOfDay(targetDay);
              if (newEnd > event.startDate) {
                onEventResize(event, event.startDate, newEnd);
              }
            }
          } else {
            // Vertical resize (for time-based events in day view)
            const hour = getTimeFromPosition(moveEvent.clientY);

            if (direction === 'top') {
              const newStart = setHours(
                setMinutes(event.startDate, 0),
                hour
              );
              if (newStart < event.endDate) {
                onEventResize(event, newStart, event.endDate);
              }
            } else {
              const newEnd = setHours(setMinutes(event.endDate, 0), hour);
              if (newEnd > event.startDate) {
                onEventResize(event, event.startDate, newEnd);
              }
            }
          }
        };

        const handleMouseUp = () => {
          setResizingEvent(null);
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.body.style.cursor = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor =
          direction === 'start' || direction === 'end'
            ? 'col-resize'
            : 'row-resize';
      },
    [onEventResize, getDayFromPosition, getTimeFromPosition, resizingEvent]
  );

  // Drag and drop handlers
  const handleDragStart = useCallback(
    (event: CalendarEventInternal) => (e: React.DragEvent<HTMLDivElement>) => {
      setDraggedEvent(event);
      e.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (targetDay: Date) => (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!draggedEvent || !onEventDrop) return;

      const daysDiff = differenceInDays(targetDay, draggedEvent.startDate);
      const newStart = addDays(draggedEvent.startDate, daysDiff);
      const newEnd = addDays(draggedEvent.endDate, daysDiff);

      onEventDrop(draggedEvent, newStart, newEnd);
      setDraggedEvent(null);
    },
    [draggedEvent, onEventDrop]
  );

  // Render event card
  const renderEventCard = useCallback(
    (
      event: CalendarEventInternal,
      day: Date,
      isMultiDay: boolean,
      span?: number
    ) => {
      const context: CalendarRenderEventContext = {
        day,
        isToday: isSameDay(day, today),
        view,
      };

      const timeRange =
        format(event.startDate, 'p') +
        (event.endDate.getTime() !== event.startDate.getTime()
          ? ` – ${format(event.endDate, 'p')}`
          : '');

      const eventCard = (
        <View
          position="relative"
          draggable
          onDragStart={onEventDrop ? handleDragStart(event) : undefined}
          width="100%"
        >
          <Vertical
            gap={4}
            padding={isMultiDay ? 6 : 8}
            borderRadius={6}
            backgroundColor="color.blue.100"
            borderWidth={1}
            borderStyle="solid"
            borderColor="color.blue.300"
            cursor="grab"
            position="relative"
            width="100%"
          >
            {/* Resize handles for multi-day events */}
            {onEventResize && isMultiDay && (
              <>
                <View
                  position="absolute"
                  left={0}
                  top={0}
                  bottom={0}
                  width="8px"
                  cursor="col-resize"
                  onMouseDown={handleResizeStart(event, 'start')}
                  backgroundColor="transparent"
                  on={{
                    _hover: {
                      backgroundColor: 'rgba(59, 130, 246, 0.3)',
                    },
                  }}
                />
                <View
                  position="absolute"
                  right={0}
                  top={0}
                  bottom={0}
                  width="8px"
                  cursor="col-resize"
                  onMouseDown={handleResizeStart(event, 'end')}
                  backgroundColor="transparent"
                  on={{
                    _hover: {
                      backgroundColor: 'rgba(59, 130, 246, 0.3)',
                    },
                  }}
                />
              </>
            )}

            {/* Resize handles for time-based events */}
            {onEventResize && !isMultiDay && view === 'day' && (
              <>
                <View
                  position="absolute"
                  left={0}
                  right={0}
                  top={0}
                  height="8px"
                  cursor="row-resize"
                  onMouseDown={handleResizeStart(event, 'top')}
                  backgroundColor="transparent"
                  on={{
                    _hover: {
                      backgroundColor: 'rgba(59, 130, 246, 0.3)',
                    },
                  }}
                />
                <View
                  position="absolute"
                  left={0}
                  right={0}
                  bottom={0}
                  height="8px"
                  cursor="row-resize"
                  onMouseDown={handleResizeStart(event, 'bottom')}
                  backgroundColor="transparent"
                  on={{
                    _hover: {
                      backgroundColor: 'rgba(59, 130, 246, 0.3)',
                    },
                  }}
                />
              </>
            )}

            <Text fontWeight="600" fontSize={11} maxLines={1}>
              {event.title}
            </Text>
            {!isMultiDay && (
              <Text fontSize={10} color="color.gray.600" maxLines={1}>
                {timeRange}
              </Text>
            )}
          </Vertical>
        </View>
      );

      if (renderEvent) {
        return renderEvent(event, context);
      }

      return (
        <HoverCard openDelay={100} closeDelay={200}>
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
              <Text fontWeight="700" fontSize={14}>
                {event.title}
              </Text>
              <Vertical gap={6}>
                <Text fontSize={12} color="color.gray.700">
                  {format(event.startDate, 'EEEE, MMMM d, yyyy')}
                </Text>
                <Text fontSize={12} color="color.gray.700">
                  {timeRange}
                </Text>
              </Vertical>
              {event.description && (
                <Text fontSize={12} color="color.gray.700">
                  {event.description}
                </Text>
              )}
            </Vertical>
          </HoverCard.Content>
        </HoverCard>
      );
    },
    [
      view,
      onEventDrop,
      onEventResize,
      handleDragStart,
      handleResizeStart,
      renderEvent,
    ]
  );

  // Render week/month view
  const renderWeekMonthView = () => {
    return (
      <Vertical gap={0} flex={1} overflow="auto">
        {weeks.map((week, weekIndex) => {
          // Group multi-day events by row
          const multiDayEventRows: CalendarEventInternal[][] = [];
          const processedEvents = new Set<string>();

          week.forEach((day) => {
            const dayKey = formatDayKey(day);
            const events = eventsByDay.get(dayKey) ?? [];

            events.forEach((event) => {
              const eventKey = `${event.id}-${event.startDate.getTime()}`;
              if (processedEvents.has(eventKey)) return;

              if (isMultiDayEvent(event)) {
                const eventStart = startOfDay(event.startDate);
                const eventEnd = startOfDay(event.endDate);

                // Check if this event starts in this week
                if (
                  eventStart >= startOfDay(week[0]) &&
                  eventStart <= endOfDay(week[week.length - 1])
                ) {
                  // Find a row for this event
                  let placed = false;
                  for (const row of multiDayEventRows) {
                    const hasConflict = row.some((e) => {
                      const eStart = startOfDay(e.startDate);
                      const eEnd = startOfDay(e.endDate);
                      return !(eventEnd < eStart || eventStart > eEnd);
                    });

                    if (!hasConflict) {
                      row.push(event);
                      placed = true;
                      break;
                    }
                  }

                  if (!placed) {
                    multiDayEventRows.push([event]);
                  }

                  processedEvents.add(eventKey);
                }
              }
            });
          });

          return (
            <Vertical key={`week-${weekIndex}`} gap={0}>
              {/* Multi-day events section */}
              {multiDayEventRows.length > 0 && (
                <View
                  position="relative"
                  minHeight="40px"
                  borderBottomWidth={1}
                  borderBottomStyle="solid"
                  borderBottomColor="color.gray.200"
                  backgroundColor="color.gray.50"
                  paddingTop={4}
                  paddingBottom={4}
                >
                  <View
                    display="grid"
                    gridTemplateColumns={`repeat(${week.length}, 1fr)`}
                    gap={0}
                    position="relative"
                  >
                    {multiDayEventRows.map((row, rowIndex) =>
                      row.map((event) => {
                        const eventStart = startOfDay(event.startDate);
                        const eventEnd = startOfDay(event.endDate);
                        const weekStart = startOfDay(week[0]);
                        const weekEnd = endOfDay(week[week.length - 1]);

                        // Calculate column start and span
                        let columnStart = 1;
                        let span = 1;

                        for (let i = 0; i < week.length; i++) {
                          const dayDate = startOfDay(week[i]);
                          if (isSameDay(dayDate, eventStart)) {
                            columnStart = i + 1;
                          }
                          if (
                            dayDate >= eventStart &&
                            dayDate <= eventEnd &&
                            dayDate <= weekEnd
                          ) {
                            if (columnStart === i + 1 || dayDate > eventStart) {
                              span = Math.max(span, i - columnStart + 2);
                            }
                          }
                        }

                        return (
                          <View
                            key={`${event.id}-${event.startDate.getTime()}`}
                            gridColumn={`${columnStart} / span ${Math.min(span, week.length - columnStart + 1)}`}
                            gridRow={rowIndex + 1}
                            paddingLeft={4}
                            paddingRight={4}
                            paddingTop={2}
                            paddingBottom={2}
                          >
                            {renderEventCard(
                              event,
                              event.startDate,
                              true,
                              span
                            )}
                          </View>
                        );
                      })
                    )}
                  </View>
                </View>
              )}

              {/* Day grid */}
              <View
                ref={weekIndex === 0 ? gridRef : undefined}
                display="grid"
                gridTemplateColumns={`repeat(${week.length}, 1fr)`}
                gap={0}
                height={view === 'month' ? '180px' : 'auto'}
                minHeight={view === 'week' ? '400px' : 'auto'}
              >
                {week.map((day) => {
                  const dayKey = formatDayKey(day);
                  const isToday = isSameDay(day, today);
                  const allEvents = eventsByDay.get(dayKey) ?? [];
                  const singleDayEvents = allEvents.filter(
                    (e) => !isMultiDayEvent(e)
                  );
                  const shouldDim =
                    view === 'month' && !isSameMonth(day, currentDate);

                  return (
                    <Vertical
                      key={dayKey}
                      gap={6}
                      padding={8}
                      borderRightWidth={1}
                      borderRightStyle="solid"
                      borderRightColor="color.gray.200"
                      borderBottomWidth={1}
                      borderBottomStyle="solid"
                      borderBottomColor="color.gray.200"
                      backgroundColor={
                        isToday ? 'color.primary.50' : 'color.white'
                      }
                      opacity={shouldDim ? 0.6 : 1}
                      display="flex"
                      flexDirection="column"
                      height="100%"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop(day)}
                      onDoubleClick={handleDoubleClick(day)}
                      cursor="pointer"
                    >
                      <Text fontWeight="600" fontSize={13}>
                        {format(day, 'd')}
                      </Text>
                      <Vertical gap={4} flex={1} overflow="auto">
                        {singleDayEvents.map((event) => (
                          <View
                            key={`${event.id}-${event.startDate.getTime()}`}
                          >
                            {renderEventCard(event, day, false)}
                          </View>
                        ))}
                      </Vertical>
                    </Vertical>
                  );
                })}
              </View>
            </Vertical>
          );
        })}
      </Vertical>
    );
  };

  // Render day view with time slots
  const renderDayView = () => {
    const day = allVisibleDays[0];
    const dayKey = formatDayKey(day);
    const events = eventsByDay.get(dayKey) ?? [];

    return (
      <Vertical gap={0} flex={1} overflow="auto">
        <View
          ref={gridRef}
          display="grid"
          gridTemplateColumns="60px 1fr"
          gap={0}
        >
          {TIME_SLOTS.map((hour) => {
            const hourEvents = events.filter((event) => {
              const eventHour = getHours(event.startDate);
              const eventEndHour = getHours(event.endDate);
              return eventHour === hour || (eventHour < hour && eventEndHour > hour);
            });

            return (
              <React.Fragment key={hour}>
                {/* Time label */}
                <View
                  padding={8}
                  borderBottomWidth={1}
                  borderBottomStyle="solid"
                  borderBottomColor="color.gray.200"
                  backgroundColor="color.gray.50"
                >
                  <Text fontSize={11} color="color.gray.600">
                    {format(setHours(new Date(), hour), 'ha')}
                  </Text>
                </View>

                {/* Hour slot */}
                <View
                  position="relative"
                  minHeight="60px"
                  borderBottomWidth={1}
                  borderBottomStyle="solid"
                  borderBottomColor="color.gray.200"
                  borderLeftWidth={1}
                  borderLeftStyle="solid"
                  borderLeftColor="color.gray.200"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(setHours(day, hour))}
                  onDoubleClick={handleDoubleClick(day)}
                  cursor="pointer"
                >
                  {hourEvents.map((event) => {
                    const eventHour = getHours(event.startDate);
                    const eventMinutes = getMinutes(event.startDate);
                    const durationHours =
                      (event.endDate.getTime() - event.startDate.getTime()) /
                      (1000 * 60 * 60);

                    if (eventHour !== hour) return null;

                    return (
                      <View
                        key={`${event.id}-${event.startDate.getTime()}`}
                        position="absolute"
                        top={`${(eventMinutes / 60) * 100}%`}
                        left="4px"
                        right="4px"
                        height={`${Math.max(durationHours * 60, 30)}px`}
                        zIndex={1}
                      >
                        {renderEventCard(event, day, false)}
                      </View>
                    );
                  })}
                </View>
              </React.Fragment>
            );
          })}
        </View>
      </Vertical>
    );
  };

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
      maxWidth="100%"
      display="flex"
      flexDirection="column"
      {...views?.container}
    >
      {/* Header */}
      <Vertical gap={16} flexShrink={0}>
        <Horizontal justifyContent="space-between" alignItems="center">
          <Text fontSize={18} fontWeight="700">
            {label}
          </Text>
          <Horizontal gap={8}>
            {VIEW_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={view === option.value ? 'filled' : 'ghost'}
                isDisabled={view === option.value}
                onClick={() => onViewChange(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </Horizontal>
        </Horizontal>
        <Horizontal gap={8} alignItems="center">
          <Button variant="ghost" onClick={onPrevious}>
            ← Previous{' '}
            {view === 'day' ? 'Day' : view === 'week' ? 'Week' : 'Month'}
          </Button>
          <Button variant="ghost" onClick={onToday}>
            Today
          </Button>
          <Button variant="ghost" onClick={onNext}>
            Next {view === 'day' ? 'Day' : view === 'week' ? 'Week' : 'Month'} →
          </Button>
        </Horizontal>
      </Vertical>

      {/* Weekday headers (for week/month view) */}
      {view !== 'day' && (
        <View
          display="grid"
          gridTemplateColumns={`repeat(${weekdayLabels.length}, 1fr)`}
          gap={0}
          padding="8px 0"
          flexShrink={0}
        >
          {weekdayLabels.map((weekday) => (
            <View key={formatDayKey(weekday)} textAlign="center" padding={8}>
              <Text fontWeight="600" fontSize={12} color="color.gray.600">
                {format(weekday, 'EEE')}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Calendar grid */}
      {view === 'day' ? renderDayView() : renderWeekMonthView()}
    </Vertical>
  );
};

export default CalendarViewComponent;
