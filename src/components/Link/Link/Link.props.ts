import React from 'react';

import { Size, Styles, TextDecorationStyle } from './Link.type';

export interface LinkProps {
  /**
   * The content of the link.
   */
  children: React.ReactNode;
  /**
   * The style of text decoration for the link.
   * Can be one of "default", "hover", or "underline".
   */
  underline?: TextDecorationStyle;
  /**
   * Indicates whether the link opens in a new tab.
   */
  isExternal?: boolean;
  /**
   * The size of the icon associated with the link.
   */
  iconSize?: Size;
  /**
   * Sets the color of the icon and text.
   */
  colorScheme?: string;
  /**
   * The URL or destination of the link.
   */
  href: string;
  /**
   * CSS styles for the  external icon.
   */
  styles?: Styles;
  /**
   * Additional props for customization.
   */
  [x: string]: any;
}

export interface LinkViewProps extends LinkProps {
  /**
   *  Indicates whether the link is currently being hovered
   */
  isHovered: boolean;
  /**
   *  Function to set the hovered state of the link
   */
  setIsHovered: Function;
}
