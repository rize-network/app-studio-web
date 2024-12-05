import React from 'react';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikCheckbox } from '../Formik.Checkbox';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Vertical } from 'src/components/Layout';

export const FormCheckboxExemple = () => {
  const validationSchema = Yup.object().shape({
    acceptTerms: Yup.boolean().oneOf(
      [true],
      'You must accept the terms and conditions.'
    ),
  });
  return (
    <Formik
      initialValues={{ acceptTerms: false }}
      validationSchema={validationSchema}
      onSubmit={console.log}
    >
      {(props: any) => (
        <FormikForm margin={10}>
          <Vertical gap={10}>
            <FormikCheckbox name="acceptTerms" label="Terms and conditions" />
            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
