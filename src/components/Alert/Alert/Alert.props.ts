import { AlertStyles, Variant } from './Alert.type';
// Imports the 'AlertStyles' type and 'Variant' enum from './Alert.type', which define the styles and variant types for the Alert component.
export interface AlertProps {
  // Defines an 'AlertProps' interface representing the props the Alert component expects.
  icon?: React.ReactNode;
  // Optional 'icon' prop that allows a React node to be provided, which will be displayed as the icon of the alert.
  title: string;
  // Mandatory 'title' prop that specifies the title text for the alert.
  description: string;
  // Mandatory 'description' prop that provides details or additional information for the alert.
  variant?: Variant;
  // Optional 'variant' prop that specifies the style variant of the alert; expects a value of the 'Variant' enum.
  styles?: AlertStyles;
  // Optional 'styles' prop that allows custom styles to be applied to the alert, expects a value conforming to the 'AlertStyles' type.
}
