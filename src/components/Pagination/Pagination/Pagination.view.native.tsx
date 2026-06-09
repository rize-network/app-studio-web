import React from 'react';
import { View, Horizontal, Text } from 'app-studio';
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
  pageSizeOptions,
  onPageSizeChange,
  showPageSizeSelector = false,
  showPageInfo = true,
  maxPageButtons = 5,
  showFirstLastButtons = false,
  size = 'md',
  variant = 'default',
  shape = 'rounded',
  visiblePageNumbers = [],
  views,
  ...props
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };
  const renderPageButton = (pageNumber: number | string, index: number) => {
    if (pageNumber === '...') {
      return (
        <View
          key={`ellipsis-${index}`}
          alignItems="center"
          justifyContent="center"
          {...PaginationSizes[size]}
          {...views?.ellipsis}
        >
          <Text>...</Text>
        </View>
      );
    }
    const isCurrentPage = pageNumber === currentPage;
    return (
      <View
        key={`page-${pageNumber}`}
        onPress={() => handlePageChange(pageNumber as number)}
        onClick={() => handlePageChange(pageNumber as number)}
        alignItems="center"
        justifyContent="center"
        {...PaginationSizes[size]}
        {...PaginationVariants[variant]}
        {...PaginationShapes[shape]}
        {...(isCurrentPage ? ActivePageButtonStyles : {})}
        {...(isCurrentPage ? views?.activePageButton : views?.pageButton)}
      >
        <Text>{pageNumber}</Text>
      </View>
    );
  };
  return (
    <Horizontal alignItems="center" gap={8} {...views?.container} {...props}>
      {showFirstLastButtons && (
        <View
          onPress={() => handlePageChange(1)}
          onClick={() => handlePageChange(1)}
          alignItems="center"
          justifyContent="center"
          {...PaginationSizes[size]}
          {...PaginationVariants[variant]}
          {...PaginationShapes[shape]}
          {...(currentPage === 1 ? DisabledButtonStyles : {})}
          {...views?.navigationButton}
        >
          <Horizontal alignItems="center">
            <ChevronIcon orientation="left" widthHeight={14} />
            <ChevronIcon orientation="left" widthHeight={14} marginLeft={-6} />
          </Horizontal>
        </View>
      )}
      <View
        onPress={() => handlePageChange(currentPage - 1)}
        onClick={() => handlePageChange(currentPage - 1)}
        alignItems="center"
        justifyContent="center"
        {...PaginationSizes[size]}
        {...PaginationVariants[variant]}
        {...PaginationShapes[shape]}
        {...(currentPage === 1 ? DisabledButtonStyles : {})}
        {...views?.navigationButton}
      >
        <ChevronIcon orientation="left" widthHeight={16} />
      </View>
      {visiblePageNumbers.map((pageNumber: string | number, index: number) =>
        renderPageButton(pageNumber as number, index)
      )}
      <View
        onPress={() => handlePageChange(currentPage + 1)}
        onClick={() => handlePageChange(currentPage + 1)}
        alignItems="center"
        justifyContent="center"
        {...PaginationSizes[size]}
        {...PaginationVariants[variant]}
        {...PaginationShapes[shape]}
        {...(currentPage === totalPages ? DisabledButtonStyles : {})}
        {...views?.navigationButton}
      >
        <ChevronIcon orientation="right" widthHeight={16} />
      </View>
      {showFirstLastButtons && (
        <View
          onPress={() => handlePageChange(totalPages)}
          onClick={() => handlePageChange(totalPages)}
          alignItems="center"
          justifyContent="center"
          {...PaginationSizes[size]}
          {...PaginationVariants[variant]}
          {...PaginationShapes[shape]}
          {...(currentPage === totalPages ? DisabledButtonStyles : {})}
          {...views?.navigationButton}
        >
          <Horizontal alignItems="center">
            <ChevronIcon orientation="right" widthHeight={14} />
            <ChevronIcon orientation="right" widthHeight={14} marginLeft={-6} />
          </Horizontal>
        </View>
      )}
      {showPageInfo && (
        <Text marginLeft={16} color="color-gray-600" {...views?.pageInfo}>
          Page {currentPage} of {totalPages}
        </Text>
      )}
    </Horizontal>
  );
};
