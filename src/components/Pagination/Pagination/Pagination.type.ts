import { ViewProps } from 'app-studio';

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'filled' | 'outline';
export type Shape = 'rounded' | 'square' | 'circular';

export interface PaginationStyles {
  container?: ViewProps;
  pageButton?: ViewProps;
  activePageButton?: ViewProps;
  navigationButton?: ViewProps;
  pageInfo?: ViewProps;
  pageSizeSelector?: ViewProps;
  ellipsis?: ViewProps;
}

export interface PageSizeOption {
  label: string;
  value: number;
}
