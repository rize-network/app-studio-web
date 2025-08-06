import React, { useState } from 'react';
import { Vertical, Horizontal } from 'app-studio';
import { EmojiPicker } from '../EmojiPicker';
import { TextField } from '../../Form/TextField/TextField';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

export const FormIntegrationEmojiPicker = () => {
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Title: ${emoji} ${title}\nDescription: ${description}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={16} width="400px">
        <Horizontal gap={12} alignItems="end">
          <EmojiPicker
            label="Icon"
            value={emoji}
            onChange={setEmoji}
            size="md"
            placeholder="Pick an icon"
          />

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            style={{ flex: 1 }}
          />
        </Horizontal>

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          helperText="Add a description for your item"
        />

        {/* Preview */}
        {(emoji || title || description) && (
          <Vertical
            gap={8}
            padding="16px"
            borderRadius="8px"
            backgroundColor="color.gray.50"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="color.gray.200"
          >
            <Text fontWeight="bold">Preview</Text>
            <Text fontSize="18px" fontWeight="600">
              {emoji} {title || 'Untitled'}
            </Text>
            {description && <Text color="color.gray.600">{description}</Text>}
          </Vertical>
        )}

        <Horizontal gap={8}>
          <Button type="submit" variant="filled">
            Create Item
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setTitle('');
              setEmoji('');
              setDescription('');
            }}
          >
            Clear
          </Button>
        </Horizontal>
      </Vertical>
    </form>
  );
};
