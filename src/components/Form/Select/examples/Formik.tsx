import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'src/components';
import { Vertical } from 'src/components/Layout/Vertical/examples';

import { Select } from '../Select';

export const FormikSelect = () => {
  const options = ['Item1', 'Item2', 'Item3'];
  const initialValues = {
    formik: options[0],
  };

  const onSubmit = (values: any) => {
    alert(`${values.formik}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Vertical gap={10}>
            <Field
              id="formik"
              name="formik"
              as={Select}
              value={values.formik}
              options={options}
              onChange={handleChange}
              placeholder="Select an item..."
            />

            <Button type="submit" alignSelf="center">
              Submit
            </Button>
          </Vertical>
        </Form>
      )}
    </Formik>
  );
};
