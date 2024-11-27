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

// Create a context that includes both styles and the onClick function
const TableContext = React.createContext<{
  styles: TableViewStyles;
  onRowClick?: Function; // Accept the onClick prop
}>({
  styles: defaultStyles,
  onRowClick: () => {}, // Default to undefined if no onClick is passed
});

export const TableProvider: React.FC<{
  children: React.ReactNode;
  styles?: TableViewStyles;
  onRowClick?: Function; // Accept the onClick prop
}> = ({ children, styles = defaultStyles, onRowClick }) => (
  // Pass both styles and onClick to the context
  <TableContext.Provider value={{ styles, onRowClick }}>
    {children}
  </TableContext.Provider>
);

// Custom hook to consume the context and get the styles and onClick handler
export const useTableContext = () => React.useContext(TableContext);
