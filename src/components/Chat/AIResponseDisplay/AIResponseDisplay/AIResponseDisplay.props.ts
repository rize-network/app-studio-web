/**
 * AIResponseDisplay Props
 */

import { ViewProps } from 'app-studio';
import { AIResponseDisplayStyles } from './AIResponseDisplay.type';

export interface AIResponseDisplayProps extends ViewProps {
  /**
   * Content to display
   */
  content: string;

  /**
   * Whether to enable syntax highlighting for code blocks
   */
  enableSyntaxHighlighting?: boolean;

  /**
   * Whether to enable citations
   */
  enableCitations?: boolean;

  /**
   * Whether to enable math rendering
   */
  enableMath?: boolean;

  /**
   * Whether to enable automatic link detection
   */
  enableLinkDetection?: boolean;

  /**
   * Custom styles for the component
   */
  styles?: AIResponseDisplayStyles;
}
