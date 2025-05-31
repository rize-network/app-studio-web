import React from 'react';
import { Background } from '../Background';
import { Vertical, Horizontal } from 'app-studio';
import { Text } from '../../Text/Text';

export const MeteorsDemo = () => (
  <Vertical gap={32}>
    <Text fontSize={16} fontWeight="600">
      Meteors Effect Variations
    </Text>

    <Horizontal gap={24} flexWrap="wrap">
      <Vertical gap={16}>
        <Text fontSize={14} color="color.gray.600">
          Light Meteors (10)
        </Text>
        <Background.Meteors number={10} />
      </Vertical>

      <Vertical gap={16}>
        <Text fontSize={14} color="color.gray.600">
          Medium Meteors (20)
        </Text>
        <Background.Meteors number={20} />
      </Vertical>

      <Vertical gap={16}>
        <Text fontSize={14} color="color.gray.600">
          Heavy Meteors (30)
        </Text>
        <Background.Meteors number={30} />
      </Vertical>
    </Horizontal>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Custom Size Meteors
      </Text>
      <Background.Meteors
        number={15}
        width={600}
        height={300}
        backgroundColor="color.gray.900"
      />
    </Vertical>
  </Vertical>
);
