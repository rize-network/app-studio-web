import { AlertStyles, Variant } from './Alert.type';
// Import statement for AlertStyles and Variant types from the Alert.type module to be used in defining AlertProps.
export interface AlertProps {
// Defines the prop types for the Alert component with the following attributes.
  icon?: React.ReactNode;
// Optional 'icon' prop which can be any React node, typically used to render a visual icon element.
  title: string;
// 'title' prop of type string, which represents the main heading or title to be displayed in the alert.
  description: string;
// 'description' prop of type string, for additional alert text content or information.
  variant?: Variant;
// Optional 'variant' prop used to determine the stylistic variation of the alert based on predefined types.
  styles?: AlertStyles;
// Optional 'styles' prop that allows custom styles to be applied to the alert component, adhering to the AlertStyles type.
}
