import { ViewProps } from 'app-studio';
import { IndicatorVariant } from './Carousel.type';

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
