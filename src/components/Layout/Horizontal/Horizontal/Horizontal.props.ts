import { ViewProps } from 'app-studio';
// Definition of the HorizontalProps interface which extends the base ViewProps to include Horizontal specific properties.
export interface HorizontalProps extends ViewProps {
// Optional boolean property to determine if the child components should be rendered in reverse order.
  isReversed?: boolean;
}
