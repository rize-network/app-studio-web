import React from 'react';
import { TabsProps } from './Tabs/Tabs.props';
import { useTabsState, useTabsCompoundState } from './Tabs/Tabs.state';
import {
  TabsView,
  TabsContext,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './Tabs/Tabs.view';
import { Tab } from './Tabs/Tabs.type'; // Import Tab type

/**
 * Tabs component allows users to navigate between different sections of content.
 * Supports both data-driven approach (with tabs prop) and compound component pattern.
 */
const TabsComponent: React.FC<TabsProps> = ({
  tabs,
  views,
  defaultValue,
  onTabChange,
  renderTab,
  renderContent,
  iconPosition = 'left',

  value,
  onValueChange,
  children,
}) => {
  // For compound component pattern
  const compoundState = useTabsCompoundState(
    defaultValue,
    value,
    onValueChange
  );

  // For data-driven pattern
  const dataState = useTabsState(tabs || [], defaultValue, value);

  // If using compound component pattern (children provided)
  if (children) {
    return (
      <TabsContext.Provider value={compoundState}>
        {children}
      </TabsContext.Provider>
    );
  }

  // If using data-driven pattern (tabs provided)
  if (tabs) {
    // Handler function to change the active tab and trigger the callback
    const handleTabClick = (tab: Tab) => {
      const getTabId = (t: Tab) => (t.value !== undefined ? t.value : t.title);

      // Only update state and call callback if the clicked tab is different from the current one
      if (
        !dataState.activeTab ||
        getTabId(dataState.activeTab) !== getTabId(tab)
      ) {
        dataState.setActiveTab(tab);
        // Call the onTabChange callback if provided
        if (onTabChange) {
          onTabChange(tab);
        }
      }
    };

    // Render the presentation component with the necessary props
    return (
      <TabsView
        tabs={tabs}
        views={views}
        activeTab={dataState.activeTab} // Pass the activeTab object from state
        handleTabClick={handleTabClick} // Pass the click handler
        renderTab={renderTab}
        renderContent={renderContent}
        iconPosition={iconPosition}
      />
    );
  }

  // If neither tabs nor children are provided, return null
  return null;
};

// Define the compound component type
interface TabsType extends React.FC<TabsProps> {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
}

// Export the component wrapped in React.memo for performance optimization
const TabsMemoized = React.memo(TabsComponent);

// Create the compound component with proper typing
export const Tabs = TabsMemoized as unknown as TabsType;

// Assign the sub-components to the main component
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
