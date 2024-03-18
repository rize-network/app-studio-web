import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

import { Badge } from '../Badge';
import { Variant } from '../Badge/Badge.type';
import { View } from 'src/components/Layout/View/View';
export const VariantDemo = () => (
  <Vertical gap={15}>
    {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
      <View position={'relative'} key={index}>
        <Badge
          content={variant}
          variant={variant as Variant}
          colorScheme="theme.primary"
        />
      </View>
    ))}
  </Vertical>
);
