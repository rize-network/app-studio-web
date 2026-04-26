import React from 'react';
import { ViewProps } from 'app-studio';
import { Placement, Size, CloseButtonPosition } from './Drawer.type';
export interface DrawerProps extends ViewProps {
  // Defines the position where the drawer will appear (e.g., 'left', 'right', 'top', 'bottom').
  placement?: Placement;
  // Specifies the size of the drawer.
  size?: Size;
  // Indicates whether the drawer is currently open or closed.
  isOpen: boolean;
  // Callback function triggered when the drawer is requested to close.
  onClose: () => void;
  // Prevents the drawer from closing when an overlay click or escape key is pressed.
  isClosePrevented?: boolean;
  // The content to be rendered inside the drawer.
  children?: React.ReactNode;
}
export interface DrawerLayoutProps extends ViewProps {
  // A map of drawer components, keyed by their names, to be managed by the layout.
  drawers: { [key: string]: React.ComponentType<any> };
  // Callback function triggered when a drawer is shown.
  onShow?: (name: string, props?: any) => void;
  // Callback function triggered when a drawer is hidden.
  onHide?: (name?: string) => void;
}
export interface DrawerType extends React.FC<DrawerProps> {
  // Represents the overlay component of the drawer.
  Overlay: React.FC<DrawerOverlayProps>;
  // Represents the container component of the drawer.
  Container: React.FC<DrawerContainerProps>;
  // Represents the header component of the drawer.
  Header: React.FC<DrawerHeaderProps>;
  // Represents the body component of the drawer.
  Body: React.FC<DrawerBodyProps>;
  // Represents the footer component of the drawer.
  Footer: React.FC<DrawerFooterProps>;
  // Represents the layout component for managing multiple drawers.
  Layout: React.FC<DrawerLayoutProps>;
}
export interface DrawerOverlayProps extends ViewProps {
  // Indicates if the overlay is visible.
  isOpen: boolean;
  // Callback function triggered when the overlay is clicked, signaling a close request.
  onClose: () => void;
  // Prevents the overlay from closing when clicked.
  isClosePrevented?: boolean;
  // Specifies the blur level to apply to the content behind the overlay.
  blur?: number;
  // Content to be rendered within the overlay (if any).
  children?: React.ReactNode;
}
export interface DrawerContainerProps extends ViewProps {
  // Defines the position where the drawer container will appear.
  placement?: Placement;
  // Specifies the size of the drawer container.
  size?: Size;
  // Indicates whether the drawer container is open.
  isOpen?: boolean;
  // The content to be rendered inside the drawer container.
  children?: React.ReactNode;
}
export interface DrawerHeaderProps extends ViewProps {
  // Callback function to trigger closing the drawer from within the header.
  onClose?: () => void;
  // Specifies the position of the close button within the header.
  buttonPosition?: CloseButtonPosition;
  // The content to be rendered inside the drawer header.
  children?: React.ReactNode;
}
export interface DrawerBodyProps extends ViewProps {
  // The content to be rendered inside the drawer body.
  children?: React.ReactNode;
}
export interface DrawerFooterProps extends ViewProps {
  // The content to be rendered inside the drawer footer.
  children?: React.ReactNode;
}
