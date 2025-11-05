import React, { cloneElement, isValidElement, useState } from 'react';
import { Horizontal, Vertical, View } from 'app-studio';
import { format, isSameDay, isSameMonth, addDays, addHours, differenceInDays, differenceInHours } from 'date-fns';

import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { HoverCard } from '../../HoverCard/HoverCard';
import {
  CalendarEvent,
  CalendarRenderEventContext,
  CalendarView,
  CalendarViews,
} from './Calendar.props';
import { CalendarEventInternal, formatDayKey, getEventSpanInfo, isMultiDayEvent } from './Calendar.utils';

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
  onEventDrop?: (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) => void;
  onEventResize?: (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) => void;
  views?: CalendarViews;
  height?: string | number;
}

const VIEW_OPTIONS: { label: string; value: CalendarView }[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

const today = new Date();

const renderDefaultEvent = (
  event: CalendarEventInternal,
  context: CalendarRenderEventContext,
  views: CalendarViews | undefined,
  key: string,
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void,
  onResizeStart?: (e: React.MouseEvent<HTMLDivElement>, direction: 'start' | 'end') => void
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
        backgroundColor={context.isToday ? 'color.primary.50' : 'color.gray.100'}
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
            style={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        )}

        <Text fontWeight="600" fontSize={12} maxLines={2} {...views?.eventTitle}>
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
            style={{
              '&:hover': {
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
  const [draggedEvent, setDraggedEvent] = useState<CalendarEventInternal | null>(null);
  const [resizingEvent, setResizingEvent] = useState<{
    event: CalendarEventInternal;
    direction: 'start' | 'end';
    originalStart: Date;
    originalEnd: Date;
  } | null>(null);

  // Use same grid configuration for both header and days
  const columnCount = weekdayLabels.length;

  // Drag and Drop Handlers
  const handleDragStart = (event: CalendarEventInternal) => (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (targetDay: Date) => (e: React.DragEvent<HTMLDivElement>) => {
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

  // Resize Handlers
  const handleResizeStart = (event: CalendarEventInternal, direction: 'start' | 'end') => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingEvent({
      event,
      direction,
      originalStart: event.startDate,
      originalEnd: event.endDate,
    });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      // This would need more complex logic to detect which day the mouse is over
      // For simplicity, we'll handle this in the mouse up event
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
    if (resizingEvent && onEventResize) {
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

      {view !== 'day' && <View flexShrink={0}>{weekdayRow}</View>}

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
                          if (isMultiDay && spanInfo && !spanInfo.isFirst && view !== 'day') {
                            return null;
                          }

                          if (renderEvent) {
                            const rendered = renderEvent(event, context);

                            if (isValidElement(rendered)) {
                              return cloneElement(rendered, {
                                key,
                                draggable: true,
                                onDragStart: onEventDrop ? handleDragStart(event) : undefined,
                              });
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
                            onEventResize ? (e, direction) => handleResizeStart(event, direction)(e) : undefined
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
    </Vertical>
  );
};

export default CalendarViewComponent;
