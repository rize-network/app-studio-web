import { CSSProperties } from 'react';
import { Elevation } from 'src/utils/elevation';
import { InputProps, Shadow } from 'app-studio';

import {
  Country,
  CountryPickerStyles,
  Shape,
  Size,
  Variant,
} from './CountryPicker.type';

export interface CountryPickerProps extends Omit<InputProps, 'size'> {
  /**
   * The identifier for the CountryPicker component.
   */
  id?: string;
  /**
   * Indicates whether the field has an error.
   */
  error?: boolean;
  /**
   * The name of the field.
   */
  name?: string;
  /**
   * The label text for the field.
   */
  label?: string;
  /**
   * The color scheme that changes the border color on hover of the field.
   */
  colorScheme?: string;
  /**
   * Additional helper text that provides information about the field.
   */
  helperText?: string;
  /**
   * A brief text or hint that appears in the field before the user enters any value.
   */
  placeholder?: string;
  /**
   * The shape that changes the outlines of the CountryPicker.
   */
  shape?: Shape;
  /**
   * If true, the field will be automatically focused.
   */
  isAutoFocus?: boolean;
  /**
   * If true, the CountryPicker cannot be edited.
   */
  isReadOnly?: boolean;
  /**
   * If true, the field will be unusable.
   */
  isDisabled?: boolean;
  /**
   * Callback function triggered when the CountryPicker loses focus.
   */
  onBlur?: (value: any) => void;
  /**
   * Callback function triggered when the field value changes.
   */
  onChange?: (value: any) => void;
  /**
   * CSS styles for the CountryPicker component.
   */
  styles?: CountryPickerStyles;
  /**
   * The font size of the CountryPicker.
   */
  size?: Size;
  /**
   * The default value of the input field.
   */
  value?: string | number;
  /**
   * Changes the style of the input field.
   */
  variant?: Variant;
  /**
   * Adds a shadow effect to the CountryPicker.
   */
  shadow?: Shadow | Elevation | CSSProperties;
}

export interface CountryPickerViewProps extends CountryPickerProps {
  /**
   * Indicates whether the country picker is currently being hovered.
   */
  isHovered?: boolean;

  /**
   * A function to set the hovered state of the country picker.
   * @param hovered - The hovered state to set.
   */
  setIsHovered?: (hovered: boolean) => void;

  /**
   * Indicates whether the country picker is focused.
   */
  isFocused?: boolean;

  /**
   * A function to set the focus state of the country picker.
   * @param focused - The focus state to set.
   */
  setIsFocused?: (focused: boolean) => void;

  /**
   * Indicates the currently selected country.
   */
  selected?: string;

  /**
   * A function to set the selected country.
   * @param selected - The selected country to set.
   */
  setSelected?: (selected: string) => void;

  /**
   * Indicates whether the country picker should be hidden.
   */
  hide?: boolean;

  /**
   * A function to set the hide state of the country picker.
   * @param hide - The hide state to set.
   */
  setHide?: (hide: boolean) => void;

  /**
   * Options for the country picker.
   */
  newOptions?: Array<Country>;

  /**
   * A function to set the new options for the country picker.
   * @param newOptions - The new options to set.
   */
  setNewOptions?: (newOptions: Array<Country>) => void;
}

export interface DropDownProps extends Omit<InputProps, 'size'> {
  /**
   * To set the height and width of the item list.
   */
  size?: Size;
  /**
   * Function that will be called when the option is CountryPickered
   */
  callback?: Function;
  /**
   * List of options
   */
  options: Array<Country>;
  /**
   * Css styles for the CountryPicker container and label
   */
  styles?: CountryPickerStyles;
}

export interface DropDownItemProps extends Omit<InputProps, 'size'> {
  /**
   * Function that will be called when the option is clicked
   */
  callback?: Function;
  /**
   * Option to be displayed
   */
  option: string;
  /**
   * To set the DropDownItem's fontSize
   */
  size?: Size;
  /**
   * Css styles
   */
  styles?: CountryPickerStyles;
}
