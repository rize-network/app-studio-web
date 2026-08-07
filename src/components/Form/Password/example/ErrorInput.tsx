import { useState } from 'react';
import React from 'react';
import { Button } from '../../../Button/Button';

import { TextField } from '../../../Form/TextField/TextField';
import { Password } from '../../../Form/Password/Password';

import { Vertical } from 'app-studio';

export const ErrorPassword = () => {
  const initialValues = {
    name: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    setFormErrors(errors);
  };

  // TextField/Password onChange hands you the value, not a DOM event — so the
  // field name comes from the closure rather than `event.target.name`.
  const handleChange =
    (field: keyof typeof initialValues) => (value: string) => {
      setFormValues((current) => ({ ...current, [field]: value }));
    };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validate(formValues);
    if (Object.values(formErrors).length === 0) {
      alert(`Hello, ${formValues.name} ${formValues.password}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10} flexWrap="nowrap">
        <TextField
          name="name"
          placeholder="Name"
          error={!!formErrors.name}
          onChange={handleChange('name')}
          isClearable={true}
        />
        <Password
          name="password"
          placeholder="Password"
          error={!!formErrors.password}
          onChange={handleChange('password')}
        />
        <Button type="submit" height="40px">
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
