import { useState, useEffect } from 'react';
// This custom React hook, `usePaginationState`, manages and calculates the array of visible page numbers for a pagination component, dynamically handling ellipses based on the current page, total pages, and the maximum number of buttons to display.
export const usePaginationState = (
  currentPage: number,
  totalPages: number,
  maxPageButtons: number
) => {
  const [visiblePageNumbers, setVisiblePageNumbers] = useState<
    (number | string)[]
  >([]);
  useEffect(() => {
    const calculateVisiblePageNumbers = () => {
      const pageNumbers: (number | string)[] = [];
      if (totalPages <= maxPageButtons) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        let startPage = Math.max(
          2,
          currentPage - Math.floor((maxPageButtons - 2) / 2)
        );
        let endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 3);
        if (endPage >= totalPages - 1) {
          endPage = totalPages - 1;
          startPage = Math.max(2, endPage - (maxPageButtons - 3));
        }
        if (startPage > 2) {
          pageNumbers.push('...');
        }
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
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
