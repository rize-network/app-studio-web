import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikTextArea } from '../Formik.TextArea';
import { FormikForm } from '../Formik.Form';

export const FormikTextAreaExemple = () => {
  const initialValues = {
    thoughts: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm
          onChange={() => {
            console.log('FormikTextAreaExemple onChange', props.values);
          }}
        >
          <FormikTextArea
            name="thoughts"
            placeholder="Write your thoughts here..."
            colorScheme="theme.secondary"
          />
          <Button type="submit" onClick={props.handleSubmit}>
            Submit
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};
