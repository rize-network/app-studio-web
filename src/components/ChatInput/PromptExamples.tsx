import React from 'react';
import { Horizontal, Text, View, useTheme } from 'app-studio';
import { PromptExample } from './ChatInput/ChatInput.type';
// Defines the properties expected by the PromptExamples component.
interface PromptExamplesProps {
  // An array of prompt examples to be displayed.
  examples: PromptExample[];
  // A callback function invoked when a prompt example is selected.
  onSelect: (example: PromptExample) => void;
  // Optional custom component overrides for different parts of the PromptExamples component.
  views?: {
    container?: any;
    item?: any;
    text?: any;
  };
}
// Defines the PromptExamples functional component, which displays a list of clickable prompt examples.
export const PromptExamples: React.FC<PromptExamplesProps> = ({
  examples,
  onSelect,
  views = {},
}) => {
  // Retrieves the `getColor` utility function from the current theme context for consistent styling.
  const { getColor } = useTheme();
  // Conditionally renders nothing if no examples are provided or if the examples array is empty.
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
