import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from '../../../Button/Button';

import { TextArea } from '../../../Form/TextArea/TextArea';

import { Vertical } from '../../../Layout/Vertical/examples';

export const FormikErrorArea = () => {
  const initialValues = {
    thoughts: '',
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.thoughts) {
      errors.thoughts = 'Required';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ touched, isSubmitting }) => (
        <Form>
          <Vertical gap={10}>
            <Field
              as={TextArea}
              name="thoughts"
              placeholder="Write your thoughts here..."
              error={touched.thoughts}
              colorScheme="theme.secondary"
            />

            <Button type="submit" isDisabled={isSubmitting}>
              Submit
            </Button>
          </Vertical>
        </Form>
      )}
    </Formik>
  );
};
