import { ViewProps } from 'app-studio';

export type CalendarView = 'month' | 'week' | 'day';

export interface CalendarEvent {
  /** Unique identifier for the event */
  id: string;
  /** Event title/label */
  title: string;
  /** Event description */
  description?: string;
  /** Start date in ISO format (YYYY-MM-DD) or datetime (YYYY-MM-DDTHH:MM) */
  start: string;
  /** End date in ISO format (YYYY-MM-DD) or datetime (YYYY-MM-DDTHH:MM) */
  end: string;
  /** Color variant for the event */
  color?: 'blue' | 'red' | 'green' | 'purple' | 'orange';
}

export interface CalendarViews {
  /** Style overrides for the main container */
  container?: ViewProps;
  /** Style overrides for the header (navigation) */
  header?: ViewProps;
  /** Style overrides for the month/year title */
  monthTitle?: ViewProps;
  /** Style overrides for navigation buttons */
  navButton?: ViewProps;
  /** Style overrides for view switcher buttons */
  viewSwitcher?: ViewProps;
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
  /** Style overrides for time column (day view) */
  timeColumn?: ViewProps;
  /** Style overrides for time slot */
  timeSlot?: ViewProps;
}

export interface CalendarProps {
  /** Initial date to display in ISO format (YYYY-MM-DD) or Date object */
  initialDate?: string | Date;
  /** Initial view to display */
  initialView?: CalendarView;
  /** Array of events to display */
  events?: CalendarEvent[];
  /** Today's date in ISO format (defaults to current date) */
  today?: string;
  /** Callback when an event is dragged to a new position */
  onEventDrop?: (event: CalendarEvent) => void;
  /** Callback when an event is resized */
  onEventResize?: (event: CalendarEvent) => void;
  /** Callback when a date is clicked */
  onDateClick?: (date: string) => void;
  /** Callback when date/time changes */
  onDateChange?: (date: Date) => void;
  /** Callback when view changes */
  onViewChange?: (view: CalendarView) => void;
  /** Callback when double-clicking to add new event */
  onEventAdd?: (start: string, end: string) => void;
  /** Callback when an event's title changes */
  onEventTitleChange?: (event: CalendarEvent, newTitle: string) => void;
  /** Callback when an event's description changes */
  onEventDescriptionChange?: (
    event: CalendarEvent,
    newDescription: string
  ) => void;
  /** Callback when an event is deleted */
  onEventDelete?: (event: CalendarEvent) => void;
  /** Style overrides for various parts of the component */
  views?: CalendarViews;
  /** Width of the calendar (default: '100%') */
  width?: number | string;
  /** Maximum width of the calendar (default: 1200) */
  maxWidth?: number | string;
  /** First day of the week (0 = Sunday, 1 = Monday, etc.) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
