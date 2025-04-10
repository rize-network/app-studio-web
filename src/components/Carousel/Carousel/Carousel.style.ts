import { ViewProps } from 'app-studio';
import { IndicatorVariant, CarouselStyles } from './Carousel.type';

export const IndicatorStyles: Record<IndicatorVariant, ViewProps> = {
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'color.gray.300',
    margin: '0 4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  line: {
    width: '20px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: 'color.gray.300',
    margin: '0 4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  number: {
    minWidth: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'color.gray.300',
    margin: '0 4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    transition: 'background-color 0.3s ease',
  },
};

export const ActiveIndicatorStyles: Record<IndicatorVariant, ViewProps> = {
  dot: {
    backgroundColor: 'theme.primary',
  },
  line: {
    backgroundColor: 'theme.primary',
  },
  number: {
    backgroundColor: 'theme.primary',
    color: 'white',
  },
};

export const NavigationButtonStyles: ViewProps = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'color.white',
  color: 'color.gray.800',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
  transition: 'background-color 0.3s ease',
  _hover: {
    backgroundColor: 'color.gray.100',
  },
};

// Default styles for the compound component pattern
export const getDefaultCarouselStyles = (): CarouselStyles => ({
  container: {
    position: 'relative', // Needed for absolute positioning of controls
    overflow: 'hidden', // Clip the content
  },
  content: {
    overflow: 'hidden', // Outer container clips the inner flex container
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    display: 'flex',
    // Basic transition for the slide effect
    transitionProperty: 'transform',
    transitionDuration: '300ms', // Adjust duration as needed
    transitionTimingFunction: 'ease-in-out',
    height: '100%',
  },
  item: {
    flex: '0 0 100%', // Each item takes full width of the content container
    minWidth: 0, // Prevent flex items from expanding based on content
    position: 'relative', // For potential content positioning within the slide
    height: '100%',
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: '16px', // Position from left edge
    transform: 'translateY(-50%)', // Vertically center
    zIndex: 10, // Ensure button is above slides
    ...NavigationButtonStyles,
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: '16px', // Position from right edge
    transform: 'translateY(-50%)', // Vertically center
    zIndex: 10,
    ...NavigationButtonStyles,
  },
});
