import { ViewProps } from 'app-studio';
import { ButtonProps } from '../../Button/Button/Button.props';
import {
  CarouselStyles,
  IndicatorPosition,
  IndicatorVariant,
  NavigationPosition,
  SlideDirection,
} from './Carousel.type';
// Defines the interface for the main Carousel component's properties, extending ViewProps and omitting its 'position' property.
export interface CarouselProps extends Omit<ViewProps, 'position'> {
  // An array of React nodes to be rendered as slides within the carousel.
  children: React.ReactNode[];
  defaultActiveIndex?: number;
  // The controlled active slide index. Use with 'onChange' for controlled component behavior.
  activeIndex?: number;
  // Callback function triggered when the active slide changes, receiving the new index.
  onChange?: (index: number) => void;
  // Determines whether navigation buttons (previous/next) are displayed.
  showNavigation?: boolean;
  // Specifies the position of the navigation buttons relative to the carousel.
  navigationPosition?: NavigationPosition;
  // Custom React node to use for the 'previous' navigation button.
  prevButton?: React.ReactNode;
  // Custom React node to use for the 'next' navigation button.
  nextButton?: React.ReactNode;
  // Determines whether slide indicators (dots) are displayed.
  showIndicators?: boolean;
  // Specifies the position of the slide indicators relative to the carousel.
  indicatorPosition?: IndicatorPosition;
  // Defines the visual style variant for the slide indicators.
  indicatorVariant?: IndicatorVariant;
  // Enables or disables automatic slide progression.
  autoPlay?: boolean;
  // The duration in milliseconds between automatic slide transitions when autoPlay is enabled.
  autoPlayInterval?: number;
  // Pauses auto-play when the user hovers over the carousel.
  pauseOnHover?: boolean;
  // Enables or disables infinite looping of the carousel slides.
  infinite?: boolean;
  // Specifies the direction of slide transitions (e.g., 'left', 'right').
  direction?: SlideDirection;
  // The duration of the slide transition animation in milliseconds.
  transitionDuration?: number;
  // An array of indices defining specific steps or accessible slides within the carousel.
  stepIndices?: number[];
  // Styling properties for various parts of the carousel component.
  views?: CarouselStyles;
}
// Defines the properties for an individual CarouselSlide component.
export interface CarouselSlideProps extends ViewProps {
  // The content to be rendered within this specific slide.
  children: React.ReactNode;
  // Indicates whether this slide is currently the active one.
  isActive?: boolean;
  // The numerical index of the slide within the carousel.
  index?: number;
  // Styling properties for the slide container.
  views?: ViewProps;
}
// Defines the properties for the CarouselContent container, which wraps the slides.
export interface CarouselContentProps extends ViewProps {
  // The child elements to be rendered within the carousel content area.
  children: React.ReactNode;
  // Styling properties specifically for the content and inner container.
  views?: Pick<CarouselStyles, 'content' | 'innerContainer'>;
}
// Defines the properties for an individual CarouselItem, a wrapper for each slide's content.
export interface CarouselItemProps extends ViewProps {
  // The child element representing a single item within the carousel.
  children: React.ReactNode;
  // Styling properties specifically for the carousel item.
  views?: Pick<CarouselStyles, 'item'>;
}
// Defines the properties for the 'Previous' navigation button, extending ButtonProps.
export interface CarouselPreviousProps extends Omit<ButtonProps, 'views'> {
  // Styling properties specifically for the previous button.
  views?: Pick<CarouselStyles, 'prevButton'>;
}
// Defines the properties for the 'Next' navigation button, extending ButtonProps.
export interface CarouselNextProps extends Omit<ButtonProps, 'views'> {
  // Styling properties specifically for the next button.
  views?: Pick<CarouselStyles, 'nextButton'>;
}
// Defines the structure of the Carousel component, including its main props and sub-components.
export interface CarouselType extends React.FC<CarouselProps> {
  // The sub-component for rendering individual carousel slides.
  Slide: React.FC<CarouselSlideProps>;
  // The sub-component for the main content area of the carousel.
  Content: React.FC<CarouselContentProps>;
  // The sub-component for individual items/wrappers within the carousel.
  Item: React.FC<CarouselItemProps>;
  // The sub-component for the 'previous' navigation button.
  Previous: React.FC<CarouselPreviousProps>;
  // The sub-component for the 'next' navigation button.
  Next: React.FC<CarouselNextProps>;
}
