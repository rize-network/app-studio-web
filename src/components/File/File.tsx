import React from 'react';
import { useTheme, Image, ViewProps, ImageProps } from 'app-studio';
import { Center } from 'app-studio';

export interface FileProps extends ViewProps {
  src: string;
  color?: string;
  views?: {
    container?: ViewProps;
    image?: ImageProps;
  };
}

export const FileSVG = ({
  src,
  color,
  views,
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
    <Center {...props} {...views?.container}>
      <Image
        {...Colorprops}
        content={'url("' + src + '")'}
        width="100%"
        height="100%"
        {...views?.image}
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
