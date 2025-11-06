import { ViewProps } from 'app-studio';

export interface CalendarMonthEvent {
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

export interface CalendarMonthViews {
  /** Style overrides for the main container */
  container?: ViewProps;
  /** Style overrides for the header (navigation) */
  header?: ViewProps;
  /** Style overrides for the month/year title */
  monthTitle?: ViewProps;
  /** Style overrides for navigation buttons */
  navButton?: ViewProps;
  /** Style overrides for the month grid */
  monthGrid?: ViewProps;
  /** Style overrides for weekday header row */
  weekdayHeader?: ViewProps;
  /** Style overrides for individual weekday labels */
  weekdayLabel?: ViewProps;
  /** Style overrides for individual day cells */
  dayCell?: ViewProps;
  /** Style overrides for day numbers */
  dayNumber?: ViewProps;
  /** Style overrides for the events area */
  eventsArea?: ViewProps;
  /** Style overrides for individual events */
  event?: ViewProps;
}

export interface CalendarMonthProps {
  /** Initial month to display in ISO format (YYYY-MM-DD) or Date object */
  initialDate?: string | Date;
  /** Array of events to display */
  events?: CalendarMonthEvent[];
  /** Today's date in ISO format (defaults to current date) */
  today?: string;
  /** Callback when an event is dragged to a new position */
  onEventDrop?: (event: CalendarMonthEvent) => void;
  /** Callback when an event is resized */
  onEventResize?: (event: CalendarMonthEvent) => void;
  /** Callback when a date is clicked */
  onDateClick?: (date: string) => void;
  /** Callback when month changes */
  onMonthChange?: (date: Date) => void;
  /** Style overrides for various parts of the component */
  views?: CalendarMonthViews;
  /** Width of the calendar (default: '100%') */
  width?: number | string;
  /** Maximum width of the calendar (default: 1200) */
  maxWidth?: number | string;
  /** First day of the week (0 = Sunday, 1 = Monday, etc.) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
