import { AlertStyles, Variant } from './Alert.type';
// Imports `AlertStyles` and `Variant` type definitions from the external module `Alert.type` for typing purposes in this interface.
export interface AlertProps {
// Defines an interface `AlertProps` which serves as a contract for props passed to the Alert component.
  icon?: React.ReactNode;
// Optional `icon` property that allows for a React node (component, HTML element, etc.) to be passed and displayed as an icon in the Alert component.
  title: string;
// Required `title` property that will display the main message or heading of the Alert component.
  description: string;
// Required `description` property to provide additional information or context in the Alert component.
  variant?: Variant;
// Optional `variant` property that likely controls the appearance or type of the Alert (e.g., success, error, warning, etc.). It references the `Variant` type for a constrained set of possible values.
  styles?: AlertStyles;
// Optional `styles` property that accepts an object of `AlertStyles`, allowing custom styling options for the Alert component.
}
