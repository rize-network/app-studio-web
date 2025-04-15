import React from 'react';
import { Button } from '../Button';
import { Center } from 'app-studio';

import { DustBinIcon } from '../../Icon/Icon';

import { Shape } from '../Button/Button.type';

export const IconButtons = () => (
  <Center gap={15}>
    <Button icon={<DustBinIcon widthHeight={16} />} height={48}>
      Delete
    </Button>
    <Button
      height={48}
      icon={<DustBinIcon widthHeight={16} />}
      shape={'pillShaped' as Shape}
      iconPosition="right"
    >
      Delete
    </Button>
    <Button icon={<DustBinIcon widthHeight={16} />} isIconRounded isAuto />
    <Button
      icon={<DustBinIcon widthHeight={16} />}
      height={48}
      iconPosition="top"
    >
      Delete
    </Button>
    <Button
      height={48}
      icon={<DustBinIcon widthHeight={16} />}
      shape={'pillShaped' as Shape}
      iconPosition="bottom"
    >
      Delete
    </Button>
  </Center>
);
