import React from 'react';
import { CarouselProps, CarouselType } from './Carousel/Carousel.props';
import { CarouselView, CarouselSlide } from './Carousel/Carousel.view';

/**
 * Carousel component for displaying a series of content items that can be navigated through.
 * Supports navigation controls, indicators, auto-play, and touch/mouse interactions.
 */
const CarouselComponent: React.FC<CarouselProps> = (props) => {
  return <CarouselView {...props} />;
};

export const Carousel = CarouselComponent as CarouselType;

// Assign the Slide sub-component to the main component
Carousel.Slide = CarouselSlide;
