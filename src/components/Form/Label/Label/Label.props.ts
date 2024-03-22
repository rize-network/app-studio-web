import { Headings, Sizes, TextWeights } from './Label.type';
export interface LabelProps {
  children: React.ReactNode;
  heading?: Headings;
  isItalic?: boolean;
  isStriked?: boolean;
  isUnderlined?: boolean;
  size?: Sizes | number;
  weight?: TextWeights;
  [x: string]: any;
}
