import { ViewProps } from 'app-studio';

// Defines a 'Variant' type representing the different states an alert can have.
export type Variant = 'default' | 'info' | 'success' | 'error' | 'warning';
// Begins the type definition for 'AlertStyles', which will hold customizable style properties for an alert component.
export type AlertStyles = {
  container?: ViewProps;
  title?: ViewProps;
  description?: ViewProps;
  icon?: ViewProps;
  // Ends the 'AlertStyles' type definition, encapsulating style properties that can be optionally provided.
};
