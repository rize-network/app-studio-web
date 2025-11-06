import { ViewProps } from 'app-studio';

/**
 * Event color configurations
 */
export const EVENT_COLORS = {
  blue: {
    background: 'color.blue.50',
    border: 'color.blue.500',
    text: 'color.blue.700',
  },
  red: {
    background: 'color.red.50',
    border: 'color.red.500',
    text: 'color.red.700',
  },
  green: {
    background: 'color.green.50',
    border: 'color.green.500',
    text: 'color.green.700',
  },
  purple: {
    background: 'color.purple.50',
    border: 'color.purple.500',
    text: 'color.purple.700',
  },
  orange: {
    background: 'color.orange.50',
    border: 'color.orange.500',
    text: 'color.orange.700',
  },
} as const;

/**
 * Base styles for the calendar container
 */
export const containerStyles: ViewProps = {
  width: '100%',
  maxWidth: 1200,
  border: '1px solid',
  borderColor: 'color.gray.200',
  borderRadius: 8,
  overflow: 'hidden',
  backgroundColor: 'color.white',
};

/**
 * Header styles (navigation bar)
 */
export const headerStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
  paddingLeft: 20,
  paddingRight: 20,
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  backgroundColor: 'color.white',
};

/**
 * Month title styles
 */
export const monthTitleStyles: ViewProps = {
  fontSize: 20,
  fontWeight: 500,
  color: 'color.gray.900',
};

/**
 * Navigation button styles
 */
export const navButtonStyles: ViewProps = {
  display: 'flex',
  gap: 8,
};

/**
 * Month grid styles (7 columns for days)
 */
export const monthGridStyles: ViewProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  backgroundColor: 'color.white',
};

/**
 * Weekday header row styles
 */
export const weekdayHeaderStyles: ViewProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  backgroundColor: 'color.gray.50',
};

/**
 * Individual weekday label styles
 */
export const weekdayLabelStyles: ViewProps = {
  padding: 8,
  textAlign: 'center',
  fontSize: 11,
  fontWeight: 500,
  color: 'color.gray.700',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

/**
 * Individual day cell styles
 */
export const dayCellStyles: ViewProps = {
  border: '1px solid',
  borderColor: 'color.gray.200',
  minHeight: 100,
  padding: 8,
  paddingTop: 4,
  backgroundColor: 'color.white',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};

/**
 * Day cell from different month
 */
export const otherMonthDayCellStyles: ViewProps = {
  backgroundColor: 'color.gray.50',
  opacity: 0.5,
};

/**
 * Day number styles
 */
export const dayNumberStyles: ViewProps = {
  fontSize: 14,
  fontWeight: 400,
  color: 'color.gray.900',
  marginBottom: 4,
  padding: 4,
  paddingLeft: 8,
  paddingRight: 8,
  borderRadius: 4,
  alignSelf: 'flex-start',
};

/**
 * Today day number styles
 */
export const todayDayNumberStyles: ViewProps = {
  backgroundColor: 'color.blue.500',
  color: 'color.white',
  fontWeight: 500,
};

/**
 * Selected day number styles
 */
export const selectedDayNumberStyles: ViewProps = {
  backgroundColor: 'color.blue.50',
  color: 'color.blue.700',
  fontWeight: 500,
};

/**
 * Events area styles (container for events in a day)
 */
export const eventsAreaStyles: ViewProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  flex: 1,
  position: 'relative',
};

/**
 * Base event styles
 */
export const eventStyles: ViewProps = {
  height: 20,
  display: 'flex',
  alignItems: 'center',
  padding: 4,
  paddingLeft: 6,
  paddingRight: 6,
  borderRadius: 3,
  borderLeft: '3px solid',
  fontSize: 11,
  fontWeight: 500,
  overflow: 'hidden',
  cursor: 'grab',
  transition: 'box-shadow 0.2s',
  userSelect: 'none',
  marginBottom: 2,
};

/**
 * Drop target indicator styles
 */
export const dropTargetStyles: ViewProps = {
  backgroundColor: 'rgba(26, 115, 232, 0.08)',
  boxShadow: 'inset 0 0 0 2px rgba(26, 115, 232, 0.3)',
};

/**
 * Calculate event position styles for multi-day events
 */
export const getEventPositionStyles = (
  startDay: number,
  endDay: number,
  weekIndex: number,
  dayOfWeek: number
): React.CSSProperties => {
  const weekStart = weekIndex * 7;
  const weekEnd = weekStart + 6;

  // Clamp to current week
  const eventStart = Math.max(startDay, weekStart);
  const eventEnd = Math.min(endDay, weekEnd);

  const startCol = (eventStart % 7) + 1; // CSS Grid is 1-indexed
  const endCol = (eventEnd % 7) + 2; // +2 because end is inclusive

  return {
    gridColumn: `${startCol} / ${endCol}`,
  };
};

/**
 * Button base styles
 */
export const buttonStyles: ViewProps = {
  padding: 8,
  paddingLeft: 12,
  paddingRight: 12,
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  border: '1px solid',
  borderColor: 'color.gray.300',
  backgroundColor: 'color.white',
  color: 'color.gray.700',
  transition: 'all 0.2s',
};

/**
 * Icon button styles
 */
export const iconButtonStyles: ViewProps = {
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: 'color.gray.700',
  transition: 'all 0.2s',
  border: 'none',
};
