import React from 'react';
import { TabsProps } from './Tabs/Tabs.props';
import { useTabsState } from './Tabs/Tabs.state';
import { TabsView } from './Tabs/Tabs.view';

const TabsComponent: React.FC<TabsProps> = ({ tabs, styles }) => {
  const { isActive, setIsActive, tabsState, setTabsState } = useTabsState(tabs);
  return (
    <TabsView
      tabs={tabs}
      styles={styles}
      isActive={isActive}
      tabsState={tabsState}
      setTabsState={setTabsState}
      setIsActive={setIsActive}
    />
  );
};
export const Tabs = React.memo(TabsComponent);
