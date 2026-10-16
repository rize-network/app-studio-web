import React from 'react';
import { Badge } from '../Badge';
import { Horizontal } from 'app-studio';

export const PastilDemo = () => (
  <Horizontal gap={10}>
    <Badge pastil={true} content="Active" />
    <Badge pastil="success" content="Success" />
    <Badge pastil="warning" content="Warning" />
    <Badge pastil="error" content="Error" />
  </Horizontal>
);
