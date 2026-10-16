import { ViewProps } from 'app-studio';
// Defines the possible positions for the carousel's navigation buttons.
export type NavigationPosition = 'inside' | 'outside';
// Defines the possible positions for the carousel's slide indicators.
export type IndicatorPosition = 'top' | 'bottom';
// Defines the visual style options for the carousel's slide indicators.
export type IndicatorVariant = 'dot' | 'line' | 'number';
// Defines the possible directions in which the carousel slides can move.
export type SlideDirection = 'horizontal' | 'vertical';
// Defines the interface for styling various parts of the Carousel component.
export interface CarouselStyles {
  // Styles for the main container of the carousel.
  container?: ViewProps;
  // Styles for an individual slide within the carousel.
  slide?: ViewProps;
  // Styles for the wrapper element containing all slides.
  slideWrapper?: ViewProps;
  // Styles for the 'previous' navigation button.
  prevButton?: ViewProps;
  // Styles for the 'next' navigation button.
  nextButton?: ViewProps;
  // Styles for the container holding all slide indicators.
  indicators?: ViewProps;
  // Styles for a single slide indicator.
  indicator?: ViewProps;
  // Styles for the currently active slide indicator.
  activeIndicator?: ViewProps;
  // Styles for the primary content area of the carousel.
  content?: ViewProps;
  // Styles for the inner container within the carousel.
  innerContainer?: ViewProps;
  // Styles for an individual item within a slide.
  item?: ViewProps;
}
// Defines the shape of the context object provided by the Carousel, enabling child components to interact with the carousel's state and functions.
export interface CarouselContextValue {
  // The index of the currently active slide.
  currentIndex: number;
  // The total number of slides registered in the carousel.
  totalSlides: number;
  // Function to navigate to a specific slide by its index.
  goToSlide: (index: number) => void;
  // Function to navigate to the next slide.
  goToNext: () => void;
  // Function to navigate to the previous slide.
  goToPrevious: () => void;
  // Indicates if navigation to the next slide is possible.
  canGoNext: boolean;
  // Indicates if navigation to the previous slide is possible.
  canGoPrevious: boolean;
  // Function to register a new slide and get its unique ID.
  registerSlide: () => number;
  // Function to unregister a slide using its unique ID.
  unregisterSlide: (id: number) => void;
  // Optional custom styles applied to the carousel components.
  styles?: CarouselStyles;
  // A unique identifier for the carousel's content.
  contentId: string;
  // Indicates if the carousel should loop infinitely.
  infinite: boolean;
}
