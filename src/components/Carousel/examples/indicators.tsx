import React from 'react';
import { Carousel } from '../Carousel';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { IndicatorVariant } from '../Carousel/Carousel.type';

export const IndicatorsDemo = () => {
  // Create an array of slides with different background colors
  const slides = [
    { color: 'color.indigo.500', text: 'Slide 1' },
    { color: 'color.cyan.500', text: 'Slide 2' },
    { color: 'color.amber.500', text: 'Slide 3' },
  ];

  // Different indicator variants
  const indicatorVariants: IndicatorVariant[] = ['dot', 'line', 'number'];

  return (
    <Vertical gap={40}>
      {indicatorVariants.map((variant) => (
        <View key={variant} height="200px" width="100%">
          <Text marginBottom="10px" fontWeight="bold">
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Indicators
          </Text>
          <Carousel 
            indicatorVariant={variant}
            indicatorPosition="bottom"
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
      ))}
    </Vertical>
  );
};
