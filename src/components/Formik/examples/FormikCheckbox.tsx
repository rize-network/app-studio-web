import React from 'react';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';

import { Vertical } from '../../Layout/Vertical/examples';
import { View } from '../../Layout/View/View';
import { FormikCheckbox } from '../Formik.Checkbox';
import { Formik } from 'formik';

export const FormCheckboxExemple = () => {
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   const selectedVegetables: Array<string> = [];
  //   if (isOnionChecked) selectedVegetables.push('onion');
  //   if (isCarrotChecked) selectedVegetables.push('carrot');
  //   alert(`You selected: ${selectedVegetables.join(', ')}`);
  // };
  return (
    <Formik initialValues={{ onion: true }} onSubmit={console.log}>
      {(props: any) => (
        <FormikForm margin={10}>
          <Vertical gap={10}>
            <View>Choose your vegetables:</View>
            <FormikCheckbox name="onion" label="onion" />
            <FormikCheckbox name="carrot" label="carrot" />
            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
