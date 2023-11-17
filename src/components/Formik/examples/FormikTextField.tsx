import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { Form } from '../Formik.Form';

import { TextField } from '../Formik.TextField';

import { Vertical } from '../../Layout/Vertical/examples';

export const FormikTextField = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <Form>
          <Vertical gap={10}>
            <TextField
              name="firstName"
              placeholder="First Name"
              colorScheme="theme.secondary"
            />
            <TextField
              name="lastName"
              placeholder="Last Name"
              colorScheme="theme.secondary"
            />
            <TextField
              type="email"
              name="email"
              placeholder="Email"
              colorScheme="theme.secondary"
            />
            <Button
              type="submit"
              onClick={props.handleSubmit}
            >
              Submit
            </Button>
          </Vertical>
        </Form>
      )}
    </Formik>
  );
};
