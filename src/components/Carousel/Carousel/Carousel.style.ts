import { ViewProps } from 'app-studio';
import { IndicatorVariant, CarouselStyles } from './Carousel.type';
// Defines the base styles for different visual variants of carousel indicators, such as dots, lines, or numbers.
export const IndicatorStyles: Record<IndicatorVariant, ViewProps> = {
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'color-gray-300',
    margin: '0 4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  line: {
    width: '20px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: 'color-gray-300',
    margin: '0 4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  number: {
    minWidth: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'color-gray-300',
    margin: '0 4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    transition: 'background-color 0.3s ease',
  },
};
// Specifies the distinct styles applied to an active (currently selected) carousel indicator, varying by its visual type.
export const ActiveIndicatorStyles: Record<IndicatorVariant, ViewProps> = {
  dot: {
    backgroundColor: 'theme-primary',
  },
  line: {
    backgroundColor: 'theme-primary',
  },
  number: {
    backgroundColor: 'theme-primary',
    color: 'color-white',
  },
};
// Provides a set of common styling properties for the carousel's navigation buttons, ensuring a consistent appearance.
export const NavigationButtonStyles: ViewProps = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'color-white',
  color: 'color-gray-800',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
  transition: 'background-color 0.3s ease',
  _hover: {
    backgroundColor: 'color-gray-100',
  },
};
// A factory function that returns a comprehensive object containing the default CSS-in-JS styles for all major parts of the Carousel component, including the container, content, individual items, and navigation buttons.
export const getDefaultCarouselStyles = (): CarouselStyles => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    display: 'flex',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
    height: '100%',
  },
  item: {
    flex: '0 0 100%',
    minWidth: 0,
    position: 'relative',
    height: '100%',
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: '16px',
    transform: 'translateY(-50%)',
    zIndex: 10,
    ...NavigationButtonStyles,
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: '16px',
    transform: 'translateY(-50%)',
    zIndex: 10,
    ...NavigationButtonStyles,
  },
});
