import React, { useMemo } from 'react';
import { ViewProps, Center, useTheme } from 'app-studio';
import { ToggleViewProps } from './Toggle.props';
import { ToggleShapes, getToggleVariants } from './Toggle.style';
import contrast from 'contrast';

interface Props extends ToggleViewProps {
  views?: {
    container?: ViewProps;
  };
  backgroundColor?: string; // primary candidate for main color
  color?: string; // 2nd candidate for main color
  themeMode?: 'light' | 'dark';
}

const ToggleView: React.FC<Props> = ({
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
  backgroundColor, // primary candidate for main color
  color, // 2nd candidate for main color
  themeMode: elementMode,
  ...props
}) => {
  /* theme helpers */
  const { getColor, themeMode } = useTheme();
  const mode = elementMode ?? themeMode;

  /* MAIN COLOR – determines the entire palette */
  const mainColorKey = backgroundColor ?? color ?? 'theme.primary';
  const mainTone = getColor(isDisabled ? 'theme.disabled' : mainColorKey, {
    themeMode: mode,
  });
  const tone = contrast(mainTone);

  /* variant palette */
  const palette = useMemo(
    () => getToggleVariants(mainTone, tone === 'light'),
    [mainTone, tone]
  );
  const base = palette[variant];

  const isActive = !!(isToggle || isHovered);

  const handleHover = () => setIsHovered(!isHovered);

  const handleToggle = () => {
    if (!isDisabled) {
      setIsToggled((prev) => {
        const newState = !prev;
        if (onToggle) {
          onToggle(newState);
        }
        return newState;
      });
    }
  };

  return (
    <Center
      role="Toggle"
      padding={shape === 'pillShaped' ? '10px 12px' : '8px'}
      width="fit-content"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      borderRadius={ToggleShapes[shape]}
      onClick={handleToggle}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      /* Apply base variant styles */
      {...base}
      /* Override with active state if toggled */
      {...(isActive && {
        backgroundColor: mainTone,
        color: tone === 'light' ? 'color.black' : 'color.white',
      })}
      {...props}
      {...views?.container}
    >
      {children}
    </Center>
  );
};
export default ToggleView;
