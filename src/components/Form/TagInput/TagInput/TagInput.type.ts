import { ViewProps } from 'app-studio';
// Defines a union type for common component sizes: extra-small, small, medium, large, and extra-large.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines a union type for the visual shape of tags within the input, including default, square, rounded, and pill.
export type Shape = 'default' | 'square' | 'rounded' | 'pill';
// Defines a union type for the visual variant of the tags, such as outline, default filled, or no specific variant.
export type Variant = 'outline' | 'default' | 'none';
// Defines a union type for characters or actions that can trigger the creation of a new tag, like 'enter', 'comma', 'space', or 'tab'.
export type TagSeparator = 'enter' | 'comma' | 'space' | 'tab';
// Defines the structure of a single tag object.
export interface Tag {
  // Unique identifier for the tag.
  id: string;
  // The display value or text content of the tag.
  value: string;
}
// Defines an object type for custom styling of various parts of the TagInput component.
export type TagInputStyles = {
  // Styles applied to the main container wrapper for the input field itself.
  inputContainer?: ViewProps;
  // Styles applied to the container holding all the displayed tags.
  tagsContainer?: ViewProps;
  // Styles applied to individual tag components.
  tag?: ViewProps;
  // Styles applied to the text content within each tag.
  tagText?: ViewProps;
  // Styles applied to the remove button or icon within each tag.
  tagRemove?: ViewProps;
  // Styles applied directly to the text input field where new tags are typed.
  input?: ViewProps;
  // Styles applied to the label associated with the TagInput component.
  label?: ViewProps;
  // Styles applied to any helper text displayed below the input.
  helperText?: ViewProps;
  // Styles applied to error messages or indicators.
  error?: ViewProps;
  // Styles applied to the outermost container of the entire TagInput component.
  container?: ViewProps;
  // Styles for the placeholder text of the input field.
  placeholder?: ViewProps;
  // Styles applied to the dropdown menu (e.g., for suggestions).
  menu?: ViewProps;
  // Styles applied to individual items within the dropdown menu.
  menuItem?: ViewProps;
  // Styles applied to the currently active or highlighted item in the dropdown menu.
  menuItemActive?: ViewProps;
};
