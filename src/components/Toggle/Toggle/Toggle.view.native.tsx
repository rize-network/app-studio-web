import React, { useCallback, useMemo } from 'react';
import { ViewProps, Center, useTheme } from 'app-studio';
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
        {children}
      </Center>
    );
  }
);
export default ToggleView;
