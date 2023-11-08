import React from 'react';
import { Button } from '../../../Button/Button';

import { Horizontal } from '../../../Layout/Horizontal/Horizontal';

import { TextField } from '../TextField';

export const StyledInput = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`Hello, ${formData.get('surname')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Horizontal gap={10} alignItems="center" wrap="nowrap">
        <TextField
          name="surname"
          label="Surname"
          variant="unStyled"
          shadow={{ boxShadow: 'rgba(0, 0, 0, 0.20) 0px 3px 8px' }}
          styles={{
            box: {
              borderRadius: 8,
              borderColor: 'theme.primary',
              borderStyle: 'solid',
              borderWidth: 1,
            },
            text: { color: 'theme.primary' },
            label: { color: 'theme.primary' },
          }}
        />
        <Button type="submit" height="40px" colorScheme="theme.primary" isAuto>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
