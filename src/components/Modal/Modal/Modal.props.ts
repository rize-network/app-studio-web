import React from 'react';
import { Elevation } from '../../../utils/elevation';
import { Shadow, ViewProps } from 'app-studio';
import { CloseButtonPosition, Position, Shape, Size } from './Modal.type';
// Defines the properties available for the Modal component, extending `ViewProps` but omitting its `size` property.
export interface ModalProps extends Omit<ViewProps, 'size'> {
  // Specifies the color of the close button.
  buttonColor?: string;
  // Determines the size of the close button icon.
  iconSize?: Size;
  // Defines the overall shape style of the modal container.
  shape?: Shape;
  // Indicates whether the modal should occupy the full screen.
  isFullScreen?: boolean;
  // Sets the position of the close button within the modal.
  buttonPosition?: CloseButtonPosition;
  // Callback function triggered when the modal is requested to close.
  onClose?: () => void;
  // Applies a blur effect to the modal's background overlay.
  blur?: number;
  // Controls the visibility state of the modal.
  isOpen?: boolean;
  // If true, prevents the modal from closing when clicking outside or pressing escape.
  isClosePrevented?: boolean;
  // Specifies the position of the modal on the screen.
  position?: Position;
  // Defines the shadow style or elevation applied to the modal container.
  shadow?: Shadow | Elevation | ViewProps;
}
// Describes the structure of the Modal component, including its sub-components.
export interface ModalType extends React.FunctionComponent<ModalProps> {
  // Represents the modal overlay component.
  Overlay: React.FC<OverlayProps>;
  // Represents the modal content container component.
  Container: React.FC<ContainerProps>;
  // Represents the modal header component.
  Header: React.FC<HeaderProps>;
  // Represents the modal body component.
  Body: React.FC<BodyProps>;
  // Represents the modal footer component.
  Footer: React.FC<FooterProps>;
  // Represents the modal layout management component.
  Layout: React.FC<ModalLayoutProps>;
}
// Defines the properties for the modal's overlay component.
export interface OverlayProps extends Omit<ViewProps, 'position' | 'isOpen'> {
  // Content to be rendered inside the overlay.
  children?: React.ReactNode;
  // Applies a blur effect to the overlay background.
  blur?: number;
  // Determines if the overlay is visible.
  isOpen: boolean;
  // If true, prevents the overlay from closing the modal on click.
  isClosePrevented?: boolean;
  // Specifies the positioning strategy for the overlay.
  position?: Position;
  // Callback function to be executed when the overlay should trigger a close action.
  onClose: () => void;
}
// Defines the properties for the modal's header component.
export interface HeaderProps extends Omit<ViewProps, 'size'> {
  // Optional styling properties for nested view components within the header.
  views?: {
    // Styling properties for the header's container view.
    container?: ViewProps;
    // Styling properties for the header's main view.
    header?: ViewProps;
  };
  // Specifies the color of the close button in the header.
  buttonColor?: string;
  // Determines the size of the close button icon in the header.
  iconSize?: Size;
  // Content to be rendered inside the header.
  children?: React.ReactNode;
  // Sets the position of the close button within the header.
  buttonPosition?: CloseButtonPosition;
  // Callback function triggered when the header's close button is activated.
  onClose?: () => void;
}
// Defines properties for managing modal layouts and their visibility.
export interface ModalLayoutProps {
  // A map of modal names to their corresponding React functional components.
  modals: { [x: string]: React.FC<any> };
  // Callback function invoked when a modal is requested to be shown.
  onShow?: (name: string, props?: any) => void;
  // Callback function invoked when a modal is requested to be hidden.
  onHide?: (name?: string, props?: any) => void;
}
// Defines the properties for the modal's main content container.
export interface ContainerProps extends Omit<ViewProps, 'size'> {
  // Optional styling properties for nested view components within the container.
  views?: {
    // Styling properties for the container's main view.
    container?: ViewProps;
  };
  // Content to be rendered inside the container.
  children: React.ReactNode;
  // Defines the shape style of the container.
  shape?: Shape;
  // Indicates whether the container should expand to full screen.
  isFullScreen?: boolean;
  // Defines the shadow style or elevation applied to the container.
  shadow?: Shadow | Elevation | ViewProps;
}
// Defines the properties for the modal's body content area.
export interface BodyProps extends ViewProps {
  // Optional styling properties for nested view components within the body.
  views?: {
    // Styling properties for the body's main view.
    view?: ViewProps;
  };
}
// Defines the properties for the modal's footer component.
export interface FooterProps extends ViewProps {
  // Optional styling properties for nested view components within the footer.
  views?: {
    // Styling properties for the footer's container view.
    container?: ViewProps;
  };
}
