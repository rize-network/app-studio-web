import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';

import { Horizontal } from 'app-studio';

import { FormikDatePicker } from '../Formik.DatePicker';

export const FormikDatePickerExemple = () => {
  const initialValues = {
    selectDate: new Date(Date.now()),
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <Horizontal gap={10}>
            <FormikDatePicker id="selectDate" name="selectDate" />
            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Horizontal>
        </FormikForm>
      )}
    </Formik>
  );
};
