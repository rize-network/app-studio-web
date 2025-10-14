import React from 'react';
import { Vertical } from 'app-studio';
import { Calendar } from '../Calendar';
import { Text } from '../../Text/Text';

export const WeekStartsOnSunday = () => {
  return (
    <Vertical gap={12}>
      <Text fontSize={16} fontWeight="600">Week starts on Sunday</Text>
      <Calendar weekStartsOn={0} />
    </Vertical>
  );
};

export const WeekStartsOnMonday = () => {
  return (
    <Vertical gap={12}>
      <Text fontSize={16} fontWeight="600">Week starts on Monday</Text>
      <Calendar weekStartsOn={1} />
    </Vertical>
  );
};

