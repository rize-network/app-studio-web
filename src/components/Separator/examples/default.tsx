import React from 'react';
import { Separator } from '../Separator';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const DefaultSeparator = () => {
  return (
    <Vertical width="100%" gap={16}>
      <Text>Default Separator</Text>
      <Text>
        This is some text above the separator. The separator helps to visually
        divide content sections.
      </Text>
      <Separator />
      <Text>
        This is some text below the separator. Notice how the separator creates a
        clear visual distinction between content areas.
      </Text>
    </Vertical>
  );
};
