/**
 * AIResponseDisplay Types
 *
 * Defines the types used by the AIResponseDisplay component
 */

import { ViewProps } from 'app-studio';

/**
 * Styles for different parts of the AIResponseDisplay component
 */
export interface AIResponseDisplayStyles {
  /** Styles for the main container */
  container?: ViewProps;

  /** Styles for the text content */
  text?: ViewProps;

  /** Styles for code blocks */
  codeBlock?: ViewProps;

  /** Styles for citations */
  citation?: ViewProps;

  /** Styles for inline code */
  inlineCode?: ViewProps;

  /** Styles for links */
  link?: ViewProps;
}
