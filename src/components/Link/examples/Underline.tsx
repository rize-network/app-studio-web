import React from 'react';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

import { Link } from '../Link';

export const UnderlineLink = () => (
  <Vertical gap={10}>
    <Link to={'https://www.npmjs.com/package/app-studio'} underline="default">
      Default
    </Link>
    <Link to={'https://www.npmjs.com/package/app-studio'} underline="hover">
      Hover
    </Link>
    <Link
      to={'https://www.npmjs.com/package/app-studio'}
      underline="underline"
      color="theme.primary"
      textDecorationColor="theme.primary"
    >
      <Text>Underline</Text>
    </Link>
  </Vertical>
);
