import React, { createContext, useContext } from 'react';
import { ScrollView } from 'react-native';
import { View, Vertical, Horizontal, Text } from 'app-studio';
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
} from './Sidebar.style';
import { SidebarContextType } from './Sidebar.type';
import { Badge } from '../../Badge/Badge';

const SidebarContext = createContext<SidebarContextType>({
  isExpanded: true,
  toggleExpanded: () => {},
  expand: () => {},
  collapse: () => {},
  position: 'left',
  size: 'md',
  variant: 'default',
});

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarProvider: React.FC<{
  value: SidebarContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  showToggleButton = true,
  views,
  ...props
}) => {
  const { isExpanded, toggleExpanded, position } = useSidebarContext();
  const arrowOrientation: 'left' | 'right' = isExpanded
    ? position === 'left'
      ? 'left'
      : 'right'
    : position === 'left'
    ? 'right'
    : 'left';
  return (
    <Horizontal
      width="100%"
      padding={16}
      borderBottomWidth={1}
      borderBottomStyle="solid"
      borderBottomColor="color-gray-200"
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
              alignItems="center"
              justifyContent="center"
              width={32}
              height={32}
              borderWidth={1}
              borderStyle="solid"
              borderColor="color-gray-200"
              borderRadius={4}
              backgroundColor="transparent"
              onPress={toggleExpanded}
              onClick={toggleExpanded}
              {...views?.toggleButton}
            >
              <ChevronIcon
                widthHeight={16}
                orientation={arrowOrientation}
                {...views?.toggleButtonIcon}
              />
            </View>
          )}
        </Horizontal>
      ) : (
        <View width="100%" alignItems="center" justifyContent="center">
          {showToggleButton && (
            <View
              alignItems="center"
              justifyContent="center"
              width={32}
              height={32}
              borderWidth={1}
              borderStyle="solid"
              borderColor="color-gray-200"
              borderRadius={4}
              backgroundColor="transparent"
              onPress={toggleExpanded}
              onClick={toggleExpanded}
              {...views?.toggleButton}
            >
              <ChevronIcon
                widthHeight={16}
                orientation={arrowOrientation}
                {...views?.toggleButtonIcon}
              />
            </View>
          )}
        </View>
      )}
    </Horizontal>
  );
};

export const SidebarContent: React.FC<SidebarContentProps> = ({
  children,
  views,
  ...props
}) => {
  const { isExpanded } = useSidebarContext();
  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
      <View
        width="100%"
        padding={isExpanded ? 16 : 8}
        {...views?.content}
        {...props}
      >
        {children}
      </View>
    </ScrollView>
  );
};

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  children,
  views,
  ...props
}) => {
  const { isExpanded } = useSidebarContext();
  return (
    <View
      width="100%"
      padding={16}
      borderTopWidth={1}
      borderTopStyle="solid"
      borderTopColor="color-gray-200"
      {...views?.footer}
      {...props}
    >
      {isExpanded ? children : null}
    </View>
  );
};

export const SidebarView: React.FC<SidebarProps> = ({
  children,
  position = 'left',
  size = 'md',
  variant = 'default',
  fixed = false,
  hasBackdrop = true,
  expandedWidth,
  collapsedWidth,
  breakpoint,
  breakpointBehavior = 'overlay',
  elevation = 'none',
  transitionPreset = 'normal',
  ariaLabel = 'Sidebar navigation',
  showToggleButton,
  toggleExpanded,
  expand,
  isExpanded,
  isMobile,
  collapse,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const sizeConfig = SidebarSizes[size];
  const width = isExpanded
    ? expandedWidth || sizeConfig.expandedWidth
    : collapsedWidth || sizeConfig.collapsedWidth;
  const isVisible = !isMobile || (isMobile && breakpointBehavior !== 'hide');
  if (!isVisible) return null;
  return (
    <Vertical
      height="100%"
      width={width}
      {...SidebarVariants[variant]}
      {...SidebarPositions[position]}
      {...SidebarElevations[elevation]}
      {...views?.container}
      {...props}
    >
      {React.Children.map(children, (child) => child)}
    </Vertical>
  );
};

interface SideBarNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  ariaLabel?: string;
  badge?: number;
}

export const SideBarNavItem = ({
  icon,
  label,
  isActive = false,
  isDisabled = false,
  badge,
  views,
  ariaLabel,
  ...props
}: SideBarNavItemProps & any) => {
  const { isExpanded } = useSidebarContext();
  return (
    <Horizontal
      alignItems="center"
      justifyContent={!isExpanded ? 'center' : undefined}
      gap={12}
      paddingVertical={8}
      paddingHorizontal={12}
      borderRadius={4}
      backgroundColor={isActive ? 'color-blue-50' : 'transparent'}
      opacity={isDisabled ? 0.6 : 1}
      {...props}
    >
      {icon}
      {isExpanded && (
        <Text
          color={
            isDisabled
              ? 'color-gray-400'
              : isActive
              ? 'color-blue-600'
              : 'color-gray-700'
          }
          fontWeight={isActive ? 'bold' : 'normal'}
        >
          {label}
        </Text>
      )}
      {isExpanded && badge && <Badge {...views?.navItemBagde}>{badge}</Badge>}
    </Horizontal>
  );
};
