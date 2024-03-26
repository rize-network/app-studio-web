import React, { useState } from 'react';
import ComboBoxContext from './ComboBox.context';
// Defines a provider component for ComboBox, using a render prop pattern to pass down the context to children.
export const ComboBoxProvider = ({ children }: any) => {
  // Initializes a state variable to track the open state of dropdowns using an object keyed by a string identifier.
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  // Defines a function to toggle the open state of a dropdown identified by its id.
  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <ComboBoxContext.Provider value={{ openDropdowns, toggleDropdown }}>
      {children}
    </ComboBoxContext.Provider>
  );
};
