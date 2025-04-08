import { ViewProps } from 'app-studio';
import {
  CarouselStyles,
  IndicatorPosition,
  IndicatorVariant,
  NavigationPosition,
  SlideDirection,
} from './Carousel.type';

export interface CarouselProps extends Omit<ViewProps, 'position'> {
  /**
   * The slides to be displayed in the carousel
   */
  children: React.ReactNode[];

  /**
   * The index of the initially active slide
   */
  defaultActiveIndex?: number;

  /**
   * Controlled active index
   */
  activeIndex?: number;

  /**
   * Callback when the active slide changes
   */
  onChange?: (index: number) => void;

  /**
   * Whether to show navigation buttons
   */
  showNavigation?: boolean;

  /**
   * Position of the navigation buttons
   */
  navigationPosition?: NavigationPosition;

  /**
   * Custom previous button element
   */
  prevButton?: React.ReactNode;

  /**
   * Custom next button element
   */
  nextButton?: React.ReactNode;

  /**
   * Whether to show slide indicators
   */
  showIndicators?: boolean;

  /**
   * Position of the indicators
   */
  indicatorPosition?: IndicatorPosition;

  /**
   * Visual style of the indicators
   */
  indicatorVariant?: IndicatorVariant;

  /**
   * Whether to enable auto-play
   */
  autoPlay?: boolean;

  /**
   * Interval for auto-play in milliseconds
   */
  autoPlayInterval?: number;

  /**
   * Whether to pause auto-play on hover
   */
  pauseOnHover?: boolean;

  /**
   * Whether to loop the carousel
   */
  infinite?: boolean;

  /**
   * Direction of slide movement
   */
  direction?: SlideDirection;

  /**
   * Duration of the slide transition in milliseconds
   */
  transitionDuration?: number;

  /**
   * Custom styles for different parts of the carousel
   */
  views?: CarouselStyles;
}

export interface CarouselSlideProps extends ViewProps {
  /**
   * The content of the slide
   */
  children: React.ReactNode;

  /**
   * Whether the slide is currently active
   */
  isActive?: boolean;

  /**
   * Index of the slide
   */
  index?: number;

  /**
   * Custom styles for the slide
   */
  views?: ViewProps;
}

export interface CarouselType extends React.FC<CarouselProps> {
  /**
   * Individual slide component
   */
  Slide: React.FC<CarouselSlideProps>;
}
