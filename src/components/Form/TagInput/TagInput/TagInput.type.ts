import { ViewProps } from 'app-studio';

/**
 * Size options for the TagInput component
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Shape options for the TagInput component
 */
export type Shape = 'default' | 'square' | 'rounded' | 'pill';

/**
 * Variant options for the TagInput component
 */
export type Variant = 'outline' | 'default' | 'none';

/**
 * Tag separator options
 */
export type TagSeparator = 'enter' | 'comma' | 'space' | 'tab';

/**
 * Individual tag object
 */
export interface Tag {
  /**
   * Unique identifier for the tag
   */
  id: string;

  /**
   * The tag value/text
   */
  value: string;
}

/**
 * Styles for different parts of the TagInput component
 */
export type TagInputStyles = {
  /**
   * Styles for the main input container
   */
  inputContainer?: ViewProps;

  /**
   * Styles for the tags container
   */
  tagsContainer?: ViewProps;

  /**
   * Styles for individual tag chips
   */
  tag?: ViewProps;

  /**
   * Styles for tag text
   */
  tagText?: ViewProps;

  /**
   * Styles for tag remove button
   */
  tagRemove?: ViewProps;

  /**
   * Styles for the input field
   */
  input?: ViewProps;

  /**
   * Styles for the label
   */
  label?: ViewProps;

  /**
   * Styles for helper text
   */
  helperText?: ViewProps;

  /**
   * Styles for error text
   */
  error?: ViewProps;

  /**
   * Styles for the container
   */
  container?: ViewProps;

  /**
   * Styles for placeholder text
   */
  placeholder?: ViewProps;
};
