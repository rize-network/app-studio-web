import React from 'react';
import {
  TableContainer,
  TableCaption,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableCell,
} from '../Table/Table.view';

export const DefaultDemo = () => {
  interface DataRow {
    invoice: string;
    paymentStatus: string;
    totalAmount: string;
    paymentMethod: string;
  }

  const columns = [
    { title: 'Invoice', field: 'invoice' },
    { title: 'Payment Status', field: 'paymentStatus' },
    { title: 'Total Amount', field: 'totalAmount' },
    { title: 'Payment Method', field: 'paymentMethod' },
  ];
  const data: DataRow[] = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ];
  return (
    <TableContainer>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableHeadCell key={column.field}>{column.title}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column, columnIndex) => (
              <TableCell key={column.field} isFirstColumn={columnIndex === 0}>
                {row[column.field as keyof DataRow]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};
