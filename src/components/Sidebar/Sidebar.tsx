import React from 'react';
import { SidebarProps, SidebarType } from './Sidebar/Sidebar.props';
import { useSidebarState } from './Sidebar/Sidebar.state';
import {
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarView,
  useSidebarContext,
} from './Sidebar/Sidebar.view';
// This component serves as the main entry point for the Sidebar, orchestrating its various parts (state, view, context) to provide a complete and customizable sidebar solution with properties for appearance, behavior, and responsiveness.
const SidebarComponent: React.FC<SidebarProps> = ({
  children,
  position = 'left',
  size = 'md',
  variant = 'default',
  defaultExpanded = true,
  expanded,
  onExpandedChange,
  fixed = false,
  hasBackdrop = true,
  showToggleButton = true,
  expandedWidth,
  collapsedWidth,
  breakpoint = 768,
  breakpointBehavior = 'overlay',
  views,
  ...props
}) => {
  const { isExpanded, toggleExpanded, expand, collapse, isMobile } =
    useSidebarState(defaultExpanded, expanded, onExpandedChange, breakpoint);
  return (
    <SidebarProvider
      value={{
        isExpanded,
        toggleExpanded,
        expand,
        collapse,
        position,
        size,
        variant,
        views,
      }}
    >
      <SidebarView
        position={position}
        size={size}
        variant={variant}
        fixed={fixed}
        hasBackdrop={hasBackdrop}
        showToggleButton={showToggleButton}
        expandedWidth={expandedWidth}
        collapsedWidth={collapsedWidth}
        breakpoint={breakpoint}
        breakpointBehavior={breakpointBehavior}
        isExpanded={isExpanded}
        isMobile={isMobile}
        toggleExpanded={toggleExpanded}
        expand={expand}
        collapse={collapse}
        views={views}
        {...props}
      >
        {children}
      </SidebarView>
    </SidebarProvider>
  );
};
export const Sidebar = SidebarComponent as SidebarType;
Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
Sidebar.useContext = useSidebarContext;
