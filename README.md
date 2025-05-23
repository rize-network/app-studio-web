# App Studio Web Component Library

![App Studio Web](https://img.shields.io/badge/App%20Studio-Web-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.x-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive, accessible, and customizable React component library built with TypeScript and App Studio. This library provides a wide range of UI components designed to help you build beautiful and functional web applications quickly and efficiently.

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

## Development

### Prerequisites

- Node.js (>= 10.x)
- npm or yarn

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-org/app-studio-web.git
   cd app-studio-web
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the library for production
- `npm test` - Run tests
- `npm run storybook` - Start Storybook for component development
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run prettier` - Run Prettier
- `npm run prettier:fix` - Fix Prettier issues

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

### Creating New Components

Use our component creation script to scaffold new components:

```bash
npm run create-structure -- --name=YourComponentName
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Built with [React](https://reactjs.org/)
- Styled with [App Studio](https://app-studio.dev/)
- Form handling with [Formik](https://formik.org/)
- State management with [Zustand](https://github.com/pmndrs/zustand)
