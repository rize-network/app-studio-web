import React from 'react';
import { AspectRatioProps } from './AspectRatio/AspectRatio.props';
import { AspectRatioView } from './AspectRatio/AspectRatio.view';
const AspectRatioComponent = ({
  // Declaration of the `AspectRatioComponent`, a functional component that takes `AspectRatioProps` props.
  ratio,
  // The `ratio` property specifies the aspect ratio of the `AspectRatioComponent`.
  children,
  // `children` denotes the child components that will be displayed inside the `AspectRatioView`.
  ...props
}: // `props` holds any additional properties passed to `AspectRatioComponent` that aren't `ratio` or `children`.
AspectRatioProps) => {
  return (
    // Render the `AspectRatioView` component with the passed `ratio` and any additional props.
    <AspectRatioView ratio={ratio} {...props}>
      // Place the `children` inside the `AspectRatioView`, so they conform to
      the specified aspect ratio.
      {children}
    </AspectRatioView>
  );
  // Export `AspectRatio` as the main component from this module, it is an alias for `AspectRatioComponent`.
};
export const AspectRatio = AspectRatioComponent;
