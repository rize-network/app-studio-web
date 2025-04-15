import React from 'react';
import { Vertical } from 'app-studio';
import { Avatar } from '../Avatar';
import { Size } from '../Avatar/Avatar.type';

export const SizeDemo = () => {
  return (
    <Vertical gap={10}>
      {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
        <Avatar
          key={index}
          src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg"
          size={size as Size}
        />
      ))}
    </Vertical>
  );
};
