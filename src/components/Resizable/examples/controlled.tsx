import React, { useState } from 'react';
import { Resizable } from '../Resizable';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Button } from '../../Button/Button';
import { Horizontal } from 'app-studio';

export const ControlledResizable = () => {
  const [sizes, setSizes] = useState([33.33, 33.33, 33.33]);

  const handleSizesChange = (newSizes: number[]) => {
    setSizes(newSizes);
  };

  const resetSizes = () => {
    setSizes([33.33, 33.33, 33.33]);
  };

  const maximizeFirst = () => {
    setSizes([60, 20, 20]);
  };

  const maximizeMiddle = () => {
    setSizes([20, 60, 20]);
  };

  const maximizeLast = () => {
    setSizes([20, 20, 60]);
  };

  return (
    <View>
      <Horizontal gap={10} marginBottom={16}>
        <Button onClick={resetSizes}>Reset</Button>
        <Button onClick={maximizeFirst}>Maximize First</Button>
        <Button onClick={maximizeMiddle}>Maximize Middle</Button>
        <Button onClick={maximizeLast}>Maximize Last</Button>
      </Horizontal>

      <Text marginBottom={10}>
        Current sizes: [{sizes.map((size) => Math.round(size)).join('%, ')}%]
      </Text>

      <View
        height="300px"
        width="100%"
        border="1px solid #e2e8f0"
        borderRadius="8px"
        overflow="hidden"
      >
        <Resizable defaultSizes={sizes} onSizesChange={handleSizesChange}>
          <Resizable.Panel id="panel1" defaultSize={`${sizes[0]}%`}>
            <View padding="16px" height="100%" backgroundColor="color-blue-50">
              <Text fontWeight="bold" marginBottom="8px">
                Panel 1
              </Text>
              <Text>Size: {Math.round(sizes[0])}%</Text>
            </View>
          </Resizable.Panel>

          <Resizable.Handle id="handle1" withVisualIndicator />

          <Resizable.Panel id="panel2" defaultSize={`${sizes[1]}%`}>
            <View padding="16px" height="100%" backgroundColor="color-green-50">
              <Text fontWeight="bold" marginBottom="8px">
                Panel 2
              </Text>
              <Text>Size: {Math.round(sizes[1])}%</Text>
            </View>
          </Resizable.Panel>

          <Resizable.Handle id="handle2" withVisualIndicator />

          <Resizable.Panel id="panel3" defaultSize={`${sizes[2]}%`}>
            <View
              padding="16px"
              height="100%"
              backgroundColor="color-purple-50"
            >
              <Text fontWeight="bold" marginBottom="8px">
                Panel 3
              </Text>
              <Text>Size: {Math.round(sizes[2])}%</Text>
            </View>
          </Resizable.Panel>
        </Resizable>
      </View>
    </View>
  );
};
