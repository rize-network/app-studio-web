// Defines a 'Size' type with predefined size options for the Selector component.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Declares a 'Shape' type with predefined shape options for the corners of the Selector component.
export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';
// Specifies a 'Variant' type representing the visual style variations of the Selector component.
export type Variant = 'outline' | 'default' | 'none';
// Initiates a 'SelectorStyles' type outlining style properties applicable to the Selector component.
export type SelectorStyles = {
  text?: ViewProps;
  icon?: ViewProps;
  dropDown?: ViewProps;
  selectBox?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
  field?: ViewProps;
  item?: ViewProps;
};
// Defines an 'Option' interface representing individual options within the Selector component.
export interface Option {
  // The 'label' property in 'Option' interface, which represents the display text for the option.
  label: string;
  // The 'value' property in 'Option' interface, indicating the actual value the option represents.
  value: string;
  // Optional color for the option when selected
  color?: string;
}
