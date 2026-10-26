import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  FormikForm,
  FormikTextField,
  FormikCheckbox,
} from 'src/components/Formik';
import { Button } from 'src/components/Button/Button';
import { Text, Vertical } from 'app-studio';

export function FormikExample() {
  const [message, setMessage] = useState('');
  return (
    <Formik
      initialValues={{ project: '', updates: true }}
      validate={(values) =>
        values.project.trim() ? {} : { project: 'Enter a project name.' }
      }
      onSubmit={(values, actions) => {
        setMessage(`Created: ${values.project}`);
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <Vertical gap={16} maxWidth={360}>
            <FormikTextField name="project" label="Project name" />
            <FormikCheckbox name="updates" label="Receive updates" />
            <Button type="submit" isLoading={isSubmitting}>
              Create project
            </Button>
            <Text role="status">
              {message || 'Complete the form to create a project.'}
            </Text>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
}
