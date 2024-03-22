import React, { useState } from 'react';
import ComboBoxContext from './ComboBox.context';
export const ComboBoxProvider = ({ children }: any) => {
  // Defines the 'ComboBoxProvider' component which wraps its children with a 'ComboBoxContext.Provider' to share state about dropdown visibility.
  const [openDropdowns, setOpenDropdowns] = useState<{
    // Declares state to keep track of which dropdowns are open using an object that maps identifiers to a boolean indicating visibility.
    [key: string]: boolean;
  }>({});
  // Creates a function 'toggleDropdown' to change the visibility state of a specific dropdown identified by 'id'.
  const toggleDropdown = (id: string) => {
    // Uses the function 'setOpenDropdowns' to update the state. It takes the previous state, spreads it to retain existing values, and toggles the value for the specified 'id'.
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    // The ComboBoxContext.Provider supplies the 'openDropdowns' state and 'toggleDropdown' function to all children components, allowing them to control and access the dropdowns' state.
    <ComboBoxContext.Provider value={{ openDropdowns, toggleDropdown }}>
      {children}
    </ComboBoxContext.Provider>
  );
};
