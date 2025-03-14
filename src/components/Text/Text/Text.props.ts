import { CSSProperties } from 'react';
import type { TextProps as TextAppProps } from 'app-studio';
import { Headings, Size, TextWeights } from './Text.type';
export interface TextProps
  extends Omit<TextAppProps, 'children' | 'style' | 'pointerEvents'>,
    CSSProperties {
  children: React.ReactNode;
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
