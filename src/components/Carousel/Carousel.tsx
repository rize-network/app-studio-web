import React from 'react';
import { CarouselProps, CarouselType } from './Carousel/Carousel.props';
import {
  CarouselView,
  CarouselSlide,
  CarouselContentComponent,
  CarouselItemComponent,
  CarouselPreviousComponent,
  CarouselNextComponent,
} from './Carousel/Carousel.view';
// This file defines the main Carousel compound component, which acts as the primary interface and assembler for its associated sub-components such as Slide, Content, Item, Previous, and Next.
const CarouselComponent: React.FC<CarouselProps> = (props) => {
  return <CarouselView {...props} />;
};
export const Carousel = CarouselComponent as CarouselType;
Carousel.Slide = CarouselSlide;
Carousel.Content = CarouselContentComponent;
Carousel.Item = CarouselItemComponent;
Carousel.Previous = CarouselPreviousComponent;
Carousel.Next = CarouselNextComponent;
