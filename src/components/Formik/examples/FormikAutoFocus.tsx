import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Vertical, Text } from 'app-studio';
import { FormikForm } from '../Formik.Form';
import { FormikTextField } from '../Formik.TextField';
import { FormikPassword } from '../Formik.Password';

/**
 * Demonstrates the cross-platform focus chain. With `autoFocus`, pressing
 * Return / Next advances to the next field and submits on the last one —
 * identically on web (Enter) and native (returnKeyType + onSubmitEditing).
 */
export const FormikAutoFocusExample = () => {
  const initialValues = { firstName: '', lastName: '', password: '' };
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => setSubmitted(JSON.stringify(values))}
    >
      {({ handleSubmit }) => (
        <FormikForm autoFocus initFocus="firstName">
          <Vertical gap={12} maxWidth={360}>
            <Text>Press Enter/Next to move through the fields.</Text>
            <FormikTextField name="firstName" label="First name" />
            <FormikTextField name="lastName" label="Last name" />
            <FormikPassword name="password" label="Password" />
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            {submitted && (
              <Text color="color-green-600">Submitted: {submitted}</Text>
            )}
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
