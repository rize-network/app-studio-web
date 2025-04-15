import React from 'react';
import { Button } from '../../../Button/Button';

import { Horizontal } from 'app-studio';

import { TextField } from '../TextField';

export const DefaultInput = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`Hello, ${formData.get('surname')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Horizontal gap={10} alignItems="center" flexWrap="nowrap">
        <TextField name="surname" />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
