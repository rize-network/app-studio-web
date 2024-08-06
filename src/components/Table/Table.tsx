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
import { TableStylesProvider } from './Table/Table.context';
import { TableLayoutProps } from './Table/Table.props';

export const Table = ({ children, styles }: TableLayoutProps) => {
  return <TableStylesProvider styles={styles}>{children}</TableStylesProvider>;
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
