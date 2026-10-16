import React from 'react';
import { Resizable } from '../Resizable';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

export const ResizableSizes = () => {
  return (
    <Vertical gap={30} width="100%">
      <View>
        <Text fontWeight="bold" marginBottom={10}>
          Small Size
        </Text>
        <View
          height="200px"
          border="1px solid #e2e8f0"
          borderRadius="8px"
          overflow="hidden"
        >
          <Resizable size="sm">
            <Resizable.Panel id="left" defaultSize="50%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color-gray-50"
              >
                <Text>Left Panel</Text>
              </View>
            </Resizable.Panel>

            <Resizable.Handle id="handle1" withVisualIndicator />

            <Resizable.Panel id="right" defaultSize="50%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color-gray-50"
              >
                <Text>Right Panel</Text>
              </View>
            </Resizable.Panel>
          </Resizable>
        </View>
      </View>

      <View>
        <Text fontWeight="bold" marginBottom={10}>
          Medium Size (Default)
        </Text>
        <View
          height="200px"
          border="1px solid #e2e8f0"
          borderRadius="8px"
          overflow="hidden"
        >
          <Resizable size="md">
            <Resizable.Panel id="left" defaultSize="50%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color-gray-50"
              >
                <Text>Left Panel</Text>
              </View>
            </Resizable.Panel>

            <Resizable.Handle id="handle1" withVisualIndicator />

            <Resizable.Panel id="right" defaultSize="50%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color-gray-50"
              >
                <Text>Right Panel</Text>
              </View>
            </Resizable.Panel>
          </Resizable>
        </View>
      </View>

      <View>
        <Text fontWeight="bold" marginBottom={10}>
          Large Size
        </Text>
        <View
          height="200px"
          border="1px solid #e2e8f0"
          borderRadius="8px"
          overflow="hidden"
        >
          <Resizable size="lg">
            <Resizable.Panel id="left" defaultSize="50%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color-gray-50"
              >
                <Text>Left Panel</Text>
              </View>
            </Resizable.Panel>

            <Resizable.Handle id="handle1" withVisualIndicator />

            <Resizable.Panel id="right" defaultSize="50%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color-gray-50"
              >
                <Text>Right Panel</Text>
              </View>
            </Resizable.Panel>
          </Resizable>
        </View>
      </View>
    </Vertical>
  );
};
