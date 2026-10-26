import React, { useState } from 'react';
import { TextField } from 'src/components/Form/TextField/TextField';
import { Text, Vertical } from 'app-studio';

export function TextFieldExample() {
  const [name, setName] = useState('App Studio');
  return (
    <Vertical gap={12} width="100%" maxWidth={360}>
      <TextField
        label="Project name"
        placeholder="Name your project"
        value={name}
        onChange={setName}
        isClearable
      />
      <Text role="status">
        {name ? `Project: ${name}` : 'Enter a project name.'}
      </Text>
    </Vertical>
  );
}
