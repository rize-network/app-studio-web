import React, { CSSProperties } from 'react';
import { Elevation } from 'src/utils/elevation';
import { Shadow } from 'app-studio';

import { CheckboxStyles, Size } from './Checkbox.type';

export interface CheckboxProps {
  /**
   * The identifier for the checkbox.
   */
  id?: string;

  /**
   * Custom icon to be displayed when the checkbox is checked.
   */
  icon?: React.ReactNode;

  /**
   * Indicates whether the checkbox has an error.
   */
  error?: boolean;

  /**
   * The name of the checkbox element.
   */
  name?: string;

  /**
   * The label of the checkbox.
   */
  label?: string;

  /**
   * Changes the background color of the checkbox.
   */
  colorScheme?: string;

  /**
   * Give control on the selected state of the checkbox component.
   */
  isChecked?: boolean;
  /**
   * Allows you to set the initial state of the checkbox without controlling its value
   */
  defaultIsSelected?: boolean;

  /**
   * If true, the checkbox cannot be interacted with.
   */
  isReadOnly?: boolean;

  /**
   * If true, the checkbox is disabled and cannot be selected.
   */
  isDisabled?: boolean;

  /**
   * Indicates that the checkbox is neither checked nor unchecked.
   */
  isIndeterminate?: boolean;

  /**
   * Label position
   */
  labelPosition?: 'left' | 'right';

  /**
   * Handler function called when the controlled checkbox value changes.
   */
  onChange?: Function;

  /**
   * Handler function called when the checkbox value changes on iOS and Android devices.
   */
  onValueChange?: Function;

  /**
   * CSS styles
   */
  styles?: CheckboxStyles;

  /**
   * Sets the height and width of the checkbox.
   */
  size?: Size;

  /**
   * Sets a shadow effect for the checkbox.
   */
  shadow?: Shadow | Elevation | CSSProperties;

  /**
   * Other additional properties.
   */
  [x: string]: any;
}

export interface CheckboxViewProps extends CheckboxProps {
  /**
   * Indicates whether the checkbox is currently being hovered.
   */
  isHovered?: boolean;

  /**
   * A function to set the hovered state of the checkbox.
   * @param hovered - The hovered state to set.
   */
  setIsHovered?: (hovered: boolean) => void;

  /**
   * Indicates whether the checkbox is selected/checked.
   */
  isChecked?: boolean;

  /**
   * A function to set the selected state of the checkbox.
   * @param selected - The selected state to set.
   */
  setIsChecked?: (selected: boolean) => void;
}
