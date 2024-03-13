import React from 'react';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Alert } from '../Alert';
import { Variant } from '../Alert/Alert.type';

export const AlertVariants = () => (
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
