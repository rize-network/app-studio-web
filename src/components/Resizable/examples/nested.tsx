import React from 'react';
import { Resizable } from '../Resizable';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';

export const NestedResizable = () => {
  return (
    <View
      height="500px"
      width="100%"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      overflow="hidden"
    >
      <Resizable>
        <Resizable.Panel id="left" defaultSize="30%">
          <View padding="16px" height="100%" backgroundColor="color.blue.50">
            <Text fontWeight="bold" marginBottom="8px">
              Left Panel
            </Text>
            <Text>This is the left panel.</Text>
          </View>
        </Resizable.Panel>

        <Resizable.Handle id="handle1" withVisualIndicator />

        <Resizable.Panel id="right" defaultSize="70%">
          {/* Nested vertical resizable */}
          <Resizable orientation="vertical">
            <Resizable.Panel id="top" defaultSize="50%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color.green.50"
              >
                <Text fontWeight="bold" marginBottom="8px">
                  Top Right Panel
                </Text>
                <Text>This is the top right panel in a nested layout.</Text>
              </View>
            </Resizable.Panel>

            <Resizable.Handle id="handle2" withVisualIndicator />

            <Resizable.Panel id="bottom" defaultSize="50%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color.purple.50"
              >
                <Text fontWeight="bold" marginBottom="8px">
                  Bottom Right Panel
                </Text>
                <Text>This is the bottom right panel in a nested layout.</Text>
              </View>
            </Resizable.Panel>
          </Resizable>
        </Resizable.Panel>
      </Resizable>
    </View>
  );
};
