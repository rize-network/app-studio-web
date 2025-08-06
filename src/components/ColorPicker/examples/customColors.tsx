import React from 'react';
import { ColorPicker } from '../ColorPicker';

export const CustomColorsColorPicker = () => (
  <ColorPicker
    label="Custom color palette"
    predefinedColors={[
      { name: 'Brand Primary', value: '#3B82F6', category: 'brand' },
      { name: 'Brand Secondary', value: '#8B5CF6', category: 'brand' },
      { name: 'Success', value: '#10B981', category: 'status' },
      { name: 'Warning', value: '#F59E0B', category: 'status' },
      { name: 'Error', value: '#EF4444', category: 'status' },
      { name: 'Info', value: '#06B6D4', category: 'status' },
    ]}
    showCustomInput={true}
    showRecentColors={true}
    placeholder="Choose from custom palette"
    onChange={(color) => console.log('Selected custom color:', color)}
  />
);
