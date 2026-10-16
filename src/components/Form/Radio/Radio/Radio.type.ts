import { ViewProps } from 'app-studio';
// Defines the possible size options for the Radio component, allowing for visual variations from extra small to extra large.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines the type for custom styling properties that can be applied to different parts of the Radio component.
export type RadioStyles = {
  // Specifies styling properties for the main radio button element itself.
  radio?: ViewProps;
  // Specifies styling properties for the label text associated with the radio button.
  label?: ViewProps;
  // Specifies styling properties for any additional informational text displayed with the radio button.
  infoText?: ViewProps;
};
// Defines the two possible states (variants) a Radio component can have: selected or unselected.
export type Variant = 'selected' | 'unselected';
