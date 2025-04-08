import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikOTPInput } from '../Formik.OTPInput';
import { Vertical } from '../../Layout/Vertical/Vertical';
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
      {({ handleSubmit, ...props }) => (
        <FormikForm autoFocus>
          <Vertical gap={20}>
            <Text>Enter the verification code sent to your phone:</Text>
            <FormikOTPInput
              name="otpCode"
              label="Verification Code"
              helperText="Enter the 6-digit code"
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
      {({ handleSubmit, ...props }) => (
        <FormikForm>
          <Vertical gap={20}>
            <FormikOTPInput
              name="shortCode"
              length={4}
              shape="rounded"
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
            <Button type="submit" onClick={handleSubmit} isAuto>
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
