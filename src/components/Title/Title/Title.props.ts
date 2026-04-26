import { ViewProps } from 'app-studio';
import { HighlightStyle, TitleSize, TitleStyles } from './Title.type';
import { AnimationProps } from 'app-studio/dist/utils/constants';
// Defines the properties for the Title component, extending standard view properties.
export interface TitleProps extends ViewProps {
  // Indicates whether the title component is currently visible within the viewport, often used for scroll-triggered animations.
  _isInView?: boolean;
  // The content to be rendered inside the Title component, typically text.
  children: React.ReactNode;
  // Specifies text (or an array of texts) to be visually highlighted within the title's children.
  highlightText?: string | string[];
  // Provides an array of alternative texts to cycle through for highlighting, creating a dynamic effect.
  alternateHighlightText?: string[];
  // Defines animation properties for the highlighted text, allowing for custom motion effects.
  highlightAnimate?: AnimationProps | AnimationProps[];
  // Enables a typewriter effect for the highlighted text, revealing it character by character.
  highlightTypewriter?: boolean;
  // Sets the duration (in milliseconds) for the typewriter animation effect.
  highlightTypewriterDuration?: number;
  // Enables a slide-in effect for the highlighted text.
  highlightSlide?: boolean;
  // Sets the duration (in milliseconds) for the slide-in animation effect.
  highlightSlideDuration?: number;
  // Specifies a stagger delay (in milliseconds) for each character or word in the slide-in animation.
  highlightSlideStagger?: number;
  // Determines if highlighted slides appear one after another sequentially, rather than all at once.
  highlightSlideSequential?: boolean;
  // Defines the visual style for the highlighted text (e.g., underline, background fill).
  highlightStyle?: HighlightStyle;
  // Sets the primary color for the highlight effect.
  highlightColor?: string;
  // Sets a secondary color for complex highlight styles that may involve gradients or dual-color effects.
  highlightSecondaryColor?: string;
  // Defines general animation properties for the entire title component, not just the highlighted parts.
  animate?: AnimationProps | AnimationProps[];
  // Controls how many times the main animation should loop, or 'infinite' for continuous looping.
  animationLoop?: number | 'infinite';
  // Controls how many times the highlight animation should loop, or 'infinite' for continuous looping.
  highlightAnimationLoop?: number | 'infinite';
  // Specifies the predefined size of the title (e.g., 'small', 'medium', 'large').
  size?: TitleSize;
  // Enables or disables responsive behavior for the title, adapting its appearance to different screen sizes.
  responsive?: boolean;
  // Allows custom styling to be applied to different parts or states of the title component.
  views?: TitleStyles;
  // Enables an alternative animation sequence or style for the component.
  alternateAnimation?: boolean;
  // Sets the duration (in milliseconds) for the alternate animation effect.
  alternateDuration?: number;
}
