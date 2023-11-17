import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { Form } from '../Formik.Form';

import { Vertical } from '../../Layout/Vertical/examples';

import { Select } from '../Formik.Select';

export const FormikSelect = () => {
  const options = ['Item1', 'Item2', 'Item3'];
  const initialValues = {
    formik: options[0],
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <Form>
          <Vertical gap={10}>
            <Select
              id="formik"
              name="formik"
              placeholder="Select an item..."
              options={options}
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
