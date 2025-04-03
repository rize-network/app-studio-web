import React from 'react';
import { Text } from '../../../Text/Text';

import { HelperTextProps } from './HelperText.props';

export const HelperText: React.FC<HelperTextProps> = ({
  children,
  views = { helperText: {} },
  ...props
}) => (
  <Text
    size="xs"
    marginVertical={0}
    marginHorizontal={0}
    color={'theme.text.dark'}
    {...(views['helperText'] as any)}
    {...props}
  >
    {children}
  </Text>
);
