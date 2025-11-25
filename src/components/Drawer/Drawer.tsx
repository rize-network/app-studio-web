/* eslint-disable react/prop-types */
import React from 'react';
import { DrawerType } from './Drawer/Drawer.props';
import {
  DrawerOverlay,
  DrawerContainer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from './Drawer/Drawer.view';

/**
 * A drawer is a panel that slides out from the edge of the screen.
 * It can be useful when you need users to complete a task or view some details without leaving the current page.
 */
export const Drawer: DrawerType = ({
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  isClosePrevented,
  children,
  ...props
}) => {

  const transformStyle = isOpen ? {} : { transform:  placement === 'left' || placement === 'right' ? `translateX(${placement === 'left' ? '-100%' : '100%'})` : `translateY(${placement === 'top' ? '-100%' : '100%'})` };

  return (
    <DrawerOverlay
      isOpen={isOpen}
      onClose={onClose}
      isClosePrevented={isClosePrevented}
      {...props}
    >
      <DrawerContainer placement={placement} size={size} style={transformStyle}>
        {children}
      </DrawerContainer>
    </DrawerOverlay>
  );
};

Drawer.Overlay = DrawerOverlay;
Drawer.Container = DrawerContainer;
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
