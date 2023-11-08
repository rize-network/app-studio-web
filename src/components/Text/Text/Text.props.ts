import { CSSProperties } from 'react';
import type { TextProps as TextAppProps } from 'app-studio';

import { Headings, Size, TextWeights } from './Text.type';

export interface TextProps
  extends Omit<TextAppProps, 'children' | 'style' | 'pointerEvents'>,
    CSSProperties {
  /**
   * The content of the text.
   */
  children: React.ReactNode;
  /**
   * Specifies the HTML heading tag to use.
   */
  heading?: Headings;
  /**
   * Determines whether the text should be displayed in italic style.
   */
  isItalic?: boolean;
  /**
   * Indicates that the text is no longer valid by applying a strikethrough style.
   */
  isStriked?: boolean;
  /**
   * Adds an underline to the text.
   */
  isUnderlined?: boolean;
  /**
   * Truncates the text and adds an ellipsis at the end if it exceeds the available space.
   */
  isTruncated?: boolean;
  /**
   * Displays the text slightly below the baseline of the surrounding text.
   */
  isSub?: boolean;
  /**
   * Displays the text slightly above the surrounding text.
   */
  isSup?: boolean;
  /**
   * The maximum number of lines to display when using text truncation.
   */
  maxLines?: number;
  /**
   * Adjusts the size of the text. Can be a predefined size or a custom number.
   */
  size?: Size;
  /**
   * Specifies the font weight of the text.
   */
  weight?: TextWeights;
  /**
   * Additional properties for customization and extension.
   */
  [x: string]: any;
}

export interface ContentProps {
  /**
   * The content to be rendered within the component.
   */
  children: React.ReactNode | string;

  /**
   * Optional prop indicating if the content should be displayed as a subtext.
   */
  isSub?: boolean;

  /**
   * Optional prop indicating if the content should be displayed as a supertext.
   */
  isSup?: boolean;
}

export interface TruncateTextProps {
  /**
   * The text to be truncated.
   */
  text: string;

  /**
   * The maximum number of lines to display before truncating the text.
   */
  maxLines?: number;
}
