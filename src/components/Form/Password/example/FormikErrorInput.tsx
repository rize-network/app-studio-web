import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'src/components';
import { Password, TextField } from 'src/components';
import { Vertical } from 'src/components';
import { CloseEyeSvg } from 'src/components/Svg/CloseEye';
import { OpenEyeSvg } from 'src/components/Svg/OpenEye';

export const FormikErrorPassword = () => {
  const initialValues = {
    name: '',
    password: '',
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
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
              as={TextField}
              name="name"
              label="Name"
              error={touched.name && errors.name}
              colorScheme="theme.secondary"
            />
            <Field
              as={Password}
              name="password"
              label="Password"
              colorScheme="theme.secondary"
              visibleIcon={<OpenEyeSvg size={14} />}
              hiddenIcon={<CloseEyeSvg size={14} />}
              error={touched.password && errors.password}
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
