import React from 'react';
import { Formik } from 'formik';

import { Button } from '../../Button/Button';
import { Vertical } from 'app-studio';

import { FormikForm } from '../../Formik/Formik.Form';
import { FormikComboBox } from '../Formik.ComboBox';

export const FormikComboBoxDemo = () => {
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese', value: 'zh' },
  ];

  return (
    <Formik
      initialValues={{ language: { label: '', value: '' } }}
      onSubmit={console.log}
    >
      {(props: any) => (
        <FormikForm margin={10}>
          <Vertical gap={10}>
            <FormikComboBox
              id="language"
              name="language"
              label="Language"
              placeholder="Select Language"
              searchEnabled={false}
              items={languages}
            />
            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
