import React from 'react';
import { Center } from '../Layout/Center/Center';

interface SvgProps {
  size?: number;
  color?: string;
  [x: string]: any;
}

export const PlusSvg: React.FC<SvgProps> = ({
  size = 14,
  color = '#c0c0c0',
  ...props
}) => {
  return (
    <Center width={`${size}px`} height={`${size}px`}>
      <svg
        width={`${size}px`}
        height={`${size}px`}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 309.059 309.059"
        fill="#000000"
        {...props}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <path
                // style="fill:#232323;"
                d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338 v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843 c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822 c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </Center>
  );
};

export default PlusSvg;
