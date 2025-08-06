import React from 'react';

import { ColorInputProps } from '../Form/ColorInput/ColorInput/ColorInput.props';
import { useColorInputState } from '../Form/ColorInput/ColorInput/ColorInput.state';
import ColorInputView from '../Form/ColorInput/ColorInput/ColorInput.view';
import { useFormikInput } from './Formik.Hook';

const ColorInputComponent: React.FC<ColorInputProps> = (props) => {
  const formProps = useFormikInput(props);

  const colorInputStates = useColorInputState(formProps);
  return <ColorInputView {...colorInputStates} {...formProps} />;
};

/**
 * Color input allows users to select a color from a predefined palette or enter a custom color.
 */
export const FormikColorInput = ColorInputComponent;
