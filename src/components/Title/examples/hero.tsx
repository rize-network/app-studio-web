import React from 'react';
import { View, Vertical, Horizontal, Text } from 'app-studio';
import { Title } from '../Title';
import { Button } from '../../Button/Button';

/**
 * Example of Title in a hero section context
 */
export const HeroTitle = () => {
  return (
    <View
      backgroundColor="color.gray.50"
      padding={48}
      borderRadius={8}
      width="100%"
    >
      <Vertical gap={24} maxWidth={800} marginX="auto">
        <Title
          size="xl"
          animate={{
            from: { opacity: 0 },
            to: { opacity: 1 },
            duration: '1s',
            iterationCount: '1',
          }}
          highlightText="Platform"
          highlightStyle="gradient"
          highlightColor="theme.primary"
          highlightSecondaryColor="theme.secondary"
          centered
        >
          Welcome to Our Platform
        </Title>

        <Text
          textAlign="center"
          color="color.gray.600"
          fontSize={20}
          lineHeight={28}
        >
          Build beautiful, responsive, and interactive user interfaces with our
          powerful component library.
        </Text>

        <Horizontal gap={16} justifyContent="center" marginTop={16}>
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </Horizontal>
      </Vertical>
    </View>
  );
};
