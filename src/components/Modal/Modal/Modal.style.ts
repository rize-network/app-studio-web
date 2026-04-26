import { ViewProps } from 'app-studio';
import { Shape, Size } from './Modal.type';
// Defines a mapping of modal container shapes to their corresponding border-radius styles.
export const ContainerShapes: Record<Shape, ViewProps> = {
  square: { borderRadius: 0 },
  rounded: { borderRadius: 8 },
};
// Specifies various alignment configurations for the modal's overlay content.
export const OverlayAlignments: Record<string, ViewProps> = {
  center: { justifyContent: 'center', alignItems: 'center' },
  top: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};
// Maps predefined size categories to specific pixel values for modal header icons.
export const HeaderIconSizes: Record<Size, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};
// Contains keyframe definitions for the modal's entry and exit animations, including opacity and transform.
export const ModalAnimations = {
  enter: {
    opacity: [0, 1],
    transform: ['scale(0.95)', 'scale(1)'],
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
  },
  exit: {
    opacity: [1, 0],
    transform: ['scale(1)', 'scale(0.95)'],
    transition: 'opacity 0.15s ease-in, transform 0.15s ease-in',
  },
};
// Provides the default background and transition styles for the modal overlay.
export const OverlayStyles: ViewProps = {
  backgroundColor: 'color-blackAlpha-400',
  transition: 'background-color 0.2s ease',
};
// Sets the foundational background, shadow, and focus styles for the modal's content container.
export const ContainerBaseStyles: ViewProps = {
  backgroundColor: 'color-white',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
  transition: 'box-shadow 0.2s ease',
  _focusVisible: {
    outline: 'none',
    boxShadow: '0 0 0 2px white, 0 0 0 4px theme-primary',
  },
};
// Groups typography settings for the modal's title and body text, including font size, weight, and color.
export const ModalTypography = {
  title: {
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '28px',
    color: 'color-gray-900',
  },
  body: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    color: 'color-gray-700',
  },
};
