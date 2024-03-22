import { useState } from 'react';
import { Tab } from './Tabs.type';
export const useTabsState = (propTabs: Tab[]) => {
  // Defines a custom hook named 'useTabsState' that manages the state of tabs in a tabbed interface.
  const [isActive, setIsActive] = useState<Tab>(propTabs[0]);
  // Initializes the 'isActive' state to store the current active tab, defaulting to the first tab in the 'propTabs' array.
  const [tabsState, setTabsState] = useState<Tab[]>(propTabs);
  // Initializes the 'tabsState' state to store the complete list of tabs, starting with the initial tabs provided through 'propTabs'.
  return {
    // Returns an object containing the 'isActive' state, the 'setIsActive' state updater function, the 'tabsState', and the 'setTabsState' state updater function for external use.
    isActive,
    setIsActive,
    tabsState,
    setTabsState,
  };
};
