import React, { useState } from 'react';
import { Slider } from '../Slider';
import { Tooltip } from '../../Tooltip/Tooltip';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { InfoIcon } from '../../Icon/Icon';

export const TooltipIntegrationDemo = () => {
  const [value, setValue] = useState(50);

  return (
    <Vertical gap={30} width="100%" maxWidth={400}>
      <View>
        <Horizontal alignItems="center" marginBottom={10}>
          <Text marginRight={5}>Volume Control</Text>
          <Tooltip content="Adjust the volume level from 0 to 100">
            <InfoIcon size={16} cursor="pointer" />
          </Tooltip>
        </Horizontal>

        <Slider
          value={value}
          onChange={setValue}
          ariaLabel="Volume slider with custom tooltip integration"
        />
      </View>
    </Vertical>
  );
};
