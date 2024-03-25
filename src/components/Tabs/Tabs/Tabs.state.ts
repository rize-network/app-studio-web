import { useState } from 'react';
import { Tab } from './Tabs.type';
// Initializes a custom hook for managing tab states with an array of 'Tab' objects passed as properties.
export const useTabsState = (propTabs: Tab[]) => {
  const [isActive, setIsActive] = useState<Tab>(propTabs[0]);
  const [tabsState, setTabsState] = useState<Tab[]>(propTabs);
  return {
    isActive,
    setIsActive,
    tabsState,
    setTabsState,
  };
};
