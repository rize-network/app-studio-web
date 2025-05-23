import React from 'react';
import { Button } from '../../../Button/Button';
import { FormikForm } from '../../../Formik/Formik.Form';

import { Vertical } from 'app-studio';
import { View } from 'app-studio';
import { FormikCheckbox } from '../../../Formik/Formik.Checkbox';
import { Formik } from 'formik';

export const FormCheckbox = () => {
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   const selectedVegetables: Array<string> = [];
  //   if (isOnionChecked) selectedVegetables.push('onion');
  //   if (isCarrotChecked) selectedVegetables.push('carrot');
  //   alert(`You selected: ${selectedVegetables.join(', ')}`);
  // };
  return (
    <Formik
      initialValues={{}}
      onSubmit={console.log}

      // onSubmit={(values, { setSubmitting }) => {
      //   setTimeout(() => {
      //     alert(JSON.stringify(values, null, 2));
      //     setSubmitting(false);
      //   }, 400);
      //}}
    >
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
