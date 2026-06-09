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
  htmlFor?: string;
  // Optional `htmlFor` prop forwarded to the underlying <label> element.
  dropDown?: ViewProps;
  // Optional dropdown styling passed through by parent fields (TextField, ColorInput, etc.).
  error?: boolean;
  // Optional `error` flag forwarded by parent fields via `views?.label` spread.
  isDisabled?: boolean;
  // Optional `isDisabled` flag forwarded by parent fields via `views?.label` spread.
  helperText?: React.ReactNode;
  // Optional helper text passed through by parent fields.
  views?: ViewProps;
  // Optional `views` style overrides forwarded by parent fields (TextField,
  // ColorInput, …) when they spread `views?.label`.
}
