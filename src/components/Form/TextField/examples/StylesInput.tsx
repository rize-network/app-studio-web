import React from 'react';
import { Button } from '../../../Button/Button';

import { Horizontal } from 'app-studio';

import { TextField } from '../TextField';

export const StyledInput = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`Hello, ${formData.get('surname')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Horizontal gap={10} alignItems="center" flexWrap="nowrap">
        <TextField
          name="surname"
          label="Surname"
          variant="none"
          shadow={{ boxShadow: 'rgba(0, 0, 0, 0.20) 0px 3px 8px' }}
          views={{
            container: {
              borderRadius: 8,
              borderColor: 'theme-primary',
              borderStyle: 'solid',
              borderWidth: 1,
            },
            text: { color: 'theme-primary' },
            label: { color: 'theme-primary' },
          }}
        />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
