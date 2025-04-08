import React, { useState } from 'react';
import { Pagination } from '../Pagination';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const PaginationShapes = () => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const totalPages = 10;

  return (
    <Vertical gap={20} width="100%">
      <View>
        <Text marginBottom={10}>Rounded Shape (Default)</Text>
        <Pagination
          currentPage={currentPage1}
          totalPages={totalPages}
          onPageChange={setCurrentPage1}
          shape="rounded"
          variant="outline"
        />
      </View>

      <View>
        <Text marginBottom={10}>Square Shape</Text>
        <Pagination
          currentPage={currentPage2}
          totalPages={totalPages}
          onPageChange={setCurrentPage2}
          shape="square"
          variant="outline"
        />
      </View>

      <View>
        <Text marginBottom={10}>Circular Shape</Text>
        <Pagination
          currentPage={currentPage3}
          totalPages={totalPages}
          onPageChange={setCurrentPage3}
          shape="circular"
          variant="outline"
        />
      </View>
    </Vertical>
  );
};
