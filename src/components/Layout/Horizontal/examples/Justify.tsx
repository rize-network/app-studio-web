import React from 'react';
import { Horizontal } from 'src/components';
import { Justify } from 'src/components/Layout/configs/Input.type';
import { View } from 'src/components/Layout/View/View';

export const JustifyHorizontal = () => {
  const size = {
    width: 50,
    height: 50,
  };
  return (
    <View>
      {['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].map((justify) => (
        <View key={justify} marginTop={10}>
          {justify}
          <Horizontal justify={justify as Justify} gap={5} width="100%">
            <View backgroundColor="theme.primary" {...size} />
            <View backgroundColor="theme.secondary" {...size} />
            <View backgroundColor="theme.warning" {...size} />
          </Horizontal>
        </View>
      ))}
    </View>
  );
};
