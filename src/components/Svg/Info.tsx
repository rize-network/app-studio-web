import React from 'react';
import { Center } from '../Layout/Center/Center';

import { ViewProps } from 'app-studio';

interface SvgProps extends Omit<ViewProps, 'size'> {
  size?: number;
  color?: string;
}

export const InfoSvg: React.FC<SvgProps> = ({
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
              <path d="M96.073,3.515C43.19,3.515,0,46.705,0,99.587s43.19,96.072,96.073,96.072s96.073-43.19,96.073-96.072 S148.955,3.515,96.073,3.515z M101.468,154.072h-15.447V120.57h15.447V154.072z M101.468,111.875h-15.447V49.54h15.447V111.875z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </Center>
);
