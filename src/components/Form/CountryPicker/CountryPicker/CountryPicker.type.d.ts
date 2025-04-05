import { ViewProps } from 'app-studio';

// Defines a type for styling the CountryPicker component.
export type CountryPickerStyles = {
  // Optional style properties for the text element within the CountryPicker.
  text?: ViewProps;
  // Optional style properties for the icon element within the CountryPicker.
  icon?: ViewProps;
  // Optional style properties for the dropDown element within the CountryPicker.
  dropDown?: ViewProps;
  // Optional style properties for the outer box element of the CountryPicker.
  box?: ViewProps;
  // Optional style properties for the label element associated with the CountryPicker.
  label?: ViewProps;
  // Optional style properties for the helper text element within the CountryPicker.
  helperText?: ViewProps;
  // Optional style properties for the input field within the CountryPicker.
  field?: ViewProps;
};
// Defines a type representing a country with specific properties.
export type Country = {
  // Property 'name': the country's name as a string.
  name: string;
  // Property 'dial_code': the country's dialing code as a string.
  dial_code: string;
  // Property 'emoji': the emoji representing the country as a string.
  emoji: string;
  // Property 'code': the country's code as a string (often 2-3 letters).
  code: string;
};
// Defines a type for specifying size categories (e.g., for buttons or form elements).
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines a type for specifying shape categories (affects the border-radius of elements).
export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';
// Defines a type for specifying variant types (e.g., for button styles).
export type Variant = 'default' | 'outline' | 'none';
