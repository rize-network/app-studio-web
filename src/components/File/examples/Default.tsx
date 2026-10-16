import React from 'react';
import { Horizontal, Vertical, Text } from 'app-studio';
import { FileImage, FileSVG } from '../File';

export const DefaultFile = () => (
  <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
    <Vertical gap={6} alignItems="center">
      <FileImage
        path="https://reactnative.dev/img/tiny_logo.png"
        width={64}
        height={64}
        borderRadius={8}
      />
      <Text fontSize={11} color="color-gray-500">
        FileImage
      </Text>
    </Vertical>
    <Vertical gap={6} alignItems="center">
      <FileSVG
        src="https://reactnative.dev/img/tiny_logo.png"
        width={64}
        height={64}
      />
      <Text fontSize={11} color="color-gray-500">
        FileSVG
      </Text>
    </Vertical>
  </Horizontal>
);
