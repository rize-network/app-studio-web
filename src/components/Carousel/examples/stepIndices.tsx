import React, { useState } from 'react';
import { Carousel } from '../Carousel';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Button } from '../../Button/Button';

export const StepIndicesDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Create an array of slides
  const slides = [
    { color: 'color-blue-500', text: 'Introduction', id: 0 },
    { color: 'color-gray-400', text: 'Step 1', id: 1 },
    { color: 'color-gray-400', text: 'Step 2', id: 2 },
    { color: 'color-gray-400', text: 'Step 3', id: 3 },
    { color: 'color-gray-400', text: 'Step 4', id: 4 },
    { color: 'color-green-500', text: 'Summary', id: 5 },
  ];

  // Only allow navigation to specific slides (introduction, steps 2 & 4, summary)
  const stepIndices = [0, 2, 4, 5];

  return (
    <View>
      <Text fontWeight="bold" marginBottom={2}>
        Step Navigation (Only specific slides)
      </Text>
      <View height="300px" width="100%">
        <Carousel
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          stepIndices={stepIndices}
          showIndicators={false}
        >
          {slides.map((slide, index) => (
            <View
              key={index}
              backgroundColor={
                stepIndices.includes(index) ? slide.color : 'color-gray-400'
              }
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
              <Text color="white" fontSize="16px">
                {stepIndices.includes(index)
                  ? 'This is an allowed step'
                  : 'This slide is skipped in navigation'}
              </Text>
            </View>
          ))}
        </Carousel>
      </View>

      <Horizontal justifyContent="center" gap={4} marginTop={4}>
        {stepIndices.map((index) => (
          <Button
            key={index}
            onClick={() => setActiveIndex(index)}
            variant={activeIndex === index ? 'filled' : 'outline'}
          >
            {slides[index].text}
          </Button>
        ))}
      </Horizontal>
    </View>
  );
};
