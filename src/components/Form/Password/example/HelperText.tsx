import React from 'react';
import { Button } from '../../../Button/Button';

import { TextField } from '../../../Form/TextField/TextField';
import { Password } from '../../../Form/Password/Password';

import { Vertical } from 'app-studio';

export const HelperTextPassword = () => {
  const initialValues = {
    firstName: '',
    password: '',
  };
  const [formValues, setFormValues] = React.useState(initialValues);
  const [formErrors, setFormErrors] = React.useState(initialValues);

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
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
      alert(`Hello, ${formValues.firstName} ${formValues.password} `);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10} flexWrap="nowrap">
        <TextField
          name="firstName"
          label="First Name"
          helperText={formErrors.firstName}
          error={formErrors.firstName}
          onChange={handleChange('firstName')}
        />
        <Password
          name="password"
          label="Password"
          helperText={formErrors.password}
          error={formErrors.password}
          onChange={handleChange('password')}
        />
        <Button type="submit" height="40px">
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
