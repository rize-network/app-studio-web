import React, { useEffect, useState } from 'react';
import { useTheme, View, ViewProps } from 'app-studio';
import { Center } from '../../Layout/Center/Center';

import {
  DefaultSpinnerProps,
  DottedProps,
  LoaderProps,
  QuarterProps,
} from '../Loader/Loader.props';

import { DefaultSizes, DefaultSpeeds } from './Loader.style';

interface Props extends LoaderProps {
  views?: {
    container?: ViewProps;
    text?: ViewProps;
  };
}

const DefaultSpinner: React.FC<DefaultSpinnerProps> = ({
  size = 'md',
  speed = 'normal',
  color = 'theme.loading',
  themeMode: elementMode,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const colorStyle = getColor(color, elementMode ? elementMode : themeMode);
  const sizeStyle = typeof size === 'number' ? size : DefaultSizes[size];

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 45);
    }, DefaultSpeeds[speed]);

    return () => clearInterval(intervalId);
  }, [speed]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${sizeStyle}px`}
      height={`${sizeStyle}px`}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colorStyle}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${angle}deg)` }}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M21 12a9 9 0 11-6.219-8.56"></path>
      </g>
    </svg>
  );
};

const Dotted: React.FC<DottedProps> = ({
  size = 'md',
  speed = 'normal',
  color = 'theme.loading',
  themeMode: elementMode,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const colorStyle = getColor(color, elementMode ? elementMode : themeMode);
  const sizeStyle = typeof size === 'number' ? size : DefaultSizes[size];

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 45);
    }, DefaultSpeeds[speed]);

    return () => clearInterval(intervalId);
  }, [speed]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={`${sizeStyle}px`}
      height={`${sizeStyle}px`}
      style={{ transform: `rotate(${angle}deg)` }}
      {...props}
    >
      <circle cx="10" cy="25" r="4" fill={colorStyle} />
      <circle cx="25" cy="25" r="4" fill={colorStyle} />
      <circle cx="40" cy="25" r="4" fill={colorStyle} />
    </svg>
  );
};

const Quarter: React.FC<QuarterProps> = ({
  size = 'md',
  speed = 'normal',
  color = 'theme.loading',
  themeMode: elementMode,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const colorStyle = getColor(color, elementMode ? elementMode : themeMode);
  const sizeStyle = typeof size === 'number' ? size : DefaultSizes[size];

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 45);
    }, DefaultSpeeds[speed]);

    return () => clearInterval(intervalId);
  }, [speed]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={`${sizeStyle}px`}
      height={`${sizeStyle}px`}
      style={{ transform: `rotate(${angle}deg)` }}
      {...props}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={colorStyle}
        strokeWidth="5"
        strokeDasharray="1,10"
      />
    </svg>
  );
};
const LoaderView: React.FC<Props> = ({
  size,
  children,
  textColor,
  loaderColor,
  type = 'default',
  speed = 'normal',
  textPosition = 'right',
  views,
  ...props
}) => {
  const style = { size, speed, color: loaderColor };

  const variants = {
    default: <DefaultSpinner {...style} />,
    dotted: <Dotted {...style} />,
    quarter: <Quarter {...style} />,
  };

  return (
    <Center
      gap={10}
      flexDirection={
        textPosition === 'top' || textPosition === 'bottom' ? 'column' : 'row'
      }
      {...props}
      {...views?.container}
    >
      {(textPosition === 'left' || textPosition === 'top') && children && (
        <View color={textColor} {...views?.text}>
          {children}
        </View>
      )}
      {variants[type]}
      {(textPosition === 'right' || textPosition === 'bottom') && children && (
        <View color={textColor} {...views?.text}>
          {children}
        </View>
      )}
    </Center>
  );
};

export default LoaderView;
