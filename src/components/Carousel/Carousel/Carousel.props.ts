import { ViewProps } from 'app-studio';
import { ButtonProps } from '../../Button/Button/Button.props';
import {
  CarouselStyles,
  IndicatorPosition,
  IndicatorVariant,
  NavigationPosition,
  SlideDirection,
  CarouselContextValue,
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
   * Array of specific slide indices to use as steps
   * When provided, the carousel will only navigate to these indices
   */
  stepIndices?: number[];

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

// New compound component props
export interface CarouselContentProps extends ViewProps {
  /**
   * The slides, expected to be CarouselItem components
   */
  children: React.ReactNode;

  /**
   * Custom styling for the content wrapper
   */
  views?: Pick<CarouselStyles, 'content' | 'innerContainer'>;
}

export interface CarouselItemProps extends ViewProps {
  /**
   * The content of the slide
   */
  children: React.ReactNode;

  /**
   * Custom styling for the item
   */
  views?: Pick<CarouselStyles, 'item'>;
}

export interface CarouselPreviousProps extends Omit<ButtonProps, 'views'> {
  /**
   * Custom styling for the button
   */
  views?: Pick<CarouselStyles, 'prevButton'>;
}

export interface CarouselNextProps extends Omit<ButtonProps, 'views'> {
  /**
   * Custom styling for the button
   */
  views?: Pick<CarouselStyles, 'nextButton'>;
}

export interface CarouselType extends React.FC<CarouselProps> {
  /**
   * Individual slide component (legacy)
   */
  Slide: React.FC<CarouselSlideProps>;

  /**
   * Container for carousel items (compound pattern)
   */
  Content: React.FC<CarouselContentProps>;

  /**
   * Individual carousel item (compound pattern)
   */
  Item: React.FC<CarouselItemProps>;

  /**
   * Previous navigation button (compound pattern)
   */
  Previous: React.FC<CarouselPreviousProps>;

  /**
   * Next navigation button (compound pattern)
   */
  Next: React.FC<CarouselNextProps>;
}
