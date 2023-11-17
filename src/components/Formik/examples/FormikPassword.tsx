import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { Form } from '../Formik.Form';
import { Password } from '../Formik.Password';

import { Vertical } from '../../Layout/Vertical/Vertical';

export const FormikPassword = () => {
  const initialValues = {
    password: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <Form>
          <Vertical gap={10}>
            <Password
              name="password"
              label="Password"
              colorScheme="theme.secondary"
            />

            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Vertical>
        </Form>
      )}
    </Formik>
  );
};
