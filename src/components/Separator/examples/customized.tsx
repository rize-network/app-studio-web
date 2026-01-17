import React from 'react';
import { Separator } from '../Separator';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';

export const CustomizedSeparators = () => {
  return (
    <Vertical width="100%" gap={24}>
      <View>
        <Text marginBottom={8}>Custom Thickness and Color</Text>
        <Separator thickness="thick" color="color-blue-500" />
      </View>

      <View>
        <Text marginBottom={8}>Custom Border Style with Direct Props</Text>
        {/* Using direct props to override default styles */}
        <Separator variant="dashed" color="color-orange-500" spacing="24px" />
      </View>

      <View>
        <Text marginBottom={8}>Vertical Separator with Custom Styling</Text>
        <Horizontal height={100} alignItems="center" gap={16}>
          <Text>Left Content</Text>
          <Separator
            orientation="vertical"
            thickness="medium"
            color="color-purple-500"
            spacing="8px"
          />
          <Text>Right Content</Text>
        </Horizontal>
      </View>

      <View>
        <Text marginBottom={8}>Advanced Customization with Views</Text>
        <Separator
          label="CUSTOM"
          views={{
            container: {
              borderTopWidth: '3px',
              borderTopColor: 'color-green-500',
            },
            label: {
              fontWeight: 'bold',
              color: 'color-green-500',
              backgroundColor: 'color-gray-100',
              paddingHorizontal: '12px',
              borderRadius: '4px',
            },
          }}
        />
      </View>
    </Vertical>
  );
};
