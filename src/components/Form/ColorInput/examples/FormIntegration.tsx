import React, { useState } from 'react';
import { Vertical, Horizontal } from 'app-studio';
import { ColorInput } from '../ColorInput';
import { Button } from '../../../Button/Button';
import { Text } from '../../../Text/Text';

export const FormIntegrationColorInput = () => {
  const [backgroundColor, setBackgroundColor] = useState('color.blue.500');
  const [textColor, setTextColor] = useState('color.white');
  const [borderColor, setBorderColor] = useState('color.gray.300');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Background: ${backgroundColor}, Text: ${textColor}, Border: ${borderColor}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={16} width="400px">
        <ColorInput
          label="Background Color"
          value={backgroundColor}
          onChange={setBackgroundColor}
          helperText="Choose the background color for your theme"
        />

        <ColorInput
          label="Text Color"
          value={textColor}
          onChange={setTextColor}
          helperText="Choose the text color"
        />

        <ColorInput
          label="Border Color"
          value={borderColor}
          onChange={setBorderColor}
          helperText="Choose the border color"
        />

        {/* Preview */}
        <Vertical
          gap={8}
          padding="16px"
          borderRadius="8px"
          backgroundColor={backgroundColor}
          color={textColor}
          borderWidth="2px"
          borderStyle="solid"
          borderColor={borderColor}
        >
          <Text fontWeight="bold">Preview</Text>
          <Text>This is how your theme will look with the selected colors</Text>
        </Vertical>

        <Horizontal gap={8}>
          <Button type="submit" variant="filled">
            Apply Theme
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setBackgroundColor('color.blue.500');
              setTextColor('color.white');
              setBorderColor('color.gray.300');
            }}
          >
            Reset
          </Button>
        </Horizontal>
      </Vertical>
    </form>
  );
};
