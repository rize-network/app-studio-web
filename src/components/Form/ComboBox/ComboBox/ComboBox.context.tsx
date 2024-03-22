import { createContext, useContext } from 'react';
interface ComboBoxContextType {
  openDropdowns: { [key: string]: boolean };
  toggleDropdown: (id: string) => void;
}
const ComboBoxContext = createContext<ComboBoxContextType>(null!);
export const useComboBoxContext = () => useContext(ComboBoxContext);
export default ComboBoxContext;
