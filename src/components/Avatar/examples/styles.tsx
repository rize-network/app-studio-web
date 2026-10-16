import React from 'react';
import { Avatar } from '../Avatar';

export const StylesDemo = () => {
  return (
    <Avatar
      src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg"
      views={{
        container: {
          boxShadow: 'none', // Add shadow effect
        },
        fallback: {
          color: 'theme-secondary',
        },
        image: {
          objectFit: 'fill',
        },
      }}
      onClick={() => console.log('hello')}
    />
  );
};
