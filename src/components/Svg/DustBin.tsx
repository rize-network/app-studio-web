import React from 'react';

import { Center } from '../Layout/Center/Center';

interface SvgProps {
  size?: number;
  [x: string]: any;
}

export const DustBinSvg: React.FC<SvgProps> = ({ size = 64, ...props }) => (
  <Center width={`${size}px`} height={`${size}px`}>
    <svg
      fill="#ffffff"
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 197.516 197.516"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M68.758,170.083V72.649h15v97.434H68.758z M128.758,72.649h-15v97.434h15V72.649z M140.539,0v12.631h34.885v47.746h-10.525 v137.139H32.617V60.377H22.092V12.631h34.883V0H140.539z M149.898,60.377H47.617v122.139h102.281V60.377z M125.539,27.631V15H71.975 v12.631H37.092v17.585h123.332V27.631H125.539z"></path>
      </g>
    </svg>
  </Center>
);
