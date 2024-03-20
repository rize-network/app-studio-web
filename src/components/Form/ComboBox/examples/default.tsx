import React from 'react';
import { ComboBox } from '../ComboBox';

export const DefaultDemo = () => {
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
  ];
  return <ComboBox id="default" name="default" items={items} />;
};
