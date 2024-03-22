import { CSSProperties } from 'react';

export type TableViewStyles = {
  table?: CSSProperties;
  thead?: CSSProperties;
  tfoot?: CSSProperties;
  tbody?: CSSProperties;
  tr?: CSSProperties;
  td?: CSSProperties;
  th?: CSSProperties;
  caption?: CSSProperties;
};

export interface Column {
  title: string;
  field: string;
}
export interface FooterCell {
  value: string;
  props?: any;
}
