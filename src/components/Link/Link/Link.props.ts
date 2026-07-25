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
  // Router path (or URL) the link points to. Defaults to '/'.
  to?: string;
  // Renders a plain anchor with this exact href, bypassing router navigation.
  href?: string;
  // Click handler attached to the anchor element itself.
  onClick?: (event: React.MouseEvent) => void;
  // Optional styles object to customize the appearance using predefined style types.
  views?: Styles;
}
// Extends the basic LinkProps with additional properties related to the Link view.
export interface LinkViewProps extends LinkProps {
  // Legacy hover state, superseded by CSS-driven _hover styling on the anchor.
  isHovered?: boolean;
  // Legacy setter for the hover state.
  setIsHovered?: Function;
}
