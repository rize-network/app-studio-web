# Title

The Title component is used for rendering animated and highlighted titles in hero sections and other prominent areas of the UI.

## Import

```jsx
import { Title } from '@app-studio/web';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | React.ReactNode | - | The main text content of the title |
| highlightText | string \| string[] | - | Text to be highlighted within the title. If not provided, no highlighting will be applied |
| highlightStyle | 'background' \| 'underline' \| 'gradient' \| 'outline' \| 'glow' | 'background' | The visual style of the highlighted text |
| highlightColor | string | 'theme.primary' | The color of the highlighted text or background |
| highlightSecondaryColor | string | - | The secondary color for gradient highlights |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' | 'xl' | The size of the title |
| centered | boolean | false | Whether to center the title |
| animate | AnimationProps \| AnimationProps[] | - | Animation for the title. This should be an animation object with properties like from, to, duration, etc. |
| highlightAnimate | AnimationProps \| AnimationProps[] | - | Animation specifically for the highlighted text |
| alternateHighlightText | string[] | [] | Array of strings to cycle through, replacing the text specified in highlightText |
| alternateAnimation | boolean | false | Whether to animate the alternating highlight text |
| alternateDuration | number | 3000 | Duration in milliseconds for each alternating highlight text |
| highlightTypewriter | boolean | false | Whether to apply a typewriter effect to the highlighted text |
| highlightTypewriterDuration | number | 3000 | Duration in milliseconds for the typewriter effect |
| views | TitleStyles | {} | Custom styles for different parts of the title |
| themeMode | 'light' \| 'dark' | - | Optional theme mode override |

## Examples

### Basic Title

```jsx
<Title>Simple Hero Title</Title>
```

### Title Sizes

```jsx
<>
  <Title size="xs">Extra Small Title (xs)</Title>
  <Title size="sm">Small Title (sm)</Title>
  <Title size="md">Medium Title (md)</Title>
  <Title size="lg">Large Title (lg)</Title>
  <Title size="xl">Extra Large Title (xl - default)</Title>
  <Title size="2xl">2XL Title</Title>
  <Title size="3xl">3XL Title</Title>
  <Title size="4xl">4XL Title</Title>
  <Title size="5xl">5XL Title</Title>
  <Title size="6xl">6XL Title</Title>
</>
```

### Highlighted Title

```jsx
<Title 
  highlightText="highlighted" 
  highlightStyle="background" 
  highlightColor="theme.primary"
>
  Text with highlighted words
</Title>
```

### Highlight Styles

```jsx
<>
  <Title
    highlightText="background"
    highlightStyle="background"
    highlightColor="theme.primary"
  >
    Text with background highlight
  </Title>

  <Title
    highlightText="underlined"
    highlightStyle="underline"
    highlightColor="theme.secondary"
  >
    Text with underlined highlight
  </Title>

  <Title
    highlightText="gradient"
    highlightStyle="gradient"
    highlightColor="theme.primary"
    highlightSecondaryColor="theme.secondary"
  >
    Text with gradient highlight
  </Title>

  <Title
    highlightText="outline"
    highlightStyle="outline"
    highlightColor="theme.primary"
  >
    Text with outline highlight
  </Title>

  <Title
    highlightText="glow"
    highlightStyle="glow"
    highlightColor="theme.primary"
  >
    Text with glow highlight
  </Title>
</>
```

### Multiple Highlights

```jsx
<Title
  highlightText={['multiple', 'highlights']}
  highlightStyle="background"
  highlightColor="theme.primary"
>
  Text with multiple highlights in the same sentence
</Title>
```

### Animated Title

```jsx
<Title
  animate={{
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: '1.5s',
    iterationCount: '1',
  }}
>
  Fade In Animation
</Title>
```

### Animated Highlight

```jsx
<Title
  highlightText="animated highlight"
  highlightStyle="background"
  highlightColor="theme.primary"
  highlightAnimate={{
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    duration: '0.5s',
    delay: '0.2s',
  }}
>
  Text with animated highlight
</Title>
```

### Alternating Highlight Text

```jsx
<Title
  highlightText="changing"
  alternateHighlightText={[
    'innovative',
    'powerful',
    'flexible',
    'intuitive',
  ]}
  alternateAnimation={true}
  alternateDuration={2000}
  highlightStyle="background"
  highlightColor="theme.primary"
>
  Our changing solution for your business
</Title>
```

### Typewriter Effect

```jsx
<Title
  highlightText="typewriter"
  highlightStyle="background"
  highlightColor="theme.primary"
  highlightTypewriter={true}
  highlightTypewriterDuration={1500}
>
  This text has a typewriter effect on the highlighted word
</Title>
```

### Responsive Title

```jsx
<Title
  media={{
    mobile: {
      fontSize: 32,
      lineHeight: '40px',
    },
    tablet: {
      fontSize: 48,
      lineHeight: '56px',
    },
    desktop: {
      fontSize: 64,
      lineHeight: '72px',
    },
  }}
  highlightText="Responsive"
  highlightStyle="background"
  highlightColor="theme.primary"
>
  Responsive Title Example
</Title>
```

### Custom Styling

```jsx
<Title
  views={{
    container: {
      fontFamily: 'Georgia, serif',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    highlight: {
      borderRadius: '8px',
      padding: '0 12px',
    },
  }}
  highlightText="Custom"
  highlightStyle="background"
  highlightColor="color.purple.500"
>
  Title with Custom Styling
</Title>
```

### Hero Section Example

```jsx
<View
  backgroundColor="color.gray.50"
  padding={48}
  borderRadius={8}
  width="100%"
>
  <Vertical gap={24} maxWidth={800} marginX="auto">
    <Title
      size="xl"
      animate={{
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: '1s',
        iterationCount: '1',
      }}
      highlightText="Platform"
      highlightStyle="gradient"
      highlightColor="theme.primary"
      highlightSecondaryColor="theme.secondary"
      centered
    >
      Welcome to Our Platform
    </Title>

    <Text
      textAlign="center"
      color="color.gray.600"
      fontSize={20}
      lineHeight={28}
    >
      Build beautiful, responsive, and interactive user interfaces with our
      powerful component library.
    </Text>
  </Vertical>
</View>
```

## Accessibility

The Title component:

- Uses semantic heading elements (`<h1>`) for proper document structure
- Maintains proper color contrast for highlighted text
- Supports keyboard navigation and focus management
- Works with screen readers by using appropriate ARIA attributes

## Best Practices

- Use the Title component for main headings and important text that needs emphasis
- Choose highlight styles that maintain good contrast with the background
- Use animations sparingly to avoid distracting users
- Consider using responsive sizing for different screen sizes
- Limit the use of alternating text to avoid confusion
- Ensure that any animations respect user preferences for reduced motion
- Use semantic colors from the theme system rather than hardcoded values
