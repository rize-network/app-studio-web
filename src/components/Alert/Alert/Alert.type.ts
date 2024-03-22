import { CSSProperties } from 'react';
export type Variant = 'default' | 'info' | 'success' | 'error' | 'warning';
export type AlertStyles = {
  // Defines a type called 'Variant' representing different context states for the component, which could affect its styling and semantics.
  container?: CSSProperties;
  // Defines a type for 'AlertStyles' that allows customizing styles for different parts of our alert component: container, title, description, and icon. Here the use of 'any' suggests flexibility in what can be passed, potentially allowing for complex styling objects.
  title?: any;
  description?: any;
  icon?: any;
};
