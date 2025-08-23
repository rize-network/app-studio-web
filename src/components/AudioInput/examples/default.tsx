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
            Recorded Audio: <strong>{audioFile.name}</strong> (
            {(audioFile.size / 1024).toFixed(2)} KB)
          </Text>
          <audio controls src={URL.createObjectURL(audioFile)} />
          <Button onPress={() => setAudioFile(null)}>Clear Audio</Button>
        </View>
      )}
    </View>
  );
};
