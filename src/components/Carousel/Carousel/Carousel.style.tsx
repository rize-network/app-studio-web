import { CSSProperties } from 'react';
import { Size } from './Carousel.type';

export const CarouselSizes: Record<Size, CSSProperties> = {
  xs: {
    width: 200, // Adjust values as needed
    height: 100,
    padding: 5,
  },
  sm: {
    width: 300,
    height: 150,
    padding: 10,
  },
  md: {
    width: 400,
    height: 200,
    padding: 15,
  },
  lg: {
    width: 500,
    height: 250,
    padding: 20,
  },
  xl: {
    width: 600,
    height: 300,
    padding: 25,
  },
};
