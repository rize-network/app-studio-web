import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'src/components';
import { Password, TextField } from 'src/components';
import { Vertical } from 'src/components';
import { CloseEyeSvg } from 'src/components/Svg/CloseEye';
import { OpenEyeSvg } from 'src/components/Svg/OpenEye';

export const FormikHelperTextPassword = () => {
  const initialValues = {
    firstName: '',
    password: '',
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
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
              name="firstName"
              value="First Name"
              error={touched.firstName && errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              as={Password}
              name="password"
              placeholder="Password"
              error={touched.password && errors.password}
              helperText={touched.password && errors.password}
              visibleIcon={<OpenEyeSvg size={14} />}
              hiddenIcon={<CloseEyeSvg size={14} />}
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
