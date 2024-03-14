import React from 'react';
import { Image } from 'app-studio';
import { AspectRatio } from '../AspectRatio';

export const DefaultDemo = () => {
  return (
    <AspectRatio>
      <Image
        alt="image"
        objectFit="cover"
        width="100%"
        height="100%"
        src="https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/07/insert-image-html.jpg"
      />
    </AspectRatio>
  );
};
