import React from 'react';
import { Button } from '../Button';
import { Center } from 'app-studio';

import { DustBinIcon } from '../../Icon/Icon';

import { Shape } from '../Button/Button.type';

export const IconButtons = () => (
  <Center gap={15}>
    <Button icon={<DustBinIcon widthHeight={16} />} size="md">
      Delete
    </Button>
    <Button
      size="md"
      icon={<DustBinIcon widthHeight={16} />}
      shape={'pill' as Shape}
      iconPosition="right"
    >
      Delete
    </Button>
    <Button icon={<DustBinIcon widthHeight={16} />} isIconRounded isAuto />
    <Button
      icon={<DustBinIcon widthHeight={16} />}
      size="md"
      iconPosition="top"
    >
      Delete
    </Button>
    <Button
      size="md"
      icon={<DustBinIcon widthHeight={16} />}
      shape={'pill' as Shape}
      iconPosition="bottom"
    >
      Delete
    </Button>
  </Center>
);
