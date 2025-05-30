import React from 'react';
import { Vertical } from 'app-studio';
import { ColorPicker } from '../ColorPicker';

export const ColorPickerShapes = () => (
  <Vertical gap={16}>
    <ColorPicker
      label="Default shape"
      shape="default"
      placeholder="Default corners"
    />
    <ColorPicker
      label="Sharp shape"
      shape="sharp"
      placeholder="Sharp corners"
    />
    <ColorPicker
      label="Rounded shape"
      shape="rounded"
      placeholder="Rounded corners"
    />
    <ColorPicker
      label="Pill shaped"
      shape="pillShaped"
      placeholder="Pill shaped"
    />
  </Vertical>
);
