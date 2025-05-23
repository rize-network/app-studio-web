/**
 * Basic AIResponseDisplay Example
 */

import React from 'react';
import { View, Vertical } from 'app-studio';
import { Text } from 'src/components/Text/Text';
import { AIResponseDisplay } from '../AIResponseDisplay';

const sampleResponse = `
# AI Response Example

This is an example of AI-generated content with various formatting elements:

## Code Example

Here's a code block:

\`\`\`javascript
function greet(name) {
  // This is a comment
  console.log(\`Hello, \${name}!\`);
  return \`Hello, \${name}!\`;
}

// Call the function
greet('World');
\`\`\`

## Inline Code

You can use \`inline code\` for short code snippets or technical terms.

## Links

Check out this link: https://example.com

## Citations

According to recent research [1], AI models continue to improve.

## Math (if enabled)

The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
`;

export const BasicAIResponseDisplay = () => {
  return (
    <Vertical width="100%" gap={24}>
      <Text heading="h2">Basic AI Response Display</Text>

      <View>
        <Text marginBottom={8}>Default Styling</Text>
        <View
          padding={16}
          border="1px solid"
          borderColor="color.gray.200"
          borderRadius="md"
        >
          <AIResponseDisplay content={sampleResponse} />
        </View>
      </View>

      <View>
        <Text marginBottom={8}>With Custom Styling</Text>
        <View
          padding={16}
          border="1px solid"
          borderColor="color.gray.200"
          borderRadius="md"
        >
          <AIResponseDisplay
            content={sampleResponse}
            styles={{
              container: {
                backgroundColor: 'color.gray.50',
                padding: '16px',
                borderRadius: '8px',
              },
              text: {
                color: 'color.blue.900',
              },
              inlineCode: {
                backgroundColor: 'color.blue.50',
                color: 'color.blue.800',
                fontWeight: 'bold',
              },
              link: {
                color: 'color.purple.600',
              },
            }}
          />
        </View>
      </View>

      <View>
        <Text marginBottom={8}>With Features Disabled</Text>
        <View
          padding={16}
          border="1px solid"
          borderColor="color.gray.200"
          borderRadius="md"
        >
          <AIResponseDisplay
            content={sampleResponse}
            enableSyntaxHighlighting={false}
            enableLinkDetection={false}
            enableCitations={false}
          />
        </View>
      </View>
    </Vertical>
  );
};
