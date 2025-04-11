import React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { View } from '../../Layout/View/View';

export const TooltipSizes = () => {
  return (
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Horizontal gap={20}>
        <Vertical gap={10} alignItems="center">
          <Text>Small Size</Text>
          <Tooltip content="Small tooltip" size="sm">
            <Button>Small</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Medium Size (Default)</Text>
          <Tooltip content="Medium tooltip" size="md">
            <Button>Medium</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Large Size</Text>
          <Tooltip content="Large tooltip with more content that might wrap to multiple lines" size="lg">
            <Button>Large</Button>
          </Tooltip>
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
