import React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { View } from '../../Layout/View/View';

export const DefaultTooltip = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>Default Tooltip</Text>
      <Tooltip content="This is a tooltip">
        <Button>Hover Me</Button>
      </Tooltip>
    </Vertical>
  );
};
