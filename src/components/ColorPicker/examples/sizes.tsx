import React from 'react';
import { Vertical } from 'app-studio';
import { ColorPicker } from '../ColorPicker';

export const ColorPickerSizes = () => (
  <Vertical gap={16}>
    <ColorPicker label="Extra small" size="xs" placeholder="XS size" />
    <ColorPicker label="Small" size="sm" placeholder="SM size" />
    <ColorPicker label="Medium" size="md" placeholder="MD size" />
    <ColorPicker label="Large" size="lg" placeholder="LG size" />
    <ColorPicker label="Extra large" size="xl" placeholder="XL size" />
  </Vertical>
);
