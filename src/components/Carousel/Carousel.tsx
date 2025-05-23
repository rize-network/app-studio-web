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

/**
 * Carousel component for displaying a series of content items that can be navigated through.
 * Supports navigation controls, indicators, auto-play, and touch/mouse interactions.
 *
 * Can be used in two ways:
 * 1. Traditional approach with direct children as slides
 * 2. Compound component pattern with Carousel.Content, Carousel.Item, Carousel.Previous, and Carousel.Next
 */
const CarouselComponent: React.FC<CarouselProps> = (props) => {
  return <CarouselView {...props} />;
};

export const Carousel = CarouselComponent as CarouselType;

// Assign the sub-components to the main component
Carousel.Slide = CarouselSlide; // Legacy approach
Carousel.Content = CarouselContentComponent; // Compound component pattern
Carousel.Item = CarouselItemComponent; // Compound component pattern
Carousel.Previous = CarouselPreviousComponent; // Compound component pattern
Carousel.Next = CarouselNextComponent; // Compound component pattern
