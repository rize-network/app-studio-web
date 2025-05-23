import React from 'react';
import { ComboBox } from '../ComboBox';
import { Vertical } from 'app-studio';
import { MessageLayout, showMessage } from '../../..';

export const OnSelectDemo = () => {
  const items = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ];
  return (
    <Vertical gap={15}>
      <ComboBox
        id="onSelect"
        items={items}
        onSelect={(item) => {
          showMessage('success', `Item selected: ${item.label}`);
        }}
      />
      <MessageLayout position="bottomRight" />
    </Vertical>
  );
};
