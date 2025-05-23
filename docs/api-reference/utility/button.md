# Button

The Button component is used to trigger an action or event.

## Import

```jsx
import { Button } from '@app-studio/web';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variant | 'filled' \| 'outline' \| 'ghost' \| 'link' | 'filled' | The visual style of the button |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | The size of the button |
| shape | 'sharp' \| 'rounded' \| 'pillShaped' | 'rounded' | The shape of the button |
| iconPosition | 'left' \| 'right' \| 'top' \| 'bottom' | 'left' | The position of the icon relative to the button text |
| loaderPosition | 'left' \| 'right' | 'left' | The position of the loader relative to the button text |
| backgroundColor | string | - | The background color of the button |
| color | string | - | The color of the button text |
| isAuto | boolean | false | Whether the button should automatically adjust its width |
| isFilled | boolean | false | Whether the button should fill its container width |
| isDisabled | boolean | false | Whether the button is disabled |
| isLoading | boolean | false | Whether the button is in a loading state |
| isIconRounded | boolean | false | Whether the icon should have rounded corners |
| icon | React.ReactNode | - | The icon to display in the button |
| children | React.ReactNode | - | The content of the button |
| to | string | - | The URL to navigate to when the button is clicked (turns the button into a link) |
| isExternal | boolean | false | Whether the link should open in a new tab |
| shadow | Shadow | - | The shadow style of the button |
| onClick | () => void | - | The function to call when the button is clicked |
| views | ButtonStyles | {} | Custom styles for different parts of the button |
| themeMode | 'light' \| 'dark' | - | Optional theme mode override |

## Examples

### Basic Button

```jsx
<Button onClick={() => alert('Button clicked!')}>Click Me</Button>
```

### Button Variants

```jsx
<>
  <Button variant="filled">Filled</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</>
```

### Button Sizes

```jsx
<>
  <Button size="xs">Extra Small</Button>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra Large</Button>
</>
```

### Button with Icon

```jsx
import { DustBinIcon } from '@app-studio/web';

<Button icon={<DustBinIcon widthHeight={16} />}>Delete</Button>
```

### Button with Icon Position

```jsx
import { DustBinIcon } from '@app-studio/web';

<>
  <Button icon={<DustBinIcon widthHeight={16} />} iconPosition="left">Left Icon</Button>
  <Button icon={<DustBinIcon widthHeight={16} />} iconPosition="right">Right Icon</Button>
  <Button icon={<DustBinIcon widthHeight={16} />} iconPosition="top">Top Icon</Button>
  <Button icon={<DustBinIcon widthHeight={16} />} iconPosition="bottom">Bottom Icon</Button>
</>
```

### Loading Button

```jsx
<Button isLoading>Loading</Button>
```

### Disabled Button

```jsx
<Button isDisabled>Disabled</Button>
```

### Link Button

```jsx
<Button to="/dashboard" variant="link">Go to Dashboard</Button>
```

### External Link Button

```jsx
<Button to="https://example.com" isExternal variant="link">External Link</Button>
```

### Custom Styled Button

```jsx
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
```

## Accessibility

The Button component:

- Uses the native `<button>` element for proper keyboard navigation and screen reader support
- Supports the `aria-disabled` attribute when disabled
- Maintains proper focus states for keyboard users
- Uses appropriate color contrast for text and background

## Best Practices

- Use clear, concise text that describes the action
- Use the appropriate variant for the context (primary actions should use 'filled')
- Include an icon only when it adds meaning or clarity
- Avoid using too many buttons in close proximity
- Use consistent button styles throughout your application
- Consider the visual hierarchy of multiple buttons (primary, secondary actions)
- Use the `isLoading` state for actions that take time to complete
