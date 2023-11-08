import React from 'react';

import { TextArea } from '../TextArea';

export const ReadOnlyArea = () => {
  return (
    <TextArea
      name="readOnly"
      value="Almost before we knew it, we had left the ground."
      isReadOnly
    />
  );
};
