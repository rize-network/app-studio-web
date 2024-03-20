import { CSSProperties } from 'react';
export type Variant = 'default' | 'info' | 'success' | 'error' | 'warning';
// Defines a type 'Variant' to represent different styles of alerts like default, info, success, error, and warning.
export type AlertStyles = {
// Sets up a type 'AlertStyles' to define possible CSS properties for container, title, description, and icon which can be used to customize the alert component's appearance.
  container?: CSSProperties;
  title?: any;
  description?: any;
  icon?: any;
};
