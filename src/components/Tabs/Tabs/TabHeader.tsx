import React, { useMemo } from 'react';
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
    // Base styles for the tab header (memoized to avoid recreation on every render)
    const baseStyles: ViewProps = useMemo(
      () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 16px',
        cursor: 'pointer',
        borderBottom: '2px solid',
        borderBottomColor: isActive ? 'theme-primary' : 'transparent',
        backgroundColor: 'transparent',
        color: isActive ? 'theme-primary' : 'color-gray-600',
        fontWeight: isActive ? '600' : '500',
        marginBottom: '-1px',
        transition: 'all 0.2s ease',

        // Hover state
        on: {
          hover: {
            color: 'theme-primary',
            borderBottomColor: isActive ? 'theme-primary' : 'color-gray-300',
          },
        },
      }),
      [isActive]
    );

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
        {...baseStyles}
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
