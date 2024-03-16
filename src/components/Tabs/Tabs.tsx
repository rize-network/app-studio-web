import React from 'react';
import { TabsProps } from './Tabs/Tabs.props';
import { useTabsState } from './Tabs/Tabs.state';
import { TabsView } from './Tabs/Tabs.view';
// Define the functional component TabsComponent that utilizes the TabsProps interface for its props.
const TabsComponent: React.FC<TabsProps> = ({ tabs, styles }) => {
  // Destructure the 'tabs' and 'styles' properties from the component's props.
  const { isActive, setIsActive, tabsState, setTabsState } = useTabsState(tabs);
  // Invoke the useTabsState custom hook with 'tabs' to manage state related to tab activities like the active tab and tab state management.
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
