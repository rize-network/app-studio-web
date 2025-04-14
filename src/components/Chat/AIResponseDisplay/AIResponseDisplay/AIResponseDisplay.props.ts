/**
 * AIResponseDisplay Props
 *
 * Defines the properties for the AIResponseDisplay component, which renders
 * AI-generated content with support for formatting, code blocks, and more.
 */

import { ViewProps } from 'app-studio';
import { AIResponseDisplayStyles } from './AIResponseDisplay.type';

export interface AIResponseDisplayProps extends ViewProps {
  /**
   * Content to display - can include markdown-like formatting
   * such as code blocks, inline code, and links
   */
  content: string;

  /**
   * Whether to enable syntax highlighting for code blocks
   * @default true
   */
  enableSyntaxHighlighting?: boolean;

  /**
   * Whether to enable citations (e.g., [1], [2])
   * @default true
   */
  enableCitations?: boolean;

  /**
   * Whether to enable math rendering (LaTeX-like syntax)
   * @default false
   */
  enableMath?: boolean;

  /**
   * Whether to enable automatic link detection and formatting
   * @default true
   */
  enableLinkDetection?: boolean;

  /**
   * Custom styles for different parts of the component
   * Follows the design system with consistent spacing, typography, and colors
   */
  styles?: AIResponseDisplayStyles;
}
