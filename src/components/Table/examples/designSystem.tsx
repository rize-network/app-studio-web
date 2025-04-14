/**
 * Table Examples - Design System
 *
 * Showcases the Table component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Table } from '../Table';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';
import { View } from '../../Layout/View/View';
import { Button } from '../../Button/Button';
import { Badge } from '../../Badge/Badge';

export const DesignSystemTable = () => {
  // Sample data for all examples
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Active',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Inactive',
      role: 'User',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'Active',
      role: 'User',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      status: 'Active',
      role: 'Manager',
    },
  ];

  // Columns for basic table
  const basicColumns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'role' },
  ];

  // Status badge renderer
  const renderStatus = (status: string) => {
    const color = status === 'Active' ? 'green' : 'red';
    return (
      <Badge
        variant="outline"
        colorScheme={color}
        borderRadius="4px"
        paddingX="8px"
        paddingY="2px"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="12px"
        fontWeight="500"
        content={status}
      >
        {status}
      </Badge>
    );
  };

  // Columns with custom rendering
  const customColumns = [
    {
      title: 'Name',
      field: 'name',
      render: (name: string, row: any) => (
        <View>
          <Text
            fontWeight="600"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
          >
            {name}
          </Text>
          <Text
            fontSize="12px"
            color="color.gray.500"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
          >
            {row.email}
          </Text>
        </View>
      ),
    },
    {
      title: 'Status',
      field: 'status',
      render: renderStatus,
    },
    {
      title: 'Role',
      field: 'role',
    },
    {
      title: 'Actions',
      field: 'actions',
      render: () => (
        <Horizontal gap={8}>
          <Button size="xs">Edit</Button>
          <Button size="xs" variant="outline" colorScheme="red">
            Delete
          </Button>
        </Horizontal>
      ),
    },
  ];

  // Data for custom rendering
  const customData = users.map((user) => ({
    ...user,
    actions: null, // Placeholder for the actions column
  }));

  return (
    <Vertical gap={32}>
      {/* Basic Table */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Basic Table
        </Text>
        <Table
          views={{
            table: {
              width: '100%',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              borderRadius: '8px', // 2 × 4px grid
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid',
              borderColor: 'color.gray.200',
            },
            thead: {
              backgroundColor: 'color.gray.50',
              borderBottom: '1px solid',
              borderBottomColor: 'color.gray.200',
            },
            th: {
              padding: '12px 16px', // 3 × 4px and 4 × 4px grid
              fontWeight: '600',
              fontSize: '14px',
              color: 'color.gray.700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            td: {
              padding: '12px 16px', // 3 × 4px and 4 × 4px grid
              fontSize: '14px',
              borderBottom: '1px solid',
              borderBottomColor: 'color.gray.100',
            },
            tr: {
              transition: 'background-color 0.2s ease',
              _hover: {
                backgroundColor: 'color.gray.50',
              },
            },
          }}
        >
          <Table.Template
            columns={basicColumns}
            data={users}
            caption="User Information"
          />
        </Table>
      </View>

      {/* Striped Table */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Striped Table
        </Text>
        <Table
          views={{
            table: {
              width: '100%',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              borderRadius: '8px', // 2 × 4px grid
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            },
            thead: {
              backgroundColor: 'color.blue.600',
              color: 'white',
            },
            th: {
              padding: '12px 16px', // 3 × 4px and 4 × 4px grid
              fontWeight: '600',
              fontSize: '14px',
              color: 'white',
            },
            td: {
              padding: '12px 16px', // 3 × 4px and 4 × 4px grid
              fontSize: '14px',
              borderBottom: '1px solid',
              borderBottomColor: 'color.gray.100',
            },
            tr: {
              _even: {
                backgroundColor: 'color.gray.50',
              },
              transition: 'background-color 0.2s ease',
              _hover: {
                backgroundColor: 'color.blue.50',
              },
            },
          }}
        >
          <Table.Template columns={basicColumns} data={users} />
        </Table>
      </View>

      {/* Custom Rendering Table */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Custom Rendering
        </Text>
        <Table
          views={{
            table: {
              width: '100%',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              borderRadius: '8px', // 2 × 4px grid
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid',
              borderColor: 'color.gray.200',
            },
            thead: {
              backgroundColor: 'white',
              borderBottom: '2px solid',
              borderBottomColor: 'color.gray.200',
            },
            th: {
              padding: '16px', // 4 × 4px grid
              fontWeight: '600',
              fontSize: '14px',
              color: 'color.gray.700',
            },
            td: {
              padding: '16px', // 4 × 4px grid
              fontSize: '14px',
              borderBottom: '1px solid',
              borderBottomColor: 'color.gray.100',
            },
            tr: {
              transition: 'background-color 0.2s ease',
              _hover: {
                backgroundColor: 'color.gray.50',
              },
            },
          }}
        >
          <Table.Container>
            <Table.Head>
              <Table.Row>
                {customColumns.map((column) => (
                  <Table.HeadCell key={column.field}>
                    {column.title}
                  </Table.HeadCell>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {customData.map((row: any, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {customColumns.map((column: any, colIndex) => (
                    <Table.Cell
                      key={`${rowIndex}-${colIndex}`}
                      isFirstColumn={colIndex === 0}
                    >
                      {column.render
                        ? column.render(row[column.field], row)
                        : row[column.field]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Container>
        </Table>
      </View>

      {/* Compact Table */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Compact Table
        </Text>
        <Table
          views={{
            table: {
              width: '100%',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              borderRadius: '8px', // 2 × 4px grid
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid',
              borderColor: 'color.gray.200',
            },
            thead: {
              backgroundColor: 'color.gray.50',
              borderBottom: '1px solid',
              borderBottomColor: 'color.gray.200',
            },
            th: {
              padding: '8px 12px', // 2 × 4px and 3 × 4px grid
              fontWeight: '600',
              fontSize: '12px',
              color: 'color.gray.700',
            },
            td: {
              padding: '8px 12px', // 2 × 4px and 3 × 4px grid
              fontSize: '12px',
              borderBottom: '1px solid',
              borderBottomColor: 'color.gray.100',
            },
            tr: {
              transition: 'background-color 0.2s ease',
              _hover: {
                backgroundColor: 'color.gray.50',
              },
            },
          }}
        >
          <Table.Template columns={basicColumns} data={users} />
        </Table>
      </View>

      {/* Table with Footer */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Table with Footer
        </Text>
        <Table
          views={{
            table: {
              width: '100%',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              borderRadius: '8px', // 2 × 4px grid
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid',
              borderColor: 'color.gray.200',
            },
            thead: {
              backgroundColor: 'color.gray.50',
              borderBottom: '1px solid',
              borderBottomColor: 'color.gray.200',
            },
            th: {
              padding: '12px 16px', // 3 × 4px and 4 × 4px grid
              fontWeight: '600',
              fontSize: '14px',
              color: 'color.gray.700',
            },
            td: {
              padding: '12px 16px', // 3 × 4px and 4 × 4px grid
              fontSize: '14px',
              borderBottom: '1px solid',
              borderBottomColor: 'color.gray.100',
            },
            tfoot: {
              backgroundColor: 'color.gray.50',
              fontWeight: '600',
              borderTop: '2px solid',
              borderTopColor: 'color.gray.200',
            },
            tr: {
              transition: 'background-color 0.2s ease',
              _hover: {
                backgroundColor: 'color.gray.50',
              },
            },
          }}
        >
          <Table.Template
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Role', field: 'role' },
              { title: 'Status', field: 'status' },
            ]}
            data={users}
            footer={[
              {
                value: 'Total Users',
                props: { colSpan: 2, style: { textAlign: 'right' } },
              },
              { value: `${users.length}` },
            ]}
          />
        </Table>
      </View>
    </Vertical>
  );
};
