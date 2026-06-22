import React, { useState } from 'react';
import { AudioInput } from '../AudioInput';
import { View, Text, Button } from 'app-studio';

export const Default = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleAudio = (file: File) => {
    setAudioFile(file);
  };

  return (
    <View flexDirection="column" gap={4} padding={4} alignItems="flex-start">
      <Text variant="heading" size="lg">
        Audio Input Example
      </Text>
      <AudioInput onAudio={handleAudio} />
      {audioFile && (
        <View flexDirection="column" gap={2}>
          <Text>
            Recorded Audio: <Text fontWeight="600">{audioFile.name}</Text> (
            {(audioFile.size / 1024).toFixed(2)} KB)
          </Text>
          <View
            padding={8}
            borderRadius={4}
            backgroundColor="color-gray-100"
            borderWidth={1}
            borderStyle="solid"
            borderColor="color-gray-200"
          >
            <Text color="color-gray-600">Audio preview placeholder</Text>
          </View>
          <Button onPress={() => setAudioFile(null)}>Clear Audio</Button>
        </View>
      )}
    </View>
  );
};
