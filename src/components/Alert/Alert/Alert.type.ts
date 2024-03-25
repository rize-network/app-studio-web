import { CSSProperties } from 'react';
// Defines a type 'Variant' with a union of string literal types to restrict the variants to specific values.
export type Variant = 'default' | 'info' | 'success' | 'error' | 'warning';
// Begins the declaration of an 'AlertStyles' type representing the styles that can be applied to different parts of an alert component.
export type AlertStyles = {
// Optional style object for the alert container that conforms to 'CSSProperties' type.
  container?: CSSProperties;
// Optional style for the title element within the alert; 'any' indicates it can be of any type, which lacks type safety.
  title?: any;
// Optional style for the description text within the alert; 'any' type suggests the need for type safety improvement.
  description?: any;
// Optional style for the icon in the alert; similarly, the 'any' type here could be more specific for better type enforcement.
  icon?: any;
};
