import React from 'react';
import { Horizontal, Text, View, useTheme } from 'app-studio';
import { PromptExample } from './ChatInput/ChatInput.type';

interface PromptExamplesProps {
  examples: PromptExample[];
  onSelect: (example: PromptExample) => void;
  views?: {
    container?: any;
    item?: any;
    text?: any;
  };
}

export const PromptExamples: React.FC<PromptExamplesProps> = ({
  examples,
  onSelect,
  views = {},
}) => {
  const { getColor } = useTheme();

  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <Horizontal
      gap={8}
      overflowX="auto"
      padding="8px 0"
      width="100%"
      {...views?.container}
    >
      {examples.map((example) => (
        <View
          key={example.id}
          as="button"
          type="button"
          padding="8px 12px"
          borderRadius="9999px"
          backgroundColor="color-white"
          border="1px solid #E2E8F0"
          cursor="pointer"
          transition="background-color 0.2s ease, border-color 0.2s ease"
          onClick={() => onSelect(example)}
          _hover={{
            backgroundColor: '#F8FAFC',
            borderColor: '#CBD5E1',
          }}
          {...views?.item}
        >
          <Text fontSize="14px" color="color-gray-700" {...views?.text}>
            {example.text}
          </Text>
        </View>
      ))}
    </Horizontal>
  );
};
