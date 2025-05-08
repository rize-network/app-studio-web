import React from 'react';
import { Title } from '../Title';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical, Horizontal, View } from 'app-studio';

/**
 * Example of Title component in a hero section context
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
          animation="fadeIn"
          animationDuration="1s"
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
          Build beautiful, responsive, and interactive user interfaces with our powerful component library.
        </Text>
        
        <Horizontal gap={16} justifyContent="center" marginTop={16}>
          <Button  size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </Horizontal>
      </Vertical>
    </View>
  );
};
