import React from 'react';
import { TabsStyles, Tab } from './Tabs.type';
// Defines the structure for the TabsProps with the necessary properties for tabs.
export interface TabsProps {
// Declares an array of tabs, expecting each element to conform to the Tab interface.
  tabs: Tab[];
// Allows for optional styling to be applied to the tabs via a TabsStyles object.
  styles?: TabsStyles;
}
// Extends TabsProps to include properties specific to the view component of the tabs.
export interface TabsViewProps extends TabsProps {
// Holds the current active Tab object.
  isActive: Tab;
  setIsActive: React.Dispatch<React.SetStateAction<Tab>>;
  tabsState: Tab[];
  setTabsState: React.Dispatch<React.SetStateAction<Tab[]>>;
}
