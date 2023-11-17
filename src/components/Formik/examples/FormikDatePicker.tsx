import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { Form } from '../Formik.Form';

import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { DatePicker } from '../Formik.DatePicker';

export const FormikDatePicker = () => {
  const initialValues = {
    selectdate: '2023-05-30',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <Form>
          <Horizontal gap={10}>
            <DatePicker id="selectdate" name="selectdate" />
            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Horizontal>
        </Form>
      )}
    </Formik>
  );
};
