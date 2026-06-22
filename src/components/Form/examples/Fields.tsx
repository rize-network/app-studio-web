import React from 'react';
import { Vertical, Text } from 'app-studio';
import { TextField } from '../TextField/TextField';
import { Password } from '../Password/Password';
import { Select } from '../Select/Select';
import { TextArea } from '../TextArea/TextArea';

export const FormFields = () => (
  <Vertical gap={14} width="100%">
    <Text fontWeight="600" color="color-gray-800">
      Sign up
    </Text>
    <TextField name="name" label="Full name" placeholder="Ada Lovelace" />
    <TextField name="email" label="Email" placeholder="ada@example.com" />
    <Password name="password" label="Password" placeholder="••••••••" />
    <Select
      label="Plan"
      options={[
        { label: 'Free', value: 'free' },
        { label: 'Pro', value: 'pro' },
        { label: 'Team', value: 'team' },
      ]}
    />
    <TextArea rows={3} placeholder="Anything else we should know?" />
  </Vertical>
);
