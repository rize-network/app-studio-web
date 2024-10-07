import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';

import { Vertical } from '../../Layout/Vertical/Vertical';
import { FormikCountryPicker } from '../Formik.CountryPicker';

export const FormikCountryPickerExemple = () => {
  const initialValues = {
    country: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm>
          <Vertical gap={10}>
            <FormikCountryPicker
              id="country"
              name="country"
              placeholder="CountryPicker an item..."
            />
            <Button
              type="submit"
              alignSelf="center"
              onClick={props.handleSubmit}
            >
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
