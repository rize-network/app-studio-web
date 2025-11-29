import React, { useState } from 'react';
import { Vertical, Horizontal } from 'app-studio';
import { EmojiPicker } from '../EmojiPicker';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';

export const ControlledEmojiPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('🎉');

  return (
    <Vertical gap={16}>
      <Text fontWeight="bold">Controlled EmojiPicker</Text>

      <EmojiPicker
        label="Controlled Emoji Picker"
        value={selectedEmoji}
        isOpen={isOpen}
        onChange={setSelectedEmoji}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        closeOnSelect={false}
        placeholder="Controlled picker"
      />

      <Horizontal gap={8}>
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'} Picker
        </Button>

        <Button variant="outline" onClick={() => setSelectedEmoji('😀')}>
          Set Happy
        </Button>

        <Button variant="outline" onClick={() => setSelectedEmoji('❤️')}>
          Set Heart
        </Button>

        <Button variant="outline" onClick={() => setSelectedEmoji('🚀')}>
          Set Rocket
        </Button>
      </Horizontal>

      <Text fontSize="14px" color="color.gray.600">
        Selected emoji: {selectedEmoji}
      </Text>
    </Vertical>
  );
};
