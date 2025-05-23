import { useState, useEffect } from 'react';

export const usePaginationState = (
  currentPage: number,
  totalPages: number,
  maxPageButtons: number
) => {
  const [visiblePageNumbers, setVisiblePageNumbers] = useState<
    (number | string)[]
  >([]);

  useEffect(() => {
    // Calculate visible page numbers based on current page and max buttons
    const calculateVisiblePageNumbers = () => {
      const pageNumbers: (number | string)[] = [];

      if (totalPages <= maxPageButtons) {
        // If total pages is less than or equal to max buttons, show all pages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Always include first page
        pageNumbers.push(1);

        // Calculate start and end of visible page range
        let startPage = Math.max(
          2,
          currentPage - Math.floor((maxPageButtons - 2) / 2)
        );
        let endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 3);

        // Adjust if we're near the end
        if (endPage >= totalPages - 1) {
          endPage = totalPages - 1;
          startPage = Math.max(2, endPage - (maxPageButtons - 3));
        }

        // Add ellipsis if needed before the range
        if (startPage > 2) {
          pageNumbers.push('...');
        }

        // Add the range of pages
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }

        // Add ellipsis if needed after the range
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }

        // Always include last page
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    };

    setVisiblePageNumbers(calculateVisiblePageNumbers());
  }, [currentPage, totalPages, maxPageButtons]);

  return {
    visiblePageNumbers,
  };
};
