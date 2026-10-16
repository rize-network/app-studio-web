import React from 'react';
import { Text, Vertical } from 'app-studio';
import { MarkdownExamples } from '../components/Markdown/examples';

export default function MarkdownPage() {
  return (
    <Vertical padding={24} gap={24} maxWidth={960} margin="0 auto">
      <Text fontSize={32} fontWeight="700">
        Markdown
      </Text>
      <Text>
        Affichage du Markdown sur le web et React Native, avec App Studio.
      </Text>
      <MarkdownExamples />
    </Vertical>
  );
}
