import React from 'react';

import { HelperText } from '../HelperText/HelperText';

import { ContainerProps } from './FieldContainer/FieldContainer.props';
import { Text } from '../../../Text/Text';
import { Vertical } from '../../Vertical/Vertical';

export const FieldContainer: React.FC<ContainerProps> = ({
  children,
  helperText,
  error = false,
  views,
  ...props
}) => (
  <Vertical gap={5} position="relative" {...props}>
    {children}
    {!error && helperText && <HelperText {...views}>{helperText}</HelperText>}
    {error && (
      <Text
        size="xs"
        marginVertical={0}
        marginHorizontal={0}
        color={'theme.error'}
      >
        {error}
      </Text>
    )}
  </Vertical>
);
