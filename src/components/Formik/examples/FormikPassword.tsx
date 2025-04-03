import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikPassword } from '../Formik.Password';

import { Vertical } from '../../Layout/Vertical/Vertical';

export const FormikPasswordExemple = () => {
  const initialValues = {
    password: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <Vertical gap={10}>
            <FormikPassword name="password" label="Password" />

            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
