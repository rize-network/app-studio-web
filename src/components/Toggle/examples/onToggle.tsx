import React from 'react';
import { useState } from 'react';
import { Toggle } from '../Toggle';

export const OnToggleDemo = () => {
  const [isToggle, setIsToggled] = useState(false);
  return (
    <Toggle
      onToggle={(state) => {
        setIsToggled(state);
      }}
    >
      {isToggle ? 'On' : 'Off'}
    </Toggle>
  );
};
