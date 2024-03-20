import { CSSProperties } from 'react';
import { Elevation } from 'src/utils/elevation';
import { Shadow } from 'app-studio';

import { SelectStyles, Shape, Size, Variant } from './Select.type';

export interface SelectProps {
  /**
   * The identifier of the select field.
   */
  id?: string;

  /**
   * Indicates whether the field has an error.
   */
  error?: boolean;

  /**
   * The name of the select field.
   */
  name?: string;

  /**
   * The label text for the select field.
   */
  label?: string;

  /**
   * Changes the border color when hovering over the field.
   */
  colorScheme?: string;

  /**
   * Provides additional information or instructions about the field.
   */
  helperText?: string;

  /**
   * A brief text or hint that appears in the field before the user enters any value.
   */
  placeholder?: string;

  /**
   * An array of options for the select field.
   */
  options: Array<string>;

  /**
   * If true, allows multiple options to be selected.
   */
  isMulti?: boolean;

  /**
   * If true, the select field cannot be edited.
   */
  isReadOnly?: boolean;

  /**
   * If true, the select field is disabled and cannot be used.
   */
  isDisabled?: boolean;

  /**
   * Handler function to be called when the select value changes.
   */
  onChange?: (value: any) => void;
  /**
   * Changes the shape or outline of the input field.
   */
  shape?: Shape;
  /**
   * Changes the style variant of the input field.
   */
  variant?: Variant;
  /**
   * CSS styles for the select box and dropdown.
   */
  styles?: SelectStyles;

  /**
   * Specifies the height and width of the select.
   */
  size?: Size;

  /**
   * Applies a shadow effect to the select field.
   */
  shadow?: Shadow | Elevation | CSSProperties;

  /**
   * Additional properties and attributes for the select field.
   */
  [x: string]: any;
}

export interface SelectViewProps extends SelectProps {
  /**
   * Optional prop indicating if an option is selected
   */
  value: string | Array<string>;

  /**
   * Optional callback prop to update the selected option
   */
  setValue: Function;

  /**
   * Prop to determine if the select dropdown is hidden
   */
  hide: boolean;

  /**
   * Callback prop to update the visibility of the select dropdown
   */
  setHide: Function;

  /**
   * Prop indicating if the select is being hovered
   */
  isHovered: boolean;

  /**
   * Callback prop to update the hover state of the select
   */
  setIsHovered: Function;

  /**
   * Prop indicating if the select is currently focused
   */
  isFocused: boolean;

  /**
   * Callback prop to update the focus state of the select
   */
  setIsFocused: Function;
}

export interface SelectBoxProps {
  /**
   * The option that will be selected value
   */
  value?: string | Array<string>;
  /**
   * If true, the select will be unusable
   */
  isDisabled?: boolean;
  /**
   * A brief text or hint that appears in the field before the user enters any value
   */
  placeholder?: string;
  /**
   * Function to be called when clicked on close button
   */
  removeOption?: Function;
  /**
   * Css styles for the select box and dropdown
   */
  styles?: SelectStyles;
  /**
   * To set the select's height and width.
   */
  size?: Size;
}

export interface MultiSelectProps {
  /**
   * Option to be displayed
   */
  option: string;
  /**
   * Function to be called when clicked on close button
   */
  removeOption: Function;
  /**
   * To set the item's fontSize
   */
  size?: Size;
  /**
   * other properties
   */
  [x: string]: any;
}

export interface ItemProps {
  /**
   * Function that will be called when the option is clicked
   */
  callback?: Function;
  /**
   * Option to be displayed
   */
  option: string;
  /**
   * To set the item's fontSize
   */
  size?: Size;
  /**
   * other properties
   */
  [x: string]: any;
}
export interface HiddenSelectProps {
  /**
   * Identifier
   */
  id?: string;
  /**
   * The name of the field
   */
  name?: string;
  /**
   * The option that has been selected
   */
  value: string | Array<string>;
  /**
   * If true, multiple options can be selected
   */
  isMulti?: boolean;
  /**
   * If true, select cannot be selected
   */
  isReadOnly?: boolean;
  /**
   * If true, the dropdown will be unusable
   */
  isDisabled?: boolean;
  /**
   * Handler when the field value changes
   */
  onChange?: (value: any) => void;
  /**
   * List of options
   */
  options: Array<string>;
  /**
   * other properties
   */
  [x: string]: any;
}

export interface DropDownProps {
  /**
   * To set the height and width of the item list.
   */
  size?: Size;
  /**
   * Function that will be called when the option is selected
   */
  callback?: Function;
  /**
   * List of options
   */
  options: Array<string>;
  /**
   * Css styles for the select container and label
   */
  styles?: SelectStyles;
  /**
   * other properties
   */
  [x: string]: any;
}
