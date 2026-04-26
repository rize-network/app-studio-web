import { ViewProps } from 'app-studio';
// Defines the possible size variations for the Pagination component, such as 'sm' (small), 'md' (medium), or 'lg' (large).
export type Size = 'sm' | 'md' | 'lg';
// Defines the possible visual variants for the Pagination component's appearance, including 'default', 'filled', or 'outline'.
export type Variant = 'default' | 'filled' | 'outline';
// Defines the possible shapes for pagination buttons, such as 'rounded', 'square', or 'circular'.
export type Shape = 'rounded' | 'square' | 'circular';
// Defines an interface for custom styling of various parts of the Pagination component, leveraging 'ViewProps'.
export interface PaginationStyles {
  // Styles for the main container wrapping all pagination elements.
  container?: ViewProps;
  // Styles for individual page number buttons.
  pageButton?: ViewProps;
  // Styles specifically for the currently active (selected) page number button.
  activePageButton?: ViewProps;
  // Styles for the navigation buttons (e.g., 'previous' and 'next').
  navigationButton?: ViewProps;
  // Styles for the display showing current page information, like 'Page 1 of 10'.
  pageInfo?: ViewProps;
  // Styles for the component allowing users to select the number of items per page.
  pageSizeSelector?: ViewProps;
  // Styles for the ellipsis indicator used when many page numbers are omitted from display.
  ellipsis?: ViewProps;
}
// Defines the structure for an individual option within the page size selection dropdown.
export interface PageSizeOption {
  // The display label for a page size option (e.g., '10 per page').
  label: string;
  // The numerical value representing the number of items per page for this option.
  value: number;
}
