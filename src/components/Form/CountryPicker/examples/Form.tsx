import React from 'react';
import { Button } from '../../../Button/Button';

import { Vertical } from 'app-studio';

import { CountryPicker } from '../CountryPicker';

export const FormCountryPicker = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`You CountryPickered: ${formData.getAll('formItem')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10} width="100%">
        <CountryPicker
          id="formItem"
          name="formItem"
          placeholder="CountryPicker an item..."
        />
        <Button type="submit" alignSelf="center">
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
