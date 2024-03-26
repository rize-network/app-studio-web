import React from 'react';
import { Column, FooterCell, TableViewStyles } from './Table.type';
export interface TableProps {
  data: any[];
  columns: Column[];
  footer?: FooterCell[];
  caption?: React.ReactNode;
  styles?: TableViewStyles;
}
export interface TableViewProps extends TableProps {}
export interface TableLayoutProps {
  Head?: React.FC<any>;
  Body?: React.FC<any>;
  Row?: React.FC<any>;
  Cell?: React.FC<any>;
  Footer?: React.FC<any>;
  Caption?: React.FC<any>;
  TableContainer?: React.FC<any>;
  children?: React.ReactNode;
  styles?: TableViewStyles;
}
