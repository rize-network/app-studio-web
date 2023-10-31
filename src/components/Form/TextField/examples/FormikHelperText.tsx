import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'src/components';
import { TextField } from 'src/components';
import { Vertical } from 'src/components/Layout/Vertical/examples';

export const FormikHelperTextInput = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Vertical gap={10}>
            <Field
              as={TextField}
              name="firstName"
              placeholder="First Name"
              error={touched.firstName && errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              as={TextField}
              name="lastName"
              placeholder="Last Name"
              error={touched.lastName && errors.lastName}
              helperText={touched.lastName && errors.lastName}
              styles={{ helperText: { color: 'red', size: 'sm' } }}
            />
            <Button type="submit" isDisabled={isSubmitting}>
              Submit
            </Button>
          </Vertical>
        </Form>
      )}
    </Formik>
  );
};
