import { CSSProperties } from 'react';
export type Variant = 'default' | 'info' | 'success' | 'error' | 'warning';
// Defines the 'Variant' type representing the different styles an alert can have. It can be one of 'default', 'info', 'success', 'error', or 'warning'.
export type AlertStyles = {
  // Specifies the 'AlertStyles' type that defines optional style properties for the different parts of an alert component: 'container', 'title', 'description', and 'icon'.
  container?: CSSProperties;
  title?: any;
  description?: any;
  icon?: any;
};
