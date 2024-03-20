import React from 'react';
import { Center } from '../Layout/Center/Center';

interface SvgProps {
  size?: number;
  color?: string;
  [x: string]: any;
}

export const TickSvg: React.FC<SvgProps> = ({
  size = 16,
  color = '#c0c0c0',
  ...props
}) => {
  return (
    <Center width={`${size}px`} height={`${size}px`}>
      <svg
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 -0.5 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            d="M5.5 12.5L10.167 17L19.5 8"
            stroke="#444444"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{' '}
        </g>
      </svg>
    </Center>
  );
};

export default TickSvg;
