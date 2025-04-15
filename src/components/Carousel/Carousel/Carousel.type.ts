import { ViewProps } from 'app-studio';

export type NavigationPosition = 'inside' | 'outside';
export type IndicatorPosition = 'top' | 'bottom';
export type IndicatorVariant = 'dot' | 'line' | 'number';
export type SlideDirection = 'horizontal' | 'vertical';

export interface CarouselStyles {
  container?: ViewProps;
  slide?: ViewProps;
  slideWrapper?: ViewProps;
  prevButton?: ViewProps;
  nextButton?: ViewProps;
  indicators?: ViewProps;
  indicator?: ViewProps;
  activeIndicator?: ViewProps;
  // New compound component styles
  content?: ViewProps;
  innerContainer?: ViewProps;
  item?: ViewProps;
}

// New types for the compound component pattern
export interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  registerSlide: () => number;
  unregisterSlide: (id: number) => void;
  styles?: CarouselStyles;
  contentId: string;
  infinite: boolean;
}
