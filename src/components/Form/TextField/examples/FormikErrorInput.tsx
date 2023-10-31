import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from '../../..';
import { TextField } from '../../..';
import { Vertical } from '../../../Layout/Vertical/examples';

export const FormikErrorInput = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
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
              colorScheme="theme.secondary"
            />
            <Field
              as={TextField}
              name="lastName"
              placeholder="Last Name"
              colorScheme="theme.secondary"
              error={touched.lastName && errors.lastName}
            />
            <Field
              type="email"
              as={TextField}
              name="email"
              placeholder="Email"
              colorScheme="theme.secondary"
              error={touched.email && errors.email}
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
