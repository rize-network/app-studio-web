import React, { CSSProperties } from 'react';
export type TableViewStyles = {
// Defines a type 'TableViewStyles' which will be used to style components of a table view. This ensures that these styles can be standardized and applied throughout the app.
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
// Initializes an empty 'defaultStyles' object that will be used as a fallback if no custom styles are provided.
const TableStylesContext = React.createContext<TableViewStyles>(defaultStyles);
// Creates a new Context object for 'TableViewStyles' with the default value set to 'defaultStyles'. This allows the styles to be passed down through the component tree without having to pass props manually.
export const TableStylesProvider: React.FC<{
// Exports 'TableStylesProvider', a functional component which wraps its children with the 'TableStylesContext.Provider'. This Provider will allow nested components to access the style configuration.
  children: React.ReactNode;
  styles?: TableViewStyles;
}> = ({ children, styles = defaultStyles }) => (
// The 'styles' prop is optional and defaults to 'defaultStyles' if not provided. When used, 'styles' are propagated down the component hierarchy.
  <TableStylesContext.Provider value={styles}>
    {children}
  </TableStylesContext.Provider>
// Exports a custom hook 'useTableStyles' that encapsulates the logic for consuming the 'TableStylesContext' and returns its value, which are the current style configurations.
);
export const useTableStyles = (): TableViewStyles =>
  React.useContext(TableStylesContext);
