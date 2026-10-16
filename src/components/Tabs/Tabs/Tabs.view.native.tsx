import React, { createContext, useCallback, useContext } from 'react';
import {
  View,
  Horizontal,
  Vertical,
  Text,
  useTheme,
  ViewProps,
} from 'app-studio';
import {
  TabsViewProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './Tabs.props';
import { TabsContextType, TabsVariant } from './Tabs.type';
import { deepMerge, useDesignSystemComponentProps } from 'src/design-system';

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
        alignSelf: 'flex-start',
        gap: 6,
        padding: 6,
        borderRadius: 16,
        backgroundColor: isDark ? 'color-gray-800' : 'color-gray-100',
      },
      tab: {
        minHeight: 44,
        paddingHorizontal: 22,
        borderRadius: 12,
        color: isDark ? 'color-gray-300' : 'color-gray-600',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isDark ? 'color-gray-800' : 'color-gray-100',
      },
      activeTab: {
        backgroundColor: isDark ? 'color-gray-700' : 'color-white',
        color: isDark ? 'color-white' : 'color-gray-900',
      },
      text: { fontSize: 14, lineHeight: 20 },
      activeText: {},
      content: { width: '100%' },
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
        paddingHorizontal: 22,
        borderRadius: 999,
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
      text: { fontSize: 14, lineHeight: 20 },
      activeText: {},
      content: { width: '100%' },
    };
  }
  return {
    header: { width: '100%', gap: 20 },
    tab: {
      minHeight: 44,
      paddingHorizontal: 4,
      borderRadius: 0,
      color: isDark ? 'color-gray-400' : 'color-gray-500',
      borderBottomWidth: 3,
      borderBottomColor: isDark ? 'color-gray-900' : 'color-white',
    },
    activeTab: {
      color: 'theme-primary',
      borderBottomColor: 'theme-primary',
    },
    text: { fontSize: 14, lineHeight: 20 },
    activeText: {},
    content: { width: '100%', paddingTop: 12 },
  };
};

export const TabsView: React.FC<TabsViewProps> = ({
  tabs = [],
  activeTab,
  handleTabClick,
  views = {},
  renderTab,
  renderContent,
  variant = 'underline',
  iconPosition = 'left',
}) => {
  const { themeMode } = useTheme();
  const variantStyles = getTabsVariantStyles(variant, themeMode);
  if (!activeTab) return null;
  return (
    <Vertical width="100%" height={'100%'} {...views.container}>
      <Horizontal
        alignItems="center"
        {...variantStyles.header}
        {...views.headerTabs}
      >
        {tabs.map((tab) => {
          const isActive =
            (tab.value !== undefined ? tab.value : tab.title) ===
            (activeTab.value !== undefined ? activeTab.value : activeTab.title);
          const onPress = () => handleTabClick(tab);
          if (renderTab) {
            return renderTab(tab, isActive, onPress);
          }
          return (
            <View
              key={tab.title}
              onPress={onPress}
              onClick={onPress}
              alignItems="center"
              justifyContent="center"
              {...variantStyles.tab}
              {...views.tab}
              {...(isActive ? variantStyles.activeTab : {})}
              {...(isActive ? views.activeTab : {})}
            >
              <Text
                {...variantStyles.text}
                {...views.title}
                {...(isActive ? variantStyles.activeText : {})}
                {...(isActive ? views.activeText : {})}
              >
                {tab.title}
              </Text>
            </View>
          );
        })}
      </Horizontal>
      <View height="100%" {...variantStyles.content} {...views.content}>
        {renderContent ? renderContent(activeTab) : activeTab.content}
      </View>
    </Vertical>
  );
};

export const TabsContext = createContext<TabsContextType | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a Tabs component');
  }
  return context;
};

export const TabsList: React.FC<TabsListProps> = React.memo(
  ({ children, views }) => {
    const { themeMode } = useTheme();
    const { variant = 'underline' } = useTabsContext();
    const variantStyles = getTabsVariantStyles(variant, themeMode);
    const designSystemTabs = useDesignSystemComponentProps('tabs');
    const mergedViews = deepMerge(
      { container: designSystemTabs.views?.headerTabs },
      views
    );
    return (
      <Horizontal
        alignItems="center"
        {...variantStyles.header}
        {...mergedViews?.container}
      >
        {children}
      </Horizontal>
    );
  }
);

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
    const designSystemTabs = useDesignSystemComponentProps('tabs');
    const mergedViews = deepMerge(
      {
        trigger: designSystemTabs.views?.tab,
        activeState: designSystemTabs.views?.activeTab,
      },
      views
    );
    const handlePress = useCallback(() => {
      if (!disabled) setActiveValue(value);
    }, [disabled, value, setActiveValue]);
    return (
      <View
        opacity={disabled ? 0.6 : 1}
        alignItems="center"
        justifyContent="center"
        {...variantStyles.tab}
        {...(isActive ? variantStyles.activeTab : {})}
        onPress={handlePress}
        onClick={handlePress}
        {...mergedViews?.trigger}
        {...(isActive ? mergedViews?.activeState : {})}
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

export const TabsContent: React.FC<TabsContentProps> = React.memo(
  ({ value, children, views }) => {
    const { activeValue } = useTabsContext();
    if (activeValue !== value) return null;
    return (
      <View width="100%" padding={24} {...views?.content}>
        {children}
      </View>
    );
  }
);
