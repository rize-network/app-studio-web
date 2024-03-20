import React, { useState } from 'react';
import ComboBoxContext from './ComboBox.context';

export const ComboBoxProvider = ({ children }: any) => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ComboBoxContext.Provider value={{ openDropdowns, toggleDropdown }}>
      {children}
    </ComboBoxContext.Provider>
  );
};
