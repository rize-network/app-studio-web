import React from 'react';
import { OTPInputProps } from '../OTPInput/OTPInput/OTPInput.props';
import { useOTPInputState } from '../OTPInput/OTPInput/OTPInput.state';
import OTPInputView from '../OTPInput/OTPInput/OTPInput.view';
import { useFormikInput } from './Formik.Hook';

/**
 * FormikOTPInput component for entering one-time passwords or verification codes
 * with Formik integration for form state management.
 */
const OTPInputComponent: React.FC<OTPInputProps> = (props: OTPInputProps) => {
  // Get Formik integration props
  const formProps = useFormikInput(props);

  // Get OTP input state
  const {
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    setInputRef,
    focusInput,
  } = useOTPInputState(props);

  // Handle value changes through Formik
  const setValue = (value: string) => {
    if (formProps.onChange) {
      formProps.onChange(value);
    }
  };

  return (
    <OTPInputView
      {...props}
      {...formProps}
      setValue={setValue}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      setInputRef={setInputRef}
      focusInput={focusInput}
    />
  );
};

/**
 * OTPInput component for entering one-time passwords or verification codes with Formik integration.
 * Provides multiple input fields for entering digits with auto-focus functionality.
 */
export const FormikOTPInput = OTPInputComponent;
