import React from 'react';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import {
  Shape,
  Size,
  TagInputStyles,
  Variant,
  Tag,
  TagSeparator,
} from './TagInput.type';

/**
 * Props interface for the TagInput component
 */
export interface TagInputProps
  extends Omit<InputProps, 'size' | 'value' | 'onChange'> {
  /**
   * Unique identifier for the TagInput
   */
  id?: string;

  /**
   * Name attribute for form submission
   */
  name?: string;

  /**
   * Label text for the input field
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message or boolean indicating error state
   */
  error?: string | boolean;

  /**
   * Placeholder text shown when input is empty
   */
  placeholder?: string;

  /**
   * Array of tags
   */
  tags?: string[];

  /**
   * Default tags for uncontrolled component
   */
  defaultTags?: string[];

  /**
   * Callback fired when tags change
   */
  onTagsChange?: (tags: string[]) => void;

  /**
   * Callback fired when a tag is added
   */
  onTagAdd?: (tag: string) => void;

  /**
   * Callback fired when a tag is removed
   */
  onTagRemove?: (tag: string, index: number) => void;

  /**
   * Maximum number of tags allowed
   */
  maxTags?: number;

  /**
   * Minimum length for each tag
   */
  minTagLength?: number;

  /**
   * Maximum length for each tag
   */
  maxTagLength?: number;

  /**
   * Whether to allow duplicate tags
   */
  allowDuplicates?: boolean;

  /**
   * Characters that trigger tag creation
   */
  separators?: TagSeparator[];

  /**
   * Whether the input is disabled
   */
  isDisabled?: boolean;

  /**
   * Whether the input is read-only
   */
  isReadOnly?: boolean;

  /**
   * Whether to auto-focus the input
   */
  isAutoFocus?: boolean;

  /**
   * Whether tags can be removed
   */
  isRemovable?: boolean;

  /**
   * Size of the component
   */
  size?: Size;

  /**
   * Shape/border radius of the component
   */
  shape?: Shape;

  /**
   * Visual variant of the component
   */
  variant?: Variant;

  /**
   * Shadow properties
   */
  shadow?: Shadow | Elevation | ViewProps;

  /**
   * Custom styling for different parts of the component
   */
  views?: TagInputStyles;

  /**
   * React node to render on the left side
   */
  left?: React.ReactNode;

  /**
   * React node to render on the right side
   */
  right?: React.ReactNode;

  /**
   * Callback fired when input gains focus
   */
  onFocus?: () => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: () => void;

  /**
   * Callback fired when input is clicked
   */
  onClick?: () => void;
}

/**
 * Props interface for the TagInput view component
 */
export interface TagInputViewProps extends Omit<TagInputProps, 'tags'> {
  /**
   * Current input value for new tag
   */
  inputValue?: string;

  /**
   * Function to set input value
   */
  setInputValue?: (value: string) => void;

  /**
   * Array of tag objects (internal representation)
   */
  tags?: Tag[];

  /**
   * Function to set tags
   */
  setTags?: (tags: Tag[]) => void;

  /**
   * Whether the input is currently focused
   */
  isFocused?: boolean;

  /**
   * Function to set focus state
   */
  setIsFocused?: (focused: boolean) => void;

  /**
   * Whether the input is currently hovered
   */
  isHovered?: boolean;

  /**
   * Function to set hover state
   */
  setIsHovered?: (hovered: boolean) => void;

  /**
   * Function to add a tag
   */
  addTag?: (tag: string) => void;

  /**
   * Function to remove a tag
   */
  removeTag?: (index: number) => void;

  /**
   * Function to handle input key events
   */
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Function to handle input change
   */
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Function to handle input focus
   */
  handleFocus?: () => void;

  /**
   * Function to handle input blur
   */
  handleBlur?: () => void;
}
