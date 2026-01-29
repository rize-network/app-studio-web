import React, { useState } from 'react';
import { View, Text, Button } from 'app-studio';
import { AttachmentGroup } from 'src/components/AttachmentGroup/AttachmentGroup';

const AttachmentGroupPage = () => {
  const [files, setFiles] = useState<File[]>([
    new File(['dummy content'], 'document.pdf', { type: 'application/pdf' }),
    new File(['dummy content'], 'image.png', { type: 'image/png' }),
    new File(['dummy content'], 'video.mp4', { type: 'video/mp4' }),
  ]);

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addRandomFile = () => {
    const types = [
      { name: 'new_doc.txt', type: 'text/plain' },
      { name: 'new_image.jpg', type: 'image/jpeg' },
      { name: 'song.mp3', type: 'audio/mpeg' },
    ];
    const random = types[Math.floor(Math.random() * types.length)];
    setFiles((prev) => [
      ...prev,
      new File(['random'], random.name, { type: random.type }),
    ]);
  };

  return (
    <View padding={32} gap={32} flexDirection="column">
      <Text fontSize={24} fontWeight={700}>
        AttachmentGroup Component
      </Text>

      <View flexDirection="column" gap={16}>
        <Text fontSize={18} fontWeight={600}>
          1. Basic Usage (Inline)
        </Text>
        <Text color="rgba(0,0,0,0.6)">
          Displays a list of files with preview support.
        </Text>

        <View padding={16} border="1px solid rgba(0,0,0,0.1)" borderRadius={8}>
          <AttachmentGroup
            files={files}
            onRemove={handleRemove}
            showPreviews={true}
          />
        </View>

        <Button onClick={addRandomFile} size="sm" alignSelf="flex-start">
          Add Random File
        </Button>
      </View>

      <View flexDirection="column" gap={16}>
        <Text fontSize={18} fontWeight={600}>
          2. Without Previews
        </Text>
        <Text color="rgba(0,0,0,0.6)">
          Compact list view without hover previews.
        </Text>

        <View padding={16} border="1px solid rgba(0,0,0,0.1)" borderRadius={8}>
          <AttachmentGroup
            files={files}
            onRemove={handleRemove}
            showPreviews={false}
          />
        </View>
      </View>
    </View>
  );
};

export default AttachmentGroupPage;
