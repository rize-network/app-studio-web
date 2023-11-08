import React, { CSSProperties } from 'react';
import { Elevation } from 'src/utils/elevation';
import { Shadow } from 'app-studio';

import { CloseButtonPosition, Position, Shape, Size } from './Message.type';

export interface MessageProps {
  /**
   * The content to be displayed inside the message.
   */
  children: React.ReactNode;

  /**
   * The color of the close button in the header.
   */
  buttonColor?: string;

  /**
   * The size of the close button in the header.
   */
  iconSize?: Size;

  /**
   * Determines whether the message should have sharp or rounded edges.
   */
  shape?: Shape;

  /**
   * If set to true, the message will occupy the full width and height of the screen.
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
   * If set to true, the message will be visible.
   */
  isOpen?: boolean;

  /**
   * If set to true, the message will remain open when the overlay is clicked.
   */
  isClosePrevented?: boolean;

  /**
   * The positioning of the message container.
   */
  position?: Position;

  /**
   * Applies a shadow effect to the button.
   */
  shadow?: Shadow | Elevation | CSSProperties;

  /**
   * Additional properties.
   */
  [x: string]: any;
}

export interface MessageType extends React.FunctionComponent<MessageProps> {
  /**
   * The container component of the message.
   */
  Container: React.FC<ContainerProps>;

  /**
   * The body component of the message.
   */
  Body: React.FC<BodyProps>;

  /**
   * The header component of the message.
   */
  Layout: React.FC<MessageLayoutProps>;
}

export interface MessageLayoutProps {
  icons?: { [x: string]: string };
  container?: any;
  text?: React.JSX.Element | React.FC<any>;
  icon?: React.JSX.Element | React.FC<any>;
  theme: { [x: string]: any };
}

export interface ContainerProps {
  /**
   * The content of the message container
   */
  children: React.ReactNode;
  /**
   * To give a sharp or rounded edges to the message
   */
  shape?: Shape;
  /**
   * If true, the message will take the full width and height
   */
  isFullScreen?: boolean;
  /**
   * Set a shadow effect on the button.
   */
  shadow?: Shadow | Elevation | CSSProperties;
  /**
   * Other properties
   */
  [x: string]: any;
}

export interface BodyProps {
  /**
   * The content of the Body
   */
  children?: React.ReactNode;
  /**
   * Other properties
   */
  [x: string]: any;
}
