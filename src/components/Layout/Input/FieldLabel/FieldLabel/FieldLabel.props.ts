import React from 'react';
import { Size } from 'src/components/Layout/configs/Input.type';

export interface LabelProps {
  /**
   * The content to be rendered inside the Label.
   */
  children?: React.ReactNode;

  /**
   * Indicates whether the field has an error.
   */
  error?: boolean;

  /**
   * The size of the Label
   */
  size?: Size;
  /**
   * The color of the Label
   */
  color?: string;
  /**
   * CSS styles applied to the Label
   */
  styles?: { label: any };
  /**
   * Additional properties and attributes for the field.
   */
  [x: string]: any;
}
