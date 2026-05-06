import React from 'react';
import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableCaption,
  TableView,
  TableHeadCell,
} from './Table/Table.view';
import { TableProvider } from './Table/Table.context';
import { TableLayoutProps } from './Table/Table.props';
import { useMergedDesignSystemComponentProps } from 'src/design-system';

export const Table = ({ children, views, onClick }: TableLayoutProps) => {
  const mergedProps = useMergedDesignSystemComponentProps('table', {
    views,
    onClick,
  });

  return (
    <TableProvider views={mergedProps.views} onRowClick={mergedProps.onClick}>
      {children}
    </TableProvider>
  );
};

Table.Head = TableHead;
Table.HeadCell = TableHeadCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Caption = TableCaption;
Table.Container = TableContainer;
Table.Template = TableView;
