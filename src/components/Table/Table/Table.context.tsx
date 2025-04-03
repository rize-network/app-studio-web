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
  views: TableViewStyles;
  onRowClick?: Function; // Accept the onClick prop
}>({
  views: defaultStyles,
  onRowClick: () => {}, // Default to undefined if no onClick is passed
});

export const TableProvider: React.FC<{
  children: React.ReactNode;
  views?: TableViewStyles;
  onRowClick?: Function; // Accept the onClick prop
}> = ({ children, views = defaultStyles, onRowClick }) => (
  // Pass both styles and onClick to the context
  <TableContext.Provider value={{ views, onRowClick }}>
    {children}
  </TableContext.Provider>
);

// Custom hook to consume the context and get the styles and onClick handler
export const useTableContext = () => React.useContext(TableContext);
