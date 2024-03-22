import { CSSProperties } from 'react';
export type Variant = 'default' | 'info' | 'success' | 'error' | 'warning';
// Defines a custom type 'Variant' which represents different contextual styles for the component, such as 'default', 'info', 'success', 'error', and 'warning'.
export type AlertStyles = {
  // Defines a type 'AlertStyles' for styling the Alert component, with optional properties for the container, title, description, and icon that can take CSSProperties or any other applicable types.
  container?: CSSProperties;
  title?: any;
  description?: any;
  icon?: any;
};
