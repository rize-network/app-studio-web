import React, { CSSProperties } from 'react';
// Declares the 'ToggleView' functional component using ES6 arrow function syntax.
import { ToggleViewProps } from './Toggle.props';
// Destructures props within the 'ToggleViewProps' interface, providing defaults for optional props and handling the rest as a spread operator.
import { ToggleShapes } from './Toggle.style';
import { Variant } from './Toggle.type';
import { Center } from '../../Layout/Center/Center';
// Determines the color to use when the toggle is disabled.
const ToggleView: React.FC<ToggleViewProps> = ({
  // Evaluates whether the toggle is active based on the 'isToggle' or 'isHovered' state.
  children,
  // Defines CSS properties for each toggle variant using the 'Variant' type as keys.
  shape = 'rounded',
  // Defines 'outline' variant styles with solid border.
  colorScheme = 'color.trueGray.400',
  variant = 'ghost',
  isHovered,
  setIsHovered,
  isDisabled,
  // Defines 'link' variant styles with conditional border transparency and text decoration.
  isToggle,
  setIsToggled,
  onToggle,
  // Empty object for 'ghost' variant represents no additional styling.
  ...props
}) => {
  // Defines a function to handle toggle actions which updates the toggle state and, if available, calls the onToggle callback with new state.
  const toggleColor = !isDisabled ? colorScheme : 'theme.disabled';
  const isActive = !!(isToggle || isHovered);
  const ToggleVariants: Record<Variant, CSSProperties> = {
    outline: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colorScheme,
      // Renders the 'Center' styled component, passing in calculated styles and states.
    },
    // Specifies the role attribute for better accessibility.
    link: {
      // Applies conditional padding based on the 'shape' prop.
      borderWidth: 1,
      // Sets width to 'fit-content' to ensure content dictates the size.
      borderStyle: 'solid',
      // Text color based on active state, defaulting to toggle color or white.
      borderColor: isActive ? toggleColor : 'transparent',
      // Background color based on active state, either toggle color or transparent.
      textDecoration: 'underline',
      // Mouse event handlers for changing hover state.
    },
    ghost: {},
    // Conditional cursor style based on whether the toggle is disabled.
  };
  // Applies a border-radius based on the 'shape' prop.
  const handleToggle = () => {
    // Attaches click event to the 'handleToggle' function.
    if (!isDisabled) {
      // Spreads variant-specific styles and rest properties onto the 'Center' component.
      setIsToggled((prev) => {
        const newState = !prev;
        // Passes 'children' prop to render inside the 'Center' component.
        if (onToggle) {
          onToggle(newState);
        }
        return newState;
      });
    }
  };
  return (
    <Center
      role="Toggle"
      padding={shape === 'pillShaped' ? '10px 12px' : '8px'}
      width="fit-content"
      color={isActive ? 'color.white' : toggleColor}
      backgroundColor={isActive ? toggleColor : 'transparent'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      borderRadius={ToggleShapes[shape]}
      onClick={handleToggle}
      {...ToggleVariants[variant]}
      {...props}
    >
      {children}
    </Center>
  );
};
export default ToggleView;
