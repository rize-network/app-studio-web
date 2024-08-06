import { ViewProps } from 'app-studio';

export type TableViewStyles = {
  table?: ViewProps;
  thead?: ViewProps;
  tfoot?: ViewProps;
  tbody?: ViewProps;
  tr?: ViewProps;
  td?: ViewProps;
  th?: ViewProps;
  caption?: ViewProps;
};

export interface Column {
  title: string;
  field: string;
}
export interface FooterCell {
  value: string;
  props?: ViewProps;
}
