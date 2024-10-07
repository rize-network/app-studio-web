import React from 'react';
import { Vertical } from '../../../Layout/Vertical/Vertical';
import { Horizontal } from '../../../Layout/Horizontal/Horizontal';

import { View } from '../../../Layout/View/View';

export const JustifyVertical = () => {
  const size = {
    width: 50,
    height: 50,
  };
  return (
    <Horizontal gap={20} flexWrap="nowrap" justifyContent="space-between">
      {[
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ].map((justify) => (
        <Vertical flex={1} key={justify}>
          {justify}
          <Vertical
            justifyContent={justify}
            gap={5}
            height={300}
            backgroundColor="lightgray"
          >
            <View backgroundColor="theme.primary" {...size} />
            <View backgroundColor="theme.secondary" {...size} />
            <View backgroundColor="theme.warning" {...size} />
          </Vertical>
        </Vertical>
      ))}
    </Horizontal>
  );
};
