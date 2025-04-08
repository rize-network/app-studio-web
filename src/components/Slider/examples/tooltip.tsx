import React from 'react';
import { Slider } from '../Slider';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const TooltipDemo = () => {
  return (
    <Vertical gap={30} width="100%" maxWidth={400}>
      <View>
        <Text marginBottom={10}>Slider with Tooltip</Text>
        <Slider defaultValue={42} showTooltip ariaLabel="Slider with tooltip" />
      </View>

      <View>
        <Text marginBottom={10}>Vertical Slider with Tooltip</Text>
        <Horizontal>
          <View height={200} marginTop={10}>
            <Slider
              orientation="vertical"
              defaultValue={65}
              showTooltip
              ariaLabel="Vertical slider with tooltip"
            />
          </View>
        </Horizontal>
      </View>
    </Vertical>
  );
};
