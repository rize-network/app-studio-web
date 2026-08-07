import { useState } from 'react';
import React from 'react';
import { Button } from '../../../Button/Button';

import { TextField } from '../../../Form/TextField/TextField';

import { Vertical } from 'app-studio';

export const HelperTextInput = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    setFormErrors(errors);
  };

  // TextField's onChange hands you the value, not a DOM event — so the field
  // name comes from the closure rather than `event.target.name`.
  const handleChange =
    (field: keyof typeof initialValues) => (value: string) => {
      setFormValues((current) => ({ ...current, [field]: value }));
    };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validate(formValues);
    if (Object.values(formErrors).length === 0) {
      alert(`Hello, ${formValues.firstName} ${formValues.lastName} `);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10} alignItems="center" flexWrap="nowrap">
        <TextField
          name="firstName"
          placeholder="First Name"
          helperText={formErrors.firstName}
          error={!!formErrors.firstName}
          onChange={handleChange('firstName')}
        />
        <TextField
          name="lastName"
          placeholder="Last Name"
          helperText={formErrors.lastName}
          error={!!formErrors.lastName}
          onChange={handleChange('lastName')}
        />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
