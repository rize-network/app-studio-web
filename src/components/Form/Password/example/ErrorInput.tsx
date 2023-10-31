import { useState } from 'react';
import React from 'react';
import { Button } from '../../../Button/Button';

import { TextField } from '../../../Form/TextField/TextField';
import { Password } from '../../../Form/Password/Password';

import { Vertical } from '../../../Layout/Vertical/Vertical';
import { CloseEyeSvg } from '../../../Svg/CloseEye';
import { OpenEyeSvg } from '../../../Svg/OpenEye';

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

  const handleChange = (event: any) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
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
      <Vertical gap={10} wrap="nowrap">
        <TextField
          name="name"
          placeholder="Name"
          error={!!formErrors.name}
          onChange={handleChange}
          colorScheme="theme.secondary"
          isClearable={true}
        />
        <Password
          name="password"
          placeholder="Password"
          error={!!formErrors.password}
          onChange={handleChange}
          colorScheme="theme.secondary"
          visibleIcon={<OpenEyeSvg size={14} />}
          hiddenIcon={<CloseEyeSvg size={14} />}
        />
        <Button type="submit" height="40px">
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
