import React from 'react';
import { Button } from 'src/components';
import { Password, TextField } from 'src/components';
import { Vertical } from 'src/components';
import { CloseEyeSvg } from 'src/components/Svg/CloseEye';
import { OpenEyeSvg } from 'src/components/Svg/OpenEye';

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
      <Vertical gap={10} wrap="nowrap">
        <TextField
          name="firstName"
          label="First Name"
          helperText={formErrors.firstName}
          error={!!formErrors.firstName}
          onChange={handleChange}
        />
        <Password
          name="password"
          label="Password"
          helperText={formErrors.password}
          error={!!formErrors.password}
          onChange={handleChange}
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
