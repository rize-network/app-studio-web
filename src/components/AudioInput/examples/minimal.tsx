import React from 'react';
import { AudioInput } from '../AudioInput';
import { View, Text } from 'app-studio';

export const Minimal = () => {
  const handleAudio = (file: File) => {
    console.log('Audio recorded:', file.name, file.size);
    // In a real application, you would upload this file or process it further
  };

  return (
    <View flexDirection="column" gap={4} padding={4} alignItems="flex-start">
      <Text variant="heading" size="lg">
        Minimal Audio Input Example
      </Text>
      <AudioInput onAudio={handleAudio} />
      <Text variant="body">
        This example demonstrates a minimal integration of the AudioInput
        component. Check the console for recorded audio file details.
      </Text>
    </View>
  );
};
