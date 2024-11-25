import React from 'react';
import { EditIcon } from '../../Icon/Icon';
import { Alert } from '../Alert';

export const IconDemo = () => {
  return (
    <Alert
      title="Heads up!"
      description="You can add components to your app using the cli."
      icon={<EditIcon size={24} color="black" />}
    />
  );
};
