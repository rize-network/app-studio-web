import React, { useState } from 'react';
import { Pagination } from '../Pagination';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Table } from '../../Table/Table';

export const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  // Sample data
  const allData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User' },
    { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'Admin' },
    { id: 7, name: 'Edward Davis', email: 'edward@example.com', role: 'User' },
    { id: 8, name: 'Fiona Clark', email: 'fiona@example.com', role: 'Manager' },
    { id: 9, name: 'George White', email: 'george@example.com', role: 'User' },
    { id: 10, name: 'Hannah Moore', email: 'hannah@example.com', role: 'Admin' },
    { id: 11, name: 'Ian Taylor', email: 'ian@example.com', role: 'User' },
    { id: 12, name: 'Julia Adams', email: 'julia@example.com', role: 'Manager' },
  ];
  
  const totalItems = allData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex);
  };
  
  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'role' },
  ];
  
  return (
    <View width="100%">
      <Text marginBottom={10}>Table with Pagination</Text>
      
      <Table.Template
        columns={columns}
        data={getCurrentPageData()}
      />
      
      <View marginTop={16} display="flex" justifyContent="space-between" alignItems="center">
        <Text>
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
        </Text>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          showPageSizeSelector={true}
          showPageInfo={false}
          variant="outline"
          size="sm"
        />
      </View>
    </View>
  );
};
