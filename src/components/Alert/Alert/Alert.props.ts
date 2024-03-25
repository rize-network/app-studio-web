import { AlertStyles, Variant } from './Alert.type';
// Definition of the AlertProps interface to type the props for the Alert component.
export interface AlertProps {
  // Optional 'icon' property, which can be any React node, typically an image or icon.
  icon?: React.ReactNode;
  // Mandatory 'title' property of type string to display the main message of the Alert component.
  title: string;
  // Mandatory 'description' property of type string to give additional details about the alert.
  description: string;
  // Optional 'variant' property to specify the style variant of the Alert, using predefined options from the Variant type.
  variant?: Variant;
  // Optional 'styles' property to apply custom styling from AlertStyles, allowing for more customization.
  styles?: AlertStyles;
}
