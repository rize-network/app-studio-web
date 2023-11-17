import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { Form } from '../Formik.Form';
import { Switch } from '../Formik.Switch';

export const FormikSwitch = () => {
  const initialValues = {
    toggle: false,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <Form>
          <Switch id="toggle" name="toggle" />
          <Button type="submit" onClick={props.handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
