import { TableViewStyles } from './Table.type';

export interface Column {
  title: string;
  field: string;
}

export interface TableProps {
  data: any[];
  columns: Column[];
  footer?: any[];
  caption?: React.ReactNode;
  styles?: TableViewStyles;
}

export interface TableViewProps extends TableProps {}
