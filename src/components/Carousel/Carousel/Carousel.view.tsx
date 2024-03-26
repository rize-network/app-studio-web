import React from 'react';
import { CarouselProps } from './Carousel.props';
import { View } from '../../Layout';
import { CarouselSizes } from './Carousel.style';

const CarouselView: React.FC<CarouselProps> = ({
  size,
  orientation,
  spacing,
  children,
}) => {
  return (
    <View
      display="flex"
      orientation={orientation}
      spacing={spacing}
      {...CarouselSizes[size]}
    >
      {children}
    </View>
  );
};

export default CarouselView;
