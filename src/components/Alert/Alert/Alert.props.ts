import { AlertStyles, Variant } from './Alert.type';
// Import statement for AlertStyles and Variant types from a type definitions file, presumably to ensure type safety and consistency for the Alert component.
export interface AlertProps {
  // Defines an interface called AlertProps representing the props that the Alert component accepts.
  icon?: React.ReactNode;
  // Optional 'icon' property that can accept any React node, allowing for customizable icons in the Alert component.
  title: string;
  // Mandatory 'title' property of type string, which will be used as the Alert component's title text.
  description: string;
  // Mandatory 'description' property of type string, meant to hold the textual content or message for the Alert component.
  variant?: Variant;
  // Optional 'variant' property with a type of Variant, which probably refers to predefined style or behavior variants for the Alert component.
  styles?: AlertStyles;
  // Optional 'styles' property, which allows for custom styling by passing an object matching the AlertStyles type.
}
