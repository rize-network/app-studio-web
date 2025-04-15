import React from 'react';
import { Vertical } from 'app-studio';

import { Badge } from '../Badge';
import { Variant } from '../Badge/Badge.type';
import { View } from 'app-studio';
export const VariantDemo = () => (
  <Vertical gap={15}>
    {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
      <View position={'relative'} key={index}>
        <Badge content={variant} variant={variant as Variant} />
      </View>
    ))}
  </Vertical>
);
