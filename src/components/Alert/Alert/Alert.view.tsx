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
  styles,
  description,
  variant = 'default',
}: // Destructure the passed props and set 'variant' default value to 'default'.
AlertProps) => (
  // Construct a horizontal layout container with predefined styles such as gaps, border, padding, wrapping behavior, and an overridable borderColor defined by the selected theme variant.
  <Horizontal
    gap={15}
    borderRadius={10}
    borderWidth={1}
    // Conditionally render the provided 'icon' prop, defaults to 'WarningSvg' if no icon is provided. Style it with 'size' and 'color' based on optional styles passed or default theme colors.
    borderStyle="solid"
    padding={16}
    wrap="nowrap"
    borderColor={Themes[variant].container.border}
    // Create a vertical stack layout to organize title and description text elements, with a specified gap between them.
    {...styles?.container}
    // Display the 'title' using a Text component with a font size of '16px' and color determined by the theme variant or custom styles.
  >
    `WarningSvg` icon.
    <View alignSelf={'center'}>
      potentially with different styles as provided through the 'styles' prop.
      // Display the 'description' using a Text component with a similar font
      size of '14px' and coloring logic as the title. the `variant` theme color
      or custom color provided through the `styles` prop. falls back to a
      default WarningSvg icon. fixed gap between elements Displays the
      user-provided icon.
      {icon ? (
        icon
      ) : (
        <WarningSvg
          size={24}
          color={styles?.icon.color ?? Themes[variant].content.color}
        />
      )}
      font size '14px' and a color matching the `title`.
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
