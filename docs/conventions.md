# Coding Conventions

This document outlines the coding conventions and standards used in the App Studio Web Component Library. Following these conventions ensures consistency across the codebase and makes it easier for developers to understand, maintain, and contribute to the project.

## Table of Contents

1. [File Structure Conventions](#file-structure-conventions)
2. [Naming Conventions](#naming-conventions)
3. [TypeScript Conventions](#typescript-conventions)
4. [React Conventions](#react-conventions)
5. [Styling Conventions](#styling-conventions)
6. [Component API Conventions](#component-api-conventions)
7. [Documentation Conventions](#documentation-conventions)
8. [Testing Conventions](#testing-conventions)
9. [Git Conventions](#git-conventions)

## File Structure Conventions

### Component Structure

Components follow a consistent file structure:

```
ComponentName/
├── ComponentName.tsx                 # Main component file (exports public API)
├── ComponentName/                    # Inner folder for core files
│   ├── ComponentName.props.ts        # Props interface definitions
│   ├── ComponentName.state.ts        # Custom state hook
│   ├── ComponentName.view.tsx        # Presentational component
│   ├── ComponentName.style.ts        # Style constants and theme mappings
│   └── ComponentName.type.ts         # TypeScript type definitions
└── examples/                         # Usage examples
    ├── default.tsx                   # Default usage example
    ├── variant.tsx                   # Variant-specific example
    ├── size.tsx                      # Size-specific example
    └── index.ts                      # Exports all examples
```

### Import Order

Imports should be organized in the following order:

1. React and React-related imports
2. Third-party library imports
3. App-studio imports
4. Internal component imports
5. Type imports
6. Style imports

Example:

```typescript
// React and React-related imports
import React, { useState, useCallback } from 'react';

// Third-party library imports
import { useFormik } from 'formik';
import * as Yup from 'yup';

// App-studio imports
import { View, Horizontal, Vertical, useTheme } from 'app-studio';

// Internal component imports
import { Text } from '../../Text/Text';
import { Button } from '../../Button/Button';

// Type imports
import { TextFieldProps } from './TextField.props';

// Style imports
import { TextFieldSizes, TextFieldVariants } from './TextField.style';
```

## Naming Conventions

### Component Names

- Use PascalCase for component names: `Button`, `TextField`, `NavigationMenu`
- Use descriptive names that clearly indicate the component's purpose
- Avoid abbreviations unless they are widely understood

### File Names

- Use PascalCase for component files: `Button.tsx`, `TextField.props.ts`
- Use camelCase for utility files: `generateId.ts`, `useMediaQuery.ts`
- Use kebab-case for documentation files: `component-development.md`

### Variable and Function Names

- Use camelCase for variables and functions: `isHovered`, `handleClick`
- Use descriptive names that clearly indicate the variable or function's purpose
- Prefix boolean variables with `is`, `has`, or `should`: `isDisabled`, `hasError`
- Prefix event handlers with `handle` or `on`: `handleClick`, `onSubmit`

### Type and Interface Names

- Use PascalCase for types and interfaces: `ButtonProps`, `Size`, `Variant`
- Suffix props interfaces with `Props`: `ButtonProps`, `TextFieldProps`
- Suffix style interfaces with `Styles`: `ButtonStyles`, `TextFieldStyles`
- Suffix context types with `Context`: `ThemeContext`, `FormContext`

### Enum Names

- Use PascalCase for enum names: `ButtonVariant`, `TextFieldSize`
- Use singular form for enum names: `Size` instead of `Sizes`
- Use PascalCase for enum values if they are used as types: `Size.Small`, `Variant.Primary`
- Use UPPER_SNAKE_CASE for enum values if they are constants: `HTTP_METHOD.GET`, `ERROR_CODE.NOT_FOUND`

## TypeScript Conventions

### Type Definitions

- Define types in `.type.ts` files
- Export types for external use
- Use TypeScript's built-in utility types when appropriate: `Partial<T>`, `Omit<T, K>`, `Pick<T, K>`
- Use union types for finite sets of values: `type Size = 'sm' | 'md' | 'lg'`
- Use interfaces for object shapes: `interface ButtonProps { ... }`

### Type Annotations

- Add type annotations for function parameters and return types
- Use explicit type annotations for complex types
- Use type inference for simple types
- Use `React.FC<Props>` for functional components

### Generics

- Use generics for reusable components and utilities
- Use descriptive names for generic type parameters: `TValue`, `TItem` instead of `T`, `U`
- Constrain generic types when possible: `<T extends HTMLElement>`

### Enums vs Union Types

- Use union types for simple sets of string literals: `type Size = 'sm' | 'md' | 'lg'`
- Use enums for sets of related values that may change or need to be referenced programmatically

## React Conventions

### Functional Components

- Use functional components with hooks instead of class components
- Define components using arrow functions
- Use the `React.FC<Props>` type for components

Example:

```typescript
import React from 'react';
import { ButtonProps } from './Button.props';

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  // Component implementation
  return <div>{/* JSX */}</div>;
};

export const Button = ButtonComponent;
```

### Hooks

- Create custom hooks for reusable logic
- Name custom hooks with the `use` prefix: `useButtonState`, `useFormField`
- Keep hooks focused on a single concern
- Extract complex logic into custom hooks

Example:

```typescript
import { useState, useCallback } from 'react';

export const useButtonState = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  
  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
};
```

### Props

- Define props in a separate `.props.ts` file
- Use destructuring to access props
- Provide default values for optional props
- Document props with JSDoc comments

Example:

```typescript
// Button.props.ts
export interface ButtonProps {
  /**
   * The visual style of the button
   * @default 'filled'
   */
  variant?: 'filled' | 'outline' | 'ghost' | 'link';
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;
  
  /**
   * The function to call when the button is clicked
   */
  onClick?: () => void;
}

// Button.view.tsx
const ButtonView: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'md',
  isDisabled = false,
  onClick,
  ...props
}) => {
  // Component implementation
};
```

### JSX

- Use self-closing tags for components without children: `<Button />`
- Use explicit `children` prop for components with children
- Use fragments (`<>...</>`) to avoid unnecessary wrapper elements
- Use conditional rendering with ternary operators or logical AND (`&&`)

Example:

```typescript
const ButtonView: React.FC<ButtonProps> = ({ children, isDisabled, ...props }) => {
  return (
    <button disabled={isDisabled} {...props}>
      {isDisabled ? (
        <span className="disabled-text">{children}</span>
      ) : (
        children
      )}
    </button>
  );
};
```

## Styling Conventions

### App-Studio Layout Components

Use the layout components from `app-studio` for consistent layout:
- `View`: Base container component
- `Horizontal`: Horizontal flex container
- `Vertical`: Vertical flex container
- `Center`: Centered flex container

Example:

```typescript
import { View, Horizontal, Vertical, Center } from 'app-studio';

const CardView: React.FC<CardProps> = ({ title, content, footer }) => {
  return (
    <View padding={16} borderRadius={8} backgroundColor="white">
      <Vertical gap={16}>
        <Text fontWeight="bold">{title}</Text>
        <View>{content}</View>
        <Horizontal justifyContent="flex-end">{footer}</Horizontal>
      </Vertical>
    </View>
  );
};
```

### Theme Integration

Use the theme system via `useTheme` hook:

```typescript
const { getColor, themeMode } = useTheme();
const colorValue = getColor('theme.primary', { themeMode });
```

### Style Constants

Define style constants in `.style.ts` files:

```typescript
export const ButtonSizes = {
  sm: { height: 30, fontSize: 14, padding: '0 12px' },
  md: { height: 40, fontSize: 16, padding: '0 16px' },
  lg: { height: 50, fontSize: 18, padding: '0 20px' },
};

export const ButtonShapes = {
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: 4 },
  pillShaped: { borderRadius: 9999 },
};
```

### Style Customization

Allow style customization through the `views` prop:

```typescript
<View
  {...defaultStyles}
  {...views?.container}
  {...props}
>
  <Text {...views?.label}>{label}</Text>
</View>
```

## Component API Conventions

### Prop Naming

- Use descriptive prop names that clearly indicate the prop's purpose
- Use boolean props with the `is` or `has` prefix: `isDisabled`, `hasError`
- Use consistent prop names across components: `size`, `variant`, `shape`
- Use `children` for component content
- Use `views` for style customization

### Prop Types

- Use union types for props with a finite set of values: `variant: 'filled' | 'outline' | 'ghost' | 'link'`
- Use `React.ReactNode` for content props: `children: React.ReactNode`
- Use function types for event handlers: `onClick: () => void`
- Use object types for complex props: `style: React.CSSProperties`

### Default Props

- Provide default values for optional props
- Document default values in JSDoc comments
- Set default values in the component function parameter destructuring

Example:

```typescript
/**
 * Button component for user interaction
 */
const ButtonView: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'md',
  shape = 'rounded',
  isDisabled = false,
  children,
  ...props
}) => {
  // Component implementation
};
```

### Component Composition

- Use compound components for complex components
- Export sub-components as properties of the main component
- Use context for sharing state between compound components

Example:

```typescript
// Card.tsx
export const Card = CardComponent as CardType;

// Assign the sub-components to the main component
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
```

## Documentation Conventions

### JSDoc Comments

- Use JSDoc comments for props, functions, and types
- Include descriptions, default values, and examples
- Use `@param` for function parameters
- Use `@returns` for function return values
- Use `@example` for usage examples

Example:

```typescript
/**
 * Button component for user interaction
 * @example
 * ```tsx
 * <Button variant="filled" size="md" onClick={() => alert('Clicked!')}>
 *   Click Me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /**
   * The visual style of the button
   * @default 'filled'
   */
  variant?: 'filled' | 'outline' | 'ghost' | 'link';
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}
```

### Component Examples

- Create examples for each significant prop or feature
- Use descriptive names for example files
- Export examples from `examples/index.ts`
- Include a default example that shows basic usage

Example:

```typescript
// examples/default.tsx
import React from 'react';
import { Button } from '../Button';

export const DefaultButton = () => (
  <Button onClick={() => alert('Hello, World!')}>Default</Button>
);

// examples/variant.tsx
import React from 'react';
import { Button } from '../Button';
import { Horizontal } from 'app-studio';

export const VariantButtons = () => (
  <Horizontal gap={10}>
    <Button variant="filled">Filled</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </Horizontal>
);
```

### MDX Documentation

- Use MDX for component documentation
- Include import examples, props tables, and usage examples
- Use live code examples where possible
- Document accessibility features and best practices

## Testing Conventions

### Test File Structure

- Place test files in the `__tests__` directory
- Name test files after the component or utility they test: `button.test.tsx`
- Group related tests using `describe` blocks
- Use descriptive test names that explain what is being tested

### Test Coverage

- Test component rendering
- Test component props and their effects
- Test component interactions
- Test component edge cases
- Test component accessibility

Example:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when isDisabled is true', () => {
    render(<Button isDisabled>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeDisabled();
  });
});
```

## Git Conventions

### Branch Naming

- Use feature branches for new features: `feature/button-component`
- Use bugfix branches for bug fixes: `bugfix/button-disabled-state`
- Use hotfix branches for urgent fixes: `hotfix/critical-button-bug`
- Use release branches for releases: `release/v1.0.0`

### Commit Messages

- Use conventional commit messages: `feat: add button component`
- Use present tense: `add` instead of `added`
- Keep commit messages concise and descriptive
- Reference issues in commit messages: `fix: button disabled state (#123)`

### Pull Requests

- Use descriptive titles for pull requests
- Include a description of the changes
- Reference related issues
- Include screenshots or videos for visual changes
- Ensure all tests pass before merging

## Conclusion

Following these conventions ensures consistency across the codebase and makes it easier for developers to understand, maintain, and contribute to the project. If you have any questions or suggestions for improving these conventions, please open an issue or pull request.
