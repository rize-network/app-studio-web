# Drawer Component

A flexible drawer/modal panel component that slides out from any edge of the screen. Useful for displaying additional content, forms, or settings without leaving the current page.

## Features

- **Flexible Placement**: Slide from left, right, top, or bottom
- **Multiple Sizes**: Choose from xs, sm, md, lg, xl, or full width/height
- **Compound Component**: Use sub-components for granular control
- **Customizable Closing**: Prevent closing on overlay click when needed
- **Smooth Animations**: CSS-based transitions for performance
- **Accessible**: Built with modal best practices

## Installation

The Drawer component is part of the app-studio library and is already available in your project.

```tsx
import { Drawer } from 'app-studio';
```

## Basic Usage

### Simple Drawer

```tsx
import { useState } from 'react';
import { Drawer } from 'app-studio';
import { Button } from 'app-studio';

export function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Drawer.Header onClose={() => setIsOpen(false)}>
          Drawer Title
        </Drawer.Header>
        <Drawer.Body>
          <p>Your content goes here</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}
```

### With Different Placements

```tsx
<Drawer isOpen={isOpen} onClose={onClose} placement="left">
  {/* Content */}
</Drawer>

<Drawer isOpen={isOpen} onClose={onClose} placement="right">
  {/* Content */}
</Drawer>

<Drawer isOpen={isOpen} onClose={onClose} placement="top">
  {/* Content */}
</Drawer>

<Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
  {/* Content */}
</Drawer>
```

### With Different Sizes

```tsx
// xs: 320px
<Drawer isOpen={isOpen} onClose={onClose} size="xs" />

// sm: 380px
<Drawer isOpen={isOpen} onClose={onClose} size="sm" />

// md: 480px (default)
<Drawer isOpen={isOpen} onClose={onClose} size="md" />

// lg: 640px
<Drawer isOpen={isOpen} onClose={onClose} size="lg" />

// xl: 768px
<Drawer isOpen={isOpen} onClose={onClose} size="xl" />

// full: 100% width/height
<Drawer isOpen={isOpen} onClose={onClose} size="full" />
```

## API Reference

### Drawer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Controls whether the drawer is visible |
| `onClose` | `() => void` | Required | Callback fired when the drawer should close |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Which edge the drawer slides from |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Width (for left/right) or height (for top/bottom) of drawer |
| `isClosePrevented` | `boolean` | `false` | If true, clicking the overlay won't close the drawer |
| `children` | `React.ReactNode` | - | Content of the drawer (typically sub-components) |

### Drawer.Overlay Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Controls overlay visibility |
| `onClose` | `() => void` | Required | Callback when overlay is clicked |
| `isClosePrevented` | `boolean` | `false` | Prevent closing on overlay click |
| `blur` | `number` | - | Optional blur amount for backdrop |
| `children` | `React.ReactNode` | - | Drawer container element |

### Drawer.Container Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Placement of the drawer |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Size of the drawer |
| `children` | `React.ReactNode` | - | Drawer content |

### Drawer.Header Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClose` | `() => void` | - | Callback for close button |
| `buttonPosition` | `'left' \| 'right'` | `'right'` | Position of the close button |
| `children` | `React.ReactNode` | - | Header content (typically title text) |

### Drawer.Body Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Main content of the drawer |

### Drawer.Footer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Footer content (typically action buttons) |

## Compound Components

The Drawer uses a compound component pattern for flexible composition:

```tsx
<Drawer isOpen={isOpen} onClose={onClose}>
  <Drawer.Overlay>
    <Drawer.Container>
      <Drawer.Header onClose={onClose}>Title</Drawer.Header>
      <Drawer.Body>Content</Drawer.Body>
      <Drawer.Footer>Actions</Drawer.Footer>
    </Drawer.Container>
  </Drawer.Overlay>
</Drawer>
```

However, you typically use the simpler form where the main Drawer component wraps the sub-components directly.

## Common Patterns

### Form in a Drawer

```tsx
export function FormDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Form</Button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Drawer.Header onClose={() => setIsOpen(false)}>
          Create New Item
        </Drawer.Header>
        <Drawer.Body>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}
```

### Prevent Closing on Overlay Click

```tsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  isClosePrevented={true}
>
  <Drawer.Header onClose={onClose}>
    Important Action
  </Drawer.Header>
  <Drawer.Body>
    This drawer can only be closed by clicking the close button
  </Drawer.Body>
</Drawer>
```

### Nested Drawers

```tsx
export function NestedDrawers() {
  const [drawer1Open, setDrawer1Open] = useState(false);
  const [drawer2Open, setDrawer2Open] = useState(false);

  return (
    <>
      <Button onClick={() => setDrawer1Open(true)}>Open First Drawer</Button>

      <Drawer isOpen={drawer1Open} onClose={() => setDrawer1Open(false)} placement="left">
        <Drawer.Header onClose={() => setDrawer1Open(false)}>
          First Drawer
        </Drawer.Header>
        <Drawer.Body>
          <Button onClick={() => setDrawer2Open(true)}>Open Second Drawer</Button>
        </Drawer.Body>
      </Drawer>

      <Drawer isOpen={drawer2Open} onClose={() => setDrawer2Open(false)} placement="right">
        <Drawer.Header onClose={() => setDrawer2Open(false)}>
          Second Drawer
        </Drawer.Header>
        <Drawer.Body>Content for second drawer</Drawer.Body>
      </Drawer>
    </>
  );
}
```

## Styling & Customization

The Drawer component respects the `app-studio` theme. You can customize appearance using:

1. **CSS Classes** - Override via CSS
2. **ViewProps** - Pass style props to adjust appearance
3. **Placement and Size** - Primary customization levers

## Size Reference

| Size | Width/Height |
|------|-------------|
| `xs` | 320px |
| `sm` | 380px |
| `md` | 480px (default) |
| `lg` | 640px |
| `xl` | 768px |
| `full` | 100% |

## Best Practices

1. **Always provide onClose**: Ensure users can exit the drawer
2. **Clear call-to-action**: Make it obvious what the drawer is for
3. **Concise content**: Drawers work best for focused, task-specific content
4. **Footer buttons**: Use Footer component for action buttons
5. **Prevent accidental closes**: Use `isClosePrevented` for critical operations
6. **Keyboard support**: Ensure proper focus management with your content
7. **Mobile consideration**: Test drawer sizes on mobile - consider using `full` size on small screens

## Examples

Check out the example implementations:
- Default Drawer: `src/components/Drawer/Examples/DefaultDrawer.tsx`
- Placements: `src/components/Drawer/Examples/DrawerPlacements.tsx`
- Sizes: `src/components/Drawer/Examples/DrawerSizes.tsx`

## Accessibility

- Drawer automatically manages focus when opening/closing
- Overlay click triggers `onClose` callback (unless `isClosePrevented`)
- Close button in Header provides clear exit path
- Built-in animations respect `prefers-reduced-motion` preferences

## Browser Support

Works in all modern browsers that support CSS transforms and transitions.
