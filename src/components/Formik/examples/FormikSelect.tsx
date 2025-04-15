import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';

import { Vertical } from 'app-studio';

import { FormikSelect } from '../Formik.Select';

export const FormikSelectExemple = () => {
  const options = [
    { label: 'Item1', value: '1' },
    { label: 'Item2', value: '2' },
    { label: 'Item3', value: '3' },
  ];

  const initialValues = {
    formik: options[1].value,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <Vertical gap={10}>
            <FormikSelect id="formik" name="formik" options={options} />
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
