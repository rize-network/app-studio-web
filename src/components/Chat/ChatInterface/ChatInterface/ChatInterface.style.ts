/**
 * ChatInterface Styles
 */

import { ViewProps } from 'app-studio';

export const defaultContainerStyles: ViewProps = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  backgroundColor: 'transparent',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 10,
};

export const defaultMessagesContainerStyles: ViewProps = {
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '2.5px',
  maxWidth: '100%',
  zIndex: 10,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

export const defaultInputContainerStyles: ViewProps = {
  paddingBottom: '1rem',
  width: '100%',
  backgroundColor: 'transparent',
};

export const defaultControlsContainerStyles: ViewProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 'sm',
  backgroundColor: 'transparent',
};

export const backgroundImageStyles: ViewProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  zIndex: 0,
};

export const backgroundOverlayStyles: ViewProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(to top, var(--color-white) 0%, rgba(255, 255, 255, 0.85) 100%)',
  zIndex: 0,
  '@media (prefers-color-scheme: dark)': {
    background:
      'linear-gradient(to top, var(--color-gray-900) 0%, rgba(17, 24, 39, 0.9) 100%)',
  },
};
