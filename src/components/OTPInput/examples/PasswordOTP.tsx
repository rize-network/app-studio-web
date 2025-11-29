import React, { useState } from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { OTPInput } from '../OTPInput';

export const PasswordOTPInput = () => {
  const [otp, setOtp] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = (value: string) => {
    setIsComplete(true);
    console.log('OTP completed:', value);
  };

  const resetOTP = () => {
    setOtp('');
    setIsComplete(false);
  };

  return (
    <Vertical gap={20}>
      <Text>Secure PIN Entry (Password Type):</Text>
      <OTPInput
        id="passwordOtpPin"
        name="securePin"
        value={otp}
        onChange={setOtp}
        length={4}
        type="password"
        onComplete={handleComplete}
        isAutoFocus
      />
      {isComplete && <Text color="theme.success">PIN entry complete!</Text>}
      <Horizontal gap={10}>
        <Button onClick={resetOTP} isAuto variant="outline">
          Reset
        </Button>
      </Horizontal>
    </Vertical>
  );
};

export const OnCompleteODemo = () => {
  const [otp, setOtp] = useState('');
  const [completedValue, setCompletedValue] = useState('');

  const handleComplete = (value: string) => {
    setCompletedValue(value);
  };

  return (
    <Vertical gap={20}>
      <Text>OTP with Completion Callback:</Text>
      <OTPInput
        name="completionOtp"
        value={otp}
        onChange={setOtp}
        onComplete={handleComplete}
        length={6}
      />
      {completedValue && <Text>Completed OTP: {completedValue}</Text>}
    </Vertical>
  );
};
