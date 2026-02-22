import React from 'react';
import { ButtonProps } from './Button/Button.props';
// Importing TypeScript type for button properties to ensure the component receives the correct props.
import ButtonView from './Button/Button.view';
import { useHover } from 'app-studio';
// Importing a custom hook to manage the state specific to the button component.
const ButtonComponent: React.FC<ButtonProps> = (props: any) => {
  const [ref, hover] = useHover<HTMLDivElement>();

  return <ButtonView isHovered={hover} {...props} />;
};
export const Button = ButtonComponent;
