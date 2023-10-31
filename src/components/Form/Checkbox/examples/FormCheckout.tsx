import React, { useState } from 'react';
import { Button } from 'src/components';
import { Vertical } from 'src/components/Layout/Vertical/examples';
import { View } from 'src/components/Layout/View/View';

import { Checkbox } from '../Checkbox';

export const FormCheckbox = () => {
  const [isOnionChecked, setIsOnionChecked] = useState(false);
  const [isCarrotChecked, setIsCarrotChecked] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const selectedVegetables: Array<string> = [];
    if (isOnionChecked) selectedVegetables.push('onion');
    if (isCarrotChecked) selectedVegetables.push('carrot');
    alert(`You selected: ${selectedVegetables.join(', ')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10}>
        <View>Choose your vegetables:</View>
        <Checkbox
          id="onion"
          name="onion"
          label="onion"
          value="onion"
          isChecked={isOnionChecked}
          onChange={setIsOnionChecked}
        />
        <Checkbox
          id="carrot"
          name="carrot"
          label="carrot"
          value="carrot"
          isChecked={isCarrotChecked}
          onChange={setIsCarrotChecked}
        />
        <Button type="submit" onPress={handleSubmit}>
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
