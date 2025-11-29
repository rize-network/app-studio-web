import React from 'react';
import { Resizable } from '../Resizable';
import { View } from 'app-studio';
import { Text } from 'app-studio';

export const VerticalResizable = () => {
  return (
    <View
      height="500px"
      width="100%"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      overflow="hidden"
    >
      <Resizable orientation="vertical">
        <Resizable.Panel id="top" defaultSize="30%">
          <View padding="16px" height="100%" backgroundColor="color.yellow.50">
            <Text fontWeight="bold" marginBottom="8px">
              Top Panel
            </Text>
            <Text>This is the top panel. Drag the handle below to resize.</Text>
          </View>
        </Resizable.Panel>

        <Resizable.Handle id="handle1" withVisualIndicator />

        <Resizable.Panel id="middle" defaultSize="40%">
          <View padding="16px" height="100%" backgroundColor="color.orange.50">
            <Text fontWeight="bold" marginBottom="8px">
              Middle Panel
            </Text>
            <Text>This is the middle panel. Drag the handles to resize.</Text>
          </View>
        </Resizable.Panel>

        <Resizable.Handle id="handle2" withVisualIndicator />

        <Resizable.Panel id="bottom" defaultSize="30%">
          <View padding="16px" height="100%" backgroundColor="color.red.50">
            <Text fontWeight="bold" marginBottom="8px">
              Bottom Panel
            </Text>
            <Text>
              This is the bottom panel. Drag the handle above to resize.
            </Text>
          </View>
        </Resizable.Panel>
      </Resizable>
    </View>
  );
};
