import React, { CSSProperties } from 'react';
// Importing React and specific type CSSProperties from the 'react' module.
import { BadgeProps } from './Badge.props';
// Importing BadgeProps for typing the component's expected props.
import { BadgeShapes, BadgeSizes, PositionStyles } from './Badge.style';
// Importing styling constants for badge shapes, sizes, and position views.
import { Variant } from './Badge.type';
// Importing Variant type enumeration to type badge variants.
import { Center } from '../../Layout/Center/Center';
// Importing Center component to centrally place child component.
import { Text } from '../../Text/Text';
// Importing Text component to display the content text within the badge.
const BadgeView: React.FC<BadgeProps> = ({
  // Declaring the functional component BadgeView with BadgeProps as its type for props.
  content,
  // Destructuring props with default values for shape, variant, size, and views.
  position,
  shape = 'pillShaped',
  variant = 'filled',
  size = 'md',
  views,
  // Defining BadgeVariants as a record of CSSProperties based on the variant type and associated stylings.
}) => {
  const BadgeVariants: Record<Variant, CSSProperties> = {
    filled: {
      backgroundColor: 'theme.primary',
      color: 'color.white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
    },
    outline: {
      // Combining various style objects along with conditional styles based on props to create the badge's appearance.
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'theme.primary',
      color: 'theme.primary',
    },
    link: {
      backgroundColor: 'transparent',
      // Rendering the Badge component using the Center layout component with combinedStyles applied.
      borderWidth: 1,
      // Inserting a Text component into the badge to display the content, with dynamic size and additional text views.
      borderStyle: 'solid',
      borderColor: 'transparent',
      color: 'theme.primary',
      // Exporting BadgeView to be used in other parts of the application.
      textDecoration: 'underline',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'color.trueGray.400',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
    },
  };
  const combinedStyles: Record<string, any> = {
    width: 'fit-content',
    borderRadius: BadgeShapes[shape],
    ...BadgeSizes[size],
    ...BadgeVariants[variant],
    ...(position ? PositionStyles[position] : {}),
    ...views?.container,
  };
  return (
    <Center role="badge" {...combinedStyles}>
      <Text role="badgeText" size={size} {...views?.text}>
        {content}
      </Text>
    </Center>
  );
};
export default BadgeView;
