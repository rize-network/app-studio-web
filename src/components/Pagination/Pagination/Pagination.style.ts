import { ViewProps } from 'app-studio';
import { Size, Variant, Shape } from './Pagination.type';

export const PaginationSizes: Record<Size, ViewProps> = {
  sm: {
    fontSize: '12px',
    padding: '4px 8px',
    minWidth: '28px',
    height: '28px',
  },
  md: {
    fontSize: '14px',
    padding: '6px 12px',
    minWidth: '36px',
    height: '36px',
  },
  lg: {
    fontSize: '16px',
    padding: '8px 16px',
    minWidth: '44px',
    height: '44px',
  },
};

export const PaginationVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'transparent',
    color: 'color.gray.800',
    _hover: {
      backgroundColor: 'color.gray.100',
    },
  },
  filled: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.800',
    _hover: {
      backgroundColor: 'color.gray.200',
    },
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    color: 'color.gray.800',
    _hover: {
      backgroundColor: 'color.gray.100',
    },
  },
};

export const PaginationShapes: Record<Shape, ViewProps> = {
  rounded: {
    borderRadius: '4px',
  },
  square: {
    borderRadius: '0px',
  },
  circular: {
    borderRadius: '50%',
  },
};

export const ActivePageButtonStyles: ViewProps = {
  backgroundColor: 'color.blue.500',
  color: 'white',
  _hover: {
    backgroundColor: 'color.blue.600',
  },
};

export const DisabledButtonStyles: ViewProps = {
  opacity: 0.5,
  cursor: 'not-allowed',
  _hover: {
    backgroundColor: 'transparent',
  },
};
