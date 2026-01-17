import React from 'react';
import { Separator } from '../Separator';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

export const SeparatorColors = () => {
  return (
    <Vertical width="100%" gap={24}>
      <View>
        <Text marginBottom={8}>Default Color (Gray)</Text>
        <Separator color="color-gray-200" />
      </View>

      <View>
        <Text marginBottom={8}>Primary Color</Text>
        <Separator color="color-blue-500" />
      </View>

      <View>
        <Text marginBottom={8}>Success Color</Text>
        <Separator color="color-green-500" />
      </View>

      <View>
        <Text marginBottom={8}>Warning Color</Text>
        <Separator color="color-yellow-500" />
      </View>

      <View>
        <Text marginBottom={8}>Danger Color</Text>
        <Separator color="color-red-500" />
      </View>
    </Vertical>
  );
};
