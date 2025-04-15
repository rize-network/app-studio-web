import { ViewProps } from 'app-studio';
import {
  PaginationStyles,
  PageSizeOption,
  Size,
  Variant,
  Shape,
} from './Pagination.type';

export interface PaginationProps extends ViewProps {
  /**
   * The current page number (1-based)
   */
  currentPage: number;

  /**
   * The total number of pages
   */
  totalPages: number;

  /**
   * Callback function when page changes
   */
  onPageChange: (page: number) => void;

  /**
   * The number of items per page
   */
  pageSize?: number;

  /**
   * Available page size options
   */
  pageSizeOptions?: PageSizeOption[];

  /**
   * Callback function when page size changes
   */
  onPageSizeChange?: (pageSize: number) => void;

  /**
   * Whether to show the page size selector
   */
  showPageSizeSelector?: boolean;

  /**
   * Whether to show the page information text (e.g., "Page 1 of 10")
   */
  showPageInfo?: boolean;

  /**
   * The maximum number of page buttons to show
   */
  maxPageButtons?: number;

  /**
   * Whether to show the first and last page buttons
   */
  showFirstLastButtons?: boolean;

  /**
   * The size of the pagination component
   */
  size?: Size;

  /**
   * The visual style variant of the pagination component
   */
  variant?: Variant;

  /**
   * The shape of the pagination buttons
   */
  shape?: Shape;

  /**
   * Custom styles for different parts of the pagination component
   */
  views?: PaginationStyles;
}
