import { ViewProps } from 'app-studio';
import { Headings, Sizes, TextWeights } from './Label.type';
export interface LabelProps extends Omit<ViewProps, 'size'> {
  // Define an interface called `LabelProps` to type-check the props that can be passed to Label component.
  children: React.ReactNode;
  // Declare `children` prop, which is of type `React.ReactNode` to accept any element that can be rendered by React, like a string, number, or JSX.
  heading?: Headings;
  // Optional `heading` prop allowing to specify the heading level, which should be one of the predefined `Headings` type.
  isItalic?: boolean;
  // Optional `isItalic` boolean prop to determine if the label text should be italicized.
  isStriked?: boolean;
  // Optional `isStriked` boolean prop to determine if the label text should have a strikethrough.
  isUnderlined?: boolean;
  // Optional `isUnderlined` boolean prop to determine if the label text should be underlined.
  size?: Sizes | number;
  // Optional `size` prop that can either be one of the predefined `Sizes` type or a custom `number` size value.
  weight?: TextWeights;
  // Optional `weight` prop that defines the font weight of the label using the predefined `TextWeights` type.

  // Use index signature to allow any additional properties with `string` keys and values of `any` type, adding flexibility to the `LabelProps` interface.
}
