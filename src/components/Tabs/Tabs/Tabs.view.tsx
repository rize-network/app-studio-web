import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { View, Horizontal, Vertical, useTheme, ViewProps } from 'app-studio';
import {
  TabsViewProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './Tabs.props';
import { TabsContextType, TabsVariant } from './Tabs.type';
import { TabHeader } from './TabHeader';

const getTabsVariantStyles = (
  variant: TabsVariant,
  themeMode: string
): {
  header: ViewProps;
  tab: ViewProps;
  activeTab: ViewProps;
  text: ViewProps;
  activeText: ViewProps;
  content: ViewProps;
} => {
  const isDark = themeMode === 'dark';

  if (variant === 'segmented') {
    return {
      header: {
        width: 'fit-content',
        alignSelf: 'flex-start',
        gap: 6,
        padding: 6,
        borderRadius: 16, // radius-xl
        backgroundColor: isDark ? 'color-gray-800' : 'color-gray-100',
      },
      tab: {
        minHeight: 44,
        padding: '0 22px',
        borderRadius: 12, // radius-lg
        backgroundColor: 'transparent',
        color: isDark ? 'color-gray-300' : 'color-gray-600',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
      activeTab: {
        backgroundColor: isDark ? 'color-gray-700' : 'color-white',
        color: isDark ? 'color-white' : 'color-gray-900',
        boxShadow: isDark
          ? '0 1px 3px rgba(0, 0, 0, 0.35)'
          : '0 1px 2px rgba(0, 0, 0, 0.06)',
      },
      text: {
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '-0.01em',
        color: 'inherit',
      },
      activeText: {
        color: 'inherit',
      },
      content: {
        width: '100%',
      },
    };
  }

  if (variant === 'pill') {
    return {
      header: {
        width: '100%',
        flexWrap: 'wrap',
        gap: 12,
      },
      tab: {
        minHeight: 44,
        padding: '0 22px',
        borderRadius: '999px',
        backgroundColor: isDark ? 'color-gray-900' : 'color-white',
        color: isDark ? 'color-gray-200' : 'color-gray-600',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isDark ? 'color-gray-700' : 'color-gray-200',
      },
      activeTab: {
        backgroundColor: 'theme-primary',
        color: 'color-white',
        borderColor: 'theme-primary',
      },
      text: {
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '-0.01em',
        color: 'inherit',
      },
      activeText: {
        color: 'inherit',
      },
      content: {
        width: '100%',
      },
    };
  }

  return {
    header: {
      width: '100%',
      gap: 20,
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: isDark ? 'color-gray-700' : 'color-gray-200',
    },
    tab: {
      minHeight: 44,
      padding: '0 4px',
      borderRadius: 0,
      backgroundColor: 'transparent',
      color: isDark ? 'color-gray-400' : 'color-gray-500',
      borderBottomWidth: '3px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'transparent',
      marginBottom: '-1px',
    },
    activeTab: {
      color: 'theme-primary',
      borderBottomColor: 'theme-primary',
    },
    text: {
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '-0.01em',
      color: 'inherit',
    },
    activeText: {
      color: 'inherit',
    },
    content: {
      width: '100%',
    },
  };
};

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
  variant = 'underline',
  iconPosition = 'left', // Default to left
}) => {
  const { themeMode } = useTheme();
  const variantStyles = getTabsVariantStyles(variant, themeMode);

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
        alignItems="center"
        {...views.headerTabs}
        {...variantStyles.header}
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
                ...variantStyles.tab,
                ...views.tab,
                ...(isActive ? variantStyles.activeTab : {}),
                ...(isActive ? views.activeTab : {}),
              }}
              textStyles={{
                ...variantStyles.text,
                ...views.title,
                ...(isActive ? variantStyles.activeText : {}),
                ...(isActive ? views.activeText : {}),
              }}
            />
          );
        })}
      </Horizontal>

      {/* Content area */}
      <View height="100%" {...variantStyles.content} {...views.content}>
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
    const { themeMode } = useTheme();
    const { variant = 'underline' } = useTabsContext();
    const variantStyles = getTabsVariantStyles(variant, themeMode);

    return (
      <Horizontal
        alignItems="center"
        {...variantStyles.header}
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
    const { themeMode } = useTheme();
    const {
      activeValue,
      setActiveValue,
      variant = 'underline',
    } = useTabsContext();
    const isActive = activeValue === value;
    const variantStyles = getTabsVariantStyles(variant, themeMode);

    const handleClick = useCallback(() => {
      if (!disabled) {
        setActiveValue(value);
      }
    }, [disabled, value, setActiveValue]);

    return (
      <View
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.6 : 1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s ease-in-out"
        {...variantStyles.tab}
        {...(isActive ? variantStyles.activeTab : {})}
        _hover={
          !disabled
            ? variant === 'underline'
              ? { color: 'theme-primary' }
              : { opacity: 0.9 }
            : {}
        }
        onClick={handleClick}
        {...views?.trigger}
        {...(isActive ? views?.activeState : {})}
      >
        <View
          {...variantStyles.text}
          {...(isActive ? variantStyles.activeText : {})}
        >
          {children}
        </View>
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
