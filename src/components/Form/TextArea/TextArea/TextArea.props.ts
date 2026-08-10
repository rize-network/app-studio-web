import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import { Shape, Size, TextAreaStyles, Variant } from './TextArea.type';
// `onChange` is omitted from InputProps (where it is the DOM FormEventHandler)
// because TextArea re-declares it with value-first semantics — see the prop's
// own doc comment below.
// `onSubmit` is NOT omitted: it used to be shadowed by a value-first
// `(input: string) => void` that no view ever called, so passing it did
// nothing. The standard DOM handler is inherited and forwarded to the
// <textarea> like every other DOM prop.
export interface TextAreaProps
  extends Omit<InputProps, 'size' | 'shadow' | 'value' | 'onChange'> {
  defaultValue?: string;
  error?: boolean;
  // Whether the textarea accepts input (default `true`); `false` renders it
  // read-only.
  isEditable?: boolean;
  helperText?: string;
  id?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isAutoFocus?: boolean;
  label?: string;
  maxRows?: number;
  maxCols?: number;
  name?: string;
  placeholder?: string;
  /**
   * Called when the value changes, with the **value itself** — not the DOM
   * event. TextArea follows the value-first convention this package already
   * exposes through `onChangeText`, so there is no `event.target` to read:
   *
   *     onChange={(value) => setBody(value)}                   // ✅
   *     onChange={(e) => setBody(e.target.value)}              // ❌ compile error
   *
   * The parameter is deliberately typed `string` rather than `any`: a
   * DOM-shaped handler is an API mistake, and typing it makes that mistake a
   * compile error instead of a field that silently never updates.
   */
  onChange?: (value: string) => void;
  onChangeText?: (text: string) => void;
  /**
   * Called when the field loses focus, with the blur **event** (not the
   * value).
   */
  onBlur?: (event: any) => void;
  onFocus?: () => void;
  size?: Size;
  shadow?: Shadow | Elevation | ViewProps;
  shape?: Shape;
  views?: TextAreaStyles;
  value?: string | number;
  variant?: Variant;
  rows?: number;
  cols?: number;
  isRequired?: boolean;
  required?: boolean;
  labelProps?: any;
  // Optional callback ref to the underlying textarea/input node. Used by the
  // Formik focus chain (FormikForm autoFocus) to register the field. A plain
  // prop (not React `ref`) so fields that ignore it stay wireable.
  inputRef?: (node: { focus: () => void } | null) => void;
}
export interface TextAreaViewProps extends TextAreaProps {
  hint?: string;
  setHint?: (hint?: string) => void;
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
  value?: string | number;
  setValue?: (value: string) => void;
  isFocused?: boolean;
  setIsFocused?: (focused: boolean) => void;
}
