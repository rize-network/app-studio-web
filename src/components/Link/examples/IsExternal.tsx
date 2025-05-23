import React from 'react';
import { Text } from '../../Text/Text';

import { Link } from '../Link';

export const ExternalLink = () => (
  <Link
    to={'https://www.npmjs.com/package/app-studio'}
    isExternal
    iconSize="md"
  >
    <Text size="xl">External</Text>
  </Link>
);
