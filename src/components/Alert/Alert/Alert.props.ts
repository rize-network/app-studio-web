import { AlertStyles, Variant } from './Alert.type';
// Import required types from './Alert.type' for use in defining the AlertProps interface.
export interface AlertProps {
  // Define the AlertProps interface which specifies the expected properties for an Alert component.
  icon?: React.ReactNode;
  // Optional 'icon' property which allows for a React node (e.g., an image or SVG) to be included in the alert.
  title: string;
  // Mandatory 'title' property of type string to display as the alert's heading.
  description: string;
  // Mandatory 'description' property of type string that holds the main message of the alert.
  variant?: Variant;
  // Optional 'variant' property to specify the type of alert, which modifies the appearance (e.g., success, error).
  styles?: AlertStyles;
  // Optional 'styles' property to allow for custom styling via a defined AlertStyles type.
}
