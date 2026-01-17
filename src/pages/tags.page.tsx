import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import {
  DefaultTagInput,
  CustomSeparatorsTagInput,
  LimitedTagInput,
  ValidatedTagInput,
  DisabledTagInput,
  StyledTagInput,
} from '../components/Form/TagInput/examples';

export const TagsInputPage = () => {
  return (
    <View padding="24px" maxWidth="800px" margin="0 auto">
      <Vertical gap={32}>
        <Text fontSize="32px" fontWeight="bold" color="color-gray-900">
          TagsInput Component
        </Text>

        <Vertical gap={24}>
          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Default
            </Text>
            <DefaultTagInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Custom Separators
            </Text>
            <CustomSeparatorsTagInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Limited
            </Text>
            <LimitedTagInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Validated
            </Text>
            <ValidatedTagInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Disabled and Read-Only
            </Text>
            <DisabledTagInput />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color-gray-800">
              Styled
            </Text>
            <StyledTagInput />
          </Vertical>
        </Vertical>
      </Vertical>
    </View>
  );
};

export default TagsInputPage;
