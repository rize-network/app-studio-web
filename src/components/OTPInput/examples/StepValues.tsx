import React, { useState } from 'react';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { OTPInput } from '../OTPInput';

export const StepValuesOTPInput = () => {
  const [otp, setOtp] = useState('');

  // Define specific values that the OTP can take
  const stepValues = [1234, 2468, 3579, 5678, 9876];

  return (
    <Vertical gap={20}>
      <Text>Step-based OTP Input:</Text>
      <OTPInput
        name="stepOtp"
        value={otp}
        onChange={setOtp}
        length={4}
        stepValues={stepValues}
        shape="rounded"
        variant="outline"
        size="lg"
        gap={12}
        views={{
          container: {
            borderColor: 'theme-primary',
            backgroundColor: 'color-gray-50',
          },
          input: {
            color: 'theme-primary',
            fontWeight: 'bold',
          },
        }}
      />

      <Horizontal justifyContent="space-between" width="100%">
        {stepValues.map((step) => (
          <Text key={step} fontSize={14} color="color-blueGray-500">
            {step}
          </Text>
        ))}
      </Horizontal>

      <Text fontSize={14} color="color-gray-600">
        This OTP input will snap to the closest value from:{' '}
        {stepValues.join(', ')}
      </Text>
    </Vertical>
  );
};

export const FormikStepValuesOTPInput = () => {
  // This would be implemented in the Formik examples file
  return null;
};
