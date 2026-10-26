import React, { useState } from 'react';
import { Form, Text, Vertical } from 'app-studio';
import { TextField } from 'src/components/Form/TextField/TextField';
import { Button } from 'src/components/Button/Button';

export function FormExample() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');
  return (
    <Form
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
        setSaved(name);
      }}
    >
      <Vertical gap={16} maxWidth={360}>
        <TextField label="Workspace name" value={name} onChange={setName} />
        <Button type="submit" isDisabled={!name.trim()}>
          Save workspace
        </Button>
        <Text role="status">
          {saved ? `Saved: ${saved}` : 'No workspace saved yet.'}
        </Text>
      </Vertical>
    </Form>
  );
}
