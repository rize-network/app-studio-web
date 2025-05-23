// Defines a 'Size' type with predefined size options for the Select component.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Declares a 'Shape' type with predefined shape options for the corners of the Select component.
export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';
// Specifies a 'Variant' type representing the visual style variations of the Select component.
export type Variant = 'outline' | 'default' | 'none';
// Initiates a 'SelectStyles' type outlining style properties applicable to the Select component.
export type SelectStyles = {
  text?: ViewProps;
  icon?: ViewProps;
  dropDown?: ViewProps;
  selectBox?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
  field?: ViewProps;
};
// Defines an 'Option' interface representing individual options within the Select component.
export interface Option {
  // The 'label' property in 'Option' interface, which represents the display text for the option.
  label: string;
  // The 'value' property in 'Option' interface, indicating the actual value the option represents.
  value: string;
}
