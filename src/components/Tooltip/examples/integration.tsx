import React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { View } from 'app-studio';
import { InfoIcon } from '../../Icon/Icon';
import { Slider } from '../../Slider/Slider';
import { Alert } from '../../Alert/Alert';

export const TooltipIntegration = () => {
  return (
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Text fontWeight="bold" marginBottom={10}>
        Integration with Button
      </Text>

      <Horizontal gap={20}>
        <Button>
          Save
          <Tooltip content="Save your changes" position="top">
            <InfoIcon size={16} marginLeft={5} />
          </Tooltip>
        </Button>
      </Horizontal>

      <Text fontWeight="bold" marginTop={20} marginBottom={10}>
        Integration with Alert
      </Text>

      <Alert
        title="Important Notice"
        description={
          'This action cannot be undone'
          // <Horizontal alignItems="center">
          //   <Text></Text>
          //   <Tooltip content="Once deleted, you cannot recover this item">
          //     <InfoIcon size={16} marginLeft={5} cursor="pointer" />
          //   </Tooltip>
          // </Horizontal>
        }
        variant="warning"
      />

      <Text fontWeight="bold" marginTop={20} marginBottom={10}>
        Integration with Slider
      </Text>

      <View width="100%" maxWidth={400}>
        <Horizontal alignItems="center" marginBottom={10}>
          <Text>Volume</Text>
          <Tooltip content="Adjust the volume level" position="right">
            <InfoIcon size={16} marginLeft={5} cursor="pointer" />
          </Tooltip>
        </Horizontal>
        <Slider defaultValue={50} />
      </View>
    </Vertical>
  );
};
