import React from 'react';
import { Button } from '../../../Button/Button';

import { Horizontal } from 'app-studio';

import { TextArea } from '../TextArea';

export const ShadowArea = () => {
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
          shadow={{ boxShadow: 'rgba(0, 0, 0, 0.20) 0px 3px 8px' }}
        />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
