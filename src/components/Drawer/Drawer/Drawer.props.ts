import React from 'react';
import { ViewProps } from 'app-studio';
import { Placement, Size, CloseButtonPosition } from './Drawer.type';

export interface DrawerProps extends ViewProps {
  /**
   * The placement of the drawer.
   * @default 'right'
   */
  placement?: Placement;

  /**
   * The size of the drawer.
   * @default 'md'
   */
  size?: Size;

  /**
   * If true, the drawer will be open.
   */
  isOpen: boolean;

  /**
   * Callback fired when the drawer closes.
   */
  onClose: () => void;

  /**
   * If true, the drawer will not close when clicking the overlay.
   */
  isClosePrevented?: boolean;

  /**
   * The children of the drawer.
   */
  children?: React.ReactNode;
}

export interface DrawerType extends React.FC<DrawerProps> {
  Overlay: React.FC<DrawerOverlayProps>;
  Container: React.FC<DrawerContainerProps>;
  Header: React.FC<DrawerHeaderProps>;
  Body: React.FC<DrawerBodyProps>;
  Footer: React.FC<DrawerFooterProps>;
}

export interface DrawerOverlayProps extends ViewProps {
  isOpen: boolean;
  onClose: () => void;
  isClosePrevented?: boolean;
  blur?: number;
  children?: React.ReactNode;
}

export interface DrawerContainerProps extends ViewProps {
  placement?: Placement;
  size?: Size;
  children?: React.ReactNode;
}

export interface DrawerHeaderProps extends ViewProps {
  onClose?: () => void;
  buttonPosition?: CloseButtonPosition;
  children?: React.ReactNode;
}

export interface DrawerBodyProps extends ViewProps {
  children?: React.ReactNode;
}

export interface DrawerFooterProps extends ViewProps {
  children?: React.ReactNode;
}
