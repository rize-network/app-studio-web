import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { TextArea } from '../Formik.TextArea';
import { Form } from '../Formik.Form';

export const FormikTextArea = () => {
  const initialValues = {
    thoughts: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <Form>
          <TextArea
            name="thoughts"
            placeholder="Write your thoughts here..."
            colorScheme="theme.secondary"
          />
          <Button type="submit" onClick={props.handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
