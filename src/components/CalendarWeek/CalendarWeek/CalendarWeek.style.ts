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
 * Week grid styles (7 columns)
 */
export const weekGridStyles: ViewProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  position: 'relative',
  width: '100%',
};

/**
 * Individual day column styles
 */
export const dayColumnStyles: ViewProps = {
  borderRight: '1px solid',
  borderColor: 'color.gray.200',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 160,
  backgroundColor: 'color.white',
  position: 'relative',
};

/**
 * Day header styles
 */
export const dayHeaderStyles: ViewProps = {
  padding: 8,
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  backgroundColor: 'color.gray.50',
  minHeight: 60,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
};

/**
 * Day name styles (e.g., "Mon", "Tue")
 */
export const dayNameStyles: ViewProps = {
  fontSize: 11,
  fontWeight: 500,
  color: 'color.gray.700',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

/**
 * Day date styles (the circular number)
 */
export const dayDateStyles: ViewProps = {
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  fontSize: 13,
  fontWeight: 400,
  color: 'color.gray.900',
  cursor: 'pointer',
  transition: 'all 0.2s',
  border: '2px solid transparent',
};

/**
 * Today date styles
 */
export const todayDateStyles: ViewProps = {
  backgroundColor: 'color.blue.500',
  color: 'color.white',
  fontWeight: 500,
};

/**
 * Selected date styles
 */
export const selectedDateStyles: ViewProps = {
  borderColor: 'color.blue.500',
};

/**
 * Events area styles
 */
export const eventsAreaStyles: ViewProps = {
  padding: 8,
  paddingLeft: 6,
  paddingRight: 6,
  flex: 1,
  position: 'relative',
};

/**
 * Events layer styles (absolute positioned over the grid)
 */
export const eventsLayerStyles: ViewProps = {
  position: 'absolute',
  top: 60, // height of headers
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
};

/**
 * Base event styles
 */
export const eventStyles: ViewProps = {
  position: 'absolute',
  height: 22,
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  paddingLeft: 8,
  paddingRight: 8,
  borderRadius: 4,
  borderLeft: '3px solid',
  fontSize: 12,
  fontWeight: 500,
  overflow: 'hidden',
  cursor: 'grab',
  transition: 'box-shadow 0.2s',
  pointerEvents: 'auto',
  userSelect: 'none',
};

/**
 * Drop target indicator styles
 */
export const dropTargetStyles: ViewProps = {
  backgroundColor: 'rgba(26, 115, 232, 0.05)',
};

/**
 * Calculate event position styles
 */
export const getEventPositionStyles = (
  startDay: number,
  duration: number,
  row: number
): React.CSSProperties => {
  const dayWidth = 100 / 7;
  const left = startDay * dayWidth;
  const width = duration * dayWidth;

  return {
    left: `calc(${left}% + 6px)`,
    width: `calc(${width}% - 12px)`,
    top: `${8 + row * 26}px`,
  };
};

/**
 * Resize handle styles
 */
export const resizeHandleStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 8,
  opacity: 0,
  transition: 'opacity 0.2s',
  zIndex: 10,
};

export const leftResizeHandleStyles: React.CSSProperties = {
  ...resizeHandleStyles,
  left: 0,
  cursor: 'w-resize',
};

export const rightResizeHandleStyles: React.CSSProperties = {
  ...resizeHandleStyles,
  right: 0,
  cursor: 'e-resize',
};
