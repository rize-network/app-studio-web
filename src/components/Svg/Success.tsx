import React from 'react';
import { Center } from '../Layout/Center/Center';

import { ViewProps } from 'app-studio';

interface SvgProps extends Omit<ViewProps, 'size'> {
  size?: number;
  color?: string;
}

export const SuccessSvg: React.FC<SvgProps> = ({
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
      viewBox="0 0 484.8 484.8"
      fill={color}
      {...props}
    >
      <g id="SVGRepo_bgCarrier"></g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <path
              d="M242.4,0C108.6,0,0,108.6,0,242.4S108.6,484.8,242.4,484.8S484.8,376.2,484.8,242.4S376.2,0,242.4,0z M198.4,358.8l-120-120L84,228l114.4,114.4l188-188l28.8,28.8L198.4,358.8z"
              fill={color}
            />
          </g>
        </g>
      </g>
    </svg>
  </Center>
);
