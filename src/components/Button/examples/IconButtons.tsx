import React from 'react';
import { Button, Center } from '../..';
import { DustBinSvg } from '../../Svg';

import { Shape } from '../Button/Button.type';

export const IconButtons = () => (
  <Center gap={15}>
    <Button icon={<DustBinSvg size={24} />} height={48}>
      Delete
    </Button>
    <Button
      height={48}
      icon={<DustBinSvg size={24} />}
      shape={'pillShaped' as Shape}
      iconPosition="right"
      colorScheme="theme.secondary"
    >
      Delete
    </Button>
    <Button icon={<DustBinSvg size={24} />} colorScheme="theme.primary" isIconRounded isAuto />
  </Center>
);
