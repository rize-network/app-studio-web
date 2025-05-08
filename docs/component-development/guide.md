# Component Development Guide

This guide provides a comprehensive overview of how to build components for the `@src/components/` directory, following the established patterns and best practices in the codebase.

## Table of Contents

1. [Component Architecture](#component-architecture)
2. [File Structure](#file-structure)
3. [Component Creation Process](#component-creation-process)
4. [Styling Approach](#styling-approach)
5. [State Management](#state-management)
6. [Accessibility Considerations](#accessibility-considerations)
7. [Examples and Documentation](#examples-and-documentation)
8. [Utility Scripts](#utility-scripts)
9. [Component Integration](#component-integration)
10. [Best Practices](#best-practices)

## Component Architecture

Components in this library follow a clear separation of concerns with a structured architecture:

- **Main Component File**: Orchestrates state and view, exports the public API
- **Props**: Defines the component's API and TypeScript interfaces
- **State**: Manages component-specific state through custom hooks
- **View**: Handles the presentational aspects of the component
- **Style**: Contains style constants, mappings, and theme definitions
- **Types**: Defines TypeScript types and enums for the component

This architecture promotes maintainability, reusability, and clear separation between logic and presentation.

## File Structure

Each component follows a consistent file structure:

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

## Component Creation Process

### 1. Plan Your Component

Before writing code, define:
- The component's purpose and functionality
- Required props and their types
- State management needs
- Visual variants (size, shape, color, etc.)
- Accessibility requirements

### 2. Create Component Structure

Use the provided script to scaffold the component structure:

```bash
npm run create-structure -- ComponentName
```

This creates the basic file structure with placeholder content.

### 3. Define Types and Props

In `ComponentName.type.ts`:
```typescript
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'default' | 'primary' | 'secondary';
export type Shape = 'sharp' | 'rounded' | 'pillShaped';

export interface ComponentNameStyles {
  container?: ViewProps;
  label?: ViewProps;
  icon?: ViewProps;
  // Add other style override points as needed
}
```

In `ComponentName.props.ts`:
```typescript
import { ViewProps } from 'app-studio';
import { Size, Variant, Shape, ComponentNameStyles } from './ComponentName.type';

export interface ComponentNameProps extends ViewProps {
  /**
   * Size variant of the component
   * @default 'md'
   */
  size?: Size;
  
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: Variant;
  
  /**
   * Shape of the component
   * @default 'rounded'
   */
  shape?: Shape;
  
  /**
   * Whether the component is disabled
   * @default false
   */
  isDisabled?: boolean;
  
  /**
   * Custom styles for different parts of the component
   */
  views?: ComponentNameStyles;
  
  /**
   * Optional theme mode override ('light' or 'dark')
   * If not provided, the component will use the theme mode from context
   */
  themeMode?: 'light' | 'dark';
  
  // Add other props as needed
}
```

### 4. Implement State Management

In `ComponentName.state.ts`:
```typescript
import { useState, useCallback } from 'react';

export interface ComponentNameStateProps {
  // Add any props needed for state initialization
  defaultValue?: string;
}

export const useComponentNameState = (props: ComponentNameStateProps = {}) => {
  const { defaultValue = '' } = props;
  
  const [value, setValue] = useState(defaultValue);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleHover = useCallback((isHovering: boolean) => {
    setIsHovered(isHovering);
  }, []);
  
  const handleFocus = useCallback((isFocusing: boolean) => {
    setIsFocused(isFocusing);
  }, []);
  
  return {
    value,
    setValue,
    isHovered,
    isFocused,
    handleHover,
    handleFocus
  };
};
```

### 5. Create Style Definitions

In `ComponentName.style.ts`:
```typescript
import { ViewProps } from 'app-studio';
import { Size, Variant, Shape } from './ComponentName.type';

// Size mappings
export const ComponentNameSizes: Record<Size, ViewProps> = {
  xs: { padding: '4px 8px', fontSize: 12 },
  sm: { padding: '6px 12px', fontSize: 14 },
  md: { padding: '8px 16px', fontSize: 16 },
  lg: { padding: '10px 20px', fontSize: 18 },
  xl: { padding: '12px 24px', fontSize: 20 },
};

// Shape mappings
export const ComponentNameShapes: Record<Shape, ViewProps> = {
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: 4 },
  pillShaped: { borderRadius: 9999 },
};

// Get variant styles based on theme mode
export const getComponentNameVariants = (themeMode: 'light' | 'dark') => {
  const isDark = themeMode === 'dark';
  
  return {
    default: {
      backgroundColor: isDark ? 'color.gray.800' : 'color.gray.100',
      color: isDark ? 'color.gray.100' : 'color.gray.800',
      borderColor: isDark ? 'color.gray.700' : 'color.gray.300',
    },
    primary: {
      backgroundColor: 'theme.primary',
      color: 'color.white',
      borderColor: 'theme.primary',
    },
    secondary: {
      backgroundColor: 'theme.secondary',
      color: 'color.white',
      borderColor: 'theme.secondary',
    },
  };
};
```

### 6. Implement the View Component

In `ComponentName.view.tsx`:
```typescript
import React from 'react';
import { View, Horizontal, Vertical, useTheme } from 'app-studio';
import { ComponentNameProps } from './ComponentName.props';
import { 
  ComponentNameSizes, 
  ComponentNameShapes, 
  getComponentNameVariants 
} from './ComponentName.style';

export const ComponentNameView: React.FC<ComponentNameProps> = ({
  size = 'md',
  variant = 'default',
  shape = 'rounded',
  isDisabled = false,
  children,
  views = {},
  themeMode: elementMode,
  ...props
}) => {
  // Access theme context
  const { themeMode } = useTheme();
  const currentThemeMode = elementMode || themeMode;
  
  // Get styles based on props
  const sizeStyles = ComponentNameSizes[size];
  const shapeStyles = ComponentNameShapes[shape];
  const variantStyles = getComponentNameVariants(currentThemeMode)[variant];
  
  return (
    <View
      // Base styles
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={isDisabled ? 0.5 : 1}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      transition="all 0.2s ease"
      
      // Variant-specific styles
      {...sizeStyles}
      {...shapeStyles}
      {...variantStyles}
      
      // Custom style overrides
      {...views?.container}
      
      // Pass through remaining props
      {...props}
    >
      {children}
    </View>
  );
};
```

### 7. Create the Main Component

In `ComponentName.tsx`:
```typescript
import React from 'react';
import { ComponentNameProps } from './ComponentName/ComponentName.props';
import { useComponentNameState } from './ComponentName/ComponentName.state';
import { ComponentNameView } from './ComponentName/ComponentName.view';

/**
 * ComponentName component description
 */
const ComponentNameComponent: React.FC<ComponentNameProps> = (props) => {
  // Initialize component state
  const state = useComponentNameState();
  
  // Return the view with state and props
  return <ComponentNameView {...state} {...props} />;
};

export const ComponentName = ComponentNameComponent;
```

### 8. Create Examples

In `examples/default.tsx`:
```typescript
import React from 'react';
import { ComponentName } from '../ComponentName';

export const DefaultDemo = () => {
  return <ComponentName>Default Example</ComponentName>;
};
```

In `examples/variant.tsx`:
```typescript
import React from 'react';
import { ComponentName } from '../ComponentName';
import { Horizontal } from 'app-studio';

export const VariantDemo = () => {
  return (
    <Horizontal gap={10}>
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </Horizontal>
  );
};
```

## Styling Approach

Components in this library use a consistent styling approach:

### App-Studio Layout Components

Use the layout components from `app-studio` for consistent layout:
- `View`: Base container component
- `Horizontal`: Horizontal flex container
- `Vertical`: Vertical flex container
- `Center`: Centered flex container

### Theme Integration

Use the theme system via `useTheme` hook:
```typescript
const { getColor, themeMode } = useTheme();
const colorValue = getColor('theme.primary', { themeMode });
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

### Style Constants

Define style constants in `.style.ts` files:
```typescript
export const ComponentSizes = {
  sm: { height: 30, fontSize: 14 },
  md: { height: 40, fontSize: 16 },
  lg: { height: 50, fontSize: 18 },
};
```

## State Management

### Component-Specific State

Use custom hooks for component-specific state:
```typescript
export const useComponentState = (initialState = {}) => {
  const [value, setValue] = useState(initialState.value || '');
  const [isOpen, setIsOpen] = useState(initialState.isOpen || false);
  
  return { value, setValue, isOpen, setIsOpen };
};
```

### Global State

For components that need global state (like Toast, Modal), use Zustand:
```typescript
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => set((state) => ({ 
    toasts: [...state.toasts, toast] 
  })),
  removeToast: (id) => set((state) => ({ 
    toasts: state.toasts.filter(toast => toast.id !== id) 
  })),
}));
```

## Accessibility Considerations

Ensure components are accessible:

- Use semantic HTML elements
- Add proper ARIA attributes
- Support keyboard navigation
- Ensure sufficient color contrast
- Provide text alternatives for non-text content
- Make focus states visible

Example:
```typescript
<View
  role="button"
  aria-disabled={isDisabled}
  tabIndex={isDisabled ? -1 : 0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.();
    }
  }}
  {...props}
>
  {children}
</View>
```

## Examples and Documentation

### Component Examples

Create examples for each significant prop or feature:
- `default.tsx`: Basic usage
- `variant.tsx`: Different variants
- `size.tsx`: Different sizes
- `isDisabled.tsx`: Disabled state

### Example Index

Export all examples from `examples/index.ts`:
```typescript
export * from './default';
export * from './variant';
export * from './size';
export * from './isDisabled';
```

## Utility Scripts

The codebase provides several utility scripts to help with component development:

### Create Component Structure

```bash
npm run create-structure -- ComponentName
```

### Create Examples

```bash
npm run create-example -- ComponentName
```

### Create Index Files

```bash
npm run create-indices
```

### Create Component Pages

```bash
npm run create-pages
```

## Component Integration

### Compound Components

For complex components, use the compound component pattern:

```typescript
const CardComponent: React.FC<CardProps> = (props) => {
  return <CardView {...props} />;
};

export const Card = CardComponent as CardType;

// Assign the sub-components to the main component
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
```

### Context Integration

For components that need to share state between sub-components, use React Context:

```typescript
// Create context
const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

// Provider component
export const ComponentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useComponentState();
  return (
    <ComponentContext.Provider value={state}>
      {children}
    </ComponentContext.Provider>
  );
};

// Hook to use the context
export const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error('useComponentContext must be used within a ComponentProvider');
  }
  return context;
};
```

## Best Practices

### Do's

- ✅ Follow the established file structure
- ✅ Use TypeScript for type safety
- ✅ Document props with TSDoc comments
- ✅ Use app-studio layout components
- ✅ Separate logic from presentation
- ✅ Make components accessible
- ✅ Allow style customization via the `views` prop
- ✅ Use theme variables for colors
- ✅ Create comprehensive examples

### Don'ts

- ❌ Use global CSS (except when absolutely necessary)
- ❌ Mix state logic with presentation
- ❌ Hardcode colors or sizes
- ❌ Ignore accessibility
- ❌ Create overly complex components
- ❌ Duplicate functionality that exists in other components
- ❌ Use direct DOM manipulation
