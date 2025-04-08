import React, { useState } from 'react';
import { Pagination } from '../Pagination';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const PaginationSizes = () => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const totalPages = 10;

  return (
    <Vertical gap={20} width="100%">
      <View>
        <Text marginBottom={10}>Small Size</Text>
        <Pagination
          currentPage={currentPage1}
          totalPages={totalPages}
          onPageChange={setCurrentPage1}
          size="sm"
          variant="outline"
        />
      </View>

      <View>
        <Text marginBottom={10}>Medium Size (Default)</Text>
        <Pagination
          currentPage={currentPage2}
          totalPages={totalPages}
          onPageChange={setCurrentPage2}
          size="md"
          variant="outline"
        />
      </View>

      <View>
        <Text marginBottom={10}>Large Size</Text>
        <Pagination
          currentPage={currentPage3}
          totalPages={totalPages}
          onPageChange={setCurrentPage3}
          size="lg"
          variant="outline"
        />
      </View>
    </Vertical>
  );
};
