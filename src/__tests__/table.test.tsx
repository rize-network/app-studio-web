import React from 'react';
import { Table } from '../components/Table/Table';
import renderer from 'react-test-renderer';
import { render, screen, within } from '@testing-library/react';

const columns = [
  { title: 'Invoice', field: 'invoice' },
  { title: 'Payment Status', field: 'paymentStatus' },
  { title: 'Total Amount', field: 'totalAmount' },
  { title: 'Payment Method', field: 'paymentMethod' },
];

const data = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  // Add more data as needed for testing
];

describe('Table Component', () => {
  test('renders data ', () => {
    render(
      <Table>
        <Table.Template columns={columns} data={data} />
      </Table>
    );
    expect(screen.getByText('INV001')).toBeInTheDocument();
    expect(screen.getByText('Invoice')).toBeInTheDocument();
  });

  test('renders column headers and data in Table.Template', async () => {
    const { getByRole } = render(
      <Table>
        <Table.Template columns={columns} data={data} />
      </Table>
    );

    const table = getByRole('Table');
    const withinTable = within(table);

    columns.forEach((column) => {
      expect(withinTable.getByText(column.title)).toBeInTheDocument();
    });

    data.forEach((row) => {
      expect(withinTable.getByText(row.invoice)).toBeInTheDocument();
      expect(withinTable.getByText(row.paymentStatus)).toBeInTheDocument();
      expect(withinTable.getByText(row.totalAmount)).toBeInTheDocument();
      expect(withinTable.getByText(row.paymentMethod)).toBeInTheDocument();
    });
  });
});

test('Table to match snapshot', () => {
  const tree = renderer
    .create(
      <Table>
        <Table.Template columns={columns} data={data} />
      </Table>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
