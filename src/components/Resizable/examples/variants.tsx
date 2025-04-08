import React from 'react';
import { Resizable } from '../Resizable';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const ResizableVariants = () => {
  return (
    <Vertical gap={30} width="100%">
      <View>
        <Text fontWeight="bold" marginBottom={10}>Default Variant</Text>
        <View height="200px" border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
          <Resizable variant="default">
            <Resizable.Panel id="left" defaultSize="50%">
              <View padding="16px" height="100%" backgroundColor="color.gray.50">
                <Text>Left Panel</Text>
              </View>
            </Resizable.Panel>
            
            <Resizable.Handle id="handle1" withVisualIndicator />
            
            <Resizable.Panel id="right" defaultSize="50%">
              <View padding="16px" height="100%" backgroundColor="color.gray.50">
                <Text>Right Panel</Text>
              </View>
            </Resizable.Panel>
          </Resizable>
        </View>
      </View>

      <View>
        <Text fontWeight="bold" marginBottom={10}>Subtle Variant</Text>
        <View height="200px" border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
          <Resizable variant="subtle">
            <Resizable.Panel id="left" defaultSize="50%">
              <View padding="16px" height="100%" backgroundColor="color.gray.50">
                <Text>Left Panel</Text>
              </View>
            </Resizable.Panel>
            
            <Resizable.Handle id="handle1" withVisualIndicator />
            
            <Resizable.Panel id="right" defaultSize="50%">
              <View padding="16px" height="100%" backgroundColor="color.gray.50">
                <Text>Right Panel</Text>
              </View>
            </Resizable.Panel>
          </Resizable>
        </View>
      </View>

      <View>
        <Text fontWeight="bold" marginBottom={10}>Prominent Variant</Text>
        <View height="200px" border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
          <Resizable variant="prominent">
            <Resizable.Panel id="left" defaultSize="50%">
              <View padding="16px" height="100%" backgroundColor="color.gray.50">
                <Text>Left Panel</Text>
              </View>
            </Resizable.Panel>
            
            <Resizable.Handle id="handle1" withVisualIndicator />
            
            <Resizable.Panel id="right" defaultSize="50%">
              <View padding="16px" height="100%" backgroundColor="color.gray.50">
                <Text>Right Panel</Text>
              </View>
            </Resizable.Panel>
          </Resizable>
        </View>
      </View>
    </Vertical>
  );
};
