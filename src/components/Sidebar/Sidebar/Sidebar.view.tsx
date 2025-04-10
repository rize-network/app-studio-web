import React, { createContext, useContext } from 'react';
import { View } from '../../Layout/View/View';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';
import { ChevronIcon } from '../../Icon/Icon';
import {
  SidebarProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
} from './Sidebar.props';
import {
  SidebarSizes,
  SidebarVariants,
  SidebarPositions,
  SidebarElevations,
  SidebarTransitions,
} from './Sidebar.style';
import { SidebarContextType } from './Sidebar.type';

// Create context for the Sidebar
const SidebarContext = createContext<SidebarContextType>({
  isExpanded: true,
  toggleExpanded: () => {},
  expand: () => {},
  collapse: () => {},
  position: 'left',
  size: 'md',
  variant: 'default',
});

// Hook to use the Sidebar context
export const useSidebarContext = () => useContext(SidebarContext);

// Provider component for the Sidebar context
export const SidebarProvider: React.FC<{
  value: SidebarContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

// Sidebar Header component
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  showToggleButton = true,
  views,
  ...props
}) => {
  const { isExpanded, toggleExpanded, position } = useSidebarContext();

  return (
    <Horizontal
      width="100%"
      padding="16px"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="color.gray.200"
      alignItems="center"
      justifyContent="space-between"
      {...views?.header}
      {...props}
    >
      {isExpanded ? (
        <Horizontal
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          {children}
          {showToggleButton && (
            <View
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="32px"
              height="32px"
              borderRadius="4px"
              backgroundColor="transparent"
              cursor="pointer"
              _hover={{ backgroundColor: 'color.gray.100' }}
              onClick={toggleExpanded}
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              {...views?.toggleButton}
            >
              <ChevronIcon
                orientation={position === 'left' ? 'left' : 'right'}
                widthHeight={16}
                {...views?.toggleButtonIcon}
              />
            </View>
          )}
        </Horizontal>
      ) : (
        <View
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {showToggleButton && (
            <View
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="32px"
              height="32px"
              borderRadius="4px"
              backgroundColor="transparent"
              cursor="pointer"
              _hover={{ backgroundColor: 'color.gray.100' }}
              onClick={toggleExpanded}
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              {...views?.toggleButton}
            >
              <ChevronIcon
                orientation={position === 'left' ? 'right' : 'left'}
                widthHeight={16}
                {...views?.toggleButtonIcon}
              />
            </View>
          )}
        </View>
      )}
    </Horizontal>
  );
};

// Sidebar Content component
export const SidebarContent: React.FC<SidebarContentProps> = ({
  children,
  views,
  ...props
}) => {
  const { isExpanded } = useSidebarContext();

  return (
    <View
      flex="1"
      width="100%"
      overflowY="auto"
      overflowX="hidden"
      padding={isExpanded ? '16px' : '8px'}
      {...views?.content}
      {...props}
    >
      {children}
    </View>
  );
};

// Sidebar Footer component
export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  children,
  views,
  ...props
}) => {
  const { isExpanded } = useSidebarContext();

  return (
    <View
      width="100%"
      padding="16px"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor="color.gray.200"
      {...views?.footer}
      {...props}
    >
      {isExpanded ? children : null}
    </View>
  );
};

// Main Sidebar View component
export const SidebarView: React.FC<SidebarProps> = ({
  children,
  position = 'left',
  size = 'md',
  variant = 'default',
  fixed = false,
  hasBackdrop = true,
  showToggleButton = true,
  expandedWidth,
  collapsedWidth,
  breakpoint = 768,
  breakpointBehavior = 'overlay',
  elevation = 'none',
  transitionPreset = 'normal',
  ariaLabel = 'Sidebar navigation',
  isExpanded,
  isMobile,
  toggleExpanded,
  expand,
  collapse,
  views,
  ...props
}) => {
  // Determine width based on expanded state and size
  const sizeConfig = SidebarSizes[size];
  const width = isExpanded
    ? expandedWidth || sizeConfig.expandedWidth
    : collapsedWidth || sizeConfig.collapsedWidth;

  // Determine if sidebar should be visible based on mobile state and breakpoint behavior
  const isVisible = !isMobile || (isMobile && breakpointBehavior !== 'hide');

  // Determine if sidebar should be fixed or absolute based on mobile state and breakpoint behavior
  const position_type =
    fixed || (isMobile && breakpointBehavior === 'overlay')
      ? 'fixed'
      : 'relative';

  // Determine if backdrop should be shown
  const showBackdrop =
    hasBackdrop && isMobile && isExpanded && breakpointBehavior === 'overlay';

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <View
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          backgroundColor="color.blackAlpha.500"
          zIndex={998}
          onClick={collapse}
          {...views?.backdrop}
        />
      )}

      {/* Sidebar */}
      {isVisible && (
        <Vertical
          position={position_type}
          top={0}
          height="100vh"
          width={width}
          zIndex={999}
          transition={SidebarTransitions[transitionPreset]}
          transform={
            isMobile && breakpointBehavior === 'overlay' && !isExpanded
              ? `translateX(${position === 'left' ? '-100%' : '100%'})`
              : 'translateX(0)'
          }
          role="navigation"
          aria-label={ariaLabel}
          {...SidebarVariants[variant]}
          {...SidebarPositions[position]}
          {...SidebarElevations[elevation]}
          {...views?.container}
          {...props}
        >
          {React.Children.map(children, (child) => {
            return child;
          })}
        </Vertical>
      )}
    </>
  );
};
