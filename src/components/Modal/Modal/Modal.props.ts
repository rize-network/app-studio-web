import React from 'react';
import { Elevation } from '../../../utils/elevation';
import { Shadow, ViewProps } from 'app-studio';

import { CloseButtonPosition, Position, Shape, Size } from './Modal.type';

export interface ModalProps extends Omit<ViewProps, 'size'> {
  /**
   * The color of the close button in the header.
   */
  buttonColor?: string;

  /**
   * The size of the close button in the header.
   */
  iconSize?: Size;

  /**
   * Determines whether the modal should have sharp or rounded edges.
   */
  shape?: Shape;

  /**
   * If set to true, the modal will occupy the full width and height of the screen.
   */
  isFullScreen?: boolean;

  /**
   * Indicates the presence of a close button and its position within the header.
   */
  buttonPosition?: CloseButtonPosition;

  /**
   * The callback function to be executed when the close button is clicked or pressed.
   */
  onClose?: () => void;

  /**
   * The degree of blurriness applied to the overlay.
   */
  blur?: number;

  /**
   * If set to true, the modal will be visible.
   */
  isOpen?: boolean;

  /**
   * If set to true, the modal will remain open when the overlay is clicked.
   */
  isClosePrevented?: boolean;

  /**
   * The positioning of the modal container.
   */
  position?: Position;

  /**
   * Applies a shadow effect to the button.
   */
  shadow?: Shadow | Elevation | ViewProps;
}

export interface ModalType extends React.FunctionComponent<ModalProps> {
  /**
   * The overlay component of the modal.
   */
  Overlay: React.FC<OverlayProps>;

  /**
   * The container component of the modal.
   */
  Container: React.FC<ContainerProps>;

  /**
   * The header component of the modal.
   */
  Header: React.FC<HeaderProps>;

  /**
   * The body component of the modal.
   */
  Body: React.FC<BodyProps>;

  /**
   * The footer component of the modal.
   */
  Footer: React.FC<FooterProps>;

  /**
   * The header component of the modal.
   */
  Layout: React.FC<ModalLayoutProps>;
}

export interface OverlayProps extends Omit<ViewProps, 'position' | 'isOpen'> {
  /**
   * The content of the Overlay
   */
  children?: React.ReactNode;
  /**
   * The value of how much to blur the overlay
   */
  blur?: number;
  /**
   * If true, the modal will be visible
   */
  isOpen: boolean;
  /**
   * If true, the modal will not closed when the overlay is clicked
   */
  isClosePrevented?: boolean;
  /**
   * To position the modal container
   */
  position?: Position;
  /**
   * Action to be handled when the button close is clicked or pressed
   */
  onClose: () => void;
}

export interface HeaderProps extends Omit<ViewProps, 'size'> {
  views?: {
    container?: ViewProps;
    header?: ViewProps;
  };
  /**
   * The content of the header
   */
  buttonColor?: string;
  /**
   * To set the close button size
   */
  iconSize?: Size;
  /**
   * The content of the header
   */
  children?: React.ReactNode;
  /**
   * Indicates if there is a button and where to position it
   */
  buttonPosition?: CloseButtonPosition;
  /**
   * Action to be handled when the button close is clicked or pressed
   */
  onClose?: () => void;
}

export interface ModalLayoutProps {
  modals: { [x: string]: React.FC<any> };
  onShow?: (name: string, props?: any) => void;
  onHide?: (name?: string, props?: any) => void;
}

export interface ContainerProps extends Omit<ViewProps, 'size'> {
  views?: {
    container?: ViewProps;
  };
  /**
   * The content of the modal container
   */
  children: React.ReactNode;
  /**
   * To give a sharp or rounded edges to the modal
   */
  shape?: Shape;
  /**
   * If true, the modal will take the full width and height
   */
  isFullScreen?: boolean;
  /**
   * Set a shadow effect on the button.
   */
  shadow?: Shadow | Elevation | ViewProps;
}

export interface BodyProps extends ViewProps {
  views?: {
    view?: ViewProps;

    /**
     * Optional theme mode override ('light' or 'dark')
     * If not provided, the component will use the theme mode from context
     */
  };
}

export interface FooterProps extends ViewProps {
  views?: {
    container?: ViewProps;
  };
}
