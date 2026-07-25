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

Wrap your app in `ThemeProvider` — it defines the CSS variables that every
`color-*` and `theme-*` token resolves against. Without it, tokens fall back to
undefined variables and components render uncoloured.

```jsx
import React from 'react';
import { ThemeProvider, Vertical } from 'app-studio';
import { Button, Text } from '@app-studio/components';

function App() {
  return (
    <ThemeProvider>
      <Vertical gap={12} padding={24}>
        <Text>Hello, world!</Text>
        <Button onClick={() => console.log('Clicked!')}>Click me</Button>
      </Vertical>
    </ThemeProvider>
  );
}
```

### Baseline document styles

This library styles **components, not the document**. It ships no CSS reset, so
the page keeps the browser's defaults until you set them yourself. On a fresh
project that shows up immediately as:

- body text in the browser's serif font, because nothing sets a `font-family`;
- an 8px `body` margin, which makes any `100vh` shell overflow by 16px and
  produces a scrollbar you did not ask for;
- blue underlined `<a>` elements, including router links wrapping components.

A dozen lines are enough, and none of it competes with the design system:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}
```

Keep it to resets. Colours, spacing and typography should still come from the
theme so they stay adaptive to light/dark mode.

### Control sizes line up

Form controls of the same `size` render at the same height, so they can sit in a
row without extra alignment work. At `md` — the default — `TextField`, `Select`
and `Button` are all exactly 40px:

```jsx
<Horizontal gap={10} alignItems="center">
  <TextField name="search" placeholder="Search…" />
  <Select name="status" placeholder="Any status" options={options} />
  <Button variant="outline">Filter</Button>
</Horizontal>
```

The scale is `xs` 24, `sm` 32, `md` 40, `lg` 48, `xl` 56, and it is shared: it
lives in `Input/fieldSizes` and is applied by the field shell, so `TextField`,
`Password`, `Select`, `DatePicker`, `TagInput` and `Button` all render exactly
their declared height at every size — including bordered variants, which used to
come out 2px taller.

`ComboBox` is the exception: it takes no `size` prop
(`Omit<InputProps, 'size'>`) and always renders at 40px, matching `md`.

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
