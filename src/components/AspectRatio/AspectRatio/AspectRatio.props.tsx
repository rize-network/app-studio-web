import { ViewProps } from 'app-studio';

// Defines an interface 'AspectRatioProps' for component properties.
export interface AspectRatioProps extends ViewProps {
  // Optional 'ratio' prop specifying the aspect ratio, as a number.
  ratio?: number;
  views?: {
    container?: ViewProps;
    center?: ViewProps;
    view?: ViewProps;
  };
}
