import React from 'react';
import { TabsStyles, Tab } from './Tabs.type';
// Importing 'TabsStyles' and 'Tab' type definitions, likely from a local file named 'Tabs.type', to ensure type safety in components using these types.
export interface TabsProps {
  // Defining the 'TabsProps' interface to type-check the props expected by the parent 'Tabs' component.
  tabs: Tab[];
  // Declaring the required 'tabs' prop, which is an array of 'Tab' objects to render as tabs.
  styles?: TabsStyles;
  // Optionally including 'styles' as a prop, which would provide custom styling options defined by 'TabsStyles'. Its use is not mandatory, as denoted by the '?'.
}
export interface TabsViewProps extends TabsProps {
  // Extending 'TabsProps' in the 'TabsViewProps' interface to reuse the common props while adding additional properties specific to the view behavior.
  isActive: Tab;
  // 'isActive' is used to keep track of currently active 'Tab' indicating which tab is currently selected.
  setIsActive: React.Dispatch<React.SetStateAction<Tab>>;
  // 'setIsActive' is a React dispatch function from 'useState' hook, allowing to update the currently active 'Tab'.
  tabsState: Tab[];
  // 'tabsState' is an array of Tab objects representing the current state of tabs, which might include states like disabled, hidden, etc.
  setTabsState: React.Dispatch<React.SetStateAction<Tab[]>>;
  // 'setTabsState' provides a method to update the entire array of tabs' states. This function probably comes from using a 'useState' hook at a higher level in the component tree.
}
