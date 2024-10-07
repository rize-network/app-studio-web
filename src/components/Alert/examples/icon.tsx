import React from 'react';
import { EditSvg } from '../../Svg';
import { Alert } from '../Alert';

export const IconDemo = () => {
  return (
    <Alert
      title="Heads up!"
      description="You can add components to your app using the cli."
      icon={<EditSvg size={24} color="black" />}
    />
  );
};
