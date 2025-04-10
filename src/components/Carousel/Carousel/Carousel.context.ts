import React, { createContext, useContext } from 'react';
import { CarouselContextValue } from './Carousel.type';

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      'Carousel compound components must be used within <Carousel>'
    );
  }
  return context;
};
