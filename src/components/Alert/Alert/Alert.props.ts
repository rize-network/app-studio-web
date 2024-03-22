import { AlertStyles, Variant } from './Alert.type';
// Imports custom types for AlertStyles and Variant from the './Alert.type' module, which likely define style configurations and variant options respectively.
export interface AlertProps {
  // Exports an interface `AlertProps` which will be used to type-check the props expected by an Alert component.
  icon?: React.ReactNode;
  // Optional `icon` prop that can be any React node, allowing for customization of the Alert's icon.
  title: string;
  // Mandatory `title` prop defined as a string, which will be used as the main heading of the Alert.
  description: string;
  // Mandatory `description` prop defined as a string, providing additional details within the Alert.
  variant?: Variant;
  // Optional `variant` prop of type `Variant` which controls the styling variant of the Alert, like 'success', 'warning', etc.
  styles?: AlertStyles;
  // Optional `styles` prop of type `AlertStyles` which allows for passing custom style configurations to the Alert.
}
