import { useState } from 'react';
import React from 'react';

import { Button } from '../../../Button/Button';
import { TextArea } from '../../../Form/TextArea/TextArea';

import { Vertical } from 'src/components/Layout/Vertical/Vertical';

export const HelperTextArea = () => {
  const initialValues = {
    guess: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.guess) {
      errors.guess = 'Required';
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
      alert(formValues.guess);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10}>
        <TextArea
          name="guess"
          placeholder="Write here..."
          helperText={formErrors.guess}
          error={!!formErrors.guess}
          onChange={handleChange}
        />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
