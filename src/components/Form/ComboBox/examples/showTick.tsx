import React from 'react';
import { ComboBox } from '../ComboBox';

export const ShowTickDemo = () => {
  const statuses = [
    {
      value: 'backlog',
      label: 'Backlog',
    },
    {
      value: 'todo',
      label: 'Todo',
    },
    {
      value: 'in progress',
      label: 'In Progress',
    },
    {
      value: 'done',
      label: 'Done',
    },
    {
      value: 'canceled',
      label: 'Canceled',
    },
  ];
  return <ComboBox id="showTick" items={statuses} showTick={false} />;
};
