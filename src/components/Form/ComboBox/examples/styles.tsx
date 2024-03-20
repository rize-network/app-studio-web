import React from 'react';
import { ComboBox } from '../ComboBox';

export const StylesDemo = () => {
  const items = [
    {
      value: 'todo',
      label: 'To Do',
    },
    {
      value: 'inprogress',
      label: 'In Progress',
    },
  ];
  return (
    <ComboBox
      items={items}
      searchEnabled={false}
      styles={{
        container: {
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
        },
        item: {
          margin: '10px',
        },
        dropdown: {
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
        },
        text: {
          borderBottom: '1px solid transparent',
        },
      }}
    />
  );
};
