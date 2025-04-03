import React from 'react';
import { Badge } from '../Badge';

export const StylesDemo = () => {
  return (
    <Badge
      content="styles"
      views={{
        container: {
          backgroundColor: 'transparent',
        },
        text: {
          color: 'purple',
        },
      }}
    />
  );
};
