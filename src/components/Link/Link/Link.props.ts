import React from 'react';
import { Size, Styles, TextDecorationStyle } from './Link.type';
import { ViewProps } from 'app-studio';
// Defines the props for the Link component, excluding 'size' which comes from the extended 'ViewProps'.
export interface LinkProps extends Omit<ViewProps, 'size'> {
  // Represents the content within the Link component which can be any valid React node.
  children: React.ReactNode;
  // Optional prop to define the text decoration style of the link as underline views.
  underline?: TextDecorationStyle;
  // Optional boolean indicating whether the link points to an external resource. Default behavior may vary based on this value.
  isExternal?: boolean;
  // Optional prop to set the size of an icon if present within the link.
  iconSize?: Size;
  // The href attribute specifying the URL the link points to.
  to: string;
  // Optional styles object to customize the appearance using predefined style types.
  views?: Styles;
}
// Extends the basic LinkProps with additional properties related to the Link view.
export interface LinkViewProps extends LinkProps {
  // Indicates whether the link is under a hover state, which may adjust the link's style.
  isHovered: boolean;
  // A function to update the hover state of the link.
  setIsHovered: Function;
}
