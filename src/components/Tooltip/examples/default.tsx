import React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';

export const DefaultTooltip = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>
        <Tooltip content="This is a tooltip">
          <Button>Hover Me</Button>
        </Tooltip>
        Default Tooltip
      </Text>
    </Vertical>
  );
};
