import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { Form } from '../Formik.Form';

import { Vertical } from '../../Layout/Vertical/examples';
import { CountryPicker } from '../Formik.CountryPicker';

export const FormikCountryPicker = () => {
  const initialValues = {
    country: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <Form>
          <Vertical gap={10}>
            <CountryPicker
              id="country"
              name="country"
              placeholder="CountryPicker an item..."
            />
            <Button
              type="submit"
              alignSelf="center"
              onClick={props.handleSubmit}
            >
              Submit
            </Button>
          </Vertical>
        </Form>
      )}
    </Formik>
  );
};
