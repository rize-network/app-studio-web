import React from 'react';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import {
  Shape,
  Size,
  KeywordsInputStyles,
  Variant,
  Keyword,
  KeywordSeparator,
} from './KeywordsInput.type';

/**
 * Props interface for the KeywordsInput component
 */
export interface KeywordsInputProps
  extends Omit<InputProps, 'size' | 'value' | 'onChange'> {
  /**
   * Unique identifier for the KeywordsInput
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
   * Array of keywords/tags
   */
  value?: string[];

  /**
   * Default value for uncontrolled component
   */
  defaultValue?: string[];

  /**
   * Callback fired when keywords change
   */
  onChange?: (keywords: string[]) => void;

  /**
   * Callback fired when a keyword is added
   */
  onAdd?: (keyword: string) => void;

  /**
   * Callback fired when a keyword is removed
   */
  onRemove?: (keyword: string, index: number) => void;

  /**
   * Maximum number of keywords allowed
   */
  maxKeywords?: number;

  /**
   * Minimum length for each keyword
   */
  minKeywordLength?: number;

  /**
   * Maximum length for each keyword
   */
  maxKeywordLength?: number;

  /**
   * Whether to allow duplicate keywords
   */
  allowDuplicates?: boolean;

  /**
   * Characters that trigger keyword creation
   */
  separators?: KeywordSeparator[];

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
   * Whether keywords can be removed
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
  views?: KeywordsInputStyles;

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
 * Props interface for the KeywordsInput view component
 */
export interface KeywordsInputViewProps extends KeywordsInputProps {
  /**
   * Current input value for new keyword
   */
  inputValue?: string;

  /**
   * Function to set input value
   */
  setInputValue?: (value: string) => void;

  /**
   * Array of keyword objects
   */
  keywords?: Keyword[];

  /**
   * Function to set keywords
   */
  setKeywords?: (keywords: Keyword[]) => void;

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
   * Function to add a keyword
   */
  addKeyword?: (keyword: string) => void;

  /**
   * Function to remove a keyword
   */
  removeKeyword?: (index: number) => void;

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
