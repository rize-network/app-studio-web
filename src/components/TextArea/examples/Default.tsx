import React from 'react';
import { Vertical } from 'app-studio';
import { TextArea } from '../TextArea';

export const DefaultTextArea = () => {
  const [value, setValue] = React.useState('');
  return (
    <Vertical gap={12} width="100%">
      <TextArea
        rows={4}
        placeholder="Write a message…"
        value={value}
        onChangeText={setValue}
      />
      <TextArea rows={3} hasError placeholder="With error state" />
      <TextArea rows={2} isDisabled value="Disabled content" />
    </Vertical>
  );
};
