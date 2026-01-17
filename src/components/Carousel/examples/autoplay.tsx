import React from 'react';
import { Carousel } from '../Carousel';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

export const AutoPlayDemo = () => {
  // Create an array of slides with different background colors
  const slides = [
    { color: 'color-red-500', text: 'Auto-play Slide 1' },
    { color: 'color-yellow-500', text: 'Auto-play Slide 2' },
    { color: 'color-teal-500', text: 'Auto-play Slide 3' },
    { color: 'color-pink-500', text: 'Auto-play Slide 4' },
  ];

  return (
    <View height="300px" width="100%">
      <Carousel autoPlay autoPlayInterval={2000} pauseOnHover>
        {slides.map((slide, index) => (
          <Vertical
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
            <Text color="white" fontSize="16px" marginTop="10px">
              Auto-advances every 2 seconds. Hover to pause.
            </Text>
          </Vertical>
        ))}
      </Carousel>
    </View>
  );
};
