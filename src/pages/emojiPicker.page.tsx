import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import {
  DefaultEmojiPicker,
  EmojiPickerVariants,
  EmojiPickerSizes,
  EmojiPickerShapes,
  CustomEmojisEmojiPicker,
  FormIntegrationEmojiPicker,
  ControlledEmojiPicker,
} from '../components/EmojiPicker/examples';

export const EmojiPickerPage = () => {
  return (
    <View padding="24px" maxWidth="800px" margin="0 auto">
      <Vertical gap={32}>
        <Text fontSize="32px" fontWeight="bold" color="color.gray.900">
          EmojiPicker Component
        </Text>

        <Vertical gap={24}>
          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Default
            </Text>
            <DefaultEmojiPicker />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Variants
            </Text>
            <EmojiPickerVariants />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Sizes
            </Text>
            <EmojiPickerSizes />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Shapes
            </Text>
            <EmojiPickerShapes />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Custom Emojis
            </Text>
            <CustomEmojisEmojiPicker />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Form Integration
            </Text>
            <FormIntegrationEmojiPicker />
          </Vertical>

          <Vertical gap={16}>
            <Text fontSize="24px" fontWeight="600" color="color.gray.800">
              Controlled
            </Text>
            <ControlledEmojiPicker />
          </Vertical>
        </Vertical>
      </Vertical>
    </View>
  );
};

export default EmojiPickerPage;
