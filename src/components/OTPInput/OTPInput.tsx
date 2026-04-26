import React from 'react';
import { OTPInputProps } from './OTPInput/OTPInput.props';
import { useOTPInputState } from './OTPInput/OTPInput.state';
import OTPInputView from './OTPInput/OTPInput.view';
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
  const displayValue = controlledValue !== undefined ? controlledValue : value;
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
