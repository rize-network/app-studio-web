import React from 'react';
import { Text } from '../../Text/Text';

import { Link } from '../Link';

export const ExternalLink = () => (
  <Link
    href={'https://www.npmjs.com/package/app-studio'}
    isExternal
    iconSize="md"
  >
    <Text size="2xl">External</Text>
  </Link>
);
