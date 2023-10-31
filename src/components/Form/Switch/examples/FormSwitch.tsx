import React from 'react';
import { Button } from 'src/components';
import { Vertical } from 'src/components/Layout/Vertical/examples';

import { Label } from '../../Label/Label';
import { Switch } from '../Switch';

export const FormSwitch = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(event.target.elements.toggleFormik.checked);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10}>
        <Label> Without Formik</Label>
        <Switch id="toggleFormik" name="toggleFormik" />
        <Button type="submit">Submit</Button>
      </Vertical>
    </form>
  );
};
