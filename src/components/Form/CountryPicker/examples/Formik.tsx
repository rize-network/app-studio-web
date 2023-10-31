import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from '../../../Button/Button';

import { Vertical } from '../../../Layout/Vertical/examples';

import { CountryPicker } from '../CountryPicker';

export const FormikCountryPicker = () => {
  const initialValues = {
    country: '',
  };

  const onSubmit = (values: any) => {
    alert(`${values.country}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Vertical gap={10}>
            <Field
              id="country"
              name="country"
              as={CountryPicker}
              value={values.country}
              onChange={handleChange}
              placeholder="CountryPicker an item..."
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
