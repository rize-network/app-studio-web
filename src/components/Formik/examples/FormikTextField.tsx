import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';

import { FormikTextField } from '../Formik.TextField';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const FormikTextFieldExemple = () => {
  const initialValues = {
    firstName: 'ok',
    lastName: 'ok',
    email: 'ok',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <Vertical gap={10}>
            <FormikTextField
              name="firstName"
              placeholder="First Name"
              colorScheme="theme.secondary"
            />
            <FormikTextField
              name="lastName"
              placeholder="Last Name"
              colorScheme="theme.secondary"
            />
            <FormikTextField
              type="email"
              name="email"
              placeholder="Email"
              colorScheme="theme.secondary"
            />
            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
