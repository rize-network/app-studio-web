import React from 'react';
import { Vertical } from '../../../Layout/Vertical/Vertical';
import { Horizontal } from '../../../Layout/Horizontal/Horizontal';

import { View } from '../../../Layout/View/View';

import { Wrap } from '../Vertical/Vertical.type';

export const WrapVertical = () => {
  const size = {
    width: 50,
    height: 50,
  };
  return (
    <Horizontal gap={5} justify="space-between">
      {['wrap', 'nowrap', 'wrap-reverse'].map((wrapping, index) => (
        <View key={index}>
          <View>{wrapping}</View>
          <Vertical wrap={wrapping as Wrap} gap={5} height={200} flex={1}>
            <View backgroundColor="theme.primary" {...size} />
            <View backgroundColor="theme.secondary" {...size} />
            <View backgroundColor="theme.warning" {...size} />
            <View backgroundColor="theme.success" {...size} />
            <View backgroundColor="theme.error" {...size} />
            <View backgroundColor="color.blue" {...size} />
          </Vertical>
        </View>
      ))}
    </Horizontal>
  );
};
