import React from 'react';
import { Button } from '../../Button/Button';
import { PageHeader } from '../PageHeader';

export const PageHeaderWithAction = () => (
  <PageHeader
    title="Notes"
    description="Everything you wrote down."
    action={<Button onClick={() => {}}>New note</Button>}
  />
);
