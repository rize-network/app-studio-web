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
export const TabHeader: React.FC<TabHeaderProps> = React.memo(
  ({
    tab,
    isActive,
    onClick,
    iconPosition = 'left',
    tabStyles,
    textStyles,
  }) => {
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

    // Clone icon to apply active styles (e.g. bold stroke) if valid
    const iconElement =
      tab.icon && React.isValidElement(tab.icon)
        ? React.cloneElement(tab.icon as React.ReactElement, {
            strokeWidth: isActive ? 2.5 : 2,
          })
        : tab.icon;

    return (
      <Element
        as="div"
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease"
        {...tabStyles}
        flexDirection={getFlexDirection()}
        gap={getGap()}
        onClick={onClick}
        data-state={isActive ? 'active' : 'inactive'}
      >
        {/* 
        Force icon remount when active state changes to ensure strokeWidth prop is applied 
        even if the Icon component doesn't handle prop updates correctly.
      */}
        {iconElement && (
          <Element key={isActive ? 'active-icon' : 'inactive-icon'}>
            {iconElement}
          </Element>
        )}

        {/* Grid wrapper to prevent layout shift when font weight changes */}
        <Element display="grid" alignItems="center" justifyContent="center">
          {/* Invisible bold text to reserve space */}
          <Text
            {...textStyles}
            fontWeight="600"
            visibility="hidden"
            gridColumn="1"
            gridRow="1"
            aria-hidden="true"
          >
            {tab.title}
          </Text>
          {/* Visible text */}
          <Text
            {...textStyles}
            fontWeight={isActive ? '600' : '500'}
            gridColumn="1"
            gridRow="1"
          >
            {tab.title}
          </Text>
        </Element>
      </Element>
    );
  }
);
