import { Headings, Sizes, TextWeights } from './Label.type';

export interface LabelProps {
  /**
   * The text content
   */
  children: React.ReactNode;
  /**
   * Specify a heading html tag.
   */
  heading?: Headings;
  /**
   * If true, the text is styled in italic
   */
  isItalic?: boolean;
  /**
   * Marks up a text to indicate that it is no longer valid
   */
  isStriked?: boolean;
  /**
   * If true, it underline the text
   */
  isUnderlined?: boolean;
  /**
   * Changes the text-size
   */
  size?: Sizes | number;
  /**
   * Changes the font weight of the text
   */
  weight?: TextWeights;
  /**
   * Other properties
   */
  [x: string]: any;
}
