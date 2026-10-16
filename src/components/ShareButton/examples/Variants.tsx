import React from 'react';
import { Horizontal } from 'app-studio';
import { ShareButton } from '../ShareButton';

const shareData = {
  title: 'App Studio',
  text: 'Check out the App Studio components.',
  url: 'https://app-studio.dev',
};

export const ShareButtonVariants = () => (
  <Horizontal gap={10} flexWrap="wrap" alignItems="center">
    <ShareButton label="Share" shareData={shareData} />
    <ShareButton label="Small" size="sm" shareData={shareData} />
    <ShareButton label="Large" size="lg" shareData={shareData} />
  </Horizontal>
);
