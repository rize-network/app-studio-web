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
  const baseStyles: ViewProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 16px',
    cursor: 'pointer',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isActive ? 'theme.primary' : 'transparent',
    borderBottomColor: isActive ? 'transparent' : 'color.gray.200',
    backgroundColor: isActive ? 'color.white' : 'transparent',
    color: isActive ? 'theme.primary' : 'color.gray.600',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.2s ease',
    position: 'relative',
    // If active, show a bottom border that matches the background color
    // to create the illusion that the tab is connected to the content
    ...(isActive && {
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: 'color.white',
      },
    }),
    // Hover state
    on: {
      hover: {
        backgroundColor: isActive ? 'color.white' : 'color.gray.50',
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
