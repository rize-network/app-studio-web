import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import {
  DefaultColorPicker,
  ColorPickerVariants,
  ColorPickerSizes,
  ColorPickerShapes,
  CustomColorsColorPicker,
  FormIntegrationColorPicker,
  ControlledColorPicker,
} from '../components/ColorPicker/examples';

export const ColorPickerPage = () => {
  return (
    <View padding="24px" maxWidth="800px" margin="0 auto">
      <Vertical gap={32}>
        <Text fontSize="32px" fontWeight="bold" color="color-gray-900">
          ColorPicker Component
        </Text>

        <Vertical gap={24}>
          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Default
            </Text>
            <DefaultColorPicker />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Variants
            </Text>
            <ColorPickerVariants />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Sizes
            </Text>
            <ColorPickerSizes />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Shapes
            </Text>
            <ColorPickerShapes />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Custom Colors
            </Text>
            <CustomColorsColorPicker />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Form Integration
            </Text>
            <FormIntegrationColorPicker />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Controlled
            </Text>
            <ControlledColorPicker />
          </Vertical>
        </Vertical>
      </Vertical>
    </View>
  );
};

export default ColorPickerPage;
