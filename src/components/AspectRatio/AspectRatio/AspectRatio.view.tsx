import React from 'react';
import { View, Center } from 'src/components';
import { AspectRatioProps } from './AspectRatio.props';

export const AspectRatioView = ({
  ratio = 16 / 9,
  children,
  ...props
}: AspectRatioProps) => (
  <Center
    width={'100%'}
    position="relative"
    overflow="hidden"
    paddingTop={`${(1 / ratio) * 100}%`}
    {...props}
  >
    <View position="absolute" top={0} right={0} bottom={0} left={0}>
      {children}
    </View>
  </Center>
);
