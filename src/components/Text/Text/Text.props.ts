import type { TextProps as TextAppProps } from 'app-studio';
import { Headings, Size, TextWeights } from './Text.type';
export interface TextProps
  extends Omit<TextAppProps, 'children' | 'style' | 'pointerEvents'> {
  children?: React.ReactNode;
  backgroundColor?: string;
  /**
   * Background color used to automatically compute a readable text color
   */
  bgColor?: string;
  heading?: Headings;
  isItalic?: boolean;
  isStriked?: boolean;
  isUnderlined?: boolean;
  isSub?: boolean;
  isSup?: boolean;
  maxLines?: number;
  size?: Size;
  weight?: TextWeights;
}
export interface ContentProps {
  children: React.ReactNode | string;
  isSub?: boolean;
  isSup?: boolean;
}
export interface TruncateTextProps {
  text: string;
  maxLines?: number;
}
