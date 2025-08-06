# Background Component

A comprehensive collection of background effects for creating engaging visual experiences in your applications.

## Features

- **Animated Effects**: Aurora, Meteors, Particles, Grid, Ripples, Wall
- **Background Images**: Support for images with overlays and blend modes
- **Gradient Backgrounds**: Linear, radial, and conic gradients with animation
- **Theme Integration**: Full support for app-studio color system
- **Responsive Design**: Works seamlessly with responsive layouts
- **TypeScript Support**: Comprehensive type definitions

## Quick Start

```tsx
import { Background } from '@app-studio/web';

// Aurora background
<Background.Aurora showRadialGradient={true}>
  <Text color="white">Aurora Effect</Text>
</Background.Aurora>

// Background image with overlay
<Background.Image
  src="/hero-image.jpg"
  overlay="rgba(0,0,0,0.4)"
  backgroundSize="cover"
>
  <Text color="white">Image Background</Text>
</Background.Image>

// Animated gradient
<Background.Gradient
  from="color.blue.500"
  to="color.purple.500"
  animate={true}
>
  <Text color="white">Gradient Background</Text>
</Background.Gradient>
```

## Available Components

### Animated Effects
- `Background.Aurora` - Animated aurora gradient effect
- `Background.Meteors` - Falling meteor animation
- `Background.Particles` - Floating animated particles
- `Background.Grid` - Animated geometric grid
- `Background.Ripples` - Expanding circular ripples
- `Background.Wall` - 3D wall effect

### Background Types
- `Background.Image` - Image backgrounds with overlay support
- `Background.Gradient` - Gradient backgrounds with animation

### Interactive Elements
- `Background.BorderMovingButton` - Button with animated border
- `Background.AnimatedStrokeButton` - Button with stroke animation

## Key Props

### Background.Image
- `src` - Image source URL (required)
- `backgroundSize` - Image sizing ('cover', 'contain', etc.)
- `overlay` - Color or gradient overlay
- `blendMode` - CSS blend mode for overlay

### Background.Gradient
- `type` - Gradient type ('linear', 'radial', 'conic')
- `from/to` - Simple two-color gradient
- `colors` - Multi-color gradient with stops
- `animate` - Enable gradient animation

## Examples

See the [full documentation](../../../public/files/media/Background.mdx) for comprehensive examples and usage patterns.

## Performance Tips

- Use appropriate image sizes for Background.Image
- Limit animated particles for better performance
- Consider reduced motion preferences
- Test on various devices and screen sizes

## Accessibility

- Ensure sufficient color contrast for text
- Provide alternative descriptions for decorative backgrounds
- Test with screen readers
- Consider motion sensitivity

## Theme Integration

All components support the app-studio theme system:

```tsx
// Use theme colors
<Background.Gradient
  from="color.blue.500"
  to="color.purple.500"
/>

// Theme-aware overlays
<Background.Image
  src="/image.jpg"
  overlay="color.gray.900"
/>
```
