import { ViewProps } from 'app-studio';
import { Size, Variant, Shape } from './Pagination.type';
// Defines a set of predefined sizes (small, medium, large) for the Pagination component, mapping each size to a specific set of styling properties including font size, padding, minimum width, and height, with responsive adjustments for mobile devices.
export const PaginationSizes: Record<Size, ViewProps> = {
  sm: {
    fontSize: '12px',
    padding: '4px 8px',
    minWidth: '28px',
    height: '28px',
    media: {
      mobile: {
        fontSize: '11px',
        padding: '3px 6px',
        minWidth: '24px',
        height: '24px',
      },
    },
  },
  md: {
    fontSize: '14px',
    padding: '6px 10px',
    minWidth: '32px',
    height: '32px',
    media: {
      mobile: {
        fontSize: '12px',
        padding: '4px 8px',
        minWidth: '28px',
        height: '28px',
      },
    },
  },
  lg: {
    fontSize: '14px',
    padding: '8px 12px',
    minWidth: '36px',
    height: '36px',
    media: {
      mobile: {
        fontSize: '12px',
        padding: '4px 8px',
        minWidth: '28px',
        height: '28px',
      },
    },
  },
};
// Defines different visual variants (default, filled, outline) for the Pagination component, each specifying distinct background colors, text colors, border styles, and hover effects.
export const PaginationVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'transparent',
    color: 'color-gray-800',
    borderWidth: '0px',
    borderStyle: 'none',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      backgroundColor: 'color-gray-100',
    },
  },
  filled: {
    backgroundColor: 'color-gray-100',
    color: 'color-gray-800',
    borderWidth: '0px',
    borderStyle: 'none',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      backgroundColor: 'color-gray-200',
    },
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      backgroundColor: 'color-gray-100',
    },
  },
};
// Defines various border radius shapes (rounded, square, circular) that can be applied to the Pagination component buttons.
export const PaginationShapes: Record<Shape, ViewProps> = {
  rounded: {
    borderRadius: 8,
  },
  square: {
    borderRadius: '0px',
  },
  circular: {
    borderRadius: '50%',
  },
};
// Specifies the styling properties for the active page button within the Pagination component, including background color, text color, and hover effects to indicate the currently selected page.
export const ActivePageButtonStyles: ViewProps = {
  backgroundColor: 'theme-primary',
  color: 'color-white',
  transition: 'all 0.2s ease-in-out',
  _hover: {
    backgroundColor: 'theme-primary',
    opacity: 0.9,
  },
};
// Defines the styling for disabled pagination buttons, reducing their opacity and changing the cursor to indicate they are not interactive.
export const DisabledButtonStyles: ViewProps = {
  opacity: 0.5,
  cursor: 'not-allowed',
  transition: 'all 0.2s ease-in-out',
  _hover: {
    backgroundColor: 'transparent',
  },
};
