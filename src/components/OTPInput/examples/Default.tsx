import React, { useState } from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Text } from '../../Text/Text';
import { OTPInput } from '../OTPInput';

export const DefaultOTPInput = () => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Entered OTP: ${otp}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={20}>
        <Text>Enter verification code:</Text>
        <OTPInput
          name="otp"
          value={otp}
          onChange={setOtp}
          isAutoFocus
        />
        <Button type="submit" isAuto>
          Verify
        </Button>
      </Vertical>
    </form>
  );
};

export const CustomizedOTPInput = () => {
  const [otp, setOtp] = useState('');

  return (
    <Vertical gap={20}>
      <Text>Custom OTP Input:</Text>
      <OTPInput
        name="customOtp"
        value={otp}
        onChange={setOtp}
        length={4}
        shape="pillShaped"
        variant="outline"
        size="lg"
        gap={12}
        shadow={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px' }}
        views={{
          box: {
            borderColor: 'theme.primary',
            backgroundColor: 'color.gray.50',
          },
          input: {
            color: 'theme.primary',
            fontWeight: 'bold',
          },
        }}
      />
    </Vertical>
  );
};

export const OTPInputWithLabel = () => {
  const [otp, setOtp] = useState('');

  return (
    <Vertical gap={20}>
      <OTPInput
        name="labeledOtp"
        label="Verification Code"
        helperText="Enter the 6-digit code sent to your phone"
        value={otp}
        onChange={setOtp}
      />
    </Vertical>
  );
};
