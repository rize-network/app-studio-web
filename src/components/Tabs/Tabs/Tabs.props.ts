import React from 'react';
import { TabsStyles, Tab } from './Tabs.type';
export interface TabsProps {
  tabs: Tab[];
  styles?: TabsStyles;
}
export interface TabsViewProps extends TabsProps {
  isActive: Tab;
  setIsActive: React.Dispatch<React.SetStateAction<Tab>>;
  tabsState: Tab[];
  setTabsState: React.Dispatch<React.SetStateAction<Tab[]>>;
}
