import React from 'react';
import { Size } from '../../../../Layout/configs/Input.type';
import { ViewProps } from 'app-studio';

export interface LabelProps extends Omit<ViewProps, 'size'> {
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
  views?: { label: any };
}
