import React from 'react';
import { Separator } from '../Separator';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';

export const SeparatorOrientations = () => {
  return (
    <Vertical width="100%" gap={24}>
      <View>
        <Text marginBottom={8}>Horizontal Orientation (Default)</Text>
        <Separator orientation="horizontal" />
      </View>

      <View>
        <Text marginBottom={8}>Vertical Orientation</Text>
        <Horizontal height={100} alignItems="center">
          <Text>Left Content</Text>
          <Separator orientation="vertical" />
          <Text>Right Content</Text>
        </Horizontal>
      </View>
    </Vertical>
  );
};
