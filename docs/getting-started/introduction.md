# Introduction to App Studio Components

`@app-studio/components` is a comprehensive, accessible, and customizable
**cross-platform** component library built with TypeScript and
[`app-studio`](https://app-studio.dev). It ships a **web** build (React + DOM)
and a **React Native** build that share the same public API.

## Features

- **60+ UI Components**: From basic elements to complex interactive components
- **One API on web and React Native**: Metro resolves `.native.tsx` siblings
  automatically; consumers import the same module on both platforms
- **Fully Typed**: TypeScript everywhere; package exports use
  `react-native`/`browser` conditions so `tsc` picks the right typings
- **Accessible**: Follows WCAG guidelines on web
- **Customizable**: CSS-in-props via `app-studio`, theme tokens
  (`theme-primary`, `color-gray-500`, …) work on both platforms
- **Responsive**: Works across all device sizes
- **Cross-platform animations** via `Animation.*` + `react-native-reanimated`
- **Form Integration**: Seamless integration with Formik
- **Modern Design**: Clean, consistent design following best practices

## Installation

### Web

```bash
npm install @app-studio/components app-studio
npm install react react-dom react-router-dom formik zustand lucide-react
```

### React Native

```bash
npm install @app-studio/components app-studio react react-native
# Optional but recommended (degrade gracefully if absent)
npm install lucide-react-native react-native-svg \
            react-native-linear-gradient react-native-reanimated
cd ios && pod install
```

See the dedicated **[React Native guide](./react-native.md)** for the full
compatibility matrix, Reanimated wiring, and Metro/typecheck configuration.

## Quick Start

```jsx
import React from 'react';
import { Button, Text } from '@app-studio/components';

function App() {
  return (
    <div>
      <Text>Hello, world!</Text>
      <Button onClick={() => alert('Clicked!')}>Click me</Button>
    </div>
  );
}
```

## Component Categories

The library includes components in the following categories:

### Layout Components
- View
- Center
- Horizontal
- Vertical
- AspectRatio
- Separator
- Resizable

### Form Components
- Checkbox
- ChatInput
- Radio
- Select
- Switch
- TextArea
- TextField
- OTPInput

### Navigation Components
- Accordion
- Menubar
- NavigationMenu
- Pagination
- Sidebar
- Tabs

### Feedback Components
- Alert
- Modal
- Toast
- Tooltip

### Data Display Components
- Avatar
- Badge
- Card
- Table
- Chart
- Flow
- Tree

### Utility Components
- Button
- Gradient
- Loader
- Text

### Interactive Components
- Carousel
- ContextMenu
- DropdownMenu
- HoverCard
- Slider
- Toggle
- ToggleGroup

## Design System

All components follow a consistent design system with:

- **Typography**: Inter/Geist font, specific sizes/weights
- **Spacing**: 4px grid system
- **Colors**: Neutral palette with semantic colors
- **Rounded corners**: Consistent border radius
- **Transitions**: Subtle animations

## Next Steps

- [Component Usage Guide](./component-usage.md)
- [Theming Guide](../design-system/theming.md)
- [Component Development Guide](../component-development/guide.md)
