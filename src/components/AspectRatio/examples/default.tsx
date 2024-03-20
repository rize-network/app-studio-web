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
        src="https://t3.ftcdn.net/jpg/02/82/15/88/360_F_282158853_VtXRiSiN5eCjPddHobErJewxJ65lYZGt.jpg"
      />
    </AspectRatio>
  );
};
