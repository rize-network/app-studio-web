import React from 'react';
import { ShareButton } from '../../ShareButton/ShareButton';
import { Vertical } from 'app-studio';

export const ShareButtons = () => (
  <Vertical gap={15}>
    <ShareButton
      label="Share this page"
      shareData={{
        title: 'App Studio',
        text: 'Check out App Studio components.',
        url:
          typeof window !== 'undefined' ? window.location.href : 'app-studio',
      }}
      onUnsupported={() => {
        if (typeof alert !== 'undefined') {
          alert('Native sharing is unavailable on this browser.');
        } else {
          console.log('Native sharing is unavailable on this browser.');
        }
      }}
    />
    <ShareButton
      variant="outline"
      shareData={{
        title: 'App Studio',
        text: 'Check out App Studio components.',
        url:
          typeof window !== 'undefined' ? window.location.href : 'app-studio',
      }}
      onUnsupported={() => {
        if (typeof alert !== 'undefined') {
          alert('Native sharing is unavailable on this browser.');
        } else {
          console.log('Native sharing is unavailable on this browser.');
        }
      }}
    />
    <ShareButton
      variant="ghost"
      size="sm"
      shareData={{
        title: 'App Studio',
        text: 'Check out App Studio components.',
        url:
          typeof window !== 'undefined' ? window.location.href : 'app-studio',
      }}
      onUnsupported={() => {
        if (typeof alert !== 'undefined') {
          alert('Native sharing is unavailable on this browser.');
        } else {
          console.log('Native sharing is unavailable on this browser.');
        }
      }}
    />
  </Vertical>
);
