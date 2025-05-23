import React from 'react';
import { Separator } from '../Separator';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';

export const SeparatorThicknesses = () => {
  return (
    <Vertical width="100%" gap={24}>
      <View>
        <Text marginBottom={8}>Thin Thickness (Default)</Text>
        <Separator thickness="thin" />
      </View>

      <View>
        <Text marginBottom={8}>Medium Thickness</Text>
        <Separator thickness="medium" />
      </View>

      <View>
        <Text marginBottom={8}>Thick Thickness</Text>
        <Separator thickness="thick" />
      </View>
    </Vertical>
  );
};
