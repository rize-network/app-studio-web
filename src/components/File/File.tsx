import React from 'react';
import { useTheme, Image } from 'app-studio';
import { Center } from '../Layout/Center/Center';

export const FileSVG = ({
  src,
  color,
  ...props
}: {
  src: string;
  color?: string;
}) => {
  const { getColor } = useTheme();

  const Colorprops = color
    ? { fill: getColor(color), stroke: getColor(color) }
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

export const FileImage = ({ path, ...props }: { path: string } & any) => {
  return <Image src={path} {...props} />;
};
