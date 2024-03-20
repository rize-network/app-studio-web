import React from 'react';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

import { Link } from '../Link';

export const UnderlineLink = () => (
  <Vertical gap={10}>
    <Link href={'https://www.npmjs.com/package/app-studio'} underline="default">
      Default
    </Link>
    <Link href={'https://www.npmjs.com/package/app-studio'} underline="hover">
      Hover
    </Link>
    <Link
      href={'https://www.npmjs.com/package/app-studio'}
      underline="underline"
      color="theme.primary"
      textDecorationColor="theme.primary"
    >
      <Text>Underline</Text>
    </Link>
  </Vertical>
);
