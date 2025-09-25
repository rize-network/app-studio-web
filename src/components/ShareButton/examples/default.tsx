import React from 'react';
import { ShareButton } from '../ShareButton';

export const DefaultShareButton = () => (
  <ShareButton
    label="Share this page"
    shareData={{
      title: 'App Studio',
      text: 'Découvrez les composants App Studio.',
      url: 'https://appstudio.example.com',
    }}
    onUnsupported={() =>
      alert('Le partage natif est indisponible sur ce navigateur.')
    }
  />
);
