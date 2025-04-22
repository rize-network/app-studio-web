# Dark Mode Implementation Guide

This guide explains how to implement proper dark mode support in app-studio components.

## Overview

App-studio provides built-in theme support through the `useTheme` hook, which gives access to:
1. `themeMode` - The current theme mode ("light" or "dark")
2. `getColor` function - A function that gets the appropriate color based on the theme mode

Instead of using CSS media queries like `@media (prefers-color-scheme: dark)`, we should use app-studio's theming system.

## Implementation Steps

### 1. Update Component Props

Add a `themeMode` prop to your component's props interface:

```tsx
export interface MyComponentProps extends ViewProps {
  // Other props...

  /**
   * Optional theme mode override ('light' or 'dark')
   * If not provided, the component will use the theme mode from context
   */
  themeMode?: string;
}
```

### 2. Update Component Style Functions

Create theme-aware style functions that accept the theme mode:

```tsx
// Before
export const MyComponentVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color.white',
    color: 'color.gray.900',
  },
  // Other variants...
};

// After
export const getMyComponentVariants = (themeMode: string): Record<Variant, ViewProps> => {

  return {
    default: {
      backgroundColor:  'white',
      color: 'color.gray.900',
    },
    // Other variants with dark mode support...
  };
};

// For backward compatibility
export const MyComponentVariants = getMyComponentVariants('light');
```

### 3. Update Component View

Update your component view to use the theme mode:

```tsx
export const MyComponentView: React.FC<MyComponentProps> = ({
  // Other props...
  themeMode: elementMode,
  ...props
}) => {
  const { themeMode } = useTheme();
  const currentThemeMode = elementMode || themeMode;

  // Use the current theme mode to get the appropriate styles
  const variantStyles = getMyComponentVariants(currentThemeMode)[variant];

  // Rest of your component...
}
```

### 4. Use the `getColor` Function

When you need to get a color value, use the `getColor` function:

```tsx
const { getColor, themeMode } = useTheme();
const currentThemeMode = elementMode || themeMode;
const backgroundColor = getColor('theme.primary', {themeMode:currentThemeMode});
```

### 5. Create Examples

Create examples that demonstrate both light and dark mode:

```tsx
export const ThemeModeExample = () => {
  return (
    <Vertical gap={20}>
      <Text>Light Mode</Text>
      <MyComponent themeMode="light" />

      <Text>Dark Mode</Text>
      <MyComponent themeMode="dark" />
    </Vertical>
  );
};
```

## Best Practices

1. **Always use theme variables** - Use theme variables like `theme.primary` or `color.gray.800` instead of hardcoded colors.
2. **Provide sensible defaults** - Make sure your component looks good in both light and dark modes.
3. **Test both modes** - Always test your component in both light and dark modes.
4. **Consider contrast** - Ensure text has sufficient contrast against backgrounds in both modes.
5. **Propagate theme mode** - If your component has child components, pass the theme mode down to them.

## Example Implementations

### Card Component

See the Card component for a complete implementation of dark mode support:
- `src/components/Card/Card/Card.props.ts` - Uses `themeMode` prop from ViewProps
- `src/components/Card/Card/Card.style.ts` - Updated style functions to use theme mode
- `src/components/Card/Card/Card.view.tsx` - Updated view to use theme mode
- `src/components/Card/examples/darkModeExample.tsx` - Example showing both modes

### Alert Component

The Alert component demonstrates how to implement dark mode for a component with variant themes:
- `src/components/Alert/Alert/Alert.style.tsx` - Created `getThemes` function that returns different styles based on theme mode
- `src/components/Alert/Alert/Alert.view.tsx` - Updated to use `useTheme` hook and pass the current theme mode to `getThemes`
- `src/components/Alert/examples/darkMode.tsx` - Example showing both light and dark mode alerts

### Badge Component

The Badge component shows how to implement dark mode for a simpler component:
- `src/components/Badge/Badge/Badge.style.tsx` - Created `getBadgeVariants` function for theme-aware styling
- `src/components/Badge/Badge/Badge.view.tsx` - Updated to use the current theme mode
- `src/components/Badge/examples/darkMode.tsx` - Example showing badges in both modes
