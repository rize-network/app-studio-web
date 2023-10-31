import React from 'react';
import { Button } from '../../..';
import { Horizontal } from '../../..';

import { DatePicker } from '../DatePicker';

export const FormDatePicker = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`You selected: ${formData.getAll('datePicker')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Horizontal gap={10}>
        <DatePicker id="date" name="datePicker" />
        <Button type="submit" marginTop={10}>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
