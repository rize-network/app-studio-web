import { useState } from 'react';
import React from 'react';
import { Button } from '../../../Button/Button';

import { TextArea } from '../../../Form/TextArea/TextArea';

import { Vertical } from '../../../Layout/Vertical/examples';

export const ErrorArea = () => {
  const initialValues = {
    thoughts: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.thoughts) {
      errors.thoughts = 'Required';
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
      alert(formValues.thoughts);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Vertical gap={10}>
        <TextArea
          name="thoughts"
          placeholder="Write your thoughts here..."
          error={!!formErrors.thoughts}
          onChange={handleChange}
          colorScheme="theme.secondary"
        />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
