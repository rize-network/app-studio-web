import React, { useState } from 'react';
import { Vertical, Text } from 'app-studio';
import { TagInput } from '../TagInput';

/**
 * Default TagInput example
 */
export const DefaultTagInput = () => {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <Vertical gap={20}>
      <Text>Default Tag Input:</Text>
      <TagInput
        // name="tags"
        label="Tags"
        placeholder="Type tags and press Enter..."
        tags={tags}
        onTagsChange={setTags}
        helperText="Add relevant tags for your content"
      />
      <Text fontSize={14} color="color.gray.600">
        Current tags: {Array.isArray(tags) ? tags.join(', ') : 'None'}
      </Text>
    </Vertical>
  );
};

/**
 * TagInput with custom separators
 */
export const CustomSeparatorsTagInput = () => {
  const [tags, setTags] = useState<string[]>(['react', 'typescript']);

  return (
    <Vertical gap={20}>
      <Text>Custom Separators (Enter, Comma, Space):</Text>
      <TagInput
        name="customTags"
        label="Skills"
        placeholder="Use Enter, comma, or space to add skills..."
        tags={tags}
        onTagsChange={setTags}
        separators={['enter', 'comma', 'space']}
        variant="outline"
        shape="rounded"
        size="lg"
      />
    </Vertical>
  );
};

/**
 * TagInput with maximum limit
 */
export const LimitedTagInput = () => {
  const [tags, setTags] = useState<string[]>(['javascript', 'web']);

  return (
    <Vertical gap={20}>
      <Text>Limited to 5 tags:</Text>
      <TagInput
        name="limitedTags"
        label="Technologies"
        placeholder="Add up to 5 technologies..."
        tags={tags}
        onTagsChange={setTags}
        maxTags={5}
        variant="outline"
        helperText={`${tags.length}/5 tags used`}
      />
    </Vertical>
  );
};

/**
 * TagInput with validation
 */
export const ValidatedTagInput = () => {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <Vertical gap={20}>
      <Text>With Validation (3-20 chars, no duplicates):</Text>
      <TagInput
        name="validatedTags"
        label="Categories"
        placeholder="Add categories..."
        tags={tags}
        onTagsChange={setTags}
        minTagLength={3}
        maxTagLength={20}
        allowDuplicates={false}
        variant="outline"
        shape="pillShaped"
        helperText="Tags must be 3-20 characters long"
      />
    </Vertical>
  );
};

/**
 * Disabled and ReadOnly states
 */
export const DisabledTagInput = () => {
  return (
    <Vertical gap={20}>
      <Text>Disabled State:</Text>
      <TagInput
        name="disabledTags"
        label="Disabled Tags"
        tags={['disabled', 'example']}
        isDisabled={true}
        helperText="This input is disabled"
      />

      <Text>Read-Only State:</Text>
      <TagInput
        name="readonlyTags"
        label="Read-Only Tags"
        tags={['readonly', 'example']}
        isReadOnly={true}
        isRemovable={false}
        helperText="This input is read-only"
      />
    </Vertical>
  );
};

/**
 * Custom styled TagInput
 */
export const StyledTagInput = () => {
  const [tags, setTags] = useState<string[]>(['design', 'ui']);

  return (
    <Vertical gap={20}>
      <Text>Custom Styled:</Text>
      <TagInput
        name="styledTags"
        label="Design Tags"
        placeholder="Add design-related tags..."
        tags={tags}
        onTagsChange={setTags}
        variant="none"
        shape="rounded"
        shadow={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
        views={{
          inputContainer: {
            borderColor: 'theme.primary',
            borderWidth: '2px',
            backgroundColor: 'color.blue.50',
          },
          tag: {
            backgroundColor: 'theme.primary',
            borderColor: 'theme.primary',
          },
          tagText: {
            color: 'color.white',
          },
          tagRemove: {
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
