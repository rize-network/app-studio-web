import React from 'react';
import { PaginationProps } from './Pagination/Pagination.props';
import { usePaginationState } from './Pagination/Pagination.state';
import { PaginationView } from './Pagination/Pagination.view';

/**
 * Pagination component for navigating through pages of content.
 */
const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
  pageSizeOptions,
  onPageSizeChange,
  showPageSizeSelector = false,
  showPageInfo = true,
  maxPageButtons = 5,
  showFirstLastButtons = false,
  size = 'md',
  variant = 'default',
  shape = 'rounded',
  views,
  ...props
}) => {
  const { visiblePageNumbers } = usePaginationState(
    currentPage,
    totalPages,
    maxPageButtons
  );

  return (
    <PaginationView
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageSizeChange={onPageSizeChange}
      showPageSizeSelector={showPageSizeSelector}
      showPageInfo={showPageInfo}
      maxPageButtons={maxPageButtons}
      showFirstLastButtons={showFirstLastButtons}
      size={size}
      variant={variant}
      shape={shape}
      visiblePageNumbers={visiblePageNumbers}
      views={views}
      {...props}
    />
  );
};

export const Pagination = PaginationComponent;
