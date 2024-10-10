import { CSSProperties } from 'react';
// Defines 'Variant' as a TypeScript type alias representing possible visual styles of the TextField component such as 'outline', 'default', or 'none'.
export type Variant = 'outline' | 'default' | 'none';
// Establishes 'Shape' as a type for defining the border-radius of the TextField, allowing 'default', 'sharp', 'rounded', or 'pillShaped' styles.
export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';
// Specifies 'Size' as a type indicating the scale of the TextField, ranging from 'xs' for extra small to 'xl' for extra large.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Describes 'TextFieldStyles' as a type for custom styling of various parts of the TextField component.
export type TextFieldStyles = {
  // Gives an optional 'box' style property to customize the container of the TextField using CSS properties.
  box?: CSSProperties;
  // Allows for optional 'text' style customization that applies to the text within the TextField.
  text?: CSSProperties;
  // Provides an optional 'label' style property to tailor the appearance of the TextField's label.
  label?: CSSProperties;
  // Defines an optional 'helperText' style property for styling the helper text associated with the TextField.
  helperText?: CSSProperties;
  // Introduces an optional 'field' style property to modify the styling of the TextField itself.
  field?: CSSProperties;
};
