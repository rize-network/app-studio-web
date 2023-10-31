import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'src/components';
import { Vertical } from 'src/components/Layout/Vertical/examples';

import { Label } from '../../Label/Label';
import { Switch } from '../Switch';

export const FormikSwitch = () => {
  const initialValues = {
    toggle: false,
  };

  const onSubmit = (values: any) => {
    alert(values.toggle);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Vertical gap={10}>
            <Label>Formik</Label>
            <Field id="toggle" name="toggle" as={Switch} isChecked={values.toggle} onChange={handleChange} />
            <Button type="submit">Submit</Button>
          </Vertical>
        </Form>
      )}
    </Formik>
  );
};
