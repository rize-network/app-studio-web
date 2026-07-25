import React from 'react';
import { ButtonProps } from './Button/Button.props';
// Importing TypeScript type for button properties to ensure the component receives the correct props.
import ButtonView from './Button/Button.view';
import { useHover } from 'app-studio';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Importing a custom hook to manage the state specific to the button component.
const ButtonComponent: React.FC<ButtonProps> = (props: any) => {
  const [ref, hover] = useHover<HTMLDivElement>();
  const mergedProps = useMergedDesignSystemComponentProps('button', props);

  // Provenance-aware content color: only THIS instance can declare an
  // explicit content color — via `textColor`, or by passing the CSS-meaning
  // pair (`backgroundColor` + `color`, where `color` keeps its CSS sense).
  // It must be read from the raw instance props BEFORE the design-system
  // merge, which would otherwise let a brand default like Nike's
  // white-on-black `textColor` bleed into e.g. a white carousel control and
  // render its icon white-on-white.
  const explicitTextColor =
    props.textColor ??
    (props.backgroundColor != null && props.color != null
      ? props.color
      : undefined);

  return (
    <ButtonView
      isHovered={hover}
      {...mergedProps}
      explicitTextColor={explicitTextColor}
    />
  );
};
export const Button = ButtonComponent;
