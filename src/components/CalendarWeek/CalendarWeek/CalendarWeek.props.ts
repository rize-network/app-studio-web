import { ViewProps } from 'app-studio';

export interface CalendarWeekEvent {
  /** Unique identifier for the event */
  id: string;
  /** Event title/label */
  title: string;
  /** Start date in ISO format (YYYY-MM-DD) */
  start: string;
  /** End date in ISO format (YYYY-MM-DD) */
  end: string;
  /** Color variant for the event */
  color?: 'blue' | 'red' | 'green' | 'purple' | 'orange';
}

export interface CalendarWeekViews {
  /** Style overrides for the main container */
  container?: ViewProps;
  /** Style overrides for the week grid */
  weekGrid?: ViewProps;
  /** Style overrides for individual day columns */
  dayColumn?: ViewProps;
  /** Style overrides for day column headers */
  dayHeader?: ViewProps;
  /** Style overrides for day names (e.g., "Mon", "Tue") */
  dayName?: ViewProps;
  /** Style overrides for day dates (the circular number) */
  dayDate?: ViewProps;
  /** Style overrides for the events area */
  eventsArea?: ViewProps;
  /** Style overrides for individual events */
  event?: ViewProps;
}

export interface CalendarWeekProps {
  /** Start date of the week in ISO format (YYYY-MM-DD) */
  startDate: string;
  /** Array of events to display */
  events?: CalendarWeekEvent[];
  /** Today's date in ISO format (defaults to current date) */
  today?: string;
  /** Callback when an event is dragged to a new position */
  onEventDrop?: (event: CalendarWeekEvent) => void;
  /** Callback when an event is resized */
  onEventResize?: (event: CalendarWeekEvent) => void;
  /** Callback when a date is clicked */
  onDateClick?: (date: string) => void;
  /** Style overrides for various parts of the component */
  views?: CalendarWeekViews;
  /** Width of the calendar (default: '100%') */
  width?: number | string;
  /** Maximum width of the calendar (default: 1200) */
  maxWidth?: number | string;
}
