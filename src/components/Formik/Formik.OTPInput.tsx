import React, { useCallback } from 'react';
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
    inputRef,
    containerRef,
    mirrorSelectionStart,
    mirrorSelectionEnd,
    setMirrorSelectionStart,
    setMirrorSelectionEnd,
    setInputRef,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handlePaste,
  } = useOTPInputState(props);

  // Handle value changes through Formik
  const setValue = useCallback(
    (value: string) => {
      if (formProps.onChange) {
        formProps.onChange(value);
      }

      // If onComplete is provided and the value is complete, call it
      if (props.onComplete && value.length === (props.length || 6)) {
        props.onComplete(value);
      }

      // Ensure the input field value is updated directly
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    },
    [formProps, props, inputRef]
  );

  // Handle input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value.slice(0, props.length || 6);
      setValue(newValue);

      // Ensure the input field value is updated directly
      if (inputRef.current) {
        inputRef.current.value = newValue;
      }
    },
    [props.length, setValue, inputRef]
  );

  return (
    <OTPInputView
      {...props}
      {...formProps}
      setValue={setValue}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      inputRef={inputRef}
      containerRef={containerRef}
      mirrorSelectionStart={mirrorSelectionStart}
      mirrorSelectionEnd={mirrorSelectionEnd}
      setMirrorSelectionStart={setMirrorSelectionStart}
      setMirrorSelectionEnd={setMirrorSelectionEnd}
      setInputRef={setInputRef}
      handleChange={handleChange}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handlePaste={handlePaste}
      stepValues={props.stepValues}
    />
  );
};

/**
 * OTPInput component for entering one-time passwords or verification codes with Formik integration.
 * Provides multiple input fields for entering digits with auto-focus functionality.
 * Supports step-based input and improved accessibility.
 */
export const FormikOTPInput = OTPInputComponent;
