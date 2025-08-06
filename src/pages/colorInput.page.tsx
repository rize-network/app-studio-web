import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import {
  DefaultColorInput,
  VariantsColorInput,
  SizesColorInput,
  FormIntegrationColorInput,
} from '../components/Form/ColorInput/examples';
import { FormikColorInputExample } from '../components/Formik/examples';

export const ColorInputPage = () => {
  return (
    <View padding="24px" maxWidth="800px" margin="0 auto">
      <Vertical gap={32}>
        <Text fontSize="32px" fontWeight="bold" color="color.gray.900">
          ColorInput Component
        </Text>

        <Vertical gap={24}>
          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Default
            </Text>
            <DefaultColorInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Variants
            </Text>
            <VariantsColorInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Sizes
            </Text>
            <SizesColorInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Form Integration
            </Text>
            <FormIntegrationColorInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Formik Integration
            </Text>
            <FormikColorInputExample />
          </Vertical>
        </Vertical>
      </Vertical>
    </View>
  );
};

export default ColorInputPage;
