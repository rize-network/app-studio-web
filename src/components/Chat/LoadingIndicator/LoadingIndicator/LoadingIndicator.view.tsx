/**
 * LoadingIndicator View
 */

import React from 'react';
import { View } from 'app-studio';
import { Horizontal } from '../../../Layout/Horizontal/Horizontal';
import { Text } from '../../../Text/Text';
import { LoadingIndicatorProps } from './LoadingIndicator.props';
import {
  containerStyles,
  spinnerStyles,
  dotContainerStyles,
  dotStyles,
  typingContainerStyles,
  typingDotStyles,
} from './LoadingIndicator.style';

export const LoadingIndicatorView: React.FC<LoadingIndicatorProps> = ({
  size = 'md',
  variant = 'spinner',
  color = 'currentColor',
  text,
  styles = {},
  ...props
}) => {
  // Add keyframes for animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes typing {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderLoadingIndicator = () => {
    switch (variant) {
      case 'spinner':
        return <View {...spinnerStyles(size, color)} {...styles.spinner} />;

      case 'dots':
        return (
          <Horizontal {...dotContainerStyles}>
            {[0, 1, 2].map((i) => (
              <View key={i} {...dotStyles(size, color, i)} {...styles.dot} />
            ))}
          </Horizontal>
        );

      case 'pulse':
        return (
          <Horizontal {...dotContainerStyles}>
            {[0, 1, 2, 4].map((i) => (
              <View key={i} {...dotStyles(size, color, i)} {...styles.dot} />
            ))}
          </Horizontal>
        );

      case 'typing':
        return (
          <Horizontal {...typingContainerStyles}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                {...typingDotStyles(size, color, i)}
                {...styles.dot}
              />
            ))}
          </Horizontal>
        );

      default:
        return <View {...spinnerStyles(size, color)} {...styles.spinner} />;
    }
  };

  return (
    <View {...containerStyles} {...props} {...styles.container}>
      {renderLoadingIndicator()}

      {text && <Text>{text}</Text>}
    </View>
  );
};
