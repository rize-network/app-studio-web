import React from 'react';
import { OTPInputProps } from './OTPInput/OTPInput.props';
import { useOTPInputState } from './OTPInput/OTPInput.state';
import OTPInputView from './OTPInput/OTPInput.view';

const normalizeDisplayValue = (value: unknown) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') {
    const text = String(value);
    return text === '[object Object]' ? '' : text;
  }
  return '';
};

const logOTPInput = (message: string, payload: Record<string, unknown>) => {
  console.log(`[OTPInput] ${message}`, payload);
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

// This file defines the main OTPInput component, responsible for orchestrating the state management (using `useOTPInputState`) and rendering the visual representation of the OTP input field (via `OTPInputView`). It acts as a container, passing all necessary props and state variables to its view component.
const OTPInputComponent: React.FC<OTPInputProps> = (props: OTPInputProps) => {
  const { value: controlledValue } = props;
  const {
    value,
    setValue,
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
    handleChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handlePaste,
    handleKeyPress,
  } = useOTPInputState(props);
  const rawDisplayValue =
    controlledValue !== undefined ? controlledValue : value;
  const displayValue = normalizeDisplayValue(rawDisplayValue);
  logOTPInput('render', {
    name: props.name,
    controlledValue: summarizeValue(controlledValue),
    internalValue: summarizeValue(value),
    displayValue,
    length: props.length || 6,
    hasOnChange: !!props.onChange,
    hasOnChangeText: !!props.onChangeText,
  });
  return (
    <OTPInputView
      {...props}
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
      handleKeyPress={handleKeyPress}
      handlePaste={handlePaste}
      stepValues={props.stepValues}
    />
  );
};
export const OTPInput = OTPInputComponent;
