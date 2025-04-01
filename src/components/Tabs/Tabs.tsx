import React from 'react';
import { TabsProps } from './Tabs/Tabs.props';
import { useTabsState } from './Tabs/Tabs.state';
import { TabsView } from './Tabs/Tabs.view';
import { Tab } from './Tabs/Tabs.type'; // Import Tab type

/**
 * Tabs component allows users to navigate between different sections of content.
 * It manages the active tab state and renders the corresponding content.
 */
const TabsComponent: React.FC<TabsProps> = ({
  tabs,
  styles,
  initialTabValue,
  onTabChange,
  renderTab,
  renderContent,
}) => {
  // Use the custom hook to manage the active tab state
  const { activeTab, setActiveTab } = useTabsState(tabs, initialTabValue);

  // Handler function to change the active tab and trigger the callback
  const handleTabClick = (tab: Tab) => {
    // Only update state and call callback if the clicked tab is different from the current one
    if (activeTab?.title !== tab.title) {
      setActiveTab(tab);
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
      styles={styles}
      activeTab={activeTab} // Pass the activeTab object from state
      handleTabClick={handleTabClick} // Pass the click handler
      renderTab={renderTab}
      renderContent={renderContent}
    />
  );
};

// Export the component wrapped in React.memo for performance optimization
export const Tabs = React.memo(TabsComponent);
