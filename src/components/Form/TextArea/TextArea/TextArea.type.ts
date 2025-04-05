import { ViewProps } from 'app-studio';

// Defines the 'Variant' type for the TextArea component, indicating the visual style of the TextArea such as 'outline', 'default', or 'none'
export type Variant = 'outline' | 'default' | 'none';
// Defines the 'Shape' type for the TextArea component, indicating the border shape options like 'default', 'sharp', or 'rounded'
export type Shape = 'default' | 'sharp' | 'rounded';
// Defines the 'Size' type for the TextArea component, indicating the available size options including 'xs' (extra small) to 'xl' (extra large)
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Begins declaring the 'TextAreaStyles' type to specify the custom styling options for different parts of the TextArea component
export type TextAreaStyles = {
  // Defining optional custom ViewProps for the 'box' part of the TextArea component, allowing for custom styles to be applied to the outer container
  box?: ViewProps;
  // Defining optional custom ViewProps for the 'text' part of the TextArea component, allowing for custom styles to be applied to the text within
  text?: ViewProps;
  // Defining optional custom ViewProps for the 'label' part of the TextArea component, allowing for custom styles to be applied to the label element
  label?: ViewProps;
  // Defining optional custom ViewProps for the 'helperText' part of the TextArea component, allowing for custom styles to be applied to the helper text beneath the text area
  helperText?: ViewProps;
  // Defining optional custom ViewProps for the 'field' part of the TextArea component, allowing for custom styles to be applied to the text field itself
  field?: ViewProps;
};
