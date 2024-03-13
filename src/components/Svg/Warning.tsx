import React from 'react';

import { Center } from '../Layout/Center/Center';

interface SvgProps {
  size?: number;
  color?: string;
  [x: string]: any;
}

export const WarningSvg: React.FC<SvgProps> = ({
  size = 64,
  color = 'white',
  ...props
}) => (
  <Center width={`${size}px`} height={`${size}px`}>
    <svg
      height={`${size}px`}
      width={`${size}px`}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192.146 192.146"
      fill={color}
      {...props}
    >
      <g id="SVGRepo_bgCarrier"></g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <g>
              <path d="M108.186,144.372c0,7.054-4.729,12.32-12.037,12.32h-0.254c-7.054,0-11.92-5.266-11.92-12.32 c0-7.298,5.012-12.31,12.174-12.31C103.311,132.062,108.059,137.054,108.186,144.372z M88.44,125.301h15.447l2.951-61.298H85.46 L88.44,125.301z M190.372,177.034c-2.237,3.664-6.214,5.921-10.493,5.921H12.282c-4.426,0-8.51-2.384-10.698-6.233 c-2.159-3.849-2.11-8.549,0.147-12.349l84.111-149.22c2.208-3.722,6.204-5.96,10.522-5.96h0.332 c4.445,0.107,8.441,2.618,10.513,6.546l83.515,149.229C192.717,168.768,192.629,173.331,190.372,177.034z M179.879,170.634 L96.354,21.454L12.292,170.634H179.879z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </Center>
);
