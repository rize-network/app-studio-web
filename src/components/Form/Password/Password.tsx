import React from 'react';

import { PasswordProps } from './Password/Password.props';
import { usePasswordState } from './Password/Password.state';
import { View } from 'app-studio';
import { CloseEyeIcon, OpenEyeIcon } from '../../Icon/Icon';
import TextFieldView from '../TextField/TextField/TextField.view';

/**
 * The reveal toggle has to fit inside the field, so it scales with it.
 *
 * A field of size `s` leaves `minHeight - 2 * paddingVertical - 2` for its
 * content (see `Input/fieldSizes`). At `xs` that is 14px, so the previously
 * hard-coded 16px box made every `xs` Password 2px taller than the size it
 * declared, while every other field rendered exactly 24px.
 */
const TOGGLE_BOX: Record<string, number> = {
  xs: 14,
  sm: 16,
  md: 16,
  lg: 18,
  xl: 20,
};

const PasswordComponent: React.FC<PasswordProps> = ({
  visibleIcon,
  hiddenIcon,
  ...props
}) => {
  const { isVisible, setIsVisible, ...passwordProps } = usePasswordState(props);

  const box = TOGGLE_BOX[props.size ?? 'md'] ?? TOGGLE_BOX.md;
  const icon = box - 2;

  return (
    <TextFieldView
      {...passwordProps}
      type={isVisible ? 'text' : 'password'}
      isClearable={false}
      right={
        <View
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={`${box}px`}
          height={`${box}px`}
          minWidth={`${box}px`}
          color="color-gray-500"
          cursor={props.isDisabled ? 'not-allowed' : 'pointer'}
          transition="color 0.2s ease"
          onClick={() => {
            if (!props.isDisabled) {
              setIsVisible(!isVisible);
            }
          }}
        >
          {isVisible
            ? visibleIcon ?? <OpenEyeIcon widthHeight={icon} />
            : hiddenIcon ?? <CloseEyeIcon widthHeight={icon} />}
        </View>
      }
    />
  );
};

/**
 * To allow users to securely enter sensitive information
 */
export const Password = PasswordComponent;
