import { AlertStyles, Variant } from './Alert.type';
export interface AlertProps {
// Defines an interface for the properties accepted by the Alert component.
  icon?: React.ReactNode;
// Optional icon element that can be displayed in the Alert component. It's a React node, allowing for JSX or component insertion.
  title: string;
// The title of the Alert. This property is mandatory and will display as the Alert's main header text.
  description: string;
// An additional description or message that will be displayed below the title in the Alert component.
  variant?: Variant;
// Optional variant property to specify the type of Alert, which may alter its color or style. The type is defined by the Variant enum imported from Alert.type.
  styles?: AlertStyles;
// Optional styles property to provide custom styling to the Alert component. The styles should adhere to the AlertStyles type specifications.
}
