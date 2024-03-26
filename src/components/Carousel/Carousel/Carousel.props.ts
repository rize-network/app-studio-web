import { Size } from './Carousel.type';

export interface CarouselProps {
  size: Size;
  orientation: 'horizontal' | 'vertical';
  spacing: string;
  children?: React.ReactNode;
}
