/**
 * ComboBox Styles
 *
 * Design system tokens for the ComboBox component following guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle, physics-based animations
 */

import { ViewProps } from 'app-studio';

/**
 * Size configurations following 4px grid system
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const Sizes: Record<Size, ViewProps> = {
  xs: { minHeight: '28px', fontSize: '12px', padding: '4px 8px' },
  sm: { minHeight: '32px', fontSize: '13px', padding: '6px 10px' },
  md: { minHeight: '40px', fontSize: '14px', padding: '8px 12px' },
  lg: { minHeight: '48px', fontSize: '15px', padding: '10px 14px' },
  xl: { minHeight: '56px', fontSize: '16px', padding: '12px 16px' },
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
 * - Animation-ready properties
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
 * Dropdown animation keyframes (applied via style prop)
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
 * Search field container styles
 */
export const searchContainerStyles: ViewProps = {
  padding: '8px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'color-gray-100',
  backgroundColor: 'color-gray-50',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
};

/**
 * Option item styles with hover/focus states
 */
export const optionStyles: ViewProps = {
  padding: '8px 10px',
  cursor: 'pointer',
  borderRadius: '6px',
  margin: '1px 4px',
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
    backgroundColor: 'color-gray-100',
  },
  highlighted: {
    backgroundColor: 'color-gray-100',
  },
  selected: {
    backgroundColor: 'rgba(var(--color-primary-rgb), 0.08)',
  },
  selectedHighlighted: {
    backgroundColor: 'rgba(var(--color-primary-rgb), 0.12)',
  },
};

/**
 * Empty state styles
 */
export const emptyStateStyles: ViewProps = {
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

/**
 * Trigger button styles
 */
export const triggerStyles: ViewProps = {
  cursor: 'pointer',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
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
 * Scrollbar styles for dropdown
 */
export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'color-gray-300',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'color-gray-400',
  },
};

/**
 * Chip styles for multi-select display
 */
export const chipStyles: ViewProps = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 8px',
  backgroundColor: 'color-gray-100',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: '500',
  color: 'color-gray-700',
  transition: 'background-color 0.15s ease',
};
