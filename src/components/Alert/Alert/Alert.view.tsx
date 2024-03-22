import React from 'react';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { WarningSvg } from '../../Svg';
import { AlertProps } from './Alert.props';
import { Themes } from './Alert.style';
export const AlertView = ({
  icon,
  title,
// The `AlertView` component is created as a functional component using object destructuring to extract properties from `AlertProps`.
  styles,
  description,
// Uses the `Horizontal` layout component to align child components in a row.
  variant = 'default',
// Sets a fixed gap of 15 pixels between child components.
}: 
// Sets a border radius of 10 pixels for rounded corners.
AlertProps) => (
// Applies a border width of 1 pixel around the component.
  <Horizontal
// Sets the border style to 'solid'.
    gap={15}
// Applies a padding of 16 pixels inside the component.
    borderRadius={10}
// Disables wrapping of child components with 'nowrap' ensuring they stay in a single line.
    borderWidth={1}
// Dynamically sets the border color based on the `variant` theme.
    borderStyle="solid"
// Spreads any additional container styles passed in through the `styles` prop, allowing for further customization.
    padding={16}
    wrap="nowrap"
// Positions the icon (or default SVG) in the center vertically within the `Horizontal` component.
    borderColor={Themes[variant].container.border}
    {...styles?.container}
  >
// Conditionally renders the passed `icon` prop or defaults to rendering a `WarningSvg` icon.
    <View alignSelf={'center'}>
      potentially with different styles as provided through the 'styles' prop.
// Determines the size and color of the default `WarningSvg` icon, using the `variant` theme color or custom color provided through the `styles` prop.
      falls back to a default WarningSvg icon. fixed gap between elements
      Displays the user-provided icon.
      {icon ? (
        icon
// Uses the `Vertical` layout component to stack child components vertically with a fixed gap.
      ) : (
        <WarningSvg
// Displays the `title` prop as a `Text` component with font size '16px' and a color based on the `variant` theme.
          size={24}
          color={styles?.icon.color ?? Themes[variant].content.color}
        />
      )}
// Displays the `description` prop as a `Text` component with a smaller font size '14px' and a color matching the `title`.
    </View>
    <Vertical gap={10}>
      components with a fixed gap between them.
      <Text
        fontSize="16px"
        color={Themes[variant].content.color}
        {...styles?.title}
      >
        {title}
      </Text>
      <Text
        fontSize="14px"
        color={Themes[variant].content.color}
        {...styles?.description}
      >
        {description}
      </Text>
    </Vertical>
  </Horizontal>
);
