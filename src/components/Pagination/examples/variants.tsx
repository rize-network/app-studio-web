import React, { useState } from 'react';
import { Pagination } from '../Pagination';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

export const PaginationVariants = () => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const totalPages = 10;

  return (
    <Vertical gap={20} width="100%">
      <View>
        <Text marginBottom={10}>Default Variant</Text>
        <Pagination
          currentPage={currentPage1}
          totalPages={totalPages}
          onPageChange={setCurrentPage1}
          variant="default"
        />
      </View>

      <View>
        <Text marginBottom={10}>Filled Variant</Text>
        <Pagination
          currentPage={currentPage2}
          totalPages={totalPages}
          onPageChange={setCurrentPage2}
          variant="filled"
        />
      </View>

      <View>
        <Text marginBottom={10}>Outline Variant</Text>
        <Pagination
          currentPage={currentPage3}
          totalPages={totalPages}
          onPageChange={setCurrentPage3}
          variant="outline"
        />
      </View>
    </Vertical>
  );
};
