import React from 'react';
import { Carousel } from '../Carousel';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Button } from '../../Button/Button';

export const CompoundDemo = () => {
  const slides = [
    { color: 'color.blue.500', text: 'Slide 1' },
    { color: 'color.green.500', text: 'Slide 2' },
    { color: 'color.purple.500', text: 'Slide 3' },
  ];

  return (
    <View height="300px" width="100%">
      <Text fontWeight="bold" marginBottom={2}>
        Compound Component Pattern
      </Text>
      <Carousel
        aria-label="Compound Carousel Example"
        views={{
          container: {
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Carousel.Content>
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <View
                backgroundColor={slide.color}
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontSize="24px" fontWeight="bold">
                  {slide.text}
                </Text>
              </View>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
    </View>
  );
};

export const CustomCompoundDemo = () => {
  const slides = [
    { color: 'color.red.500', text: 'Custom 1' },
    { color: 'color.yellow.500', text: 'Custom 2' },
    { color: 'color.teal.500', text: 'Custom 3' },
  ];

  return (
    <View height="300px" width="100%" marginTop={8}>
      <Text fontWeight="bold" marginBottom={2}>
        Custom Compound Components
      </Text>
      <Carousel
        aria-label="Custom Compound Carousel"
        views={{
          // Global styles for all parts
          container: {
            borderRadius: '16px',
            overflow: 'hidden',
          },
          // Styles for the inner container that moves
          innerContainer: {
            transitionDuration: '500ms', // Slower transition
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Custom easing
          },
        }}
      >
        <Carousel.Content>
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <View
                backgroundColor={slide.color}
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={4}
              >
                <Text color="white" fontSize="24px" fontWeight="bold">
                  {slide.text}
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  backgroundColor="color.white"
                >
                  Learn More
                </Button>
              </View>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        {/* Custom navigation buttons */}
        <Carousel.Previous>Previous</Carousel.Previous>
        <Carousel.Next>Next</Carousel.Next>
      </Carousel>
    </View>
  );
};
