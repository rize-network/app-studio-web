import { ViewProps } from 'app-studio';
// Defines the possible states or types an indicator can represent, influencing its appearance and meaning.
export type Status = 'default' | 'info' | 'success' | 'warning' | 'error';
// Defines the type for custom styling properties that can be applied to various parts of the StatusIndicator component.
export type StatusIndicatorStyles = {
  // Optional styling properties for the main container wrapping the status indicator.
  container?: ViewProps;
  // Optional styling properties specifically for the visual indicator element (e.g., a dot or icon).
  indicator?: ViewProps;
  // Optional styling properties for the text label associated with the status indicator.
  label?: ViewProps;
};
