import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';

import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { FormikDatePicker } from '../Formik.DatePicker';

export const FormikDatePickerExemple = () => {
  const initialValues = {
    selectdate: '2023-05-30',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <Horizontal gap={10}>
            <FormikDatePicker id="selectdate" name="selectdate" />
            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Horizontal>
        </FormikForm>
      )}
    </Formik>
  );
};
