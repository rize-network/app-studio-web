import React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';

export const CustomTooltip = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>Custom Styled Tooltip</Text>
      <Tooltip
        content={
          <Vertical padding={5}>
            <Text fontWeight="bold">Custom Tooltip</Text>
            <Text fontSize="12px">With rich content and styling</Text>
          </Vertical>
        }
        views={{
          content: {
            backgroundColor: 'theme.primary',
            color: 'color.white',
            borderRadius: '8px',
          },
          arrow: {
            backgroundColor: 'theme.primary',
          },
        }}
      >
        <Button variant="outline">Hover for Custom Tooltip</Button>
      </Tooltip>
    </Vertical>
  );
};
