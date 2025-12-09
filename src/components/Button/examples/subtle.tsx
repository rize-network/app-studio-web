import React from 'react';
import { Button } from '../Button';
import { Center } from 'app-studio';
import { PlusIcon } from '../../Icon/Icon';

export const SubtleButtons = () => (
  <Center gap={15}>
    <Button variant="subtle" onClick={() => alert('Clicked!')}>
      <PlusIcon widthHeight={14} /> Manual Objective
    </Button>
    <Button
      variant="subtle"
      color="color.red.600"
      onClick={() => alert('Clicked Red!')}
    >
      <PlusIcon widthHeight={14} /> Remove Objective
    </Button>
    <Button
      variant="subtle"
      color="color.blue.600"
      onClick={() => alert('Clicked Blue!')}
    >
      <PlusIcon widthHeight={14} /> Add Task
    </Button>
  </Center>
);
