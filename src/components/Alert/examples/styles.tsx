import React from 'react';
import { Alert } from '../Alert';

export const StylesDemo = () => (
  <Alert
    title={'Heads Up!'}
    description={'You can add components to your app using the cli.'}
    styles={{
      container: { backgroundColor: 'black' },
      title: { color: 'white' },
      description: { color: 'white' },
      icon: { color: 'white' },
    }}
  />
);
