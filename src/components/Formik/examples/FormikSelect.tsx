import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';

import { Vertical } from '../../Layout/Vertical/examples';

import { FormikSelect } from '../Formik.Select';

export const FormikSelectExemple = () => {
  const options = ['Item1', 'Item2', 'Item3'];
  const initialValues = {
    formik: options[0],
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <Vertical gap={10}>
            <FormikSelect
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
        </FormikForm>
      )}
    </Formik>
  );
};
