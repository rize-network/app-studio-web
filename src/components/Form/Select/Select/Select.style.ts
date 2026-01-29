/**
 * Select Styles
 *
 * Design system tokens for the Select component following guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle, physics-based animations
 */

import { ViewProps } from 'app-studio';
import { Size } from './Select.type';

/**
 * Size configurations following 4px grid system
 */
export const Sizes: Record<Size, ViewProps> = {
  xs: { height: '28px', width: '28px' },
  sm: { height: '32px', width: '32px' },
  md: { height: '40px', width: '40px' },
  lg: { height: '48px', width: '48px' },
  xl: { height: '56px', width: '56px' },
};

/**
 * Icon sizes proportional to component size
 */
export const IconSizes: Record<Size, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

/**
 * Dropdown container styles
 * - Subtle shadow for elevation
 * - Smooth border and radius
 */
export const dropdownStyles: ViewProps = {
  // width handled by JS for Portal positioning
  maxHeight: '280px',
  overflowY: 'auto',
  zIndex: 1000,
  backgroundColor: 'color-white',
  borderRadius: '10px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'color-gray-200',
  // Subtle, layered shadow for depth
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)',
};

/**
 * Dropdown animation keyframes
 */
export const dropdownAnimation = {
  enter: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
    transition:
      'opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  exit: {
    opacity: 0,
    transform: 'translateY(-4px) scale(0.98)',
  },
  initial: {
    opacity: 0,
    transform: 'translateY(-8px) scale(0.96)',
  },
};

/**
 * Option item styles with improved touch targets
 */
export const optionStyles: ViewProps = {
  padding: '10px 12px',
  cursor: 'pointer',
  borderRadius: '6px',
  margin: '2px 4px',
  transition: 'background-color 0.15s ease',
};

/**
 * Option item state variants
 */
export const optionStateStyles = {
  default: {
    backgroundColor: 'transparent',
  },
  hover: {
    backgroundColor: 'color-gray-50',
  },
  highlighted: {
    backgroundColor: 'color-gray-100',
  },
  selected: {
    backgroundColor: 'color-gray-100',
  },
  selectedHighlighted: {
    backgroundColor: 'color-gray-200',
  },
};

/**
 * Chevron icon animation
 */
export const chevronAnimation = {
  open: {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  closed: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

/**
 * Multi-select chip/tag styles
 */
export const chipStyles: ViewProps = {
  padding: '4px 8px',
  borderRadius: '6px',
  backgroundColor: 'color-gray-100',
  fontSize: '13px',
  fontWeight: '500',
  color: 'color-gray-700',
  transition: 'background-color 0.15s ease',
};

/**
 * Scrollbar styles for dropdown
 */
export const scrollbarStyles = {
  scrollbarWidth: 'thin' as const,
  scrollbarColor: 'rgba(0, 0, 0, 0.15) transparent',
};
