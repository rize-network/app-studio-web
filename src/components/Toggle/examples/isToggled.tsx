import React from 'react';
import { Toggle } from '../Toggle';

export const IsToggledDemo = () => {
  return (
    <Toggle isToggled={true} isDisabled>
      IsActive
    </Toggle>
  );
};
