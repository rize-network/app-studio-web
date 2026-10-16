import React from 'react';
import { Separator } from '../Separator';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

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
        This is some text below the separator. Notice how the separator creates
        a clear visual distinction between content areas.
      </Text>
    </Vertical>
  );
};
