import React from 'react';
import { Center } from '../Layout/Center/Center';

interface SvgProps {
  size?: number;
  color?: string;
  [x: string]: any;
}

export const ErrorSvg: React.FC<SvgProps> = ({
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
      viewBox="0 0 510 510"
      fill={color}
      {...props}
    >
      <g id="SVGRepo_bgCarrier"></g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <path
              d="M255,0C114.615,0,0,114.615,0,255s114.615,255,255,255s255-114.615,255-255S395.385,0,255,0z M255,459c-114.75,0-207-92.25-207-207c0-114.75,92.25-207,207-207c114.75,0,207,92.25,207,207C462,366.75,369.75,459,255,459z"
              fill={color}
            />
            <path
              d="M255,140.25c11.05,0,20-8.95,20-20s-8.95-20-20-20s-20,8.95-20,20S243.95,140.25,255,140.25z"
              fill={color}
            />
            <path
              d="M265,357c0,11.05-8.95,20-20,20s-20-8.95-20-20v-175c0-11.05,8.95-20,20-20s20,8.95,20,20V357z"
              fill={color}
            />
          </g>
        </g>
      </g>
    </svg>
  </Center>
);
