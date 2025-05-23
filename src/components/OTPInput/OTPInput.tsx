import React from 'react';
import { OTPInputProps } from './OTPInput/OTPInput.props';
import { useOTPInputState } from './OTPInput/OTPInput.state';
import OTPInputView from './OTPInput/OTPInput.view';

/**
 * OTPInput component for entering one-time passwords or verification codes.
 * Provides multiple input fields for entering digits with auto-focus functionality.
 * Supports step-based input and improved accessibility.
 */
const OTPInputComponent: React.FC<OTPInputProps> = (props: OTPInputProps) => {
  // Extract the controlled value from props if it exists
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

  // Use the controlled value if it exists, otherwise use the internal state value
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
