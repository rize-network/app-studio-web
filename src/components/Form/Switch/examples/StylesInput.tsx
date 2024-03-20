import React from 'react';
import { Button } from '../../../Button/Button';

import { Horizontal } from '../../../Layout/Horizontal/Horizontal';

import { Switch } from '../Switch';

export const StyledSwitch = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`Hello, ${formData.get('surname')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Horizontal gap={10} alignItems="center" wrap="nowrap">
        <Switch
          name="surname"
          label="Surname"
          variant="none"
          shadow={{ boxShadow: 'rgba(0, 0, 0, 0.20) 0px 3px 8px' }}
          styles={{
            slider: {
              borderRadius: 8,
              borderColor: 'theme.primary',
              borderStyle: 'solid',
              borderWidth: 1,
            },
            circle: { backgroundColor: 'theme.primary' },
          }}
        />
        <Button type="submit" height="40px" colorScheme="theme.primary" isAuto>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
