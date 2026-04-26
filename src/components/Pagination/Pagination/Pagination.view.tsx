import React from 'react';
import { View } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { ChevronIcon } from '../../Icon/Icon';
import { PaginationProps } from './Pagination.props';
import {
  PaginationSizes,
  PaginationVariants,
  PaginationShapes,
  ActivePageButtonStyles,
  DisabledButtonStyles,
} from './Pagination.style';
// Defines the PaginationView functional component, which is responsible for rendering the visual structure and interactive elements of the pagination UI. It accepts various props to configure its behavior and appearance.
export const PaginationView: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
  pageSizeOptions = [
    { label: '10 / page', value: 10 },
    { label: '20 / page', value: 20 },
    { label: '50 / page', value: 50 },
    { label: '100 / page', value: 100 },
  ],
  onPageSizeChange,
  showPageSizeSelector = false,
  showPageInfo = true,
  maxPageButtons = 5,
  showFirstLastButtons = false,
  size = 'md',
  variant = 'default',
  shape = 'rounded',
  visiblePageNumbers,
  views,
  ...props
}) => {
  // Handles the event when a page number is clicked. It validates if the requested page is within the valid range (1 to totalPages) and not the current active page. If valid, it invokes the 'onPageChange' callback to update the current page.
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };
  // Handles the event when the page size selection changes. It checks if the 'onPageSizeChange' callback is provided and, if so, converts the selected value from the dropdown to a number before calling the callback to update the page size.
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(e.target.value));
    }
  };
  // A utility function that conditionally renders either an ellipsis ('...') or a clickable page number button. It applies different styles based on whether the page is the current active page and sets an onClick handler for page navigation.
  const renderPageButton = (pageNumber: number | string, index: number) => {
    if (pageNumber === '...') {
      return (
        <View
          key={`ellipsis-${index}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
          {...PaginationSizes[size]}
          {...views?.ellipsis}
        >
          ...
        </View>
      );
    }
    const isCurrentPage = pageNumber === currentPage;
    return (
      <View
        key={`page-${pageNumber}`}
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor={isCurrentPage ? 'default' : 'pointer'}
        {...PaginationSizes[size]}
        {...PaginationVariants[variant]}
        {...PaginationShapes[shape]}
        {...(isCurrentPage ? ActivePageButtonStyles : {})}
        onClick={() => handlePageChange(pageNumber as number)}
        aria-label={`Page ${pageNumber}`}
        aria-current={isCurrentPage ? 'page' : undefined}
        {...(isCurrentPage ? views?.activePageButton : views?.pageButton)}
      >
        {pageNumber}
      </View>
    );
  };
  return (
    <Horizontal alignItems="center" gap={8} {...views?.container} {...props}>
      {}
      {showFirstLastButtons && (
        <View
          as="button"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor={currentPage === 1 ? 'not-allowed' : 'pointer'}
          {...PaginationSizes[size]}
          {...PaginationVariants[variant]}
          {...PaginationShapes[shape]}
          {...(currentPage === 1 ? DisabledButtonStyles : {})}
          onClick={() => handlePageChange(1)}
          aria-label="First page"
          disabled={currentPage === 1}
          {...views?.navigationButton}
        >
          <ChevronIcon orientation="left" widthHeight={16} />
          <ChevronIcon orientation="left" widthHeight={16} marginLeft="-8px" />
        </View>
      )}
      {}
      <View
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor={currentPage === 1 ? 'not-allowed' : 'pointer'}
        {...PaginationSizes[size]}
        {...PaginationVariants[variant]}
        {...PaginationShapes[shape]}
        {...(currentPage === 1 ? DisabledButtonStyles : {})}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Previous page"
        disabled={currentPage === 1}
        {...views?.navigationButton}
      >
        <ChevronIcon orientation="left" widthHeight={16} />
      </View>
      {}
      {visiblePageNumbers.map((pageNumber: number, index: number) =>
        renderPageButton(pageNumber, index)
      )}
      {}
      <View
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor={currentPage === totalPages ? 'not-allowed' : 'pointer'}
        {...PaginationSizes[size]}
        {...PaginationVariants[variant]}
        {...PaginationShapes[shape]}
        {...(currentPage === totalPages ? DisabledButtonStyles : {})}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Next page"
        disabled={currentPage === totalPages}
        {...views?.navigationButton}
      >
        <ChevronIcon orientation="right" widthHeight={16} />
      </View>
      {}
      {showFirstLastButtons && (
        <View
          as="button"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor={currentPage === totalPages ? 'not-allowed' : 'pointer'}
          {...PaginationSizes[size]}
          {...PaginationVariants[variant]}
          {...PaginationShapes[shape]}
          {...(currentPage === totalPages ? DisabledButtonStyles : {})}
          onClick={() => handlePageChange(totalPages)}
          aria-label="Last page"
          disabled={currentPage === totalPages}
          {...views?.navigationButton}
        >
          <ChevronIcon orientation="right" widthHeight={16} />
          <ChevronIcon orientation="right" widthHeight={16} marginLeft="-8px" />
        </View>
      )}
      {}
      {showPageInfo && (
        <Text marginLeft={16} color="color-gray-600" {...views?.pageInfo}>
          Page {currentPage} of {totalPages}
        </Text>
      )}
      {}
      {showPageSizeSelector && onPageSizeChange && (
        <View
          as="select"
          marginLeft={16}
          padding="4px 8px"
          borderRadius="4px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="color-gray-200"
          backgroundColor="color-white"
          cursor="pointer"
          value={pageSize}
          onChange={handlePageSizeChange}
          {...views?.pageSizeSelector}
        >
          {pageSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </View>
      )}
    </Horizontal>
  );
};
