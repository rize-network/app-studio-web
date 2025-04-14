/**
 * LoadingIndicator Styles
 */

import { ViewProps } from 'app-studio';
import { LoadingIndicatorSize } from './LoadingIndicator.type';

export const containerStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'sm',
};

export const sizeMap: Record<LoadingIndicatorSize, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

export const dotSizeMap: Record<LoadingIndicatorSize, number> = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
};

export const spinnerStyles = (
  size: LoadingIndicatorSize,
  color: string
): ViewProps => ({
  width: `${sizeMap[size]}px`,
  height: `${sizeMap[size]}px`,
  borderRadius: '50%',
  border: '2px solid',
  borderColor: `${color} transparent ${color} transparent`,
  animation: 'spin 1.2s linear infinite',
});

export const dotContainerStyles: ViewProps = {
  display: 'flex',
  gap: '4px',
};

export const dotStyles = (
  size: LoadingIndicatorSize,
  color: string,
  index: number
): ViewProps => ({
  width: `${dotSizeMap[size]}px`,
  height: `${dotSizeMap[size]}px`,
  borderRadius: '50%',
  backgroundColor: color,
  animation: `pulse 1.4s ease-in-out ${index * 0.16}s infinite`,
});

export const typingContainerStyles: ViewProps = {
  display: 'flex',
  gap: '4px',
  alignItems: 'flex-end',
};

export const typingDotStyles = (
  size: LoadingIndicatorSize,
  color: string,
  index: number
): ViewProps => ({
  width: `${dotSizeMap[size]}px`,
  height: `${dotSizeMap[size]}px`,
  borderRadius: '50%',
  backgroundColor: color,
  animation: `typing 1.4s ease-in-out ${index * 0.16}s infinite`,
});
