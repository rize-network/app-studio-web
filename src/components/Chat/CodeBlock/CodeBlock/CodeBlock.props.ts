/**
 * CodeBlock Props
 */

import { ViewProps } from 'app-studio';
import { CodeBlockStyles } from './CodeBlock.type';

export interface CodeBlockProps extends ViewProps {
  /**
   * Code content to display
   */
  code: string;

  /**
   * Programming language for syntax highlighting
   */
  language?: string;

  /**
   * Whether to show line numbers
   */
  showLineNumbers?: boolean;

  /**
   * Whether to enable syntax highlighting
   */
  enableSyntaxHighlighting?: boolean;

  /**
   * Whether to show a copy button
   */
  showCopyButton?: boolean;

  /**
   * Whether to show the language label
   */
  showLanguageLabel?: boolean;

  /**
   * Custom styles for the component
   */
  styles?: CodeBlockStyles;
}
