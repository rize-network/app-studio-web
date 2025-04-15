import React from 'react';
import { Button } from '../../../Button/Button';

import { Horizontal } from 'app-studio';

import { TextArea } from '../TextArea';

export const StyledArea = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`Hello, ${formData.get('surname')}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Horizontal gap={10} alignItems="center" flexWrap="nowrap">
        <TextArea
          name="surname"
          label="Surname"
          variant="none"
          views={{
            box: {
              borderRadius: 8,
              padding: 5,
              borderColor: 'theme.primary',
              borderStyle: 'solid',
              borderWidth: 1,
            },
            field: { color: 'theme.primary', padding: 0 },
            label: { color: 'theme.primary' },
          }}
        />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
