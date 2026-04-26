import { ViewProps } from 'app-studio';
import { Size, Variant, Position, Alignment } from './Tooltip.type';
// Defines a mapping of tooltip sizes (small, medium, large) to their respective CSS properties, such as padding, font size, and maximum width.
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
// A factory function that generates a record of tooltip variant styles (e.g., default, light, dark) based on the provided theme mode, applying specific background colors, text colors, border radii, and box shadows.
export const getTooltip = (themeMode: string): Record<Variant, ViewProps> => {
  return {
    default: {
      backgroundColor: 'color-gray-900',
      color: 'color-white',
      borderRadius: '8px',
      boxShadow:
        '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      transition: 'opacity 0.15s ease',
    },
    light: {
      backgroundColor: 'color-white',
      color: 'color-gray-800',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'color-gray-200',
      borderRadius: '8px',
      boxShadow:
        '0px 4px 6px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.04)',
      transition: 'opacity 0.15s ease',
    },
    dark: {
      backgroundColor: 'color-gray-950',
      color: 'color-white',
      borderRadius: '8px',
      boxShadow:
        '0px 4px 6px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.12)',
      transition: 'opacity 0.15s ease',
    },
  };
};
// Exports a set of tooltip variant styles, initialized by calling `getTooltip` with the 'light' theme mode to establish a default appearance.
export const TooltipVariants = getTooltip('light');
// Calculates and returns the CSS styles necessary to position the tooltip accurately relative to its trigger element, taking into account its desired `position` and `alignment`.
export const getTooltipPositionStyles = (
  // Parameter: `position` specifies the primary direction (e.g., 'top', 'bottom', 'left', 'right') where the tooltip should appear.
  position: Position,
  // Parameter: `align` defines the secondary alignment of the tooltip along its specified `position` (e.g., 'start', 'end', 'center').
  align: Alignment
): ViewProps => {
  const baseStyles: ViewProps = {
    position: 'absolute',
    zIndex: 1000,
  };
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
// Determines and returns the CSS styles for the small triangular arrow that points from the tooltip towards its trigger element, adjusting its orientation based on the tooltip's `position`.
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
