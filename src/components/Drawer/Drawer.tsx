import React from 'react';
import { DrawerProps, DrawerType } from './Drawer/Drawer.props';
import {
  DrawerOverlay,
  DrawerContainer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from './Drawer/Drawer.view';
import { DrawerLayout } from './Drawer/Drawer.layout';
// This file defines the main Drawer component, orchestrating various sub-components (Overlay, Container, Header, Body, Footer, Layout) to create a complete and functional drawer UI. It handles core properties like visibility, close actions, placement, and size.
const DrawerComponent: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  isClosePrevented,
  children,
  ...props
}) => {
  return (
    <DrawerOverlay
      isOpen={isOpen}
      onClose={onClose}
      isClosePrevented={isClosePrevented}
      {...props}
    >
      <DrawerContainer placement={placement} size={size} isOpen={isOpen}>
        {children}
      </DrawerContainer>
    </DrawerOverlay>
  );
};
export const Drawer = DrawerComponent as DrawerType;
Drawer.Overlay = DrawerOverlay;
Drawer.Container = DrawerContainer;
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.Layout = DrawerLayout;
