import React from 'react';
import { View, Horizontal, Text, Vertical } from 'app-studio';
import { TabsViewProps } from './Tabs.props';
import { TabHeader } from './TabHeader';

/**
 * The presentation component for Tabs. Renders the UI based on props.
 */
export const TabsView: React.FC<TabsViewProps> = ({
  tabs = [], // Default to empty array
  activeTab,
  handleTabClick,
  views = {}, // Default to empty object
  renderTab,
  renderContent,
  iconPosition = 'left', // Default to left
}) => {
  // If there's no active tab (e.g., tabs array is empty), render nothing or a placeholder
  if (!activeTab) {
    // Optionally render a placeholder when no tabs are active/available
    // return <View {...views.container}><Text>No tabs available.</Text></View>;
    return null; // Or simply render nothing
  }

  return (
    // Use Vertical layout for overall structure (tabs header above content)
    <Vertical width="100%" height={'100%'} {...views.container}>
      {/* Horizontal layout for the tab headers/buttons */}
      <Horizontal {...views.headerTabs}>
        {tabs.map((tab) => {
          // Determine if the current tab in the loop is the active one
          const isActive = tab.title === activeTab.title;
          // Prepare the onClick handler for this specific tab
          const onClick = () => handleTabClick(tab);

          // Use the custom renderTab function if provided
          if (renderTab) {
            return renderTab(tab, isActive, onClick);
          }

          // Default rendering for a tab using our custom TabHeader component
          return (
            <TabHeader
              key={tab.title} // Use the unique title as the key
              tab={tab}
              isActive={isActive}
              onClick={onClick}
              iconPosition={iconPosition}
              tabStyles={{
                ...views.tab,
                ...(isActive ? views.activeTab : {}),
              }}
              textStyles={{
                ...views.title,
                ...(isActive ? views.activeText : {}),
              }}
            />
          );
        })}
      </Horizontal>

      {/* Content area */}
      <View width={'100%'} height="100%" {...views.content}>
        {/* Use the custom renderContent function if provided */}
        {renderContent
          ? renderContent(activeTab)
          : // Otherwise, render the content property from the active tab object
            activeTab.content}
      </View>
    </Vertical>
  );
};
