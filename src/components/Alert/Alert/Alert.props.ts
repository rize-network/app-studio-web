import { AlertStyles, Variant } from './Alert.type';
// Import statement for AlertStyles and Variant types from the Alert.type module to be used in defining AlertProps.
export interface AlertProps {
  // Defines the prop types for the Alert component with the following attributes.
  icon?: React.ReactNode;
  // Optional 'icon' prop which can be any React node, typically used to render a visual icon element.
  title: string;
  // 'title' prop of type string, which represents the main heading or title to be displayed in the alert.
  description: string;
  variant?: Variant;
  styles?: AlertStyles;
}
