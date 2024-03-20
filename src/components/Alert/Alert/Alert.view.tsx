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
// Defines the AlertView component which accepts AlertProps as its props for configuration
  styles,
// The component uses the Horizontal layout from the layout library, setting up styles and props for the alert's container
  description,
  variant = 'default',
// Usage of dynamic theming based on the variant prop, which alters the border color of the alert container
}: AlertProps) => (
  <Horizontal
    gap={15}
// Inserts an icon in the view; if an icon is provided as a prop, that icon is used, otherwise a default WarningSvg is displayed
    borderRadius={10}
    borderWidth={1}
// Renders the custom icon passed as a prop if it exists
    borderStyle="solid"
    padding={16}
// Renders the default WarningSvg icon with size and color determined by the variant's theme or custom styles
    wrap="nowrap"
    borderColor={Themes[variant].container.border}
    {...styles?.container}
  >
    <View alignSelf={'center'}>
// Provides a Vertical layout for the text content of the alert with a fixed gap between elements
      {icon ? (
        icon
// Displays the title text with default or variant-specific theming, overridable by custom styles
      ) : (
        <WarningSvg
          size={24}
          color={styles?.icon.color ?? Themes[variant].content.color}
        />
// Displays the description text, following the same theming and customization pattern as the title text
      )}
    </View>
    <Vertical gap={10}>
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
