import React from 'react';
import { TabsProps } from './Tabs/Tabs.props';
import { useTabsState } from './Tabs/Tabs.state';
// Importing type definitions for the tabs' props to ensure the component receives the correct properties
import { TabsView } from './Tabs/Tabs.view';
// Importing a hook that provides state and its setter functions for active tab and tabs state
const TabsComponent: React.FC<TabsProps> = ({ tabs, styles }) => {
  // Importing the presentational component for the Tabs, which will receive props and state info to render the UI
  const { isActive, setIsActive, tabsState, setTabsState } = useTabsState(tabs);
  // Defines 'TabsComponent' as a functional component using TypeScript with 'TabsProps' for prop types
  return (
    // Destructures the 'tabs' and 'styles' props received by the component
    <TabsView
      // Extracting the stateful logic and state setters from the 'useTabsState' hook to manage active tabs and general tabs state
      tabs={tabs}
      styles={styles}
      // Returning the 'TabsView' presentational component and passing down the tabs props, styles, active state, and the state setters
      isActive={isActive}
      tabsState={tabsState}
      setTabsState={setTabsState}
      setIsActive={setIsActive}
      // Creates a memoized version of the 'TabsComponent' to prevent unnecessary re-renders when props don't change
    />
  );
};
export const Tabs = React.memo(TabsComponent);
