import React from 'react';
import { View } from '../../Layout/View/View';
import { Center } from '../../Layout/Center/Center';
import { AspectRatioProps } from './AspectRatio.props';
// Declaration of a functional component named AspectRatioView.
export const AspectRatioView = ({
  // Set a default aspect ratio of 16:9 if no ratio is provided as a prop.
  ratio = 16 / 9,
  // children prop used to render enclosed components.
  children,
  // Spread the rest of the props to inherit additional properties.
  ...props
}: AspectRatioProps) => (
  <Center
    width={'100%'}
    position="relative"
    overflow="hidden"
    paddingTop={`${(1 / ratio) * 100}%`}
    borderRadius={8}
    {...props}
  >
    <View position="absolute" top={0} right={0} bottom={0} left={0}>
      {children}
    </View>
  </Center>
);
