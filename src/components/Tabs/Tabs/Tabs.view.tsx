import React from 'react';
import { TabsViewProps } from './Tabs.props';
import { View } from '../../Layout/View/View'; // Adjust path as needed
import { Horizontal } from '../../Layout/Horizontal/Horizontal'; // Adjust path as needed
import { Button } from '../../Button/Button'; // Adjust path as needed
import { Text } from '../../Text/Text'; // Adjust path as needed
import { Vertical } from '../../Layout/Vertical/Vertical'; // Adjust path as needed

/**
 * The presentation component for Tabs. Renders the UI based on props.
 */
export const TabsView: React.FC<TabsViewProps> = ({
  tabs = [], // Default to empty array
  activeTab,
  handleTabClick,
  styles = {}, // Default to empty object
  renderTab,
  renderContent,
}) => {
  // If there's no active tab (e.g., tabs array is empty), render nothing or a placeholder
  if (!activeTab) {
    // Optionally render a placeholder when no tabs are active/available
    // return <View {...styles.container}><Text>No tabs available.</Text></View>;
    return null; // Or simply render nothing
  }

  return (
    // Use Vertical layout for overall structure (tabs header above content)
    <Vertical width="100%" height={'100%'} {...styles.container}>
      {/* Horizontal layout for the tab headers/buttons */}
      <Horizontal {...styles.headerTabs}>
        {tabs.map((tab) => {
          // Determine if the current tab in the loop is the active one
          const isActive = tab.title === activeTab.title;
          // Prepare the onClick handler for this specific tab
          const onClick = () => handleTabClick(tab);

          // Use the custom renderTab function if provided
          if (renderTab) {
            return renderTab(tab, isActive, onClick);
          }

          // Default rendering for a tab button
          return (
            <Button
              key={tab.title} // Use the unique title as the key
              onClick={onClick}
              borderBottomLeftRadius={0} // Example: Apply border radius if active
              borderBottomRightRadius={0} // Example: Apply border radius if active
              // Apply base tab styles and merge activeTab styles if this tab is active
              {...styles.tab}
              {...(isActive ? styles.activeTab : {})}
              // Example: Set variant based on active state (can be overridden by styles)
              variant={isActive ? 'filled' : 'ghost'}
              cursor="pointer" // Ensure pointer cursor
              // Removed isAuto and margin={10} - should be controlled via styles.tab if needed
            >
              {/* Render tab icon if provided */}
              {tab.icon}
              {/* Render tab title */}
              <Text
                // Apply base title styles and merge activeText styles if this tab is active
                {...styles.title}
                {...(isActive ? styles.activeText : {})}
              >
                {tab.title}
              </Text>
            </Button>
          );
        })}
      </Horizontal>

      {/* Content area */}
      <View width={'100%'} height="100%" {...styles.content}>
        {/* Use the custom renderContent function if provided */}
        {renderContent
          ? renderContent(activeTab)
          : // Otherwise, render the content property from the active tab object
            activeTab.content}
      </View>
    </Vertical>
  );
};
