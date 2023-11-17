import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikSwitch } from '../Formik.Switch';

export const FormikSwitchExemple = () => {
  const initialValues = {
    toggle: false,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <FormikSwitch id="toggle" name="toggle" />
          <Button type="submit" onClick={props.handleSubmit}>
            Submit
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};
