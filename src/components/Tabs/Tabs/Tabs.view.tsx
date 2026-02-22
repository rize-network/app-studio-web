import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { View, Horizontal, Vertical } from 'app-studio';
import {
  TabsViewProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './Tabs.props';
import { TabsContextType } from './Tabs.type';
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
      <Horizontal
        width="100%"
        borderBottom="1px solid"
        borderBottomColor="color-gray-200"
        {...views.headerTabs}
      >
        {tabs.map((tab) => {
          // Determine if the current tab in the loop is the active one
          const isActive =
            (tab.value !== undefined ? tab.value : tab.title) ===
            (activeTab.value !== undefined ? activeTab.value : activeTab.title);
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

// Context for compound components
export const TabsContext = createContext<TabsContextType | null>(null);

// Hook to use the Tabs context
export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a Tabs component');
  }
  return context;
};

// TabsList compound component
export const TabsList: React.FC<TabsListProps> = React.memo(
  ({ children, views }) => {
    return (
      <Horizontal
        width="100%"
        borderBottom="1px solid"
        borderBottomColor="color-gray-200"
        {...views?.container}
      >
        {children}
      </Horizontal>
    );
  }
);

// TabsTrigger compound component
export const TabsTrigger: React.FC<TabsTriggerProps> = React.memo(
  ({ value, children, disabled = false, views }) => {
    const { activeValue, setActiveValue } = useTabsContext();
    const isActive = activeValue === value;

    const handleClick = useCallback(() => {
      if (!disabled) {
        setActiveValue(value);
      }
    }, [disabled, value, setActiveValue]);

    return (
      <View
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.6 : 1}
        padding="12px 16px"
        borderBottom="2px solid"
        borderBottomColor={isActive ? 'theme-primary' : 'transparent'}
        color={isActive ? 'theme-primary' : 'color-gray-600'}
        fontWeight={isActive ? '600' : '400'}
        transition="all 0.2s ease"
        _hover={!disabled ? { color: 'theme-primary' } : {}}
        onClick={handleClick}
        {...views?.trigger}
        {...(isActive ? views?.activeState : {})}
      >
        {children}
      </View>
    );
  }
);

// TabsContent compound component
export const TabsContent: React.FC<TabsContentProps> = React.memo(
  ({ value, children, views }) => {
    const { activeValue } = useTabsContext();

    if (activeValue !== value) {
      return null;
    }

    return (
      <View width="100%" padding="24px" {...views?.content}>
        {children}
      </View>
    );
  }
);
