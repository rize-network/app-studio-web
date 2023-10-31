import React from 'react';

import { Center } from '../Layout/Center/Center';

interface SvgProps {
  size?: number;
  color?: string;
  [x: string]: any;
}

export const IndeterminateSvg: React.FC<SvgProps> = ({ size = 64, color = 'white', ...props }) => (
  <Center width={`${size}px`} height={`${size}px`}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M7 12L17 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
      </g>
    </svg>
  </Center>
);
