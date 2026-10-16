import { ViewProps } from 'app-studio';
// Defines the visual style or variant of the IconPicker component, allowing for 'outline', 'default', or 'filled' appearances.
export type Variant = 'outline' | 'default' | 'filled';
// Defines the shape of the IconPicker component, offering options like 'default', 'square', 'rounded', or 'pill'.
export type Shape = 'default' | 'square' | 'rounded' | 'pill';
// Defines the size of the IconPicker component, ranging from extra small ('xs') to extra large ('xl').
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines the type for custom styling properties that can be applied to various internal parts of the IconPicker component.
export type IconPickerStyles = {
  // Styles for the main container wrapping the entire IconPicker component.
  container?: ViewProps;
  // Styles for the interactive element that, when clicked, opens the icon selection dropdown.
  trigger?: ViewProps;
  // Styles for the dropdown menu itself, which typically contains the search input and the icon grid.
  dropdown?: ViewProps;
  // Styles for the input field within the dropdown used to search for specific icons.
  searchInput?: ViewProps;
  // Styles for the grid layout where all the selectable icons are displayed.
  iconGrid?: ViewProps;
  // Styles for individual icon elements or buttons within the icon grid.
  iconItem?: ViewProps;
  // Styles for the descriptive label associated with the IconPicker component.
  label?: ViewProps;
  // Styles for any auxiliary text providing guidance or additional information to the user.
  helperText?: ViewProps;
};
