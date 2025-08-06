import { ViewProps } from 'app-studio';

/**
 * Default styles for Background components
 */
export const DefaultBackgroundStyles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewProps,

  content: {
    position: 'relative',
    zIndex: 1,
  } as ViewProps,
};

/**
 * Aurora background styles
 */
export const AuroraStyles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewProps,

  gradient: {
    position: 'absolute',
    inset: '-10px',
    opacity: 0.5,
    pointerEvents: 'none',
    filter: 'blur(10px)',
    backgroundSize: '300% 200%',
    backgroundPosition: '50% 50%, 50% 50%',
  } as ViewProps,
};

/**
 * Background Image styles
 */
export const BackgroundImageStyles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as ViewProps,

  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
  } as ViewProps,

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  } as ViewProps,

  content: {
    position: 'relative',
    zIndex: 2,
  } as ViewProps,
};

/**
 * Meteors effect styles
 */
export const MeteorsStyles = {
  container: {
    position: 'relative',
  } as ViewProps,

  meteor: {
    position: 'absolute',
    top: '0px',
    width: '2px',
    height: '2px',
    borderRadius: '9999px',
    backgroundColor: 'white',
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
    transform: 'rotate(215deg)',
  } as ViewProps,

  meteorTail: {
    position: 'absolute',
    top: '-1px',
    left: '-1px',
    width: '1px',
    height: '1px',
    borderRadius: '9999px',
    backgroundColor: 'white',
    boxShadow: '0 10px 0 1px rgba(255, 255, 255, 0.1)',
  } as ViewProps,
};
