// Defines the possible predefined sizes for the Selector component, allowing for consistent scaling.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines the available visual shapes for the Selector component, affecting its border radius and overall appearance.
export type Shape = 'default' | 'square' | 'rounded' | 'pill';
// Defines the visual variants or styles available for the Selector component, such as outlined or default filled.
export type Variant = 'outline' | 'default' | 'none';
// Defines an interface for customizing the styles of various sub-components within the Selector, using React Native's ViewProps.
export type SelectorStyles = {
  // Optional styling for the main text content displayed within the Selector.
  text?: ViewProps;
  // Optional styling for an icon element associated with the Selector.
  icon?: ViewProps;
  // Optional styling for the dropdown container that appears when the Selector is active.
  dropDown?: ViewProps;
  // Optional styling for the main selectable box or input field of the Selector.
  selectBox?: ViewProps;
  // Optional styling for the label text associated with the Selector input.
  label?: ViewProps;
  // Optional styling for any helper text or description displayed below the Selector.
  helperText?: ViewProps;
  // Optional styling for the entire field container that wraps the Selector component.
  field?: ViewProps;
  // Optional styling for individual selectable items displayed within the dropdown list.
  item?: ViewProps;
};
// Defines the structure for a single option that can be selected within the Selector component.
export interface Option {
  // The human-readable text displayed for the option within the Selector.
  label: string;
  // The unique programmatic value associated with the option, used when an item is selected.
  value: string;
  // An optional color string that can be associated with the option, potentially for visual distinction.
  color?: string;
}
