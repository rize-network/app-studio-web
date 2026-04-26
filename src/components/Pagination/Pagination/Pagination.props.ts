import { ViewProps } from 'app-studio';
import {
  PaginationStyles,
  PageSizeOption,
  Size,
  Variant,
  Shape,
} from './Pagination.type';
export interface PaginationProps extends ViewProps {
  // The current active page number.
  currentPage: number;
  // The total number of pages available for navigation.
  totalPages: number;
  // Callback function invoked when the current page changes.
  onPageChange: (page: number) => void;
  // The number of items to display per page. Optional.
  pageSize?: number;
  // An array of available page size options for the selector. Optional.
  pageSizeOptions?: PageSizeOption[];
  // Callback function invoked when the page size changes. Optional.
  onPageSizeChange?: (pageSize: number) => void;
  // Determines whether to display the page size selector. Optional.
  showPageSizeSelector?: boolean;
  // Determines whether to display information about the current page and total pages. Optional.
  showPageInfo?: boolean;
  // The maximum number of page buttons to display in the pagination control. Optional.
  maxPageButtons?: number;
  // Determines whether to display buttons to navigate to the first and last pages. Optional.
  showFirstLastButtons?: boolean;
  // Defines the size of the pagination component (e.g., small, medium, large). Optional.
  size?: Size;
  // Defines the visual variant of the pagination component (e.g., outlined, contained). Optional.
  variant?: Variant;
  // Defines the shape of the pagination buttons (e.g., rounded, square). Optional.
  shape?: Shape;
  // Custom styling options for the pagination component. Optional.
  views?: PaginationStyles;
}
