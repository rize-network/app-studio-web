import React, { CSSProperties } from 'react';

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

const defaultStyles: TableViewStyles = {};

const TableStylesContext = React.createContext<TableViewStyles>(defaultStyles);

export const TableStylesProvider: React.FC<{
  children: React.ReactNode;
  styles?: TableViewStyles;
}> = ({ children, styles = defaultStyles }) => (
  <TableStylesContext.Provider value={styles}>
    {children}
  </TableStylesContext.Provider>
);

export const useTableStyles = (): TableViewStyles =>
  React.useContext(TableStylesContext);
