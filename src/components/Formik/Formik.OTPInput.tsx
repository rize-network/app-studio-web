import React, { useCallback } from 'react';
import { OTPInputProps } from '../OTPInput/OTPInput/OTPInput.props';
import { useOTPInputState } from '../OTPInput/OTPInput/OTPInput.state';
import OTPInputView from '../OTPInput/OTPInput/OTPInput.view';
import { useFormikInput } from './Formik.Hook';

const normalizeDisplayValue = (value: unknown) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') {
    const text = String(value);
    return text === '[object Object]' ? '' : text;
  }
  return '';
};

const logFormikOTPInput = (
  message: string,
  payload: Record<string, unknown>
) => {
  console.log(`[FormikOTPInput] ${message}`, payload);
};

const summarizeValue = (value: unknown) => {
  if (value === null || value === undefined) return value;
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }
  return Object.prototype.toString.call(value);
};

/**
 * FormikOTPInput component for entering one-time passwords or verification codes
 * with Formik integration for form state management.
 */
const OTPInputComponent: React.FC<OTPInputProps> = (props: OTPInputProps) => {
  // Get Formik integration props
  const formProps = useFormikInput(props);
  const displayValue = normalizeDisplayValue(formProps.value).slice(
    0,
    props.length || 6
  );
  logFormikOTPInput('render', {
    name: props.name,
    type: props.type,
    formValue: summarizeValue(formProps.value),
    displayValue,
    length: props.length || 6,
    hasFormikOnChange: !!formProps.onChange,
    hasFormikOnChangeText: !!formProps.onChangeText,
  });

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
      const nextValue = normalizeDisplayValue(value).slice(
        0,
        props.length || 6
      );
      logFormikOTPInput('setValue', {
        name: props.name,
        incomingValue: value,
        nextValue,
        hasFormikOnChange: !!formProps.onChange,
        hasFormikOnChangeText: !!formProps.onChangeText,
      });

      if (formProps.onChange) {
        formProps.onChange(nextValue);
      }

      if (formProps.onChangeText) {
        formProps.onChangeText(nextValue);
      }

      // If onComplete is provided and the value is complete, call it
      if (props.onComplete && nextValue.length === (props.length || 6)) {
        props.onComplete(nextValue);
      }

      // Ensure the input field value is updated directly
      if (inputRef.current) {
        inputRef.current.value = nextValue;
      }
    },
    [formProps, props, inputRef]
  );

  // Handle input changes. Web passes a ChangeEvent; React Native's OTPInput
  // view passes the raw string (onChangeText). Normalize so `.slice` never
  // hits `undefined.value`.
  const handleChange = useCallback(
    (e: any) => {
      const raw =
        typeof e === 'string'
          ? e
          : e?.currentTarget?.value ??
            e?.target?.value ??
            e?.nativeEvent?.text ??
            '';
      const newValue = String(raw).slice(0, props.length || 6);
      logFormikOTPInput('handleChange normalized', {
        name: props.name,
        raw,
        newValue,
      });
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
      value={displayValue}
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
