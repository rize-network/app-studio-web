import React from 'react';
import { ColorPicker } from '../ColorPicker';

export const DefaultColorPicker = () => (
  <ColorPicker
    label="Choose a color"
    placeholder="Select a color"
    onChange={(color) => console.log('Selected color:', color)}
  />
);
