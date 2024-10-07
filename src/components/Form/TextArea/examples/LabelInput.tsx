import React from 'react';
import { Button } from '../../../Button/Button';

import { Horizontal } from '../../../Layout/Horizontal/Horizontal';

import { TextArea } from '../TextArea';

export const LabelArea = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(formData.get('description'));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Horizontal gap={10} alignItems="center" flexWrap="nowrap">
        <TextArea name="description" label="Description" />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Horizontal>
    </form>
  );
};
