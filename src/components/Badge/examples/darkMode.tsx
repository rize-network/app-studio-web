import React from 'react';
import { Badge } from '../Badge';
import { Vertical, Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { Variant } from '../Badge/Badge.type';

export const DarkModeDemo = () => {
  const variants: Variant[] = ['filled', 'outline', 'link', 'ghost'];

  return (
    <Vertical gap={24}>
      <Text fontSize={20} fontWeight="bold">
        Light Mode Badges
      </Text>
      <Horizontal gap={16} alignItems="center">
        {variants.map((variant) => (
          <Badge
            key={variant}
            content={variant}
            variant={variant}
            themeMode="light"
          />
        ))}
      </Horizontal>

      <Text fontSize={20} fontWeight="bold" marginTop={40}>
        Dark Mode Badges
      </Text>
      <Horizontal gap={16} alignItems="center">
        {variants.map((variant) => (
          <Badge
            key={variant}
            content={variant}
            variant={variant}
            themeMode="dark"
          />
        ))}
      </Horizontal>
    </Vertical>
  );
};
