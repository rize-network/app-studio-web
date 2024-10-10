import { ViewProps } from 'app-studio';
// Declaration of the VerticalProps interface which extends the ViewProps from 'app-studio', indicating that it inherits all the properties of a view.
export interface VerticalProps extends ViewProps {
  // Optional boolean property 'isReversed' to determine if the vertical view should be displayed in reverse order.
  isReversed?: boolean;
}
