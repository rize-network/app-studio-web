import { createContext, useContext } from 'react';
interface ComboBoxContextType {
  // Defines an object that tracks the open state of combo boxes by ID
  openDropdowns: { [key: string]: boolean };
  // Function type for toggling the open state of a combo box by ID
  toggleDropdown: (id: string) => void;
}
// Creates the context for ComboBox with a default value enforcing non-null
const ComboBoxContext = createContext<ComboBoxContextType>(null!);
// Hook for consuming ComboBoxContext and accessing combo box states and toggle function
export const useComboBoxContext = () => useContext(ComboBoxContext);
export default ComboBoxContext;
