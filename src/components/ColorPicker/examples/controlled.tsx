import React, { useState } from 'react';
import { Vertical, Horizontal } from 'app-studio';
import { ColorPicker } from '../ColorPicker';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';

export const ControlledColorPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('color-purple-500');

  return (
    <Vertical gap={16}>
      <Text fontWeight="bold">Controlled ColorPicker</Text>

      <ColorPicker
        label="Controlled Color Picker"
        value={selectedColor}
        isOpen={isOpen}
        onChange={setSelectedColor}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        closeOnSelect={false}
        placeholder="Controlled picker"
      />

      <Horizontal gap={8}>
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'} Picker
        </Button>

        <Button
          variant="outline"
          onClick={() => setSelectedColor('color-red-500')}
        >
          Set Red
        </Button>

        <Button
          variant="outline"
          onClick={() => setSelectedColor('color-green-500')}
        >
          Set Green
        </Button>
      </Horizontal>

      <Text fontSize="14px" color="color-gray-600">
        Selected color: {selectedColor}
      </Text>
    </Vertical>
  );
};
