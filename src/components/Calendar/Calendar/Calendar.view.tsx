import React, { cloneElement, isValidElement } from 'react';
import { Horizontal, Vertical, View } from 'app-studio';
import { format, isSameDay, isSameMonth } from 'date-fns';

import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import {
  CalendarEvent,
  CalendarRenderEventContext,
  CalendarView,
  CalendarViews,
} from './Calendar.props';
import { CalendarEventInternal, formatDayKey } from './Calendar.utils';

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
  views?: CalendarViews;
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
  key: string
) => {
  const timeRange =
    format(event.startDate, 'p') +
    (event.endDate.getTime() !== event.startDate.getTime()
      ? ` – ${format(event.endDate, 'p')}`
      : '');

  return (
    <Vertical
      key={key}
      gap={4}
      padding={12}
      borderRadius={12}
      backgroundColor={context.isToday ? 'color.primary.50' : 'color.gray.100'}
      borderWidth={1}
      borderStyle="solid"
      borderColor={context.isToday ? 'color.primary.200' : 'color.gray.200'}
      {...views?.event}
    >
      <Text fontWeight="600" fontSize={14} {...views?.eventTitle}>
        {event.title}
      </Text>
      <Text fontSize={12} color="color.gray.600" {...views?.eventTime}>
        {timeRange}
      </Text>
      {event.description && context.view !== 'month' && (
        <Text fontSize={12} color="color.gray.700">
          {event.description}
        </Text>
      )}
    </Vertical>
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
  views,
}) => {
  const weekdayRow = (
    <View
      display="grid"
      gridTemplateColumns={`repeat(${weekdayLabels.length}, minmax(0, 1fr))`}
      gap={12}
    >
      {weekdayLabels.map((weekday) => (
        <Vertical
          key={formatDayKey(weekday)}
          alignItems="center"
          {...views?.dayHeader}
        >
          <Text fontWeight="600" color="color.gray.600" {...views?.dayMeta}>
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
      {...views?.container}
    >
      <Vertical gap={16} {...views?.header}>
        <Horizontal justifyContent="space-between" alignItems="center">
          <Text fontSize={20} fontWeight="700" {...views?.headerTitle}>
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
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={onToday}
            {...views?.navigationButton}
          >
            Today
          </Button>
          <Button variant="ghost" onClick={onNext} {...views?.navigationButton}>
            Next
          </Button>
        </Horizontal>
      </Vertical>

      {view !== 'day' && weekdayRow}

      <Vertical gap={12} {...views?.grid}>
        {weeks.map((week, index) => (
          <View
            key={`${view}-week-${index}`}
            display="grid"
            gridTemplateColumns={`repeat(${week.length}, minmax(0, 1fr))`}
            gap={12}
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
                  {...views?.dayColumn}
                >
                  <Horizontal
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text fontWeight="600" {...views?.dayNumber}>
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
                  <Vertical gap={8} {...views?.events}>
                    {events.length > 0
                      ? events.map((event) => {
                          const key = `${formatDayKey(day)}-${
                            event.id ?? event.title
                          }-${event.startDate.getTime()}`;

                          if (renderEvent) {
                            const rendered = renderEvent(event, context);

                            if (isValidElement(rendered)) {
                              return cloneElement(rendered, { key });
                            }

                            return (
                              <React.Fragment key={key}>
                                {rendered}
                              </React.Fragment>
                            );
                          }

                          return renderDefaultEvent(event, context, views, key);
                        })
                      : view === 'day' && (
                          <Text
                            fontSize={12}
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
