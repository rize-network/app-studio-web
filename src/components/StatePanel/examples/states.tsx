import React from 'react';
import { Vertical } from 'app-studio';
import { Button } from '../../Button/Button';
import { StatePanel } from '../StatePanel';

export const StatePanelStates = () => (
  <Vertical gap={16}>
    <StatePanel
      state="empty"
      title="No notes yet"
      description="Notes you write appear here."
      action={<Button onClick={() => {}}>Write a note</Button>}
    />
    <StatePanel
      state="error"
      title="Something went wrong"
      action={<Button onClick={() => {}}>Retry</Button>}
    />
    <StatePanel
      state="forbidden"
      title="You don't have access to this"
      description="Ask an administrator for access."
    />
    <StatePanel
      state="gone"
      title="This no longer exists"
      description="It may have been deleted."
    />
  </Vertical>
);
