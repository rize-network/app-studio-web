import { createContext, useContext } from 'react';
import { CarouselContextValue } from './Carousel.type';
// Initializes the React Context for Carousel data, allowing child components to consume its value.
export const CarouselContext = createContext<CarouselContextValue | null>(null);
// Defines a custom hook to provide convenient access to the CarouselContext, simplifying data retrieval.
export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  // Checks if the Carousel context is available, ensuring the hook is used within the Carousel Provider component.
  if (!context) {
    throw new Error(
      'Carousel compound components must be used within <Carousel>'
    );
  }
  return context;
};
