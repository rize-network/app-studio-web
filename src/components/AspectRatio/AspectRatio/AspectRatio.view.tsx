import React from 'react';
import { View } from '../../Layout/View/View';
import { Center } from '../../Layout/Center/Center';
// Import the custom View component from the Layout View directory.
import { AspectRatioProps } from './AspectRatio.props';
// Import the custom Center component, used for aligning children centrally in a container, from the Layout Center directory.
export const AspectRatioView = ({
  // Import the AspectRatioProps type definition, ensuring props passed to AspectRatioView adhere to the defined contract.
  ratio = 16 / 9,
  // Define the AspectRatioView functional component, which controls the aspect ratio of its children content.
  children,
  // Set a default value for 'ratio' prop to maintain an aspect ratio of 16:9 if not specifically provided.
  ...props
}: // Children is a special prop that allows other components to be passed inside this component.
AspectRatioProps) => (
  <Center
    width={'100%'}
    position="relative"
    // Center component utilized here to maintain the aspect ratio container with a defined width of 100%.
    overflow="hidden"
    // Position set to 'relative' to enable absolute positioning of child components based on this parent container.
    paddingTop={`${(1 / ratio) * 100}%`}
    // Overflow set to 'hidden' to prevent any child content from overflowing the bounds of the container.
    borderRadius={8}
    // Padding top calculated from the aspect ratio to maintain the desired height relative to the width of the container.
    {...props}
    // Border radius set to 8 for rounded corners of the container.
  >
    <View position="absolute" top={0} right={0} bottom={0} left={0}>
      // Set the View component with an absolute position to fill up the entire
      space of its parent container.
      {children}
      // Props being spread to inherit additional props that may be needed for
      custom behavior or styling.
    </View>
  </Center>
  // Render the children components inside the View component, which are the contents that maintain the aspect ratio within the container.
);
