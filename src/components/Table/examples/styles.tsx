import React from 'react';
import { Table } from '../Table';

export const StylesDemo = () => {
  const cols = [
    { title: 'Invoice', field: 'invoice' },
    { title: 'Payment Status', field: 'paymentStatus' },
    { title: 'Total Amount', field: 'totalAmount' },
    { title: 'Payment Method', field: 'paymentMethod' },
  ];
  const invoices = [
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
    <Table
      styles={{
        table: {
          boxShadow:
            ' 0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)',

          borderRadius: '1em',
        },
      }}
    >
      <Table.Template columns={cols} data={invoices} />
    </Table>
  );
};
