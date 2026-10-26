import React, { useState } from 'react';
import { TextField } from '../TextField';

// `multiline` renders a <textarea> on web and a multiline TextInput on native.
// The error message is linked to the field (aria-describedby / aria-invalid).
export const MultilineInput = () => {
  const [body, setBody] = useState('');
  return (
    <TextField
      label="Body"
      name="body"
      value={body}
      onChange={setBody}
      multiline
      placeholder="What do you want to remember?"
      error={body.length > 200 ? 'At most 200 characters.' : undefined}
    />
  );
};
