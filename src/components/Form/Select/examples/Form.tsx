import React from 'react';
import { Button } from '../../../Button/Button';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

import { Select } from '../Select';

export const FormSelect = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`You selected: ${formData.getAll('formItem')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10} width="100%">
        <Select
          id="formItem"
          name="formItem"
          options={['Item1', 'Item2', 'Item3']}
          placeholder="Select an item..."
        />
        <Button type="submit" alignSelf="center">
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
