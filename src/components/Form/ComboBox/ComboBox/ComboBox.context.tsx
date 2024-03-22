import { createContext, useContext } from 'react';
interface ComboBoxContextType {
  openDropdowns: { [key: string]: boolean };
  // Defines an interface for ComboBox context which includes a dictionary to track open dropdowns by key, and a function to toggle dropdown state.
  toggleDropdown: (id: string) => void;
}
// Creates a React context for the ComboBox component with the specified interface, initialized as not nullable using the non-null assertion operator (!).
const ComboBoxContext = createContext<ComboBoxContextType>(null!);
// Exports a custom hook that allows the use of ComboBoxContext in functional components, providing access to the context's value.
export const useComboBoxContext = () => useContext(ComboBoxContext);
export default ComboBoxContext;
