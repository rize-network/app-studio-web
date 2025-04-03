import { AlertStyles, Variant } from './Alert.type';
// Defines the AlertProps interface for alert components
export interface AlertProps {
  // Optional icon property, expecting a React node element
  icon?: React.ReactNode;
  // Mandatory title property, must be a string
  title: string;
  // Mandatory description property, must be a string
  description: string;
  // Optional variant property to determine the style of the alert
  variant?: Variant;
  // Optional styles property to apply custom styles to the alert component
  views?: AlertStyles;
}
