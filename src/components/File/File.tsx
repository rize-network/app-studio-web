import React from 'react';
import { useTheme, Image, ViewProps, ImageProps } from 'app-studio';
import { Center } from '../Layout/Center/Center';

export type FileProps = {
  src: string;
  color?: string;
} & ViewProps;

export const FileSVG = ({
  src,
  color,
  themeMode: elementMode,
  ...props
}: FileProps) => {
  const { getColor, themeMode } = useTheme();

  const Colorprops = color
    ? {
        fill: getColor(color, { themeMode }),
        stroke: getColor(color, { themeMode }),
      }
    : {};

  return (
    <Center {...props}>
      <Image
        {...Colorprops}
        content={'url("' + src + '")'}
        width="100%"
        height="100%"
      />
    </Center>
  );
};

export const FileImage = ({
  path,
  ...props
}: { path: string } & ImageProps) => {
  return <Image src={path} {...props} />;
};
