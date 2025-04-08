import React from 'react';
import { OTPInputProps } from './OTPInput/OTPInput.props';
import { useOTPInputState } from './OTPInput/OTPInput.state';
import OTPInputView from './OTPInput/OTPInput.view';

/**
 * OTPInput component for entering one-time passwords or verification codes.
 * Provides multiple input fields for entering digits with auto-focus functionality.
 */
const OTPInputComponent: React.FC<OTPInputProps> = (props: OTPInputProps) => {
  const {
    value,
    setValue,
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    setInputRef,
    focusInput,
  } = useOTPInputState(props);

  return (
    <OTPInputView
      {...props}
      value={value}
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

export const OTPInput = OTPInputComponent;
