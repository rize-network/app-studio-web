import React from 'react';
import { Button } from '../../Button/Button';
import { Form } from '../Formik.Form';

import { Vertical } from '../../Layout/Vertical/examples';
import { View } from '../../Layout/View/View';
import { Checkbox } from '../Formik.Checkbox';
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
    <Formik initialValues={{}} onSubmit={console.log}>
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
