# Introduction to App Studio Web Component Library

The App Studio Web Component Library is a comprehensive, accessible, and customizable React component library built with TypeScript. It provides a wide range of UI components designed to help you build beautiful and functional web applications quickly and efficiently.

## Features

- **40+ UI Components**: From basic elements to complex interactive components
- **Fully Typed**: Built with TypeScript for better developer experience
- **Accessible**: Follows WCAG guidelines for accessibility
- **Customizable**: Easily theme and style components to match your brand
- **Responsive**: Works across all device sizes
- **Form Integration**: Seamless integration with Formik for form handling
- **Modern Design**: Clean, consistent design following best practices

## Installation

```bash
npm install @app-studio/web
# or
yarn add @app-studio/web
```

## Quick Start

```jsx
import React from 'react';
import { Button, Text } from '@app-studio/web';

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
