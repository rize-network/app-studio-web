import React from 'react';
import { Text } from 'src/components';

import { HelperTextProps } from './HelperText.props';

export const HelperText: React.FC<HelperTextProps> = ({
  children,
  styles = { helperText: {} },
  error = false,
  ...props
}) => (
  <Text
    size="xs"
    marginVertical={0}
    marginHorizontal={0}
    color={error ? 'theme.error' : 'theme.text.dark'}
    {...(styles['helperText'] as any)}
    {...props}
  >
    {children}
  </Text>
);
