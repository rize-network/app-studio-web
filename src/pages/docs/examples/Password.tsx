import React, { useState } from 'react';
import { Password } from 'src/components/Form/Password/Password';

export function PasswordExample() {
  const [password, setPassword] = useState('example-password');
  return <Password label="Password" value={password} onChange={setPassword} />;
}
