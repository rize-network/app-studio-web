import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikOTPInput } from '../Formik.OTPInput';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from '../../Text/Text';

export const FormikOTPInputExample = () => {
  const initialValues = {
    otpCode: '',
  };

  const validationSchema = Yup.object().shape({
    otpCode: Yup.string()
      .required('Verification code is required')
      .matches(/^[0-9]+$/, 'Code must contain only digits')
      .length(6, 'Code must be exactly 6 digits'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    alert(`Verification code submitted: ${values.otpCode}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <FormikForm autoFocus>
          <Vertical gap={20}>
            <Text>Enter the verification code sent to your phone:</Text>
            <FormikOTPInput
              name="otpCode"
              label="Verification Code"
              helperText="Enter the 6-digit code"
              size="lg"
              isAutoFocus
            />
            <Button type="submit" onClick={handleSubmit} isAuto>
              Verify
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};

export const FormikCustomOTPInputExample = () => {
  const initialValues = {
    shortCode: '',
  };

  const validationSchema = Yup.object().shape({
    shortCode: Yup.string()
      .required('Code is required')
      .matches(/^[0-9]+$/, 'Code must contain only digits')
      .length(4, 'Code must be exactly 4 digits'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={console.log}
    >
      {({ handleSubmit }) => (
        <FormikForm>
          <Vertical gap={20}>
            <FormikOTPInput
              name="shortCode"
              length={4}
              shape="rounded"
              variant="outline"
              size="xl"
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
            <Button type="submit" onClick={handleSubmit} isAuto>
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};

export const FormikPasswordOTPExample = () => {
  const initialValues = {
    securePin: '',
  };

  const validationSchema = Yup.object().shape({
    securePin: Yup.string()
      .required('PIN is required')
      .matches(/^[0-9]+$/, 'PIN must contain only digits')
      .length(4, 'PIN must be exactly 4 digits'),
  });

  const handleComplete = (value: string) => {
    alert(`PIN entry complete: ${value}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={console.log}
    >
      {({ handleSubmit }) => (
        <FormikForm>
          <Vertical gap={20}>
            <Text>Secure PIN Entry:</Text>
            <FormikOTPInput
              name="securePin"
              length={4}
              type="password"
              size="lg"
              onComplete={handleComplete}
              isAutoFocus
            />
            <Button type="submit" onClick={handleSubmit} isAuto>
              Verify PIN
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};

export const FormikStepValuesOTPExample = () => {
  const initialValues = {
    pinCode: '',
  };

  const validationSchema = Yup.object().shape({
    pinCode: Yup.string()
      .required('PIN code is required')
      .matches(/^[0-9]+$/, 'PIN must contain only digits')
      .length(4, 'PIN must be exactly 4 digits'),
  });

  // Define specific values that the OTP can take
  const stepValues = [1234, 2468, 3579, 5678, 9876];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => alert(`Selected PIN: ${values.pinCode}`)}
    >
      {({ handleSubmit }) => (
        <FormikForm>
          <Vertical gap={20}>
            <Text>Step-based PIN Entry:</Text>
            <FormikOTPInput
              name="pinCode"
              length={4}
              stepValues={stepValues}
              shape="rounded"
              variant="outline"
              size="lg"
              gap={12}
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

            <Horizontal justifyContent="space-between" width="100%">
              {stepValues.map((step) => (
                <Text key={step} fontSize={14} color="color.blueGray.500">
                  {step}
                </Text>
              ))}
            </Horizontal>

            <Text fontSize={14} color="color.gray.600">
              This PIN input will snap to the closest value from the predefined
              set
            </Text>

            <Button type="submit" onClick={handleSubmit} isAuto>
              Submit PIN
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
