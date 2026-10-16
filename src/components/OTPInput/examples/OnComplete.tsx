import React, { useState } from 'react';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { OTPInput } from '../OTPInput';

export const OnCompleteDemo = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleComplete = (value: string) => {
    setMessage(`OTP completed: ${value}`);
  };

  return (
    <Vertical gap={20}>
      <Text>Enter OTP (auto-submits when complete):</Text>
      <OTPInput
        name="completeOtp"
        value={otp}
        onChange={setOtp}
        onComplete={handleComplete}
        isAutoFocus
      />
      {message && (
        <Text color="theme-success" fontWeight="medium">
          {message}
        </Text>
      )}
    </Vertical>
  );
};
