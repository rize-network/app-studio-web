import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from '../../../Button/Button';

import { TextField } from '../../../Form/TextField/TextField';
import { Password } from '../../../Form/Password/Password';

import { Vertical } from '../../../Layout/Vertical/Vertical';

export const FormikErrorPassword = () => {
  const initialValues = {
    name: '',
    password: '',
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
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
              name="name"
              label="Name"
              error={touched.name && errors.name}
              colorScheme="theme.secondary"
            />
            <Field
              as={Password}
              name="password"
              label="Password"
              colorScheme="theme.secondary"
              error={errors.password}
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
