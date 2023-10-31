import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'src/components';
import { Horizontal } from 'src/components';

import { DatePicker } from '../DatePicker';

export const FormikDatePicker = () => {
  const initialValues = {
    selectdate: '2023-05-30',
  };

  const onSubmit = (values: any) => {
    alert(`${values.selectdate}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Horizontal gap={10}>
            <Field
              id="selectdate"
              name="selectdate"
              as={DatePicker}
              value={values.selectdate}
              onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
          </Horizontal>
        </Form>
      )}
    </Formik>
  );
};
