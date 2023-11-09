import React from 'react';
import { Text } from '../../../Text/Text';

import { HelperTextProps } from './HelperText.props';

export const HelperText: React.FC<HelperTextProps> = ({
  children,
  styles = { helperText: {} },
  ...props
}) => (
  <Text
    size="xs"
    marginVertical={0}
    marginHorizontal={0}
    color={ 'theme.text.dark'}
    {...(styles['helperText'] as any)}
    {...props}
  >
    {children}
  </Text>
);
