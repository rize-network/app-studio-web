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

export const useFormikInput = ({ name, type, ...props }: any) => {
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
    // if(props.onBlur)props.onBlur();
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

  return {
    ...getInputTypeProps(type),
    ...props,
    value,
    error,
    onBlur: handleBlur,
    onKeyPress: handleKeyPress,
    ...(isText ? { onChangeText } : { onChange }),
    ...(focus.active ? { handleKeyPress } : {}),
  };
};
