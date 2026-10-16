import React from 'react';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import { Shape, Size, TextFieldStyles, Variant } from './TextField.type';
// The TextFieldProps interface extends InputProps and customizes the TextField
// component. `onChange` is omitted from InputProps (where it is the DOM
// FormEventHandler) because TextField re-declares it with value-first
// semantics — see the prop's own doc comment below.
export interface TextFieldProps
  extends Omit<InputProps, 'size' | 'shadow' | 'left' | 'right' | 'onChange'> {
  // Optional unique identifier for the TextField.
  id?: string;
  // Optional property for error handling within the TextField.
  error?: any;
  // Optional helper text that appears below the TextField.
  helperText?: string;
  // Optional name attribute for the TextField, useful for form submission.
  name?: string;
  // Optional label text for the TextField to indicate the field's purpose.
  label?: string;
  // Optional React node to be rendered on the left side of the TextField.
  left?: React.ReactNode;
  // Optional React node to be rendered on the right side of the TextField.
  right?: React.ReactNode;
  // Optional placeholder text shown inside the TextField when empty.
  placeholder?: string;
  // Optional flag to set the TextField as read-only.
  isReadOnly?: boolean;
  // Optional flag to indicate whether the TextField is disabled.
  isDisabled?: boolean;
  // Optional flag that when true allows the TextField to be cleared.
  isClearable?: boolean;
  // Optional flag to autofocus the TextField when it mounts.
  isAutoFocus?: boolean;
  // Optional flag indicating the field is required for form submission.
  isRequired?: boolean;
  // Optional flag indicating the field is required (HTML attribute alias).
  required?: boolean;
  // Optional adornment rendered at the right edge of the field.
  rightIcon?: React.ReactNode;
  // Optional adornment rendered at the left edge of the field.
  leftIcon?: React.ReactNode;
  // Optional ViewProps applied to the field's label element.
  labelProps?: any;
  /**
   * Called when the value changes, with the **value itself** — not the DOM
   * event. TextField follows the value-first convention this package already
   * exposes through `onChangeText`, so there is no `event.target` to read:
   *
   *     onChange={(value) => setQuery(value)}                  // ✅
   *     onChange={(e) => setQuery(e.target.value)}             // ❌ compile error
   *
   * The parameter is deliberately typed `string` rather than `any`: a
   * DOM-shaped handler is an API mistake, and typing it makes that mistake a
   * compile error instead of an input that silently never updates. If you
   * need the event, use `onChangeText` for the value and reach for the native
   * `<input>` through `inputRef`.
   */
  onChange?: (value: string) => void;
  // Optional callback function that is called when the text in the TextField changes.
  onChangeText?: (value: string) => void;
  /**
   * Called when the field loses focus, with the blur **event** (not the
   * value). Clearing the field via the clear button synthesises a minimal
   * `{ target: { name } }` so form libraries can mark the field touched.
   */
  onBlur?: (event: any) => void;
  // Optional callback function that is called when the TextField is clicked.
  onClick?: () => void;
  // Optional callback function that is called when the TextField gains focus.
  onFocus?: () => void;
  // Optional Size enum to specify the size of the TextField.
  size?: Size;
  // Optional shadow property that could be of type Shadow, Elevation, or CSSProperties to give depth effect.
  shadow?: Shadow | Elevation | ViewProps;
  // Optional Shape enum to specify the shape of the TextField's corners.
  shape?: Shape;
  // Optional custom styles to apply to the TextField component.
  views?: TextFieldStyles;
  // Optional controlled value of the TextField, driving its current state.
  value?: string;
  // Optional Variant enum to specify the variant of the TextField component.
  variant?: Variant;
  // Optional flag to render the field as a multiline TextArea-style input.
  isMultiline?: boolean;
  // Optional number of rows when rendered in multiline mode.
  rows?: number;
  // Optional callback ref to the underlying input node. Used by the Formik
  // focus chain (FormikForm autoFocus) to register the field so Return/Next
  // can move focus to it. A plain prop (not React `ref`) so non-text fields
  // that ignore it stay wireable without ref warnings.
  inputRef?: (node: { focus: () => void } | null) => void;
}
// The TextFieldViewProps interface extends TextFieldProps and adds props specific to the view-layer customization of the component.
export interface TextFieldViewProps extends TextFieldProps {
  // Optional property to give hints to the user about how to fill in the TextField.
  hint?: string;
  // Optional function that allows changing the hint text.
  setHint?: (hint?: string) => void;
  // Optional property indicating whether the TextField is currently focused.
  isFocused?: boolean;
  // Optional function to update the focused state of the TextField.
  setIsFocused?: (focused: boolean) => void;
  // Optional property indicating whether the TextField is currently hovered by the mouse cursor.
  isHovered?: boolean;
  // Optional function to update the hovered state of the TextField.
  setIsHovered?: (hovered: boolean) => void;
  // Optional controlled value of the TextField, potentially used in a state management context.
  value?: string;
  // Optional function to programmatically set the value of the TextField.
  setValue?: (value: string) => void;
  // Theme mode override (light/dark).
}
