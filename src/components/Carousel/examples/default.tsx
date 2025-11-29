import React from 'react';
import { Carousel } from '../Carousel';
import { View } from 'app-studio';
import { Text } from 'app-studio';

export const DefaultDemo = () => {
  // Create an array of slides with different background colors
  const slides = [
    { color: 'color.blue.500', text: 'Slide 1' },
    { color: 'color.green.500', text: 'Slide 2' },
    { color: 'color.purple.500', text: 'Slide 3' },
    { color: 'color.orange.500', text: 'Slide 4' },
  ];

  return (
    <View height="300px" width="100%">
      <Carousel>
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
  );
};
