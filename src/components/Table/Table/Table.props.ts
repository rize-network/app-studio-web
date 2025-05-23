import React from 'react';
import { Column, FooterCell, TableViewStyles } from './Table.type';
import { ViewProps } from 'app-studio';
export interface TableProps {
  data: any[];
  columns: Column[];
  footer?: FooterCell[];
  caption?: React.ReactNode;
  views?: TableViewStyles;
}
export interface TableViewProps extends TableProps, Omit<ViewProps, 'size'> {}
export interface TableLayoutProps {
  Head?: React.FC<any>;
  Body?: React.FC<any>;
  Row?: React.FC<any>;
  Cell?: React.FC<any>;
  Footer?: React.FC<any>;
  Caption?: React.FC<any>;
  TableContainer?: React.FC<any>;
  children?: React.ReactNode;
  views?: TableViewStyles;
  onClick?: Function;
}
