import React from 'react';
import { ViewProps } from 'app-studio';
import { ButtonProps } from '../../Button/Button/Button.props';
import { TextProps } from '../../Text/Text/Text.props';

export type CalendarView = 'day' | 'week' | 'month';

export interface CalendarEvent {
  /** Unique identifier for the event. */
  id?: string | number;
  /** Event title shown in the calendar cell. */
  title: string;
  /** Start date/time of the event. */
  start: Date | string;
  /** Optional end date/time of the event. */
  end?: Date | string;
  /** Optional description or supporting information. */
  description?: string;
  /** Additional metadata the consumer wants to keep with the event. */
  metadata?: Record<string, unknown>;
}

export interface CalendarRenderEventContext {
  /** Date of the cell currently being rendered. */
  day: Date;
  /** Active calendar view. */
  view: CalendarView;
  /** Whether the given day is today. */
  isToday: boolean;
}

export interface CalendarViews {
  container?: ViewProps;
  header?: ViewProps;
  headerTitle?: TextProps;
  navigation?: ViewProps;
  viewSwitcher?: ViewProps;
  grid?: ViewProps;
  weekdayRow?: ViewProps;
  weekdayHeader?: ViewProps;
  weekdayLabel?: TextProps;
  weekRow?: ViewProps;
  dayColumn?: ViewProps;
  dayHeader?: ViewProps;
  dayNumber?: TextProps;
  dayMeta?: TextProps;
  events?: ViewProps;
  event?: ViewProps;
  eventTitle?: TextProps;
  eventTime?: TextProps;
  emptyState?: TextProps;
  navigationButton?: Partial<ButtonProps>;
  viewButton?: Partial<ButtonProps>;
}

export interface CalendarProps {
  /** Calendar events to render. */
  events?: CalendarEvent[];
  /** Starting date displayed in the calendar. */
  initialDate?: Date | string;
  /** Initial visible view. */
  initialView?: CalendarView;
  /** First day of the week, defaults to Sunday. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Height of the calendar container. */
  height?: string | number;
  /** Optional custom render method for events. */
  renderEvent?: (
    event: CalendarEvent,
    context: CalendarRenderEventContext
  ) => React.ReactNode;
  /** Called when the visible anchor date changes. */
  onDateChange?: (date: Date) => void;
  /** Called when the active view changes. */
  onViewChange?: (view: CalendarView) => void;
  /** Called when an event is moved to a new date/time via drag and drop. */
  onEventDrop?: (event: CalendarEvent, newStart: Date, newEnd: Date) => void;
  /** Called when an event is resized to a new duration. */
  onEventResize?: (event: CalendarEvent, newStart: Date, newEnd: Date) => void;
  /** Called when user double-clicks to create a new event. */
  onEventCreate?: (start: Date, end: Date) => void;
  /** Customise styling of calendar areas. */
  views?: CalendarViews;
}
