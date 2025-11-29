import React from 'react';
import { Carousel } from '../Carousel';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Button } from '../../Button/Button';

export const NavigationDemo = () => {
  // Create an array of slides with different background colors
  const slides = [
    { color: 'color.blue.500', text: 'Slide 1' },
    { color: 'color.green.500', text: 'Slide 2' },
    { color: 'color.purple.500', text: 'Slide 3' },
  ];

  return (
    <Vertical gap={40}>
      <View height="200px" width="100%">
        <Text marginBottom="10px" fontWeight="bold">
          Inside Navigation
        </Text>
        <Carousel navigationPosition="inside" showIndicators={false}>
          {slides.map((slide, index) => (
            <View
              key={index}
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
          ))}
        </Carousel>
      </View>

      <View height="200px" width="100%">
        <Text marginBottom="10px" fontWeight="bold">
          Custom Navigation Buttons
        </Text>
        <Carousel
          showIndicators={false}
          prevButton={
            <Button size="sm" variant="outline">
              Previous
            </Button>
          }
          nextButton={
            <Button size="sm" variant="outline">
              Next
            </Button>
          }
        >
          {slides.map((slide, index) => (
            <View
              key={index}
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
          ))}
        </Carousel>
      </View>
    </Vertical>
  );
};
