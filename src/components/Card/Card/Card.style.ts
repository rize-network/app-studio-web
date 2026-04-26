import { ViewProps } from 'app-studio';
import { CardStyles, Shape, Size, Variant } from './Card.type';
// Defines a mapping of various card sizes (small, medium, large) to their respective padding styles.
export const CardSizes: Record<Size, ViewProps> = {
  sm: {
    padding: '12px',
  },
  md: {
    padding: '16px',
  },
  lg: {
    padding: '24px',
  },
};
// Defines a mapping of various card shapes (square, rounded, pill) to their respective border-radius values.
export const CardShapes: Record<Shape, number | string> = {
  square: 0,
  rounded: '8px',
  pill: '24px',
};
// Generates a set of card style variants (default, outlined, elevated) dynamically, adapting their appearance based on the current theme mode.
export const getCardVariants = (
  themeMode: string
): Record<Variant, ViewProps> => {
  const isDark = themeMode === 'dark';
  return {
    default: {
      backgroundColor: isDark ? 'color-gray-900' : 'color-white',
      border: 'none',
      transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    },
    outlined: {
      backgroundColor: isDark ? 'color-gray-900' : 'color-white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isDark ? 'color-gray-700' : 'color-gray-200',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      _hover: {
        borderColor: isDark ? 'color-gray-600' : 'color-gray-300',
        boxShadow: isDark
          ? '0px 1px 3px rgba(0, 0, 0, 0.3)'
          : '0px 1px 3px rgba(0, 0, 0, 0.05)',
      },
    },
    elevated: {
      backgroundColor: isDark ? 'color-gray-900' : 'color-white',
      boxShadow: isDark
        ? '0px 1px 3px rgba(0, 0, 0, 0.35), 0px 1px 2px rgba(0, 0, 0, 0.3)'
        : '0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      border: 'none',
      transition: 'box-shadow 0.2s ease',
      _hover: {
        boxShadow: isDark
          ? '0px 4px 6px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.35)'
          : '0px 4px 6px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      },
    },
  };
};
// Provides default styles for the primary card container and its distinct sections (header, content, footer), adjusting colors and borders based on the active theme.
export const getDefaultCardStyles = (theme: any): CardStyles => {
  const isDark = theme.themeMode === 'dark';
  return {
    container: {
      backgroundColor: isDark ? 'color-gray-900' : 'color-white',
      color: isDark ? 'color-white' : 'color-gray-900',
      borderRadius: '8px',
      overflow: 'hidden',
      transition:
        'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
    },
    header: {
      padding: '16px',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: isDark ? 'color-gray-800' : 'color-gray-100',
      color: 'theme-primary',
      fontWeight: 600,
      fontSize: 14,
    },
    content: {
      padding: '16px',
      color: isDark ? 'color-gray-300' : 'color-gray-600',
      fontSize: 12,
      lineHeight: '18px',
    },
    footer: {
      padding: '16px',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: isDark ? 'color-gray-800' : 'color-gray-100',
      justifyContent: 'flex-end',
      gap: 8,
    },
  };
};
