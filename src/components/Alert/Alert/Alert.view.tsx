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
  // Defines the AlertView functional component with destructured props from AlertProps.
  styles,
  // The 'Horizontal' component is used to create a horizontal layout, and is being customized with specific properties such as gap, borderRadius, borderWidth, etc.
  description,
  variant = 'default',
}: // Passes additional custom styles for the container if provided through the 'styles' prop.
AlertProps) => (
  // The 'View' component is utilized here with an alignSelf style to ensure it is centered within its container.
  <Horizontal
    // Conditional rendering: if an 'icon' prop is provided, it is displayed; otherwise, a default WarningSvg icon is used.
    gap={15}
    borderRadius={10}
    borderWidth={1}
    // The icon color is either provided through the 'styles' prop or falls back to a default color as defined in 'Themes[variant].content.color'.
    borderStyle="solid"
    padding={16}
    wrap="nowrap"
    // The 'Vertical' component arranges its children vertically with a fixed gap between them.
    borderColor={Themes[variant].container.border}
    // Renders the 'title' prop using the 'Text' component with custom fontSize and color. The color is defined by the current 'variant' in 'Themes'.
    {...styles?.container}
  >
    <View alignSelf={'center'}>
      // Renders the 'description' prop, similarly to the 'title', but
      potentially with different styles as provided through the 'styles' prop.
      falls back to a default WarningSvg icon. fixed gap between elements
      Displays the user-provided icon.
      {icon ? (
        icon
      ) : (
        <WarningSvg
          size={24}
          color={styles?.icon.color ?? Themes[variant].content.color}
        />
      )}
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
