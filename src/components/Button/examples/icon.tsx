import React from 'react';
import { Button } from '../Button';
import { Center } from '../../Layout/Center/Center';

import { DustBinIcon } from '../../Icon/Icon';

import { Shape } from '../Button/Button.type';

export const IconButtons = () => (
  <Center gap={15}>
    <Button icon={<DustBinIcon size={16} />} height={48}>
      Delete
    </Button>
    <Button
      height={48}
      icon={<DustBinIcon size={16} />}
      shape={'pillShaped' as Shape}
      iconPosition="right"
      colorScheme="theme.secondary"
    >
      Delete
    </Button>
    <Button
      icon={<DustBinIcon size={16} />}
      colorScheme="theme.primary"
      isIconRounded
      isAuto
    />
  </Center>
);
