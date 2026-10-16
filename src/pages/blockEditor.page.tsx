import React from 'react';
import { Text, Vertical } from 'app-studio';
import { BlockEditorExamples } from '../components/BlockEditor/examples';

export default function BlockEditorPage() {
  return (
    <Vertical padding={24} gap={24} maxWidth={960} margin="0 auto">
      <Text fontSize={32} fontWeight="700">
        BlockEditor
      </Text>
      <BlockEditorExamples />
    </Vertical>
  );
}
