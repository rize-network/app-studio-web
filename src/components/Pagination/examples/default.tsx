import React, { useState } from 'react';
import { Pagination } from '../Pagination';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';

export const DefaultPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <View width="100%">
      <Text marginBottom={10}>Default Pagination</Text>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </View>
  );
};
