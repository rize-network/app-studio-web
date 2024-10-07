import React from 'react';
import { Button } from '../../../Button/Button';

import { TextField } from '../../../Form/TextField/TextField';
import { Password } from '../../../Form/Password/Password';

import { Vertical } from '../../../Layout/Vertical/Vertical';

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

  const handleChange = (event: any) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
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
          onChange={handleChange}
        />
        <Password
          name="password"
          label="Password"
          helperText={formErrors.password}
          error={formErrors.password}
          onChange={handleChange}
        />
        <Button type="submit" height="40px">
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
