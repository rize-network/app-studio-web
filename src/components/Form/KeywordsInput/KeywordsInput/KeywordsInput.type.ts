import { ViewProps } from 'app-studio';

/**
 * Variant options for the KeywordsInput component
 */
export type Variant = 'outline' | 'default' | 'none';

/**
 * Shape options for the KeywordsInput component
 */
export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';

/**
 * Size options for the KeywordsInput component
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Style customization interface for KeywordsInput
 */
export type KeywordsInputStyles = {
  container?: ViewProps;
  inputContainer?: ViewProps;
  input?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
  error?: ViewProps;
  keywordsContainer?: ViewProps;
  keyword?: ViewProps;
  keywordText?: ViewProps;
  keywordRemove?: ViewProps;
  placeholder?: ViewProps;
};

/**
 * Individual keyword interface
 */
export interface Keyword {
  id: string;
  value: string;
}

/**
 * Separator options for keyword input
 */
export type KeywordSeparator = 'enter' | 'comma' | 'space' | 'tab';
