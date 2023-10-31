import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'src/components';
import { TextArea } from 'src/components';
import { Vertical } from 'src/components/Layout/Vertical/examples';

export const FormikHelperTextArea = () => {
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
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Vertical gap={10}>
            <Field
              as={TextArea}
              name="thoughts"
              placeholder="Write here..."
              error={touched.thoughts && errors.thoughts}
              helperText={touched.thoughts && errors.thoughts}
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
