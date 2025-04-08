import React, { useState } from 'react';
import { Pagination } from '../Pagination';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const AdvancedPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 235;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    // Reset to first page when changing page size
    setCurrentPage(1);
  };

  return (
    <Vertical gap={20} width="100%">
      <View>
        <Text marginBottom={10}>Advanced Pagination with Page Size Selector</Text>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          showPageSizeSelector={true}
          showFirstLastButtons={true}
          variant="outline"
        />
      </View>
      
      <View>
        <Text>
          Showing items {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </Text>
      </View>
    </Vertical>
  );
};
