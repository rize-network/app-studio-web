import React from 'react';
import { Horizontal } from '../../..';
import { View } from '../../../Layout/View/View';

import { Wrap } from '../../configs/Input.type';

export const WrapHorizontal = () => {
  const size = {
    width: 50,
    height: 50,
  };
  return (
    <View width={300}>
      {['wrap', 'nowrap', 'wrap-reverse'].map((wrapping) => (
        <div key={wrapping}>
          {wrapping}
          <Horizontal wrap={wrapping as Wrap} gap={5} marginTop={10}>
            <View backgroundColor="theme.primary" {...size} />
            <View backgroundColor="theme.secondary" {...size} />
            <View backgroundColor="theme.warning" {...size} />
            <View backgroundColor="theme.success" {...size} />
            <View backgroundColor="theme.error" {...size} />
            <View backgroundColor="color.blue" {...size} />
          </Horizontal>
        </div>
      ))}
    </View>
  );
};
