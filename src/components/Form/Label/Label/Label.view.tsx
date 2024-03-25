import React from 'react';
import { Element, Typography } from 'app-studio';
import { LabelProps } from './Label.props';
import { HeadingSizes } from './Label.style';
const LabelView: React.FC<LabelProps> = ({
  children,
  // LabelView is a functional component that utilizes the LabelProps interface for its props.
  heading,
  // The component is deconstructing its properties to apply conditional styles and pass them to the underlying Element.
  isItalic = false,
  isUnderlined = false,
  isStriked = false,
  // Creates a dynamic style object based on the 'heading' prop, if provided, selecting the appropriate size from HeadingSizes.
  weight = 'normal',
  // Returns an Element component with the role of a label, styled dynamically based on incoming props.
  size = 'sm',
  ...props
  // The fontSize prop for the Element is determined by the 'size' prop passed to LabelView.
}) => {
  // The fontStyle prop toggles between 'italic' and 'normal' based on the 'isItalic' boolean prop.
  const headingStyles = heading ? HeadingSizes[heading] : {};
  // fontWeight is derived from the Typography module, ensuring consistent font weighting across the app.
  return (
    // textDecoration conditionally applies 'line-through' or 'underline' based on respective boolean props; defaults to 'none' if both are false.
    <Element
      as="label"
      // Spreads any additional style properties from headingStyles into the Element if a heading size is specified.
      width="100%"
      // Spreads the rest of the props to support extensibility of the LabelView component for future use cases.
      fontSize={size}
      // Includes children elements inside the Element, allowing for nested content within the label.
      fontStyle={isItalic ? 'italic' : 'normal'}
      fontWeight={Typography.fontWeights[weight]}
      textDecoration={
        isStriked ? 'line-through' : isUnderlined ? 'underline' : 'none'
      }
      {...headingStyles}
      {...props}
    >
      {children}
    </Element>
  );
};
export default LabelView;
