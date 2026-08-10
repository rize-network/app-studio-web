import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { SelectStyles, Shape, Size, Variant, Option } from './Select.type';
// Defines the interface for Select component properties, extending from InputProps but omitting 'size'.
// `value`/`defaultValue` are re-declared rather than inherited: `InputProps`
// types them after `HTMLInputElement`, where both are plain strings, and a
// multi-select has to be able to carry an array.
export interface SelectProps
  extends Omit<
    InputProps,
    'size' | 'shadow' | 'value' | 'defaultValue' | 'onChange'
  > {
  // Optional string identifier for the select element
  id?: string;
  // Flag to indicate if the select has an error state
  error?: boolean;
  // Name attribute for the select element, useful for form submission
  name?: string;
  // Label text associated with the select element
  label?: string;
  // Helper text that appears below the select box
  helperText?: string;
  // Placeholder text shown when the select is empty
  placeholder?: string;
  // Array of options that the user can choose from
  options: Option[];
  // Selected option value(s). Supplying it puts the select in controlled mode:
  // the displayed selection follows this prop and never moves on its own — the
  // component reports every change through `onChange` and waits for the parent
  // to pass the next value back down.
  value?: string | Array<string>;
  // Initial selection for uncontrolled use. Read once, on mount; ignored
  // entirely when `value` is supplied.
  defaultValue?: string | Array<string>;
  // Boolean to allow multi-selection
  isMulti?: boolean;
  // Boolean to set the select as read-only, preventing user modification
  isReadOnly?: boolean;
  // Boolean to disable the select element
  isDisabled?: boolean;
  // Boolean indicating the field is required for form submission
  isRequired?: boolean;
  // Boolean to autofocus the select when it mounts
  isAutoFocus?: boolean;
  /**
   * Called with the next selection whenever it changes: the chosen option's
   * value for a single select, the full array of selected values when
   * `isMulti`. It has to be the *next* selection rather than the option that
   * was just touched, otherwise a controlled parent has nothing to store.
   *
   * It is always the **value**, never the DOM event — `e.target.value` is a
   * compile error. The parameter is typed rather than left `any` so a
   * DOM-shaped handler fails to build instead of failing silently at runtime.
   *
   * Declared with method syntax on purpose. Method parameters are compared
   * bivariantly, so a single-select caller can still pass a plain
   * `(value: string) => void` (arrays only ever occur when `isMulti`) while a
   * `(e: ChangeEvent) => void` stays rejected — an event is unrelated to
   * `string | string[]` in both directions. Writing this as a property would
   * force every single-select consumer to narrow a union that their Select
   * can never produce.
   */
  onChange?(value: string | string[]): void;
  // Determines the overall shape of the select box, e.g., rounded or square edges
  shape?: Shape;
  // Defines the styling variant for the select component
  variant?: Variant;
  // Custom styles that can be applied to the select component
  views?: SelectStyles;
  // Defines the size of the component
  size?: Size;
  // Determines the shadow property of the select component
  shadow?: Shadow | Elevation | ViewProps;
  // Boolean to control whether the select options are scrollable
  isScrollable?: boolean;
}
export interface SelectViewProps extends SelectProps {
  value: string | Array<string>;
  setValue: (value: string | string[]) => void;
  hide: boolean;
  setHide: (hide: boolean) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  highlightedIndex?: number;
  setHighlightedIndex?: (index: number) => void;
}
export interface SelectBoxProps {
  options: Option[];
  value?: string | Array<string>;
  isDisabled?: boolean;
  placeholder?: string;
  removeOption?: (value: string) => void;
  views?: SelectStyles;
  size?: Size;
}
export interface MultiSelectProps extends Omit<InputProps, 'size'> {
  option: string;
  removeOption: (value: string) => void;
  size?: Size;
}
export interface ItemProps extends Omit<InputProps, 'size' | 'style'> {
  callback?: (option: string) => void;
  option: Option;
  size?: Size;
  style?: ViewProps;
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
}
export interface HiddenSelectProps
  extends Omit<InputProps, 'size' | 'value' | 'onChange'> {
  id?: string;
  name?: string;
  value: string | Array<string>;
  isMulti?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  // Receives the same value-first argument as SelectProps.onChange — the
  // hidden <select> normalises its DOM event before forwarding.
  onChange?(value: string | string[]): void;
  options: Option[];
}
export interface DropDownProps extends Omit<InputProps, 'size'> {
  size?: Size;
  callback?: (option: string) => void;
  options: Option[];
  views?: SelectStyles;
  highlightedIndex?: number;
  setHighlightedIndex?: (index: number) => void;
}
