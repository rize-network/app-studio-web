import React from 'react';
import { Separator } from '../Separator';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';

export const SeparatorWithLabel = () => {
  return (
    <Vertical width="100%" gap={24}>
      <View>
        <Text marginBottom={8}>Separator with Text Label</Text>
        <Separator label="OR" />
      </View>

      <View>
        <Text marginBottom={8}>Separator with Custom Label Styling</Text>
        <Separator
          label="SECTION DIVIDER"
          views={{
            label: {
              fontWeight: 'bold',
              color: 'color.blue.500',
              textTransform: 'uppercase',
            },
          }}
        />
      </View>

      <View>
        <Text marginBottom={8}>Separator with Custom Color and Label</Text>
        <Separator
          label="IMPORTANT"
          color="color.red.500"
          thickness="medium"
          views={{
            label: {
              fontWeight: 'bold',
              color: 'color.red.500',
            },
          }}
        />
      </View>
    </Vertical>
  );
};
