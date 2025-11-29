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
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(e.target.value));
    }
  };

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
      {/* First page button */}
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

      {/* Previous page button */}
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

      {/* Page buttons */}
      {visiblePageNumbers.map((pageNumber: number, index: number) =>
        renderPageButton(pageNumber, index)
      )}

      {/* Next page button */}
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

      {/* Last page button */}
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

      {/* Page information */}
      {showPageInfo && (
        <Text marginLeft={16} color="color.gray.600" {...views?.pageInfo}>
          Page {currentPage} of {totalPages}
        </Text>
      )}

      {/* Page size selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <View
          as="select"
          marginLeft={16}
          padding="4px 8px"
          borderRadius="4px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="color.gray.200"
          backgroundColor="color.white"
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
