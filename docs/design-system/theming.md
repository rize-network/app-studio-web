# Theming Guide

This guide explains how to use and customize the theming system in the App Studio Web Component Library.

## Theme System Overview

The App Studio Web Component Library uses a theme system that provides consistent styling across all components. The theme includes:

- Color palette
- Typography
- Spacing
- Shapes
- Shadows
- Transitions

## Theme Provider

The `ThemeProvider` component is used to provide theme context to all components:

```jsx
import React from 'react';
import { ThemeProvider } from 'app-studio';
import { Button, Text } from '@app-studio/web';

function App() {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Text>Themed content</Text>
      <Button>Themed button</Button>
    </ThemeProvider>
  );
}
```

## Theme Modes

The library supports light and dark theme modes:

```jsx
import React from 'react';
import { ThemeProvider } from 'app-studio';
import { Button } from '@app-studio/web';

function App() {
  return (
    <ThemeProvider theme={{ mode: 'dark' }}>
      <Button>Dark theme button</Button>
    </ThemeProvider>
  );
}
```

You can also override the theme mode for specific components:

```jsx
import React from 'react';
import { ThemeProvider } from 'app-studio';
import { Button } from '@app-studio/web';

function App() {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Button>Light theme button</Button>
      <Button themeMode="dark">Dark theme button</Button>
    </ThemeProvider>
  );
}
```

## Using Theme Values

Within components, you can access theme values using the `useTheme` hook:

```jsx
import React from 'react';
import { View, useTheme } from 'app-studio';

function ThemedComponent() {
  const { getColor, themeMode } = useTheme();
  
  const primaryColor = getColor('theme-primary', { themeMode });
  const textColor = getColor('theme-text', { themeMode });
  
  return (
    <View backgroundColor={primaryColor} color={textColor}>
      Themed content
    </View>
  );
}
```

## Theme Color Reference

The theme includes the following color categories:

### Semantic Colors

- `theme-primary`: Primary brand color
- `theme-secondary`: Secondary brand color
- `theme-success`: Success state color
- `theme-warning`: Warning state color
- `theme-error`: Error state color
- `theme-info`: Information state color
- `theme-disabled`: Disabled state color

### Neutral Colors

- `color-white`: White
- `color-black`: Black
- `color-gray.50` to `color-gray-900`: Gray scale

### Color Scales

Each color has a scale from 50 (lightest) to 900 (darkest):

- `color-blue.50` to `color-blue-900`
- `color-green.50` to `color-green-900`
- `color-red.50` to `color-red-900`
- `color-yellow.50` to `color-yellow-900`
- `color-purple.50` to `color-purple-900`

## Typography

The theme includes typography settings:

- Font family: Inter/Geist
- Font sizes: From 12px to 48px
- Font weights: From 400 (regular) to 700 (bold)
- Line heights: From 1.2 to 1.8

Example usage:

```jsx
import React from 'react';
import { Text } from '@app-studio/web';

function TypographyExample() {
  return (
    <>
      <Text fontSize={12} fontWeight="normal">Small text</Text>
      <Text fontSize={16} fontWeight="normal">Normal text</Text>
      <Text fontSize={24} fontWeight="bold">Large bold text</Text>
    </>
  );
}
```

## Spacing

The theme uses a 4px grid system for spacing:

- 4px (extra small)
- 8px (small)
- 16px (medium)
- 24px (large)
- 32px (extra large)

Example usage:

```jsx
import React from 'react';
import { View, Horizontal } from 'app-studio';

function SpacingExample() {
  return (
    <View padding={16}>
      <Horizontal gap={8}>
        <View width={50} height={50} backgroundColor="theme-primary" />
        <View width={50} height={50} backgroundColor="theme-secondary" />
      </Horizontal>
    </View>
  );
}
```

## Shapes

The theme includes shape definitions:

- `sharp`: No border radius (0px)
- `rounded`: Small border radius (4px)
- `pillShaped`: Pill shape (9999px)

Example usage:

```jsx
import React from 'react';
import { Button } from '@app-studio/web';

function ShapeExample() {
  return (
    <>
      <Button shape="sharp">Sharp Button</Button>
      <Button shape="rounded">Rounded Button</Button>
      <Button shape="pillShaped">Pill Button</Button>
    </>
  );
}
```

## Shadows

The theme includes shadow definitions:

- `shadow.sm`: Small shadow
- `shadow.md`: Medium shadow
- `shadow.lg`: Large shadow
- `shadow.xl`: Extra large shadow

Example usage:

```jsx
import React from 'react';
import { Card } from '@app-studio/web';

function ShadowExample() {
  return (
    <>
      <Card shadow="shadow.sm">Small Shadow Card</Card>
      <Card shadow="shadow.md">Medium Shadow Card</Card>
      <Card shadow="shadow.lg">Large Shadow Card</Card>
    </>
  );
}
```

## Custom Theming

You can customize the theme by providing a custom theme object to the `ThemeProvider`:

```jsx
import React from 'react';
import { ThemeProvider } from 'app-studio';

const customTheme = {
  mode: 'light',
  colors: {
    primary: '#6200ee',
    secondary: '#03dac6',
    success: '#00c853',
    warning: '#ffab00',
    error: '#b00020',
    info: '#2196f3',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
  },
  // Add other theme customizations
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Component-Specific Styling

You can override the theme for specific components using the `views` prop:

```jsx
import React from 'react';
import { Button } from '@app-studio/web';

function CustomStyledButton() {
  return (
    <Button
      views={{
        container: {
          backgroundColor: '#6200ee',
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      Custom Styled Button
    </Button>
  );
}
```

## Best Practices

- Use theme variables instead of hardcoded values
- Use the `useTheme` hook to access theme values
- Use the `views` prop for component-specific styling
- Use the `themeMode` prop for component-specific theme mode
- Follow the spacing grid system (multiples of 4px)
- Use semantic colors for consistent meaning across the application
