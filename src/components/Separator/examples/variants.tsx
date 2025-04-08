import React from 'react';
import { Separator } from '../Separator';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const SeparatorVariants = () => {
  return (
    <Vertical width="100%" gap={24}>
      <View>
        <Text marginBottom={8}>Solid Variant (Default)</Text>
        <Separator variant="solid" />
      </View>
      
      <View>
        <Text marginBottom={8}>Dashed Variant</Text>
        <Separator variant="dashed" />
      </View>
      
      <View>
        <Text marginBottom={8}>Dotted Variant</Text>
        <Separator variant="dotted" />
      </View>
    </Vertical>
  );
};
