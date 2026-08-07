import { useState } from 'react';
import React from 'react';

import { Button } from '../../../Button/Button';
import { TextArea } from '../../../Form/TextArea/TextArea';

import { Vertical } from 'app-studio';

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

  // TextArea's onChange hands you the value, not a DOM event — so the field
  // name comes from the closure rather than `event.target.name`.
  const handleChange =
    (field: keyof typeof initialValues) => (value: string) => {
      setFormValues((current) => ({ ...current, [field]: value }));
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
          onChange={handleChange('guess')}
        />
        <Button type="submit" height="40px" isAuto>
          Submit
        </Button>
      </Vertical>
    </form>
  );
};
