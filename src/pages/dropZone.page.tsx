import React, { useState } from 'react';
import { View, Text, Center } from 'app-studio';
import { DropZone } from 'src/components/DropZone/DropZone';
import { ImageIcon } from 'src/components/Icon/Icon';

const DropZonePage = () => {
  const [singleFile, setSingleFile] = useState<File[]>([]);
  const [multiFiles, setMultiFiles] = useState<File[]>([]);
  const [lastEvent, setLastEvent] = useState<string>('No interaction yet');

  const handleSingleFileSelect = (file: File) => {
    setSingleFile([file]);
    setLastEvent(`Selected single file: ${file.name}`);
  };

  const handleMultipleFileSelect = (newFiles: File[]) => {
    // Append new files instead of replacing, to demo accumulation
    setMultiFiles((prev) => [...prev, ...newFiles]);
    setLastEvent(`Added ${newFiles.length} files`);
  };

  const handleRemoveFile = (index: number) => {
    setMultiFiles((prev) => prev.filter((_, i) => i !== index));
    setLastEvent(`Removed file at index ${index}`);
  };

  return (
    <View padding={32} gap={32} flexDirection="column">
      <Text fontSize={24} fontWeight={700}>
        DropZone Component
      </Text>

      <View flexDirection="column" gap={16}>
        <Text fontSize={18} fontWeight={600}>
          1. Basic DropZone (Image Preview)
        </Text>
        <Text color="rgba(0,0,0,0.6)">
          Default styling, accepts images, shows preview.
        </Text>
        <DropZone
          onFileSelect={handleSingleFileSelect}
          accept="image/*"
          text="Drop image to see preview"
        />
      </View>

      <View flexDirection="column" gap={16}>
        <Text fontSize={18} fontWeight={600}>
          2. Multiple Files Support (with AttachmentGroup)
        </Text>
        <Text color="rgba(0,0,0,0.6)">
          Accepts multiple files and uses AttachmentGroup to display them.
        </Text>
        <DropZone
          multiple
          onMultipleFileSelect={handleMultipleFileSelect}
          selectedFiles={multiFiles}
          onRemove={handleRemoveFile}
          text="Drop multiple files here!"
        />
      </View>

      <View flexDirection="column" gap={16}>
        <Text fontSize={18} fontWeight={600}>
          3. Custom Children
        </Text>
        <Text color="rgba(0,0,0,0.6)">Fully customizable content inside.</Text>
        <DropZone
          onFileSelect={handleSingleFileSelect}
          containerProps={{
            height: '150px',
            backgroundColor: '#f0f8ff',
            borderColor: '#007bff',
            borderStyle: 'solid',
          }}
        >
          <Center flexDirection="column">
            <ImageIcon widthHeight={48} color="#007bff" />
            <Text marginTop={12} fontWeight={600} color="#007bff">
              Custom Upload Area
            </Text>
            <Text fontSize={12} color="#007bff">
              (Images only)
            </Text>
          </Center>
        </DropZone>
      </View>

      <View flexDirection="column" gap={16}>
        <Text fontSize={18} fontWeight={600}>
          4. Disabled State
        </Text>
        <DropZone disabled text="This dropzone is disabled" />
      </View>

      <View padding={16} backgroundColor="rgba(0,0,0,0.05)" borderRadius={8}>
        <Text fontWeight={600}>Interaction Log:</Text>
        <Text marginTop={8} fontFamily="monospace">
          {lastEvent}
        </Text>

        <View flexDirection="column" marginTop={16} gap={8}>
          <Text fontWeight={600} fontSize={14}>
            Multi-File State:
          </Text>
          {multiFiles.length === 0 && (
            <Text fontSize={12} color="gray">
              No files selected
            </Text>
          )}
          {multiFiles.map((f, i) => (
            <Text key={i} fontSize={12}>
              - {f.name} ({Math.round(f.size / 1024)} KB)
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DropZonePage;
