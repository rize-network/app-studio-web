import React from 'react';
import { Center } from '../Layout/Center/Center';

import { ViewProps } from 'app-studio';

interface SvgProps extends Omit<ViewProps, 'size'> {
  size?: number;
  color?: string;
}

export const SearchLoopSvg: React.FC<SvgProps> = ({
  size = 14,
  color = '#c0c0c0',
  ...props
}) => {
  return (
    <Center width={`${size}px`} height={`${size}px`}>
      <svg
        fill="#c0c0c0"
        width={`${size}px`}
        height={`${size}px`}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488.4 488.4"
        stroke={color}
        {...props}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="9.279599999999999"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>{' '}
            </g>
          </g>
        </g>
      </svg>
    </Center>
  );
};

export default SearchLoopSvg;
