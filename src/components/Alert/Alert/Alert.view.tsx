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
  // The AlertView component is a functional component using object destructuring to infer props from AlertProps.
  styles,
  description,
  variant = 'default',
}: AlertProps) => (
  <Horizontal
    // Setting up the outermost layout as a horizontal container with specific gap, border, and padding properties, which can be further customized with styles.
    gap={15}
    borderRadius={10}
    borderWidth={1}
    borderStyle="solid"
    padding={16}
    // Allows the styles object that may be passed as a prop to override the default container styles.
    wrap="nowrap"
    borderColor={Themes[variant].container.border}
    // The View component is used to wrap the alert icon, self-aligning to the center.
    {...styles?.container}
  >
    <View alignSelf={'center'}>
      // Conditionally renders the provided icon prop if it exists, otherwise
      falls back to a default WarningSvg icon. fixed gap between elements //
      Displays the user-provided icon.
      {icon ? (
        icon
      ) : (
        // Renders the WarningSvg as a fallback with predefined size and color, which can be overridden by icon props.
        <WarningSvg
          size={24}
          color={styles?.icon.color ?? Themes[variant].content.color}
        />
      )}
    </View>
    <Vertical gap={10}>
      // The Vertical container is used to stack the title and description Text
      components with a fixed gap between them.
      <Text
        fontSize="16px"
        // The Text component displays the title, with fontSize and color controlled by the variant and potentially overridden by styles.
        color={Themes[variant].content.color}
        {...styles?.title}
      >
        {title}
      </Text>
      <Text
        // Another Text component for the description featuring a slightly smaller fontSize and same theming options as the title.
        fontSize="14px"
        color={Themes[variant].content.color}
        {...styles?.description}
      >
        {description}
      </Text>
    </Vertical>
  </Horizontal>
);
