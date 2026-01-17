import React, { useState } from 'react';
import { Vertical, Horizontal } from 'app-studio';
import { ColorPicker } from '../ColorPicker';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';

export const FormIntegrationColorPicker = () => {
  const [backgroundColor, setBackgroundColor] = useState('color-blue-500');
  const [textColor, setTextColor] = useState('color-white');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Background: ${backgroundColor}, Text: ${textColor}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={16} width="300px">
        <ColorPicker
          label="Background Color"
          value={backgroundColor}
          onChange={setBackgroundColor}
          helperText="Choose the background color for your theme"
        />

        <ColorPicker
          label="Text Color"
          value={textColor}
          onChange={setTextColor}
          helperText="Choose the text color for your theme"
        />

        {/* Preview */}
        <Vertical
          gap={8}
          padding="16px"
          borderRadius="8px"
          backgroundColor={backgroundColor}
          color={textColor}
        >
          <Text fontWeight="bold">Preview</Text>
          <Text>This is how your theme will look</Text>
        </Vertical>

        <Horizontal gap={8}>
          <Button type="submit" variant="filled">
            Apply Theme
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setBackgroundColor('color-blue-500');
              setTextColor('color-white');
            }}
          >
            Reset
          </Button>
        </Horizontal>
      </Vertical>
    </form>
  );
};
