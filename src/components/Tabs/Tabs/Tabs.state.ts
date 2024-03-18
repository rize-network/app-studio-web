import { useState } from 'react';
import { Tab } from './Tabs.type';
export const useTabsState = (propTabs: Tab[]) => {
  // Defines a custom hook, named `useTabsState`, that manages the state of tabs within a component.
  const [isActive, setIsActive] = useState<Tab>(propTabs[0]);
  // Initializes 'isActive' state with the first tab from the 'propTabs' array, indicating the currently active tab.
  const [tabsState, setTabsState] = useState<Tab[]>(propTabs);
  // Initializes 'tabsState' as a stateful array that reflects the tabs passed through 'propTabs' prop, setting the initial state of tabs.
  return {
    // The hook returns an object containing both the state and the functions to update the state, allowing components to control and access the current state of the tabs.
    isActive,
    setIsActive,
    tabsState,
    setTabsState,
  };
};
