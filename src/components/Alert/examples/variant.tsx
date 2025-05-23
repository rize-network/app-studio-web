import React from 'react';
import { Horizontal } from 'app-studio';
import { Alert } from '../Alert';
import { Variant } from '../Alert/Alert.type';

export const VariantDemo = () => (
  <Horizontal gap={10}>
    {['default', 'info', 'warning', 'success', 'error'].map((color, index) => (
      <Alert
        key={index}
        variant={color as Variant}
        title={'Heads Up!'}
        description={'You can add components to your app using the cli.'}
      />
    ))}
  </Horizontal>
);
