import React, { createContext, useContext } from 'react';
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

const defaultStyles: TableViewStyles = {};

interface TableContextProps {
  views: TableViewStyles;
  onRowClick?: Function;
}

// Create a context that includes both styles and the onClick function
const TableContext = createContext<TableContextProps>({
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
export const useTableContext = () => useContext(TableContext);
