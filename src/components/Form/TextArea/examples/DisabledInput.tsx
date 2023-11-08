import React from 'react';

import { TextArea } from '../TextArea';

export const DisabledArea = () => {
  return (
    <TextArea
      name="disabled"
      value="Enter your thought"
      label="Thoughts"
      isDisabled
    />
  );
};
