import React from 'react';
import { Button } from 'src/components';
import { Horizontal } from 'src/components';

import { TextField } from '../TextField';

export const DefaultInput = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`Hello, ${formData.get('surname')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Horizontal gap={10} alignItems="center" wrap="nowrap">
        <TextField name="surname" />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
