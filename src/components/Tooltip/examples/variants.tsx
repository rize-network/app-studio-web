import React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { View } from '../../Layout/View/View';

export const TooltipVariants = () => {
  return (
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Horizontal gap={20}>
        <Vertical gap={10} alignItems="center">
          <Text>Default Variant</Text>
          <Tooltip content="Default tooltip style" variant="default">
            <Button>Default</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Light Variant</Text>
          <Tooltip content="Light tooltip style" variant="light">
            <Button>Light</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Dark Variant</Text>
          <Tooltip content="Dark tooltip style" variant="dark">
            <Button>Dark</Button>
          </Tooltip>
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
