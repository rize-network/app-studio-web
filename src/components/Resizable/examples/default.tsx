import React from 'react';
import { Resizable } from '../Resizable';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';

export const DefaultResizable = () => {
  return (
    <View height="400px" width="100%" border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
      <Resizable>
        <Resizable.Panel id="panel1" defaultSize="30%">
          <View padding="16px" height="100%" backgroundColor="color.blue.50">
            <Text fontWeight="bold" marginBottom="8px">Panel 1</Text>
            <Text>This is the first panel. Drag the handle to resize.</Text>
          </View>
        </Resizable.Panel>
        
        <Resizable.Handle id="handle1" withVisualIndicator />
        
        <Resizable.Panel id="panel2" defaultSize="40%">
          <View padding="16px" height="100%" backgroundColor="color.green.50">
            <Text fontWeight="bold" marginBottom="8px">Panel 2</Text>
            <Text>This is the second panel. Drag the handle to resize.</Text>
          </View>
        </Resizable.Panel>
        
        <Resizable.Handle id="handle2" withVisualIndicator />
        
        <Resizable.Panel id="panel3" defaultSize="30%">
          <View padding="16px" height="100%" backgroundColor="color.purple.50">
            <Text fontWeight="bold" marginBottom="8px">Panel 3</Text>
            <Text>This is the third panel. Drag the handle to resize.</Text>
          </View>
        </Resizable.Panel>
      </Resizable>
    </View>
  );
};
