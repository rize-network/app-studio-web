import React, { useState } from 'react';
import { Vertical, Horizontal, View } from 'app-studio';
import { ColorPicker } from '../ColorPicker';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';

export const FormIntegrationColorPicker = () => {
  const [backgroundColor, setBackgroundColor] = useState('color-blue-500');
  const [textColor, setTextColor] = useState('color-white');

  const handleSubmit = () => {
    if (typeof alert !== 'undefined') {
      alert(`Background: ${backgroundColor}, Text: ${textColor}`);
    } else {
      console.log(`Background: ${backgroundColor}, Text: ${textColor}`);
    }
  };

  return (
    <View>
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
          <Button type="button" variant="filled" onClick={handleSubmit}>
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
    </View>
  );
};
