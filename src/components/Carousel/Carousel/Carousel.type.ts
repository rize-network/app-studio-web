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
}
