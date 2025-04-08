import React from 'react';
import { Slider } from '../Slider';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const VerticalDemo = () => {
  const [level, setLevel] = React.useState(25);

  return (
    <Horizontal gap={20} alignItems="center">
      <Text>Vertical Slider (Level: {level})</Text>
      <View height={250}>
        <Slider
          orientation="vertical"
          value={level}
          onChange={setLevel}
          min={0}
          max={100}
          step={5}
          ariaLabel="Vertical level control"
          showTooltip
        />
      </View>
    </Horizontal>
  );
};
