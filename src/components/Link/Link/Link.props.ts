import React from 'react';
import { Size, Styles, TextDecorationStyle } from './Link.type';
import { ViewProps } from 'app-studio';
export interface LinkProps extends Omit<ViewProps, 'size'> {
  children: React.ReactNode;
  underline?: TextDecorationStyle;
  isExternal?: boolean;
  iconSize?: Size;
  colorScheme?: string;
  href: string;
  styles?: Styles;
}
export interface LinkViewProps extends LinkProps {
  isHovered: boolean;
  setIsHovered: Function;
}
