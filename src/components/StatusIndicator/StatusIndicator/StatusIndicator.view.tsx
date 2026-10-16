import React from 'react';
import { Horizontal, View, useTheme } from 'app-studio';
import { Text } from 'app-studio';
import { StatusIndicatorProps } from './StatusIndicator.props';
import { getThemes } from './StatusIndicator.style';
// Defines the functional component responsible for rendering the Status Indicator UI.
export const StatusIndicatorView = ({
  // Represents the text label displayed alongside the status indicator.
  label,
  // Specifies the current status of the indicator, influencing its visual styling. Defaults to 'default'.
  status = 'default',
  // An object allowing custom styling or overriding default view properties for various parts of the indicator.
  views,
  // Allows overriding the theme mode specifically for this indicator, separate from the global theme.
  themeMode: elementMode,
  // Gathers any additional HTML attributes or props passed to the component's root element.
  ...props
}: StatusIndicatorProps) => {
  // Retrieves the current global theme mode from the application's theme context.
  const { themeMode } = useTheme();
  // Determines the effective theme mode for the indicator, preferring `elementMode` if provided, otherwise using the global `themeMode`.
  const currentThemeMode = elementMode || themeMode;
  // Fetches the specific styling themes based on the resolved `currentThemeMode` for the indicator's elements.
  const themes = getThemes(currentThemeMode);
  return (
    <Horizontal
      alignItems="center"
      gap={8}
      // `status` is the ARIA role this component actually is; the previous
      // "status-indicator" was not a role and failed axe's aria-roles rule
      // (critical) on every consumer screen.
      role="status"
      {...views?.container}
      {...props}
    >
      <View
        // Decoration: the label carries the meaning, the dot repeats it in
        // color. `data-role` keeps the styling/test hook without entering
        // the accessibility tree.
        data-role="status-dot"
        aria-hidden="true"
        width="8px"
        height="8px"
        borderRadius="50%"
        {...themes[status].indicator}
        {...views?.indicator}
      />
      {label && (
        <Text
          data-role="status-label"
          fontSize="14px"
          lineHeight="20px"
          {...themes[status].label}
          {...views?.label}
        >
          {label}
        </Text>
      )}
    </Horizontal>
  );
};
