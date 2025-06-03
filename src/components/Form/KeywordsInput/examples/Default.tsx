import React, { useState } from 'react';
import { Vertical, Horizontal, Text } from 'app-studio';
import { KeywordsInput } from '../KeywordsInput';

/**
 * Default KeywordsInput example
 */
export const DefaultKeywordsInput = () => {
  const [keywords, setKeywords] = useState<string[]>([]);

  return (
    <Vertical gap={20}>
      <Text>Default Keywords Input:</Text>
      <KeywordsInput
        name="keywords"
        label="Keywords"
        placeholder="Type keywords and press Enter..."
        value={keywords}
        onChange={setKeywords}
        helperText="Add relevant keywords for your content"
      />
      <Text fontSize={14} color="color.gray.600">
        Current keywords: {keywords.join(', ') || 'None'}
      </Text>
    </Vertical>
  );
};

/**
 * KeywordsInput with custom separators
 */
export const CustomSeparatorsKeywordsInput = () => {
  const [keywords, setKeywords] = useState<string[]>(['react', 'typescript']);

  return (
    <Vertical gap={20}>
      <Text>Custom Separators (Enter, Comma, Space):</Text>
      <KeywordsInput
        name="customKeywords"
        label="Tags"
        placeholder="Use Enter, comma, or space to add tags..."
        value={keywords}
        onChange={setKeywords}
        separators={['enter', 'comma', 'space']}
        variant="outline"
        shape="rounded"
        size="lg"
      />
    </Vertical>
  );
};

/**
 * KeywordsInput with maximum limit
 */
export const LimitedKeywordsInput = () => {
  const [keywords, setKeywords] = useState<string[]>(['javascript', 'web']);

  return (
    <Vertical gap={20}>
      <Text>Limited to 5 keywords:</Text>
      <KeywordsInput
        name="limitedKeywords"
        label="Skills"
        placeholder="Add up to 5 skills..."
        value={keywords}
        onChange={setKeywords}
        maxKeywords={5}
        variant="outline"
        helperText={`${keywords.length}/5 keywords used`}
      />
    </Vertical>
  );
};

/**
 * KeywordsInput with validation
 */
export const ValidatedKeywordsInput = () => {
  const [keywords, setKeywords] = useState<string[]>([]);

  return (
    <Vertical gap={20}>
      <Text>With Validation (3-20 chars, no duplicates):</Text>
      <KeywordsInput
        name="validatedKeywords"
        label="Categories"
        placeholder="Add categories..."
        value={keywords}
        onChange={setKeywords}
        minKeywordLength={3}
        maxKeywordLength={20}
        allowDuplicates={false}
        variant="outline"
        shape="pillShaped"
        helperText="Keywords must be 3-20 characters long"
      />
    </Vertical>
  );
};

/**
 * Disabled and ReadOnly states
 */
export const DisabledKeywordsInput = () => {
  return (
    <Vertical gap={20}>
      <Text>Disabled State:</Text>
      <KeywordsInput
        name="disabledKeywords"
        label="Disabled Keywords"
        value={['disabled', 'example']}
        isDisabled={true}
        helperText="This input is disabled"
      />

      <Text>Read-Only State:</Text>
      <KeywordsInput
        name="readonlyKeywords"
        label="Read-Only Keywords"
        value={['readonly', 'example']}
        isReadOnly={true}
        isRemovable={false}
        helperText="This input is read-only"
      />
    </Vertical>
  );
};

/**
 * Custom styled KeywordsInput
 */
export const StyledKeywordsInput = () => {
  const [keywords, setKeywords] = useState<string[]>(['design', 'ui']);

  return (
    <Vertical gap={20}>
      <Text>Custom Styled:</Text>
      <KeywordsInput
        name="styledKeywords"
        label="Design Tags"
        placeholder="Add design-related tags..."
        value={keywords}
        onChange={setKeywords}
        variant="none"
        shape="rounded"
        shadow={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
        views={{
          inputContainer: {
            borderColor: 'theme.primary',
            borderWidth: '2px',
            backgroundColor: 'color.blue.50',
          },
          keyword: {
            backgroundColor: 'theme.primary',
            borderColor: 'theme.primary',
          },
          keywordText: {
            color: 'color.white',
          },
          keywordRemove: {
            _hover: {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          },
          label: {
            color: 'theme.primary',
            fontWeight: 'bold',
          },
        }}
      />
    </Vertical>
  );
};
