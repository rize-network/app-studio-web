import React from 'react';
import { Button } from '../../../Button/Button';
import { Form } from '../../../Formik/Formik.Form';

import { Vertical } from '../../../Layout/Vertical/examples';
import { View } from '../../../Layout/View/View';
import { Checkbox } from '../../../Formik/Formik.Checkbox';
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
        <Form margin={10}>
          <Vertical gap={10}>
            <View>Choose your vegetables:</View>
            <Checkbox name="onion" label="onion" />
            <Checkbox name="carrot" label="carrot" />
            <Button type="submit" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Vertical>
        </Form>
      )}
    </Formik>
  );
};
