import React from 'react';
import { Element, Text, ViewProps } from 'app-studio';
import { Tab } from './Tabs.type';

export interface TabHeaderProps {
  /** The tab data */
  tab: Tab;
  /** Whether this tab is currently active */
  isActive: boolean;
  /** Handler for when the tab is clicked */
  onClick: () => void;
  /** Position of the icon relative to the text */
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Custom styles for the tab header */
  tabStyles?: ViewProps;
  /** Custom styles for the tab text */
  textStyles?: ViewProps;
}

/**
 * TabHeader component renders a single tab in the tab navigation.
 * It's designed to be a lightweight alternative to using Button components.
 */
export const TabHeader: React.FC<TabHeaderProps> = ({
  tab,
  isActive,
  onClick,
  iconPosition = 'left',
  tabStyles,
  textStyles,
}) => {
  // Base styles for the tab header
  // Base styles for the tab header
  const baseStyles: ViewProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: '2px solid',
    borderBottomColor: isActive ? 'theme.primary' : 'transparent',
    backgroundColor: 'transparent',
    color: isActive ? 'theme.primary' : 'color.gray.600',
    fontWeight: isActive ? '600' : '500',
    marginBottom: '-1px',
    transition: 'all 0.2s ease',

    // Hover state
    on: {
      hover: {
        color: 'theme.primary',
        borderBottomColor: isActive ? 'theme.primary' : 'color.gray.300',
      },
    },
  };

  // Determine the flex direction based on icon position
  const getFlexDirection = () => {
    switch (iconPosition) {
      case 'top':
        return 'column';
      case 'bottom':
        return 'column-reverse';
      case 'right':
        return 'row-reverse';
      case 'left':
      default:
        return 'row';
    }
  };

  // Determine the gap based on icon position
  const getGap = () => {
    return ['top', 'bottom'].includes(iconPosition) ? '4px' : '8px';
  };

  return (
    <Element
      as="div"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      {...baseStyles}
      {...tabStyles}
      flexDirection={getFlexDirection()}
      gap={getGap()}
      onClick={onClick}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {tab.icon && <Element>{tab.icon}</Element>}
      <Text {...textStyles}>{tab.title}</Text>
    </Element>
  );
};
