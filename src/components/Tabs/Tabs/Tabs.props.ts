import React from 'react';
import { TabsStyles, Tab } from './Tabs.type';
export interface TabsProps {
  // The TabsProps interface is declared here, specifying the props required for a Tabs component. It includes an array of Tab items and an optional TabsStyles object for custom styling.
  tabs: Tab[];
  styles?: TabsStyles;
}
// TabsViewProps extends the TabsProps to include properties unique to the view layer of the tabs component. This indicates that the view needs to know the current active tab and also needs functions to update the active tab and the list of all tabs.
export interface TabsViewProps extends TabsProps {
  // isActive is a Tab object that represents the currently active tab in the tabs list.
  isActive: Tab;
  // setIsActive is a dispatch function from React's useReducer hook, allowing the tabs component to update the active tab state.
  setIsActive: React.Dispatch<React.SetStateAction<Tab>>;
  // tabsState is an array of Tab objects representing the complete state of tabs at any given moment, possibly controlling the rendering or the order of tabs.
  tabsState: Tab[];
  // setTabsState is a dispatch function for updating the tabsState, allowing for operations like adding, removing, or reordering tabs within the tabs component.
  setTabsState: React.Dispatch<React.SetStateAction<Tab[]>>;
}
