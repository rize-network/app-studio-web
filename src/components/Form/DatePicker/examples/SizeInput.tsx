import React from 'react';
import { Vertical } from 'app-studio';

import { DatePicker } from '../DatePicker';

export const SizeDatePicker = () => {
  return (
    <Vertical gap={10}>
      <DatePicker name="xs" size="xs" />
      <DatePicker name="sm" size="sm" />
      <DatePicker name="md" size="md" />
      <DatePicker name="lg" size="lg" />
      <DatePicker name="xl" size="xl" />
    </Vertical>
  );
};
