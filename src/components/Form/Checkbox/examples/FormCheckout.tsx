import React from 'react';
import { Button } from '../../../Button/Button';
import { Form } from '../../../Form/Form';

import { Vertical } from '../../../Layout/Vertical/examples';
import { View } from '../../../Layout/View/View';
import { Checkbox } from '../Checkbox';

export const FormCheckbox = () => {
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   const selectedVegetables: Array<string> = [];
  //   if (isOnionChecked) selectedVegetables.push('onion');
  //   if (isCarrotChecked) selectedVegetables.push('carrot');
  //   alert(`You selected: ${selectedVegetables.join(', ')}`);
  // };
  return (
    <Form
      onSubmit={(values: any) => {
        console.log(values);
      }}
      initialValues={{}}
    >
      <Vertical gap={10}>
        <View>Choose your vegetables:</View>
        <Checkbox name="onion" label="onion" value="onion" />
        <Checkbox name="carrot" label="carrot" value="carrot" />
        <Button type="submit">Submit</Button>
      </Vertical>
    </Form>
  );
};
