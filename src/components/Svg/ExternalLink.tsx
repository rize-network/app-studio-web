import React from 'react';

import { Center } from '../Layout/Center/Center';

interface SvgProps {
  size?: number;
  color?: string;
  [x: string]: any;
}

export const ExternalLinkSvg: React.FC<SvgProps> = ({
  size = 64,
  color = 'white',
  ...props
}) => (
  <Center width={`${size}px`} height={`${size}px`}>
    <svg
      fill={color}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M38.288 10.297l1.414 1.415-14.99 14.99-1.414-1.414z"></path>
        <path d="M40 20h-2v-8h-8v-2h10z"></path>
        <path d="M35 38H15c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h11v2H15c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V24h2v11c0 1.7-1.3 3-3 3z"></path>
      </g>
    </svg>
  </Center>
);
