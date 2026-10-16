import { ViewProps } from 'app-studio';
// Defines default styling for a basic background component, providing a standard layout for both the background container and its overlaid content.
export const DefaultBackgroundStyles = {
  // Styles for the main container that wraps the background content, ensuring it's relatively positioned and centers its children.
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewProps,
  // Styles for the content layer that appears above the background, ensuring it maintains a relative position and is visible.
  content: {
    position: 'relative',
    zIndex: 1,
  } as ViewProps,
};
// Defines styles for a background component designed to display an Aurora-like gradient effect, covering the full viewport height.
export const AuroraStyles = {
  // Styles for the main container that holds the Aurora gradient, ensuring it takes full viewport height and centers its children.
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewProps,
  // Styles for the gradient element itself, creating the visual effect of an Aurora with blurred edges and dynamic sizing.
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
// Defines styles for a background component that uses an image, providing styling for the container, the image itself, and overlaid content.
export const BackgroundImageStyles = {
  // Styles for the main container of the background image, ensuring it is relatively positioned, centers content, and handles overflow.
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as ViewProps,
  // Styles for the background image element, ensuring it covers the full container, is centered, and doesn't repeat.
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
  // Styles for the content layer that appears over the background image, ensuring it fills the space and is visible.
  content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 2,
  } as ViewProps,
};
// Defines styles for a background component that uses a video, including styling for the container, the video element, and content.
export const BackgroundVideoStyles = {
  // Styles for the main container of the background video, ensuring it is relatively positioned, centers content, and hides overflow.
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as ViewProps,
  // Styles for the background video element, ensuring it covers the full container while maintaining its aspect ratio.
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as ViewProps,
  // Styles for the content layer that appears over the background video, ensuring it has a higher z-index to be visible.
  content: {
    position: 'relative',
    zIndex: 2,
  } as ViewProps,
};
// Defines styles for a background component that creates a 'meteors shower' visual effect, including styles for the container and individual meteor elements.
export const MeteorsStyles = {
  // Styles for the main container that hosts the meteor elements, providing a relative positioning context for the falling meteors.
  container: {
    position: 'relative',
  } as ViewProps,
  // Styles for an individual meteor particle, defining its initial shape, color, shadow, and rotational transform.
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
  // Styles for the tail trailing behind an individual meteor particle, giving it a subtle glow and extending its visual effect.
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
