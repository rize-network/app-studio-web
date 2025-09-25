import React from 'react';
import { ShareButton } from '../ShareButton';

export const DefaultShareButton = () => (
  <ShareButton
    data={() => ({
      title: 'Découvrez App Studio Web',
      text: 'Explorez la librairie de composants App Studio Web.',
      url:
        typeof window !== 'undefined'
          ? window.location.href
          : 'https://app-studio.adobe.com',
    })}
    unsupportedText="Copier le lien"
    fallback={(shareData) => {
      if (typeof window !== 'undefined') {
        const message = shareData.url
          ? `Partagez ce lien : ${shareData.url}`
          : "Le partage n'est pas disponible sur ce navigateur.";
        window.alert(message);
      }
    }}
  >
    Partager cette page
  </ShareButton>
);
