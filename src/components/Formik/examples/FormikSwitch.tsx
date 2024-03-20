import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikSwitch } from '../Formik.Switch';

export const FormikSwitchExemple = () => {
  const initialValues = {
    carrot: true,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <FormikSwitch name="carrot" label="carrot" />
          <FormikSwitch name="onion" label="onion" />
          <Button type="submit" onClick={props.handleSubmit}>
            Submit
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};
