import React from 'react';
import { useFormikContext, FormikValues, getIn } from 'formik';

import { useFormFocus } from './Formik.Form';

const getInputTypeProps = (type: string) => {
  switch (type) {
    case 'email':
      return {
        autoCorrect: 'off',
        // keyboardType: 'email-address',
        inputMode: 'email',
        autoCapitalize: 'none',
      };
    case 'password':
      return {
        autoCorrect: 'off',
        secureTextEntry: true,
        autoCapitalize: 'none',
      };
    case 'digits':
      return {
        // keyboardType: 'phone-pad',
        inputMode: 'tel',
      };
    case 'numeric':
      return {
        // keyboardType: 'phone-pad',
        inputMode: 'numeric',
      };
    case 'name':
      return {
        autoCorrect: 'off',
      };
    default:
      return {};
  }
};
interface FormikInputOptions {
  // Opt the field into the keyboard focus chain (Return/Next moves to the next
  // field, last field submits). Only single-line text inputs set this — a
  // TextArea must keep Enter for newlines, and non-text controls have no
  // focusable text node to register.
  focusable?: boolean;
}

export const useFormikInput = (
  { name, type, ...props }: any,
  options: FormikInputOptions = {}
) => {
  const focus = useFormFocus();
  const {
    touched,
    errors,
    submitCount,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext<FormikValues>();

  const onChangeText = (text: string) => {
    setFieldValue(name, text);
    props.onChangeText?.(text);
  };

  const onChange = (value: any) => {
    setFieldValue(name, value);
    props.onChange?.(value);
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      focus.focusNextInput(name);
    }
  };

  const isText = ['text', 'password', 'email', 'digits'].includes(type);
  const error =
    getIn(touched, name) || submitCount > 0 ? getIn(errors, name) : undefined;
  const value = getIn(values, name);

  // app-studio runs on the web when the DOM is real. The RN entry ships a
  // `document` shim that deliberately omits `createElement`, so this same
  // check is how the rest of the library distinguishes web from native.
  const isWeb =
    typeof document !== 'undefined' &&
    typeof (document as any).createElement === 'function';

  // When the parent <FormikForm autoFocus> is active, wire the input into the
  // focus chain. On web we advance on Enter (`onKeyPress`); on native we use
  // the TextInput contract (`returnKeyType` + `onSubmitEditing`, with
  // `blurOnSubmit: false` so focus can hop to the next field without the
  // keyboard flickering). `inputRef` (a plain prop, not React `ref`) registers
  // the focusable node so the chain can call `.focus()` on the next field;
  // non-text views that ignore `inputRef` are simply skipped.
  const inFocusChain = !!options.focusable && focus.active;
  const focusProps = inFocusChain
    ? isWeb
      ? { onKeyPress: handleKeyPress }
      : {
          returnKeyType: focus.getReturnKeyType(name),
          onSubmitEditing: () => focus.handleSubmitEditing(name),
          blurOnSubmit: false,
        }
    : {};

  return {
    ...getInputTypeProps(type),
    ...props,
    value,
    error,
    onBlur: handleBlur,
    ...(isText ? { onChangeText } : { onChange }),
    ...focusProps,
    ...(inFocusChain
      ? { inputRef: (node: any) => focus.setInputRef(name, node) }
      : {}),
  };
};
