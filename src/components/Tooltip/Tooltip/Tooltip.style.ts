import { ViewProps } from 'app-studio';
import { Size, Variant, Position, Alignment } from './Tooltip.type';

export const TooltipSizes: Record<Size, ViewProps> = {
  sm: {
    padding: '4px 8px',
    fontSize: '12px',
    maxWidth: '200px',
  },
  md: {
    padding: '6px 10px',
    fontSize: '14px',
    maxWidth: '250px',
  },
  lg: {
    padding: '8px 12px',
    fontSize: '16px',
    maxWidth: '300px',
  },
};

export const getTooltip = (themeMode: string): Record<Variant, ViewProps> => {
  return {
    default: {
      backgroundColor: 'color.gray.800',
      color: 'color.white',
    },
    light: {
      backgroundColor: 'color.white',
      color: 'color.gray.800',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'color.gray.200',
    },
    dark: {
      backgroundColor: 'color.black',
      color: 'color.white',
    },
  };
  // Add dark mode conditional styling here
};

// For backward compatibility
export const TooltipVariants = getTooltip('light');

// Note: Static positioning logic has been replaced with intelligent viewport-aware
// positioning in the Tooltip component that automatically chooses optimal placement
// based on available space and prevents content from going off-screen.

// Legacy positioning function - kept for backward compatibility if needed
export const getTooltipPositionStyles = (
  position: Position,
  align: Alignment
): ViewProps => {
  const baseStyles: ViewProps = {
    position: 'absolute',
    zIndex: 1000,
  };

  // Position styles
  switch (position) {
    case 'top':
      return {
        ...baseStyles,
        bottom: '100%',
        marginBottom: '8px',
        ...(align === 'start'
          ? { left: '0' }
          : align === 'end'
          ? { right: '0' }
          : { left: '50%', transform: 'translateX(-50%)' }),
      };
    case 'right':
      return {
        ...baseStyles,
        left: '100%',
        marginLeft: '8px',
        ...(align === 'start'
          ? { top: '0' }
          : align === 'end'
          ? { bottom: '0' }
          : { top: '50%', transform: 'translateY(-50%)' }),
      };
    case 'bottom':
      return {
        ...baseStyles,
        top: '100%',
        marginTop: '8px',
        ...(align === 'start'
          ? { left: '0' }
          : align === 'end'
          ? { right: '0' }
          : { left: '50%', transform: 'translateX(-50%)' }),
      };
    case 'left':
      return {
        ...baseStyles,
        right: '100%',
        marginRight: '8px',
        ...(align === 'start'
          ? { top: '0' }
          : align === 'end'
          ? { bottom: '0' }
          : { top: '50%', transform: 'translateY(-50%)' }),
      };
    default:
      return baseStyles;
  }
};

export const getArrowStyles = (position: Position): ViewProps => {
  const baseStyles: ViewProps = {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: 'inherit',
    borderStyle: 'inherit',
    borderWidth: 'inherit',
    borderColor: 'inherit',
    transform: 'rotate(45deg)',
  };

  switch (position) {
    case 'top':
      return {
        ...baseStyles,
        bottom: '-4px',
        left: '50%',
        marginLeft: '-4px',
        borderTop: 'none',
        borderLeft: 'none',
      };
    case 'right':
      return {
        ...baseStyles,
        left: '-4px',
        top: '50%',
        marginTop: '-4px',
        borderRight: 'none',
        borderTop: 'none',
      };
    case 'bottom':
      return {
        ...baseStyles,
        top: '-4px',
        left: '50%',
        marginLeft: '-4px',
        borderBottom: 'none',
        borderRight: 'none',
      };
    case 'left':
      return {
        ...baseStyles,
        right: '-4px',
        top: '50%',
        marginTop: '-4px',
        borderLeft: 'none',
        borderBottom: 'none',
      };
    default:
      return baseStyles;
  }
};
