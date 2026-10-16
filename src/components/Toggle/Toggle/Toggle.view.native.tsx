import React, { useCallback, useMemo } from 'react';
import { ViewProps, Center, Text, useTheme } from 'app-studio';
import { ToggleViewProps } from './Toggle.props';
import { ToggleShapes, getToggleVariants } from './Toggle.style';

interface Props extends ToggleViewProps {
  views?: { container?: ViewProps };
  backgroundColor?: string;
  color?: string;
}

const ToggleView: React.FC<Props> = React.memo(
  ({
    children,
    shape = 'rounded',
    variant = 'ghost',
    isHovered,
    setIsHovered,
    isDisabled,
    isToggle,
    setIsToggled,
    onToggle,
    views,
    backgroundColor,
    color,
    themeMode: elementMode,
    ...props
  }) => {
    const { getColor, themeMode } = useTheme();
    const mode = elementMode ?? themeMode;
    const mainColorKey = backgroundColor ?? color ?? 'theme-primary';
    const mainTone = getColor(isDisabled ? 'theme-disabled' : mainColorKey, {
      themeMode: mode,
    });
    const palette = useMemo(
      () => getToggleVariants(mainTone, mode === 'light'),
      [mainTone, mode]
    );
    const base = palette[variant];
    const isActive = !!isToggle;
    // On native, a raw string/number child of a View does not render as visible
    // text (it needs a <Text>), and <Text> doesn't inherit `color` from the
    // parent. Wrap primitive children in a <Text> with the resolved tone.
    const textTone = isActive ? mainTone : (base as any)?.color ?? mainTone;
    const content =
      typeof children === 'string' || typeof children === 'number' ? (
        <Text color={textTone}>{children}</Text>
      ) : (
        children
      );
    const handleToggle = useCallback(() => {
      if (!isDisabled) {
        setIsToggled((prev) => {
          const newState = !prev;
          if (onToggle) onToggle(newState);
          return newState;
        });
      }
    }, [isDisabled, setIsToggled, onToggle]);
    return (
      <Center
        padding={shape === 'pill' ? 12 : 8}
        borderRadius={ToggleShapes[shape]}
        // Always reserve a 1px (transparent) border so toggling the active state
        // — which colors the border in — does not change the box size / shift layout.
        borderWidth={1}
        borderStyle="solid"
        borderColor="transparent"
        onPress={handleToggle}
        onClick={handleToggle}
        {...base}
        {...(isActive && {
          ...(variant === 'link'
            ? { backgroundColor: 'transparent' }
            : {
                backgroundColor:
                  mode === 'light' ? 'color-blue-50' : 'color-blue-100',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: mode === 'light' ? 'color-blue-200' : mainTone,
              }),
          color: mainTone,
        })}
        {...props}
        {...views?.container}
      >
        {content}
      </Center>
    );
  }
);
export default ToggleView;
